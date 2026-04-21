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
import { login, logout } from "@/lib/slices/authSlice";
import { useRouter } from "next/navigation";
import {
  useCheckUsername,
  useDeleteAccount,
  useForgotOtpVerify,
  useForgotPassword,
  useMe,
  useResendOtp,
  useUpdateProfile,
} from "@/features/auth/hooks";
import { Camera, Loader2 } from "lucide-react";
import {
  DeleteAccountOtpPayload,
  deleteAccountOtpSchema,
  UpdateProfilePayload,
  updateProfileSchema,
} from "@/features/auth/Schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDebounce } from "@/hooks/api/useDebounce";
import { useQueryClient } from "@tanstack/react-query";
import { ProfileSkeleton } from "@/components/skeleton";
import { showError, showSuccess } from "@/lib/toast";

const Profile = () => {
  const dispatch = useAppDispatch();
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();
  const { data: userData, isLoading } = useMe();
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();
  const {
    mutate: checkUsername,
    isPending: isChecking,
    data,
  } = useCheckUsername();
  const { mutate: deleteAccount, isPending: isDeleting } = useDeleteAccount();
  const { mutate: resendOtp, isPending: isResendOtp } = useForgotPassword();
  const { mutate, isPending } = useForgotOtpVerify();
  const [otp, setOtp] = useState<string[]>(["", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [timer, setTimer] = useState(120);


  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

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
    if (
      !debouncedUsername ||
      debouncedUsername.length < 3 ||
      debouncedUsername === userData?.data?.userName
    ) {
      // setIsAvailable(null);
      return;
    }

    checkUsername({ userName: debouncedUsername });
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
        // queryClient.invalidateQueries({ queryKey: ["get-profile"] });
        showSuccess("Profile updated successfully!");
      },
      onError: (err: any) => {
        showError(err);
      },
    });
  };
  const {
    handleSubmit: handleDelete,
    setValue: setOtpValue,
    formState: { errors: errorsOtp },
  } = useForm<DeleteAccountOtpPayload>({
    resolver: zodResolver(deleteAccountOtpSchema),
    defaultValues: {
      otp: "",
    },
  });

  useEffect(() => {
    setOtpValue("otp", otp.join(""));
  }, [otp, setOtpValue]);

  const handleDeleteAccount = (body: DeleteAccountOtpPayload) => {
    deleteAccount(body,
      {
        onSuccess: () => {
          showSuccess("Account deleted successfully!");
          router.push("/");
        },
        onError: (err: any) => {
          showError(err);
        },
      }
    );
  };


  const handleOpenDeleteDialog = () => {
    if (!userData?.data?.email) return;

    resendOtp({ email: userData?.data?.email }, {
      onSuccess: () => {
        showSuccess("OTP sent successfully!");
        setIsDialogOpen(true);
      },
      onError: (err: any) => {
        showError(err);
      },
    });
  };


  const handleOtpChange = (index: number, value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "");

    if (numericValue.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = numericValue;
    setOtp(newOtp);

    if (numericValue && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };


  const handleResend = () => {
    if (userData?.data?.email && timer === 0) {
      resendOtp(
        { email: userData?.data?.email },
        {
          onSuccess: () => {
            setTimer(120);
            showSuccess("OTP resent successfully!");
          },
          onError: (err: any) => {
            showError(err);
          }
        }
      );
    }
  };
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
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

                {userName &&
                  userName.length >= 3 &&
                  userName !== userData?.data?.userName && (
                    <div className="pt-1">
                      {isChecking ? (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Loader2 className="w-3 h-3 animate-spin" />
                          <span>Checking...</span>
                        </div>
                      ) : !data?.data.exists ? (
                        <div className="flex items-center gap-2 text-sm text-green-600">
                          <span className="rounded-full bg-green-50 p-1 text-[10px]">
                            ✓
                          </span>
                          <span>Username is available</span>
                        </div>
                      ) : data?.data.exists ? (
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
        {(userData?.data?.subscriptions?.length ?? 0) > 0 && (
          <>
            <p className="mb-3 text-lg font-medium">Subscription Status</p>

            <p>
              {userData?.data?.subscriptions?.map((item: any, index: number) => (
                <span key={index}>
                  <span className="font-bold text-xl capitalize">
                    {item?.plan?.name}
                  </span>{" "}
                  <span className="font-light">
                    (3 days of trial left{" "}
                    <span className="text-muted-foreground">|</span>{" "}
                    {item?.planType === "buyer"
                      ? "Unlimited Purchases "
                      : item?.isUnlimitedQuota
                        ? "Unlimited Watches "
                        : item?.sellQuota + " Watches Left"}
                    )
                  </span>
                </span>
              ))}
            </p>
            <hr className="my-6 border-border" />
          </>
        )}


        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>

          <Button
            className="bg-red-700 hover:bg-red-800"
            onClick={handleOpenDeleteDialog}
            disabled={isResendOtp}
          >
            {isResendOtp ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending OTP...
              </>
            ) : (
              "Delete Account"
            )}
          </Button>

          <DialogContent className="w-full max-w-md sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-2xl">Delete account</DialogTitle>
              <DialogDescription>
                <p className="text-lg text-gray-700">
                  We’re sorry to see you go.
                </p>
                <p className="text-base">
                 Your account and all associated data will be permanently deleted. If you have an active subscription, it will also be cancelled upon account deletion. This action cannot be undone.
                </p>
              </DialogDescription>
            </DialogHeader>
            <div className="">
              <p className="text-sm text-center text-gray-600 mt-3">
                A 5 digit code has been sent to your email <span className="font-semibold">{userData?.data?.email}</span>
              </p>
              <div className="w-full text-center px-2 sm:px-4">
                <div className="flex justify-center gap-2 sm:gap-3 mt-6">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        if (el) inputRefs.current[index] = el;
                      }}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className={`w-14 h-14 rounded-xl text-center text-xl font-bold border-2 focus:outline-none transition-all ${errorsOtp.otp ? "border-red-500" : "border-gray-200 focus:border-gray-700"
                        }`}
                    />
                  ))}
                </div>
                {errorsOtp.otp && <p className="text-red-500 text-xs mt-2">{errorsOtp.otp.message}</p>}

                <p className="mt-4 text-sm text-gray-600">
                  Didn&apos;t get code?{" "}
                  <button
                    onClick={handleResend}
                    disabled={isResendOtp || timer > 0}
                    className="font-semibold text-black cursor-pointer hover:underline disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    {isResendOtp ? "Resending..." : timer > 0 ? `Resend in ${formatTime(timer)}` : "Resend"}
                  </button>

                </p>
              </div>
            </div>
            <DialogFooter className="w-full">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                className="bg-red-700 hover:bg-red-800"
                onClick={handleDelete(handleDeleteAccount)}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete Account"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Profile;
