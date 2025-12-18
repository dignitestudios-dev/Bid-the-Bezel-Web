import OrderCompletedBox from "@/components/icons/OrderCompletedBox";
import Receipt from "@/components/icons/Receipt";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const OrderCompletedBuyer = (props: Props) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-2xl px-6 py-12 flex flex-col items-center">
        <OrderCompletedBox />

        <h1 className="mt-8 text-3xl font-semibold">Order Confirmed</h1>
        <p className="mt-2 text-sm text-gray-600">
          Authenticity Check Underway
        </p>

        <button className="mt-8 flex items-center gap-3 font-medium">
          <Receipt />
          <span>Download Receipt</span>
        </button>

        <Link href="/review" className="mt-5 w-full max-w-xl block text-center">
          <span className="inline-block w-full bg-[#0E2430] hover:bg-[#0b1a22] text-white rounded-xl py-4">
            Leave a Review
          </span>
        </Link>
      </div>
    </div>
  );
};

export default OrderCompletedBuyer;
