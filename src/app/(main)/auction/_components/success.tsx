import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

type Step =
  | "login"
  | "register"
  | "otp-register"
  | "username"
  | "purchase-plan"
  | "plan-selected"
  | "subscription-confirmation"
  | "sale-type"
  | "personal-detail"
  | "authenticate"
  | "shipping"
  | "payment-done"
| "watch-listed"

const Success = ({
  setCurrentStep,
}: {
  setCurrentStep: React.Dispatch<React.SetStateAction<Step>>;
}) => {
  return (
    <div className="flex justify-center items-center  h-screen w-full py-28 bg-[url('/images/shape-subscription-confirmation.png')] bg-contain bg-center bg-no-repeat">
      <div className="w-[340px] max-w-full text-center space-y-12">
        <Image
          width={200}
          height={200}
          src="/images/subscribe-confirm.png"
          alt=""
          className="mx-auto"
        />
        <div className="">
          <h1 className="text-2xl font-semibold">Basic Plan</h1>
          <p>Plan Bought Successfully</p>
        </div>
        <Button
          onClick={() => setCurrentStep("sale-type")}
          className="w-full rounded-full bg-[#0f1b23] text-white py-3"
        >
          Start Selling
        </Button>
      </div>
    </div>
  );
};

export default Success;
