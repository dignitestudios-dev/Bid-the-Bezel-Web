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

const PurchasePlan = ({
  setCurrentStep,
  onSkip,
}: {
  setCurrentStep?: React.Dispatch<React.SetStateAction<Step>>;
  onSkip?: () => void;
}) => {
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
          <div className="p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition">
            <h3 className="text-2xl font-bold">Basic</h3>
            <div className="flex items-center gap-3 mt-4">
              <p className="text-3xl font-bold">$99</p>
              <p className="text-sm text-gray-600">1 watch / per Month</p>
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
                <span>Can sell 1 watch per month</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition">
            <h3 className="text-2xl font-bold">Gold</h3>

            <div className="flex items-center gap-3 mt-4">
              <p className="text-3xl font-bold">$149</p>
              <p className="text-sm text-gray-600">3 watch / per Month</p>
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
                <span>Can sell upto 3 watches per month</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition relative">
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
        </div>
      </div>
    </div>
  );
};

export default PurchasePlan;
