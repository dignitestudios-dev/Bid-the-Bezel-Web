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

const Username = ({
  setCurrentStep,
}: {
  setCurrentStep?: React.Dispatch<React.SetStateAction<Step>>;
}) => {
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
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold">Enter your username</h2>
        <p className="text-sm text-gray-600">
          This username will appear in bid list when you make a bid on any
          product.
        </p>

        <FloatingInput id="username" label="Username" type="text" />

        <div className="flex items-center gap-2 text-sm text-green-600">
          <span className="rounded-full bg-green-50 p-1">✓</span>
          <span>This username is available</span>
        </div>

        <Button
          onClick={() => setCurrentStep?.("purchase-plan")}
          className="w-full rounded-full"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Username;
