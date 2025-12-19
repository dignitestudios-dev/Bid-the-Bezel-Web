"use client";
import { Button } from "@/components/ui/button";
import { ReceiptText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  // setCurrentStep: React.Dispatch<React.SetStateAction<Step>>;
};

const PaymentDone = ({}: Props) => {
  const router = useRouter();
  const handleViewListing = () => {
    const saleType = localStorage.getItem("saleType");
    console.log("saleType: ", saleType);
    saleType === "auction"
      ? router.push("/auction/auc-004")
      : router.push("/fixed-price/fix-001");
  };
  return (
    <div className="h-screen flex gap-2 text-center flex-col justify-center items-center">
      <div className="md:w-[30%] flex flex-col gap-4 items-center justify-center">
        <Image
          src={"/images/auction.png"}
          alt="auction"
          width={100}
          height={100}
        />
        <div className="border flex justify-between items-center py-1 px-2 rounded-xl w-full">
          <h1 className=" font-semibold">Watch Reference ID</h1>{" "}
          <h3 className="">#76622</h3>
        </div>
        <div>
          <h1 className="text-2xl font-semibold">
            Authentication Payment Done
          </h1>
          <p className="">
            Your new timepiece will arrive to us within 3-5 business days.
          </p>
        </div>
        <div className="flex items-center gap-2 ">
          <ReceiptText size={10} /> Download Reciept
        </div>

        <Button className="w-full" onClick={handleViewListing}>
          Your Listing
        </Button>
      </div>
    </div>
  );
};

export default PaymentDone;
