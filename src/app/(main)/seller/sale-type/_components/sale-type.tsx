"use client";
import { Button } from "@/components/ui/button";
import { Banknote, Clock3 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  // setCurrentStep: React.Dispatch<React.SetStateAction<Step>>;
};

const SaleType = ({}: Props) => {
  const router = useRouter();

  const handleAuction = () => {
    localStorage.setItem("saleType", "auction");
    router.push("auction-details");
  };

  const handleFixedPrice = () => {
    localStorage.setItem("saleType", "fixed-price");
    router.push("fixed-price-details");
  };
  return (
    <div className="md:h-screen flex  justify-center items-center">
      <div>
        <h1 className="text-2xl font-semibold text-center py-8">
          Select Sale Type
        </h1>
        <div className="flex md:flex-row flex-col py-4 gap-6">
          <div className="w-[400px] flex flex-col justify-between items-center p-5 h-[400px] bg-[#0D1B2A] rounded-xl">
            <div className="flex flex-col items-center gap-4 text-white text-center">
              <Clock3 fill="white" stroke="#0D1B2A" size={50} />
              <h1 className="text-lg font-semibold">Auction</h1>
              <p className="">
                Fermentum consequat vitae a tellus blandit donec orci nunc. Amet
                velit sagittis ornare volutpat proin morbi dui. Eget nisl
                lobortis at.
              </p>
            </div>
            <Button
              onClick={handleAuction}
              // onClick={() => setCurrentStep("personal-detail-auction")}
              className="bg-white w-full text-black"
            >
              Select
            </Button>
          </div>
          <div className="w-[400px] flex flex-col justify-between items-center p-5 h-[400px] bg-[#415A77] rounded-xl">
            <div className="flex flex-col items-center gap-4 text-white text-center">
              <Banknote fill="white" stroke="#415A77" size={50} />
              <h1 className="text-lg font-semibold">Fixed Price</h1>
              <p className="">
                Fermentum consequat vitae a tellus blandit donec orci nunc. Amet
                velit sagittis ornare volutpat proin morbi dui. Eget nisl
                lobortis at.
              </p>
            </div>
            <Button
              // onClick={() => setCurrentStep("personal-detail-fixed")}
              onClick={handleFixedPrice}
              className="bg-white w-full text-black"
            >
              Select
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleType;
