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

const ResetPassword = ({
  setCurrentStep,
}: {
  setCurrentStep?: React.Dispatch<React.SetStateAction<Step>>;
}) => {
  return (
    <div className="w-[340px] max-w-full">
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold">Reset your password</h2>

        <FloatingInput
          id="new-password"
          label="Enter password"
          type="password"
        />
        <FloatingInput
          id="re-password"
          label="Re enter password"
          type="password"
        />

        <Button
          onClick={() => setCurrentStep?.("password-changed")}
          className="w-full rounded-full"
        >
          Reset Password
        </Button>
      </div>
    </div>
  );
};

export default ResetPassword;
