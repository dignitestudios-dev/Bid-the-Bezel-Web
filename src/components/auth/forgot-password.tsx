import React from "react";
import { FloatingInput } from "../ui/floating-input";
import { Button } from "../ui/button";
import { useForgotPassword } from "@/features/auth/hooks";
import { useAppDispatch } from "@/lib/hooks";
import { ForgotPasswordPayload, forgotPasswordSchema } from "@/features/auth/Schema";
import { useForm } from "react-hook-form";
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

const ForgotPassword = ({
  setCurrentStep,
}: {
  setCurrentStep?: React.Dispatch<React.SetStateAction<Step>>;
}) => {
  const { mutate, isPending } = useForgotPassword();



  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordPayload>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (body: ForgotPasswordPayload) => {
    mutate(body, {
      onSuccess: () => {
        localStorage.setItem('email', body.email)
        setCurrentStep?.('otp')
      },
      onError: (err) => {
        console.error(err);
      },
    });
  };

  return (
    <div className="w-[340px] max-w-full">
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold">
          Enter your email and we'll send a link to reset your password
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <FloatingInput id="email-forgot" label="Email" {...register("email")} error={errors.email?.message} type="email" />

          <Button
            type="submit"
            disabled={isPending}
            className="w-full rounded-full"
          >
            {isPending ? "Sending..." : "Next"}
          </Button>
        </form>

        <p className="text-center mt-4">
          Remember your password?{" "}
          <button
            onClick={() => setCurrentStep?.("login")}
            className="font-semibold cursor-pointer"
          >
            Back to login
          </button>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
