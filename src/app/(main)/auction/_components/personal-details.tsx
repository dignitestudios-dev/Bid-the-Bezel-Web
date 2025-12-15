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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

type Props = {
  setCurrentStep: React.Dispatch<React.SetStateAction<Step>>;
};

const PersonalDetail = ({ setCurrentStep }: Props) => {
  const [auctionDays, setAuctionDays] = useState(3);
  const [steps, setSteps] = useState(1);

  return (
    <div className="py-12 ">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <button
                onClick={() => {
                  if (Number(steps) > 1) {
                    setSteps((prev) => prev - 1);
                  } else {
                    setCurrentStep("sale-type");
                  }
                }}
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
            {steps == 1 && "Personal details"}
            {steps == 2 && "Watch details"}
            {steps == 3 && "Bank details"}
            </h2>
        <span className="text-sm text-gray-500">Step {steps}/3</span>
      </div>
      <div className="flex max-w-4xl mx-auto justify-between gap-2">
        {[1, 2, 3].map((stepNum) => (
          <div key={stepNum} className="w-full h-1 bg-gray-200 rounded mb-8">
            <div
              className={cn(
                "h-1 rounded transition-all duration-500",
                steps === stepNum
                  ? "bg-slate-800"
                  : steps > stepNum
                  ? "bg-green-500"
                  : "bg-gray-200"
              )}
            />
          </div>
        ))}
      </div>

      {steps == 1 && (
        <div className="bg-white max-w-4xl mx-auto border rounded-xl p-8 shadow-sm">
          <h3 className="font-semibold mb-6">Personal details</h3>

          <div className="mb-6">
            <p className="text-sm font-medium mb-2">Selection Auction Days</p>
            <div className="flex gap-3">
              {[3, 5, 7].map((day) => (
                <button
                  key={day}
                  onClick={() => setAuctionDays(day)}
                  className={`px-4 py-2 rounded-full border text-sm ${
                    auctionDays === day
                      ? "bg-slate-800 text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  {day} Days
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm mb-1 block">First Name</label>
              <Input placeholder="Name" />
            </div>

            <div>
              <label className="text-sm mb-1 block">Last Name</label>
              <Input placeholder="Name" />
            </div>
          </div>

          <div className="mb-4">
            <label className="text-sm mb-1 block">Email Address</label>
            <Input placeholder="Email" />
          </div>

          <div className="mb-6">
            <label className="text-sm mb-1 block">Phone Number</label>
            <div className="flex gap-2">
              <div className="flex items-center px-3 border rounded-md text-sm bg-gray-50">
                🇺🇸 +1
              </div>
              <Input placeholder="Phone number" />
            </div>
          </div>

          <Button
            className="w-full bg-slate-900 hover:bg-slate-800"
            onClick={() => setSteps(2)}
          >
            Next
          </Button>
        </div>
      )}
      {steps == 2 && (
        <div className="bg-white border max-w-4xl mx-auto rounded-xl p-8 shadow-sm">
          <h3 className="font-semibold mb-6">Watch Details</h3>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm mb-1 block">Watch Brand</label>
              <Input placeholder="Name" />
            </div>

            <div>
              <label className="text-sm mb-1 block">Model Reference</label>
              <Input placeholder="Name" />
            </div>
          </div>

          <div className="mb-4">
            <label className="text-sm mb-1 block">Starting Price</label>
            <Input placeholder="Price here" />
          </div>

          <div className="mb-6">
            <label className="text-sm mb-1 block">Contents/Notes</label>
            <textarea
              className="w-full border rounded-md px-3 py-2 text-sm min-h-[80px]"
              placeholder="Tell the user about what he/she will be getting in details"
            />
          </div>

          <div className="mb-6">
            <label className="text-sm mb-1 block">Photos</label>
            <div className="border-2 border-dashed rounded-lg p-8 text-center bg-gray-50">
              <div className="flex flex-col items-center">
                <div className="mb-2">📤</div>
                <p className="text-sm font-medium mb-1">Click to upload</p>
                <p className="text-xs text-gray-500">
                  Only Jpg, Png files (upto 5mb)
                </p>
              </div>
              <p className="text-xs text-gray-400 mt-4 text-right">1/10</p>
            </div>

            <div className="flex items-center gap-2 mt-3 p-2 bg-gray-50 rounded-md">
              <div className="w-10 h-10 bg-gray-200 rounded flex-shrink-0"></div>
              <span className="text-sm flex-1">WatchImage.png (1.5mb)</span>
              <button className="text-red-500 text-sm">🗑️</button>
            </div>
          </div>

          <Button
            className="w-full bg-slate-900 hover:bg-slate-800"
            onClick={() => setSteps(3)}
          >
            Next
          </Button>
        </div>
      )}
      {steps == 3 && (
       <div className="bg-white max-w-4xl mx-auto border rounded-xl p-8 shadow-sm">
          <h3 className="font-semibold text-lg mb-6">Bank Details</h3>

          <div className="mb-4">
            <label className="text-sm font-medium mb-2 block">Select Bank</label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bank1">Bank of America</SelectItem>
                <SelectItem value="bank2">Chase Bank</SelectItem>
                <SelectItem value="bank3">Wells Fargo</SelectItem>
                <SelectItem value="bank4">Citibank</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium mb-2 block">Account Holder Name</label>
            <Input placeholder="Name here" className="text-sm" />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Branch Code</label>
              <Input placeholder="Branch code here" className="text-sm" />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Account Number</label>
              <Input placeholder="Account number here" className="text-sm" />
            </div>
          </div>

          <p className="text-xs text-gray-600 mb-6">
            By Adding this information you agree to our <a href="#" className="text-blue-600 underline">T&Cs</a> regarding topping up your bank account.
          </p>

          <Button
            className="w-full bg-slate-900 hover:bg-slate-800 py-6"
            onClick={() => setCurrentStep("authenticate")}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default PersonalDetail;
