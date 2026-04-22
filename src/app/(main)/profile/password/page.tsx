"use client";
import { Button } from "@/components/ui/button";
import { FloatingInput } from "@/components/ui/floating-input";
import { useChangePassword } from "@/features/auth/hooks";
import { ChangePasswordPayload, changePasswordSchema } from "@/features/auth/Schema";
import { showError, showSuccess } from "@/lib/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

const Password = () => {
  const router = useRouter();
  const { mutate, isPending } = useChangePassword()

  // const handleChangePassword = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   router.push("/change-password");
  // };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordPayload>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: "",
      newPassword: "",
    },
  });

  const onSubmit = (data: ChangePasswordPayload) => {
    const { confirmPassword, ...payload } = data;

    mutate(payload as any, {
      onSuccess: (response) => {
        reset()
        showSuccess(response?.message)
      },
      onError: (error) => {
        showError(error)
      }
    })

  }
  return (
    <div className="card">
      <p className="text-lg font-medium">Password</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-3 space-y-3">
        <FloatingInput
          id="password"
          label="Current Password"
          type="password"
          {...register("password")}
          error={errors.password?.message}
        />
        <FloatingInput
          id="newPassword"
          label="New Password"
          type="password"
          {...register("newPassword")}
          error={errors.newPassword?.message}
        />
        <FloatingInput
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />

        <Button type="submit" disabled={isPending} className="mt-2">{isPending ? "Changing..." : "Change Password"}</Button>
      </form>
    </div>
  );
};

export default Password;
