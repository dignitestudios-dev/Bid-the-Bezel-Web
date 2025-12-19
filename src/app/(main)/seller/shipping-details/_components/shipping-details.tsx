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
import { Check, CreditCard, Link2, Upload, Wallet, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

type Props = {
  // setCurrentStep: React.Dispatch<React.SetStateAction<Step>>;
};

const ShippingDetail = ({ }: Props) => {
  const [steps, setSteps] = useState(1);
  const [selectedCard, setSelectedCard] = useState<string>("visa");

  const [billingAddressType, setBillingAddressType] = useState<
    "same" | "different"
  >("same");

  const [selectedCourier, setSelectedCourier] = useState("");
  const [referenceId, setReferenceId] = useState("");
  const [trackingLink, setTrackingLink] = useState("");
  const [uploadedFile, setUploadedFile] = useState<null | Blob>();

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
    <div className="py-12 bg-[#F7F7F7]">
      <div>

          <div className=" p-4 flex items-center justify-center">
            <div className="bg-white max-w-4xl w-full rounded-lg shadow-sm p-6">
              {/* Our Info Section */}
              <div className="bg-[#F7F7F7] rounded-lg border p-4 mb-6">
                <h3 className="text-xl font-semibold mb-3">Buyer Info</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="mb-1 font-semibold">
                      Shipping Address
                    </p>
                    <p className="text-sm">
                      123 Magellan Ave, Dillon, CO 80435
                    </p>
                  </div>
                  <div>
                    <p className=" font-semibold mb-1">Email</p>
                    <p className="text-sm">Info@bidthebezel</p>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-semibold mb-6">Shipping Details</h2>

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
             <Link href={"/seller/order-completed"}  className="w-full">
                <Button
                  onClick={() => setSteps(2)}
                  className="flex-1 py-6 bg-slate-900 text-base text-white rounded-lg  font-medium hover:bg-slate-800 w-full  transition-colors flex items-center justify-center gap-2"
                >
                  Complete Order
         
                </Button>
              </Link></div>
            </div>
          </div>
       
       
      </div>
    </div>
  );
};

export default ShippingDetail;
