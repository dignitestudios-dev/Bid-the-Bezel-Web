import React, { useEffect } from "react";
import { FloatingInput } from "../ui/floating-input";
import { Button } from "../ui/button";
import { useUpdatePassword } from "@/features/auth/hooks";
import { useForm } from "react-hook-form";
import { updatePasswordPayload, updatePasswordSchema } from "@/features/auth/Schema";
import { zodResolver } from "@hookform/resolvers/zod";

type Step =
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

const ResetPassword = ({
  setCurrentStep,
}: {
  setCurrentStep?: React.Dispatch<React.SetStateAction<Step>>;
}) => {
  const { mutate, isPending } = useUpdatePassword();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<updatePasswordPayload>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      resetToken: ""
    },
  });

  const onsubmit = (body: updatePasswordPayload) => {
    const { password, resetToken } = body;
    mutate({ password, resetToken } as any, {
      onSuccess: () => {
        setCurrentStep?.("password-changed");
        localStorage.removeItem('token')
        localStorage.removeItem('email')
      },
    });
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setValue("resetToken", token);
    }
  }, []);

  return (
    <div className="w-[340px] max-w-full">
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold">Reset your password</h2>
        <form onSubmit={handleSubmit(onsubmit)} className="space-y-3">
          <FloatingInput
            id="new-password"
            label="Enter password"
            type="password"
            {...register('password')}
            error={errors.password?.message}
          />
          <FloatingInput
            id="re-password"
            label="Re enter password"
            type="password"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
          />

          <Button
            type="submit"
            disabled={isPending}
            className="w-full rounded-full"
          >
            {isPending ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
