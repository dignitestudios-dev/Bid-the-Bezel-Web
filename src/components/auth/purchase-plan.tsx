"use client"
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useBuySubscription, useSubscription } from "@/features/subscription/hook";
import { Loader2 } from "lucide-react";

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

const PurchasePlan = ({
  setStep,
  onSkip,
}: {
  setStep?: (step: Step) => void;
  onSkip?: () => void;
}) => {
  const { data, isLoading } = useSubscription()
  const { mutate: buySubscription } = useBuySubscription()
  const [loadingPriceId, setLoadingPriceId] = useState<string | null>(null);

  const handleBuy = (planId: string) => {
    setLoadingPriceId(planId);

    const cleanUrl = `${window.location.origin}${window.location.pathname}?plan=success`;
    buySubscription(
      { planId, url: cleanUrl },
      {
        onSettled: () => setLoadingPriceId(null),
      }
    );
  };
  return (
    <div className="w-full">
      <div className="w-[340px] max-w-full mx-auto">
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm font-medium text-gray-600">Step</span>
          <span className="text-sm font-medium text-gray-600">3/3</span>
        </div>
        <div className="flex gap-2 mb-4">
          <div className="flex-1 h-1 bg-green-500 rounded-full"></div>
          <div className="flex-1 h-1 bg-green-500 rounded-full"></div>
          <div className="flex-1 h-1 bg-yellow-400 rounded-full"></div>
        </div>
      </div>

      <div className="w-full flex justify-center mb-4">
        <button
          onClick={onSkip}
          className="text-sm font-medium text-gray-600 cursor-pointer hover:text-gray-900"
        >
          Skip for now
        </button>
      </div>

      <div className="space-y-4 px-8 pb-6">
        <div className="grid grid-cols-2 gap-4">
          {data?.data?.map((subs: any, index: number) => {
            const isExecutive = subs?.name?.toLowerCase() === "executive";
            return (
              <div className={`p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition ${isExecutive ? "relative" : ""}`}>
                {isExecutive && (
                  <div className="absolute top-4 right-4 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold capitalize">{subs?.name}</h3>
                <div className="flex items-center gap-3 mt-4">
                  <p className="text-3xl font-bold">${subs?.metadata?.amount}</p>
                  <p className="text-sm text-gray-600 capitalize">  {subs?.metadata?.watches || subs?.metadata?.bids} watch / per {subs?.metadata?.interval}</p>
                </div>
                <Button
                  disabled={loadingPriceId === subs?._id}
                  onClick={() => handleBuy(subs?._id)}
                  className="mt-4 w-full rounded-full bg-[#0f1b23] text-white"
                >
                  {loadingPriceId === subs?._id ? (
                    <Loader2 className="animate-spin mx-auto" />
                  ) : (
                    "Select Plan"
                  )}
                </Button>
                {subs?.description?.map((des: any) => (
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="text-green-600">✓</span>
                      <span>{des}</span>
                    </div>
                  </div>
                ))}
              </div>

            )
          })}
        </div>

        {/* <div className="p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition relative">
          <div className="absolute top-4 right-4 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            Popular
          </div>
          <h3 className="text-2xl font-bold">Executive</h3>

          <div className="flex items-center gap-3 mt-4">
            <p className="text-3xl font-bold">$199</p>
            <p className="text-sm text-gray-600">
              Unlimited watches / per Month
            </p>
          </div>

          <Button
            onClick={() => setCurrentStep?.("plan-selected")}
            className="mt-4 w-full rounded-full bg-[#0f1b23] text-white"
          >
            Select Plan
          </Button>
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span className="text-green-600">✓</span>
              <span>Includes a 3-days free trial</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span className="text-green-600">✓</span>
              <span>Can sell unlimited watches per month</span>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition relative">
          <div className="w-full grid grid-cols-2 ">
            <div>
              <h3 className="text-2xl font-bold">Buy Package</h3>

              <div className="flex items-center gap-3 mt-4">
                <p className="text-3xl font-bold">$99</p>
                <p className="text-sm text-gray-600">1000 Bids / per Month</p>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span className="text-green-600">✓</span>
                <span>1000 Bids</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span className="text-green-600">✓</span>
                <span>Other Options</span>
              </div>
            </div>
          </div>

          <Button
            onClick={() => setCurrentStep?.("plan-selected")}
            className="mt-4 w-full rounded-full bg-[#0f1b23] text-white"
          >
            Select Plan
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export default PurchasePlan;
