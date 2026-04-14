import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDebouncedCallback } from "use-debounce"; // The library hook
import { Camera, Loader2 } from "lucide-react";

import { FloatingInput } from "../ui/floating-input";
import { Button } from "../ui/button";
import { completeProfileSchema, CompleteProfilePayload } from "@/features/auth/Schema";
import { showError, showSuccess } from "@/lib/toast";
import { useCompleteProfile, useCheckUsername } from "@/features/auth/hooks";
import { useAppDispatch } from "@/lib/hooks";
import { login } from "@/lib/slices/authSlice";
import Image from "next/image";

type AuthStep = "login" | "register" | "otp-register" | "username" | "purchase-plan" | "plan-selected" | "subscription-confirmation" | "forgot-password" | "otp" | "reset-password" | "password-changed";

const Username = ({ setCurrentStep }: { setCurrentStep?: React.Dispatch<React.SetStateAction<AuthStep>> }) => {
  const dispatch = useAppDispatch();
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate, isPending: isSubmitting } = useCompleteProfile();
  const { mutateAsync: checkUsername, isPending: isChecking, data } = useCheckUsername();

  // Local state for UI feedback
  // const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CompleteProfilePayload>({
    resolver: zodResolver(completeProfileSchema),
    mode: "onChange",
    defaultValues: { userName: "" },
  });

  const userNameValue = watch("userName");

  // 1. Define the debounced API call
  const debouncedCheck = useDebouncedCallback(async (value: string) => {
    if (value.length < 3) {
      return;
    }
    try {
       await checkUsername({ userName: value });
    } catch (err) {
      console.error("Error checking username:", err);
    }
  }, 500);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("profilePicture", file, { shouldValidate: true });
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (body: CompleteProfilePayload) => {
    // if (isAvailable === false) return;
    mutate(body, {
      onSuccess: (data) => {

        showSuccess("Profile updated successfully!");
        setCurrentStep?.("purchase-plan");
        // dispatch(login(data?.data?.user));
      },
    });
  };

  return (
    <div className="w-[340px] max-w-full">
      <div className="flex items-center justify-between mb-6 text-sm font-medium text-gray-600">
        <span>Step</span>
        <span>2/3</span>
      </div>

      <div className="flex gap-2 mb-8">
        <div className="flex-1 h-1 bg-green-500 rounded-full" />
        <div className="flex-1 h-1 bg-yellow-400 rounded-full" />
        <div className="flex-1 h-1 bg-gray-300 rounded-full" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Enter your username</h2>
          <p className="text-sm text-gray-600 mt-2">
            This will appear in the bid list when you make a bid.
          </p>
        </div>

        {/* Profile Picture Section */}
        <div className="flex flex-col items-center">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="group relative w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer overflow-hidden"
          >
            {preview ? (
              <Image src={preview} fill alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="text-gray-400 flex flex-col items-center">
                <Camera size={24} />
                <span className="text-[10px] mt-1 font-medium">Upload</span>
              </div>
            )}
          </div>
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
          {errors.profilePicture && <p className="text-red-500 text-xs mt-1">{errors.profilePicture.message as string}</p>}
        </div>

        {/* Username Input with Debounced Check */}
        <div className="space-y-1">
          <FloatingInput
            id="username"
            label="Username"
            {...register("userName", {
              onChange: (e) => {

                debouncedCheck(e.target.value);
              }
            })}
            error={errors.userName?.message}
          />

          {/* Availability Feedback UI */}
          <div className="h-5">
            {userNameValue.length >= 3 && (
              <>
                {isChecking && (
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    <span>Checking...</span>
                  </div>
                )}
                {!isChecking && !data?.data.exists && (
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <span className="bg-green-50 rounded-full p-0.5 text-[10px]">✓</span>
                    <span>Username Available</span>
                  </div>
                )}
                {!isChecking && data?.data.exists && (
                  <div className="flex items-center gap-2 text-sm text-red-600">
                    <span className="bg-red-50 rounded-full p-0.5 text-[10px]">✕</span>
                    <span>Username Taken</span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting || isChecking}
          className="w-full rounded-full"
        >
          {isSubmitting ? "Updating Profile..." : "Next"}
        </Button>
      </form>
    </div>
  );
};

export default Username;