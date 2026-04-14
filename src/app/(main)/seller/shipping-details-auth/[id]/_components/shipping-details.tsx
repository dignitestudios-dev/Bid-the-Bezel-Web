"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { use, useState } from "react";
import ShippingForm from "./shipping-form";
import { useRouter, useSearchParams } from "next/navigation";
import { ShippingPayload } from "@/features/products/schema";
import { useParams } from "next/navigation";
import PaymentDetail from "./payment-detal";

type Props = {
  // setCurrentStep: React.Dispatch<React.SetStateAction<Step>>;
};

const ShippingDetailAuth = ({ }: Props) => {
  const { id } = useParams()
  const searchParams = useSearchParams();
  const router = useRouter();
  const step = (searchParams.get("step") as StepTypeAuthenticate) || "shipping-detail";

  const [shippingData, setShippingData] = useState<ShippingPayload>({
    courier: "",
    trackingNumber: "",
    trackingLink: "",
    images: FileList
  });

  const stepsOrder: StepTypeAuthenticate[] = [
    "shipping-detail",
    "payment",
  ];


  const goToStep = (stepName: StepTypeAuthenticate) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("step", stepName);
    router.push(`?${params.toString()}`);
  };
  const currentIndex = stepsOrder.indexOf(step);


  const nextStep = () => {
    if (currentIndex < stepsOrder.length - 1) {
      goToStep(stepsOrder[currentIndex + 1]);
    }
  };

  const prevStep = () => {
    if (currentIndex > 0) {
      goToStep(stepsOrder[currentIndex - 1]);
    } else {
      // router.push("sale-type");
    }
  };

  const [steps, setSteps] = useState(1);
  const [billingAddressType, setBillingAddressType] = useState<
    "same" | "different"
  >("same");


  return (
    <div className="py-24">
      <div>
        <div className="mb-6 max-w-4xl mx-auto flex justify-between items-center">
          <h2 className="font-semibold">
            {steps == 1 && "Shipping details"}
            {steps == 2 && "Payments"}
          </h2>
          <span className="text-sm text-gray-500">Step {steps}/2</span>
        </div>
        <div className="flex max-w-4xl mx-auto justify-between gap-2">
          {[1, 2].map((stepNum) => (
            <div key={stepNum} className="w-full h-1 bg-gray-200 rounded mb-8">
              <div
                className={cn(
                  "h-1 rounded transition-all duration-500",
                  steps === stepNum
                    ? "bg-slate-800"
                    : steps > stepNum
                      ? "bg-[#14A752]"
                      : "bg-gray-200"
                )}
              />
            </div>
          ))}
        </div>

        {step == 'shipping-detail' && (
          <ShippingForm
            id={id}
            setStep={nextStep}
            defaultValues={shippingData}
            setShippingData={setShippingData}
          />
        )}
        {step == 'payment' && (
          <PaymentDetail />
        )}
      </div>
    </div>
  );
};

export default ShippingDetailAuth;
