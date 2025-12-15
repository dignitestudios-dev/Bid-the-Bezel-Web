"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Check, CreditCard, Link2, Upload, X } from "lucide-react";
import React, { useState } from "react";

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

const ShippingDetail = ({ setCurrentStep }: Props) => {
  const [steps, setSteps] = useState(1);
  const [useShippingAddress, setUseShippingAddress] = useState(true);
  const [selectedCourier, setSelectedCourier] = useState("");
  const [referenceId, setReferenceId] = useState("");
  const [trackingLink, setTrackingLink] = useState("");
  const [uploadedFile, setUploadedFile] = useState< null | Blob>();

  const handleFileUpload = (e: any) => {
    const file = e.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      setUploadedFile(file);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
  };
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

        {steps == 1 && (
          <div className=" p-4 flex items-center justify-center">
            <div className="bg-white max-w-4xl w-full rounded-lg shadow-sm p-6">
              {/* Our Info Section */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="text-sm font-semibold mb-3">Our Info</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">
                      Shipping Address
                    </p>
                    <p className="text-sm">
                      123 Magellan Ave, Dillon, CO 80435
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Email</p>
                    <p className="text-sm">Info@bidthebezel</p>
                  </div>
                </div>
              </div>

              <h2 className="text-lg font-semibold mb-6">Shipping Details</h2>

              <div className="mb-4">
                <label className="text-sm font-medium mb-2 block">
                  Select Courier
                </label>
                <select
                  value={selectedCourier}
                  onChange={(e) => setSelectedCourier(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 0.75rem center",
                    backgroundSize: "1.25rem",
                    paddingRight: "2.5rem",
                  }}
                >
                  <option value="">Select</option>
                  <option value="fedex">FedEx</option>
                  <option value="ups">UPS</option>
                  <option value="usps">USPS</option>
                  <option value="dhl">DHL</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="text-sm font-medium mb-2 block">
                  Reference ID
                </label>
                <input
                  type="text"
                  value={referenceId}
                  onChange={(e) => setReferenceId(e.target.value)}
                  placeholder="ID here"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="text-sm font-medium mb-2 block">
                  Tracking Number Link
                </label>
                <div className="relative">
                  <Link2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={trackingLink}
                    onChange={(e) => setTrackingLink(e.target.value)}
                    placeholder="Tracking link here"
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="text-sm font-medium mb-2 block">
                  Photos of proof{" "}
                  <span className="text-gray-400 font-normal">(Optional)</span>
                </label>

                <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center relative">
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Upload className="w-5 h-5 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm font-medium mb-1">Click to upload</p>
                  <p className="text-xs text-gray-500">
                    Only Jpg, Png files upto 5mb
                  </p>
                  <p className="text-xs text-gray-400 absolute top-3 right-3">
                    1/20
                  </p>
                </div>

                {uploadedFile && (
                  <div className="mt-3 flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                        <img
                          src={URL.createObjectURL(uploadedFile)}
                          alt="preview"
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div>
                        {/* <p className="text-sm font-medium">
                          {uploadedFile?.name}
                        </p> */}
                        <p className="text-xs text-gray-500">
                          ({(uploadedFile.size / 1024 / 1024).toFixed(1)}mb)
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={removeFile}
                      className="w-6 h-6 bg-red-500 text-white rounded flex items-center justify-center hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button className="flex-1 py-3 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                  Save as draft
                </button>
                <Button onClick={()=>setSteps(2)} className="flex-1 py-3 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                  Payment
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        )}
        {steps == 2 && (
         <div className="min-h-screen  p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 shadow-sm ">
          <div className="space-y-6">
            <div className="rounded-lg p-6  ">
              <h2 className="text-lg font-semibold mb-4">Payment</h2>
              
              <div className="flex items-center gap-3 p-4 border rounded-lg mb-4">
                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">Visa</div>
                  <div className="text-sm text-gray-500">•••• •••• •••• 5488</div>
                </div>
                <div className="w-5 h-5 rounded-full border-2 border-emerald-500 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></div>
                </div>
              </div>

              <button className="text-emerald-600 text-sm font-medium">
                + Add other
              </button>
  <div className=" ">
              <h2 className="text-lg font-semibold mb-4">Billing Address</h2>
              
              <label className="flex items-center gap-3 cursor-pointer">
                <div className="relative">
                  <input
                    type="radio"
                    checked={useShippingAddress}
                    onChange={() => setUseShippingAddress(true)}
                    className="w-5 h-5 appearance-none border-2 border-gray-300 rounded-full checked:border-emerald-500"
                  />
                  {useShippingAddress && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></div>
                    </div>
                  )}
                </div>
                <span className="text-sm font-medium">Same as shipping address</span>
              </label>

              <button 
                className="text-sm text-gray-600 mt-3 hover:text-gray-900"
                onClick={() => setUseShippingAddress(false)}
              >
                Use a different billing address
              </button>

              <Button onClick={()=>setCurrentStep("payment-done")} className="w-full bg-slate-900 text-white rounded-lg py-3 mt-6 font-medium hover:bg-slate-800 transition-colors">
                Pay Now
              </Button>
            </div>
            </div>
          
          </div>

          <div className="bg-[#E3E3E3]">
            <div className=" rounded-lg p-6  sticky top-8">
              <div className="flex items-start gap-3 mb-6">
                <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold">Authentication Fee</div>
                  <div className="text-2xl font-bold mt-1">$800.00</div>
                </div>
              </div>

              <div className="space-y-3 py-4 border-t border-b">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Fees</span>
                  <span className="font-medium">$800.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Other Fees</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">$100.00</span>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4 pt-2">
                <span className="font-semibold">TOTAL</span>
                <span className="text-xl font-bold">USD $3,876.69</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
        )}
      </div>
    </div>
  );
};

export default ShippingDetail;
