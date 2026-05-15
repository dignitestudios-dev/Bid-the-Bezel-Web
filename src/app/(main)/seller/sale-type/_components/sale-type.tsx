"use client";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/lib/hooks";
import { Banknote, Clock3 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ConnectBankModal from "./connect-bank-modal";
import { useMe } from "@/features/auth/hooks";

type Props = {
  // setCurrentStep: React.Dispatch<React.SetStateAction<Step>>;
};

const SaleType = ({ }: Props) => {
  const router = useRouter();
  const [modalOpen, setModalOen] = useState(false)
  const { data, isLoading } = useMe()
  const userBankAccount = data?.data?.stripeAccountStatus

  const handleAuction = () => {
    if (userBankAccount === "not-provided" || userBankAccount === "pending" || userBankAccount === "rejected" || userBankAccount === "review") {
      setModalOen(true)
      return
    }
    localStorage.setItem("saleType", "auction");
    router.push("auction-details");
  };

  const handleFixedPrice = () => {
    if (userBankAccount === "not-provided" || userBankAccount === "pending" || userBankAccount === "rejected" || userBankAccount === "review") {
      setModalOen(true)
      return
    }
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
              <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.9167 0C18.3842 0 13.9535 1.34404 10.1849 3.86215C6.41623 6.38027 3.47895 9.95936 1.74444 14.1468C0.00992951 18.3343 -0.443897 22.9421 0.440348 27.3875C1.32459 31.8329 3.50719 35.9162 6.71215 39.1212C9.9171 42.3261 14.0005 44.5087 18.4459 45.393C22.8913 46.2772 27.499 45.8234 31.6865 44.0889C35.874 42.3544 39.4531 39.4171 41.9712 35.6485C44.4893 31.8799 45.8333 27.4492 45.8333 22.9167C45.8333 16.8388 43.4189 11.0098 39.1212 6.71214C34.8235 2.41443 28.9946 0 22.9167 0ZM31.25 25H22.9167C22.3641 25 21.8342 24.7805 21.4435 24.3898C21.0528 23.9991 20.8333 23.4692 20.8333 22.9167V10.4167C20.8333 9.86413 21.0528 9.33423 21.4435 8.94353C21.8342 8.55283 22.3641 8.33333 22.9167 8.33333C23.4692 8.33333 23.9991 8.55283 24.3898 8.94353C24.7805 9.33423 25 9.86413 25 10.4167V20.8333H31.25C31.8025 20.8333 32.3324 21.0528 32.7231 21.4435C33.1138 21.8342 33.3333 22.3641 33.3333 22.9167C33.3333 23.4692 33.1138 23.9991 32.7231 24.3898C32.3324 24.7805 31.8025 25 31.25 25Z" fill="white" />
              </svg>


              <h1 className="text-lg font-semibold">Auction</h1>
              {/* <p className="">
                Fermentum consequat vitae a tellus blandit donec orci nunc. Amet
                velit sagittis ornare volutpat proin morbi dui. Eget nisl
                lobortis at.
              </p> */}
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
              <h1 className="text-lg font-semibold">Marketplace</h1>
              {/* <p className="">
                Fermentum consequat vitae a tellus blandit donec orci nunc. Amet
                velit sagittis ornare volutpat proin morbi dui. Eget nisl
                lobortis at.
              </p> */}
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
      <ConnectBankModal open={modalOpen} setOpen={setModalOen} userBankAccount={userBankAccount} />
    </div>
  );
};

export default SaleType;
