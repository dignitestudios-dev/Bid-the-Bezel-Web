"use client";
import NoCardAdded from "@/app/(main)/_components/no-card-added-dialog";
import SubscribeSuccessfully from "@/app/(main)/_components/subscribe-successfully-dialog";
import SubscriptionsDialog from "@/app/(main)/_components/subscription-dialog";
import VisaCardPopup from "@/app/(main)/_components/visa-card-dialog";
import AuthSidebar from "@/components/auth-sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAppSelector } from "@/lib/hooks";
import { Clock3, Info } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

type Props = {
  bidders: Bidder[]
};

const CurrentBid = ({bidders}: Props) => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const [subsPopup, setSubsPopup] = useState(false);
  const [cardPopup, setCardPopup] = useState(false);
  const [cancelBid, setCancelBid] = useState(false);
  const [visaCardPopup, setVisaCardPopup] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const [price, setPrice] = useState(0);
  return (
    <div className="rounded-xl w-full border border-[#E3E3E3]">
      <h1 className="bg-[#F7F7F7] rounded-t-xl flex font-semibold justify-center gap-2 border-b  border-[#E3E3E3]  py-4">
        {" "}
        <Clock3 color="#14A752" /> 2D 5H 42M{" "}
        <span className="font-medium">left</span>
      </h1>
        <div className="p-6  border-[#E3E3E3]">
        <div className="flex justify-between mb-4 items-center">
          <h3 className=" font-semibold">Current Bid</h3>
          <h1 className="text-2xl font-semibold">{bidders.length>=1 ?"$500.00" :"$00.00"}</h1>
        </div>
        {bidders.length >=1 ?
        <div className="flex gap-2 items-start">
          <Image src={"/images/dp.png"} alt="dp" width={60} height={60} />
          <div className="my-2">
            <h1 className="font-semibold  mb-1">Guessmyusername</h1>
            <h5 className="text-xs">Bid 20m ago</h5>
          </div>
        </div>
        :
      
      <div className="p-8 flex items-center justify-center capitalize font-semibold" > <h4>no bid yet</h4></div>}
      </div> 
    

      {isLoggedIn ? (
        <>
          <div className="px-6 pt-6 border-t  space-y-4">
            <h1 className=" font-semibold flex items-center gap-2">
              Place your bid
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info size={14} color="gray" />
                </TooltipTrigger>
                <TooltipContent className="bg-gray-100 w-[200px] text-gray-600">
                  <p>
                    10% of your bidding amount will be holdin escrow. In case of
                    cancelling your bid that amount in non-refundable
                  </p>
                </TooltipContent>
              </Tooltip>
            </h1>
            {cancelBid ? (
              <div>
                <h1 className="text-2xl font-semibold text-center">
                  Bidding Fees
                </h1>
                <p className="text-center mb-4">
                  10% of your bid amount will be lost. Are you sure you want to
                  cancel?
                </p>
                <div className="flex w-full gap-2 justify-center">
                  <Button
                    onClick={() => {
                      setCancelBid(false);
                      setPrice(0);
                    }}
                    className="w-[50%] bg-red-700 py-3 text-white"
                  >
                    Cancel Bid
                  </Button>
                  <Button
                    onClick={() => setCancelBid(false)}
                    className="w-[50%] bg-gray-100 py-3 text-black"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div>
                  <div className="text-center">
                    <h1 className="text-2xl font-semibold">${price}.00</h1>
                    <h3 className="text-xs">Your Bid</h3>
                  </div>
                </div>
                {price > 0 && (
                  <Button
                    onClick={() => setCancelBid(true)}
                    className="w-full bg-red-700 py-3 text-white"
                  >
                    Cancel Bid
                  </Button>
                )}
                <Button
                  onClick={() => setPrice(900)}
                  className="bg-[#415A77] w-full py-3"
                >
                  +200
                </Button>
              </>
            )}
          </div>
          <div className="flex items-center px-6 p-4 gap-2">
            <Input placeholder="Enter your amount" />
            <Button
              onClick={() => setSubsPopup(true)}
              className="text-sm md:px-20 py-3"
            >
              Place Bid
            </Button>
          </div>
        </>
      ) : (
        <div className="w-full flex py-4 justify-center">
          <AuthSidebar />
        </div>
      )}

      <SubscriptionsDialog
        setCardPopup={setCardPopup}
        subsPopup={subsPopup}
        setSubsPopup={setSubsPopup}
      />
      <NoCardAdded
        setCardPopup={setCardPopup}
        cardPopup={cardPopup}
        setVisaCardPopup={setVisaCardPopup}
      />
      <VisaCardPopup
        setVisaCardPopup={setVisaCardPopup}
        setSuccessPopup={setSuccessPopup}
        visaCardPopup={visaCardPopup}
      />
      <SubscribeSuccessfully
        setSuccessPopup={setSuccessPopup}
        successPopup={successPopup}
      />
    </div>
  );
};

export default CurrentBid;
