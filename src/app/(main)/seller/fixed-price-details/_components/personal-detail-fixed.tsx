"use client";

import React, { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumbs";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

import BankDetailForm from "./BankDetailForm";
import PersonalDetailForm from "./PersonalDetailForm";
import { useMe } from "@/features/auth/hooks";
import { useGetCard } from "@/features/billing/hook";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useAppSelector } from "@/lib/hooks";
import WatchDetailForm from "./watch-detail-form";
const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

if (!stripeKey) {
  throw new Error("Missing Stripe key");
}

const stripePromise = loadStripe(stripeKey);

type Props = {
  // setCurrentStep: React.Dispatch<React.SetStateAction<Step>>;
};

const PersonalDetailFixed = ({ }: Props) => {
  const router = useRouter()

  const [bankEditModa, setBankEditMode] = useState(false)
  const [personalEditMode, setPersonalEditMode] = useState(false)
  const searchParams = useSearchParams();
  const { data: userData } = useMe()
  const { data: cardData } = useGetCard()
  const watchId = useAppSelector(state => state.addProduct.watchId)



  const step = (searchParams.get("step") as StepType) || "personal-detail";

  const stepsOrder: StepType[] = [
    "personal-detail",
    "watch-detail",
    "bank-detail",
  ];


  const goToStep = (stepName: StepType) => {
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
  const handleSubmit = () => {
    router.push(`/seller/authenticate/${watchId}`)
  }


  return (
    <div className="py-12 ">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <button
                onClick={prevStep}
                className="flex items-center gap-2"
              >
                <ArrowLeft size={18} />
              </button>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink>Home</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage className="font-semibold">
              Sell Your Watch
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-6 max-w-4xl mx-auto flex justify-between items-center">

        <h2 className="font-semibold">
          {step === "personal-detail" && "Personal details"}
          {step === "watch-detail" && "Watch details"}
          {step === "bank-detail" && "Bank details"}
        </h2>

        <span className="text-sm text-gray-500">Step {currentIndex + 1}/3</span>
      </div>
      <div className="flex max-w-4xl mx-auto justify-between gap-2">
        {stepsOrder.map((_, index) => (
          <div key={index} className="w-full h-2 bg-gray-200 rounded mb-8">
            <div
              className={cn(
                "h-2 rounded transition-all duration-500",
                index === currentIndex
                  ? "bg-[#415A77]"
                  : index < currentIndex
                    ? "bg-green-500"
                    : "bg-gray-200"
              )}
            />
          </div>
        ))}
      </div>

      {
        step == "personal-detail" && (
          <PersonalDetailForm personalEditMode={personalEditMode} setPersonalEditMode={setPersonalEditMode} userData={userData?.data} onNext={nextStep} />
        )
      }
      {
        step == "watch-detail" && (
          <WatchDetailForm onNext={nextStep} />
        )
      }
      {
        step == "bank-detail" && (
          <Elements stripe={stripePromise}>
            <BankDetailForm bankEditModa={bankEditModa} setBankEditMode={setBankEditMode} cardData={cardData} onSubmit={handleSubmit} />
          </Elements>
        )
      }
    </div >
  );
};

export default PersonalDetailFixed;
