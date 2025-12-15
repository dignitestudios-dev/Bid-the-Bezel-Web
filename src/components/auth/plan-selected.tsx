import React from "react";
import { Button } from "../ui/button";
import Card from "../icons/Card";

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

const PlanSelected = ({
  setCurrentStep,
}: {
  setCurrentStep?: React.Dispatch<React.SetStateAction<Step>>;
}) => {
  return (
    <div className="flex flex-col w-full space-y-6">
      <div className="bg-gray-100 w-full flex justify-center items-center">
        {/* Selected Plan Card */}
        <div className="p-6 rounded-2xl border-2 w-[340px] max-w-full border-gray-700 shadow-lg">
          <h3 className="text-2xl font-bold">Basic</h3>
          <div className="flex items-baseline gap-2 mt-4">
            <p className="text-4xl font-bold">$99</p>
            <p className="text-sm text-gray-600">1 watch / per Month</p>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="w-full bg-white p-4 flex-1">
        <div className="space-y-4 max-w-[520px] w-full mx-auto">
          <div className="flex items-center gap-3 p-4">
            <div className="h-full">
              <Card />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Credit Or Debit Card</h3>

              <p className="font-semibold">VISA</p>
            </div>
            <div className="ml-auto">
              <div className="w-5 h-5 rounded-full border-2 border-green-600 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-green-600"></div>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="border border-gray-300 rounded-xl">
            <input
              type="text"
              placeholder="Name on Card"
              className="w-full px-4 py-3 border-b border-gray-300 focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Card Number"
              className="w-full px-4 py-3 border-b border-gray-300 focus:outline-none focus:border-blue-500"
            />
            <div className="grid grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Expiration"
                className="w-full px-4 py-3 col-span-2 border-r border-gray-300 focus:outline-none focus:border-blue-500"
              />
              <input
                type="text"
                placeholder="CVV"
                className="w-full px-4 py-3 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Save Card Checkbox */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span className="text-sm text-gray-700">Save for later use</span>
          </label>

          {/* Next Button */}
          <Button
            onClick={() => setCurrentStep?.("subscription-confirmation")}
            className="w-full rounded-full bg-[#0f1b23] text-white py-3"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlanSelected;
