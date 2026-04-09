"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { FloatingInput } from "@/components/ui/floating-input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAppDispatch } from "@/lib/hooks";
import { logout } from "@/lib/slices/authSlice";
import { useRouter } from "next/navigation";
import { useCheckUsername, useMe, useUpdateProfile } from "@/features/auth/hooks";
import { Camera, Loader2 } from "lucide-react";
import { UpdateProfilePayload, updateProfileSchema } from "@/features/auth/Schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDebounce } from "@/hooks/api/useDebounce";
import { useQueryClient } from "@tanstack/react-query";
import { ProfileSkeleton } from "@/components/skeleton";
import { showError, showSuccess } from "@/lib/toast";

const Profile = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reason, setReason] = useState("");
  const [understand, setUnderstand] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { data: userData, isLoading } = useMe();
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();
  const { mutate: checkUsername, isPending: isChecking } = useCheckUsername();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<UpdateProfilePayload>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      userName: "",
      profilePicture: null,
    },
  });

  const userName = watch("userName");
  const debouncedUsername = useDebounce(userName || "", 500);

  useEffect(() => {
    if (userData?.data) {
      reset({
        userName: userData.data.userName || "",
        profilePicture: userData.data.profilePicture?.location || null,
      });
    }
  }, [userData, reset]);

  useEffect(() => {
    if (!debouncedUsername || debouncedUsername.length < 3 || debouncedUsername === userData?.data?.userName) {
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
  }, [debouncedUsername, userData?.data?.userName, checkUsername]);

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

  const onSubmit = (body: UpdateProfilePayload) => {
    const payload: any = {
      userName: body.userName,
    };

    if (body.profilePicture instanceof File) {
      payload.profilePicture = body.profilePicture;
    }

    updateProfile(payload, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["get-profile"] });
        showSuccess("Profile updated successfully!");
      },
      onError: (err: any) => {
        showError(err);
      },
    });
  };

  const handleDeleteAccount = () => {
    dispatch(logout());
    router.push("/");
  };

  const imageSrc =
    preview ||
    userData?.data?.profilePicture?.location ||
    "https://placehold.co/400x400?text=Profile";

  return (
    <div className="card">
      <div className="border-b border-border pb-3">
        <h2 className="text-lg font-medium mb-1">Profile</h2>
        <p className="text-[#0D0C0C99]">Change your email and username</p>
      </div>

      <div className="py-6 border-b border-border">
        {isLoading ? (
          <ProfileSkeleton />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col items-center mb-8">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="group relative w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer overflow-hidden"
              >
                <img
                  src={imageSrc}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="text-white" size={20} />
                </div>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
              {errors.profilePicture && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.profilePicture.message as string}
                </p>
              )}
              <p className="text-sm text-gray-500 mt-2">
                Click to change profile picture
              </p>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <FloatingInput
                id="email"
                label="Email"
                value={userData?.data?.email || ""}
                disabled
                className="bg-gray-50!"
              />
              <div className="space-y-1">
                <FloatingInput
                  id="username"
                  label="Username"
                  type="text"
                  {...register("userName")}
                  error={errors.userName?.message}
                />

                {userName && userName.length >= 3 && userName !== userData?.data?.userName && (
                  <div className="pt-1">
                    {isChecking ? (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        <span>Checking...</span>
                      </div>
                    ) : isAvailable === true ? (
                      <div className="flex items-center gap-2 text-sm text-green-600">
                        <span className="rounded-full bg-green-50 p-1 text-[10px]">
                          ✓
                        </span>
                        <span>Username is available</span>
                      </div>
                    ) : isAvailable === false ? (
                      <div className="flex items-center gap-2 text-sm text-red-600">
                        <span className="rounded-full bg-red-50 p-1 text-[10px]">
                          ✕
                        </span>
                        <span>This username is already taken</span>
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
              <div className="col-span-full flex justify-end">
                <Button size={"lg"} type="submit" disabled={isUpdating}>
                  {isUpdating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save"
                  )}
                </Button>
              </div>
            </div>
          </form>

        )}
      </div>

      <div className="pt-6">
        <p className="mb-3 text-lg font-medium">Subscription Status</p>

        <p>
          {userData?.data?.subscriptions?.map((item: any, index: number) => (
            <>
              <span className="font-bold text-xl capitalize">{item?.plan?.name}</span>{" "}
              < span className="font-light" >
                (3 days of trial left <span className="text-muted-foreground ">|</span> {item?.planType === "buyer" ? "Unlimited Purchases " : item?.isUnlimitedQuota ? "Unlimited Watches " : item?.sellQuota + " Watches Left"}
                )
              </span></>

          ))}
        </p>

        <hr className="my-6 border-border" />

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-red-700 hover:bg-red-800">
              Delete Account
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[90%] w-[420px]">
            <DialogHeader>
              <DialogTitle className="text-2xl">Delete account</DialogTitle>
              <DialogDescription>
                <p className="text-lg text-gray-700">We’re sorry to see you go.</p>
                <p className="text-base">
                  Once you delete your account your profile data will be
                  permanently deleted from bid the bezel. Your past orders
                  details and orders sold data wont be deleted from our site.
                </p>
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <FloatingInput
                id="delete-reason"
                label="Reason for deletion (optional)"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
              <FloatingInput
                id="delete-email"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FloatingInput
                id="delete-password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="understand"
                  checked={understand}
                  onChange={(e) => setUnderstand(e.target.checked)}
                  className="accent-green-600 w-8 h-8 rounded-xl"
                />
                <label htmlFor="understand" className="text-sm">
                  I understand that deleted accounts aren't recoverable.
                </label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                className="bg-red-700 hover:bg-red-800"
                onClick={handleDeleteAccount}
                disabled={!email || !password || !understand}
              >
                Delete Account
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div >
  );
};

export default Profile;
