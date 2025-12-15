import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

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

const SubscriptionConfirmation = ({
  setCurrentStep,
  onClose,
}: {
  setCurrentStep?: React.Dispatch<React.SetStateAction<Step>>;
  onClose?: () => void;
}) => {
  const handleGoHome = () => {
    setCurrentStep?.("login");
    onClose?.();
  };

  return (
    <div className="flex justify-center items-center h-full w-full py-12 bg-[url('/images/shape-subscription-confirmation.png')] bg-contain bg-center bg-no-repeat">
      <div className="w-[340px] max-w-full text-center space-y-12">
        {/* Watch Icon */}
        <Image
          width={200}
          height={200}
          src="/images/subscribe-confirm.png"
          alt=""
          className="mx-auto"
        />

        {/* Text Content */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold">Subscribed to Basic Plan</h2>
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2 text-gray-700">
              <span className="text-green-600">✓</span>
              <span className="text-sm">Includes a 3-days free trial</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-700">
              <span className="text-green-600">✓</span>
              <span className="text-sm">Can sell 1 watch per month</span>
            </div>
          </div>
        </div>

        {/* Go To Home Button */}
        <Button
          onClick={handleGoHome}
          className="w-full rounded-full bg-[#0f1b23] text-white py-3"
        >
          Go To Home
        </Button>
      </div>
    </div>
  );
};

export default SubscriptionConfirmation;
