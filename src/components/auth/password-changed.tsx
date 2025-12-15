import React from "react";
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

const PasswordChanged = ({
  setCurrentStep,
}: {
  setCurrentStep?: React.Dispatch<React.SetStateAction<Step>>;
}) => {
  return (
    <div className="flex justify-center items-center min-h-screen w-full py-12">
      <div className="w-[340px] max-w-full text-center">
        <h2 className="text-2xl font-semibold">Password Changed.</h2>
        <p className="text-gray-600 mt-3">
          Your password has been successfully changed.
        </p>

        <div className="mt-8">
          <Button
            onClick={() => setCurrentStep?.("login")}
            className="w-full rounded-full"
          >
            Back to Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PasswordChanged;
