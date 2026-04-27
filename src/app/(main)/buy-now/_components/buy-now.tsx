"use client";
import React, { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useParams } from "next/navigation";
import { useMe } from "@/features/auth/hooks";
import DeliveryForm from "./delivery-form";
import CardsList from "./card-list";
import Image from "next/image";


const BuyNow = ({ productData }: { productData: any }) => {
  const { data: userData } = useMe()
  const { id } = useParams();

  const [authenticate, setAuthenticate] = useState(false);

  const basePrice = productData?.data?.price;
  const authFee = 250;

  const total = basePrice + (authenticate ? authFee : 0);



  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-full lg:w-[55%] p-8 lg:p-12 bg-white">
        <div className="max-w-xl mx-auto">
          {productData?.data?.authentication?.status !== "approved" && (
            <div className="flex justify-between items-center">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  <ShieldCheck fill="#14A752" stroke="white" size={50} />
                </div>
                <div>
                  <p className="text-lg font-medium ">
                    Authenticate this watch
                  </p>
                  <p className="text-xs  mt-1">
                    An additional of $200 will be charged to authenticate this
                    watch
                  </p>
                </div>
              </div>
              <Switch checked={authenticate} onCheckedChange={setAuthenticate} />
            </div>
          )}

          {/* Contact Section */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Contact</h2>
            <input
              type="email"
              value={userData?.data?.email || ""}
              disabled
              className="w-full px-4 py-3 border border-gray-300 rounded-lg 
               bg-gray-100 text-gray-600 cursor-not-allowed 
               focus:outline-none"
            />
          </div>

          {/* Payment Section */}
          <CardsList />
          {/* Delivery Section */}
          <DeliveryForm
            authenticate={authenticate}
            productId={id as string}
            basePrice={basePrice}
            total={total}
          />

        </div>
      </div>

      <div className="hidden lg:block w-[45%]  bg-gray-50 p-12">
        <div className="">
          <div className="mb-6 flex justify-between bg-white px-2 py-4 border border-border rounded-xl">
            <h3 className=" font-semibold text-lg">Watch reference ID</h3>
            <p className="text-gray-600">#{productData?.data?.referenceId}</p>
          </div>

          {/* Product */}
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
            <div className="relative">
              <Image
                src={productData?.data?.images?.[0]?.location}
                alt="Watch"
                width={80}
                height={80}
                className="rounded-lg object-cover"
              />
            </div>
            <p className="flex-1 font-medium text-lg">
              {productData?.data?.brandName}
            </p>
            <div className=" font-medium">${productData?.data?.price}</div>
          </div>

          {/* Price Breakdown */}
          <div className="space-y-3 mb-6">
            <div className="flex justify-between ">
              <span className="text-gray-600">Total Amount</span>
              <span className="font-medium">${basePrice}</span>
            </div>
            {authenticate && (
              <div className="flex justify-between ">
                <span className="text-gray-600">Authentication Fee</span>
                <span className="font-medium">$250</span>
              </div>
            )}
            {/* <div className="flex justify-between ">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium">$120.50</span>
            </div> */}
            <div className="flex justify-between text-lg font-semibold pt-3 border-t border-gray-200">
              <span>TOTAL</span>
              <span>
                {" "}
                <span className="font-light">USD</span> ${total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyNow;
