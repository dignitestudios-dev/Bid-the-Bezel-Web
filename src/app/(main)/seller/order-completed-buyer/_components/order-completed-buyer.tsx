import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const OrderCompletedBuyer = (props: Props) => {
  return (
    <div className="flex justify-center min-h-screen items-center">
      <div className="w-[50%] flex flex-col items-center">
        <Image
          src={"/images/surprise.png"}
          alt="surpirce"
          width={200}
          height={200}
        />
        <div className="py-5 text-center">
          <h1 className="text-3xl font-semibold">Order done</h1>
          <p>
            Your new timepiece will arrive to buyer within 3-5 business days.
          </p>
        </div>
        <div className="rounded-xl p-4 bg-[#F7F7F7] w-full max-w-xl">
          <h3 className="text-xl font-semibold  mb-3">Payment Info</h3>

          <p className="text-xs text-gray-500 mb-4">
            Payment will arrive in your bank account once the buyer receives the
            watch.
          </p>

          <div className="space-y-3 ">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Watch Payment</span>
              <span className="font-medium ">$3500</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-700">3% Platform Fees</span>
              <span className="font-medium ">$105</span>
            </div>

            <div className="border-t border-gray-300 pt-3 flex items-center justify-between">
              <span className="font-semibold ">Total</span>
              <span className="font-semibold ">$3395</span>
            </div>
          </div>
        </div>
        <Link href={"/"} className="w-full max-w-xl my-5">
          <Button className="w-full ">Go Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default OrderCompletedBuyer;
