import React from "react";
import { FloatingInput } from "../ui/floating-input";
import { Button } from "../ui/button";

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
  return (
    <div className="w-[340px] max-w-full">
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold">
          Enter your email and we'll send a link to reset your password
        </h2>

        <FloatingInput id="email-forgot" label="Email" type="email" />

        <Button
          onClick={() => setCurrentStep?.("otp")}
          className="w-full rounded-full"
        >
          Next
        </Button>

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
