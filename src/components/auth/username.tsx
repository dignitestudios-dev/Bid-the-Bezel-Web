import React, { useState, useRef, useEffect } from "react";
import { FloatingInput } from "../ui/floating-input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { completeProfileSchema, CompleteProfilePayload } from "@/features/auth/Schema";
import { useCompleteProfile, useCheckUsername } from "@/features/auth/hooks";
import { Camera, Loader2 } from "lucide-react";
import { useDebounce } from "@/hooks/api/useDebounce";
import { useAppDispatch } from "@/lib/hooks";
import { login } from "@/lib/slices/authSlice";

type AuthStep =
  | "login"
  | "register"
  | "otp-register"
  | "username"
  | "purchase-plan"
  | "plan-selected"
  | "subscription-confirmation"
  | "forgot-password"
  | "otp"
  | "reset-password"
  | "password-changed";

const Username = ({
  setCurrentStep,
}: {
  setCurrentStep?: React.Dispatch<React.SetStateAction<AuthStep>>;
}) => {
  const dispatch = useAppDispatch()
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate, isPending } = useCompleteProfile();
  const { mutate: checkUsername, isPending: isChecking } = useCheckUsername();
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CompleteProfilePayload>({
    resolver: zodResolver(completeProfileSchema),
    defaultValues: {
      userName: "",
    },
  });

  const userName = watch("userName");
  const debouncedUsername = useDebounce(userName, 500);

  useEffect(() => {
    if (!debouncedUsername || debouncedUsername.length < 3) {
      setIsAvailable(null);
      return;
    }

    checkUsername(
      { userName: debouncedUsername },
      {
        onSuccess: (data) => setIsAvailable(!data.data.exists),
        onError: () => setIsAvailable(false),
      }
    );
  }, [debouncedUsername]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("profilePicture", file, { shouldValidate: true });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (body: CompleteProfilePayload) => {
    mutate(body, {
      onSuccess: (data) => {
        dispatch(login(data?.data?.user));
        setCurrentStep?.("purchase-plan");
      },
      onError: (err) => {
        console.error("Profile completion failed:", err);
      },
    });
  };

  return (
    <div className="w-[340px] max-w-full">
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm font-medium text-gray-600">Step</span>
        <span className="text-sm font-medium text-gray-600">2/3</span>
      </div>
      <div className="flex gap-2 mb-8">
        <div className="flex-1 h-1 bg-green-500 rounded-full"></div>
        <div className="flex-1 h-1 bg-yellow-400 rounded-full"></div>
        <div className="flex-1 h-1 bg-gray-300 rounded-full"></div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Enter your username</h2>
          <p className="text-sm text-gray-600 mt-2">
            This username will appear in bid list when you make a bid on any product.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="group relative w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-gray-400 transition-all overflow-hidden"
          >
            {preview ? (
              <img src={preview} alt="Avatar Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="text-gray-400 group-hover:text-gray-500 flex flex-col items-center">
                <Camera size={24} />
                <span className="text-[10px] mt-1 font-medium">Upload</span>
              </div>
            )}
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Camera size={20} className="text-white" />
            </div>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
          {errors.profilePicture && <p className="text-red-500 text-xs mt-1">{errors.profilePicture.message as string}</p>}
        </div>

        <div className="space-y-1">
          <FloatingInput
            id="username"
            label="Username"
            type="text"
            {...register("userName")}
            error={errors.userName?.message}
          />


          {userName && userName.length >= 3 && (
            <div className="pt-1">
              {isChecking ? (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span>Checking...</span>
                </div>
              ) : isAvailable === true ? (
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <span className="rounded-full bg-green-50 p-1 text-[10px]">✓</span>
                  <span>Username is available</span>
                </div>
              ) : isAvailable === false ? (
                <div className="flex items-center gap-2 text-sm text-red-600">
                  <span className="rounded-full bg-red-50 p-1 text-[10px]">✕</span>
                  <span>This username is already taken</span>
                </div>
              ) : null}
            </div>
          )}
        </div>

        <Button
          type="submit"
          disabled={isPending || isChecking || isAvailable === false}
          className="w-full rounded-full"
        >
          {isPending ? "Updating Profile..." : "Next"}
        </Button>
      </form>
    </div>
  );
};

export default Username;
