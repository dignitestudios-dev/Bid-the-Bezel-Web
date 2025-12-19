"use client";
import NoCardAdded from "@/app/(main)/_components/no-card-added-dialog";
import SubscribeSuccessfully from "@/app/(main)/_components/subscribe-successfully-dialog";
import SubscriptionsDialog from "@/app/(main)/_components/subscription-dialog";
import VisaCardPopup from "@/app/(main)/_components/visa-card-dialog";
import AuthSidebar from "@/components/auth-sidebar";
import WonCongrats from "@/components/icons/WonCongrats";
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
import Link from "next/link";
import React, { useState, useEffect } from "react";

type Props = {
  bidders: Offer[];
  watch: any;
};

const CurrentBid = ({ bidders, watch }: Props) => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const [subsPopup, setSubsPopup] = useState(false);
  const [cardPopup, setCardPopup] = useState(false);
  const [visaCardPopup, setVisaCardPopup] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const [price, setPrice] = useState(0);
  const [bidPlaced, setBidPlaced] = useState(false);
  const [wonBid, setWonBid] = useState(false);
  const [cancelConfirm, setCancelConfirm] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (bidPlaced && !wonBid) {
      interval = setInterval(() => {
        setWonBid(true);
      }, 2000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [bidPlaced, wonBid]);
  return (
    <div className="rounded-xl w-full border border-[#E3E3E3]">
      <h1 className="bg-[#F7F7F7] rounded-t-xl flex font-semibold justify-center gap-2 border-b  border-[#E3E3E3]  py-4">
        {" "}
        <Clock3 color="#D9B918" /> Taking Offers{" "}
        {/* <span className="font-medium">left</span> */}
      </h1>
      <div className="p-6  border-[#E3E3E3]">
        <div className="flex justify-between mb-4 items-center">
          <h3 className=" font-semibold">Current Bid</h3>
          <h1 className="text-2xl font-semibold">
            {bidders.length >= 1 ? "$500.00" : "$00.00"}
          </h1>
        </div>
        {bidders.length >= 1 ? (
          <div className="flex gap-2 items-start">
            <Image src={"/images/dp.png"} alt="dp" width={60} height={60} />
            <div className="my-2">
              <h1 className="font-semibold  mb-1">Guessmyusername</h1>
              <h5 className="text-xs">Bid 20m ago</h5>
            </div>
          </div>
        ) : (
          <div className="p-8 flex items-center justify-center capitalize font-semibold">
            {" "}
            <h4>no bid yet</h4>
          </div>
        )}
      </div>

      {isLoggedIn ? (
        <>
          <div className="p-6 border-t space-y-4">
            {wonBid ? (
              cancelConfirm ? (
                <div>
                  <h1 className="text-2xl font-semibold text-center">
                    Bidding Fees
                  </h1>
                  <p className="text-center mb-4">
                    10% of your bid amount will be lost. Are you sure you want
                    to cancel?
                  </p>
                  <div className="flex w-full gap-2 justify-center">
                    <Button
                      onClick={() => {
                        setCancelConfirm(false);
                        setBidPlaced(false);
                        setWonBid(false);
                        setPrice(0);
                      }}
                      className="w-[50%] bg-red-700 py-3 text-white"
                    >
                      Yes
                    </Button>
                    <Button
                      onClick={() => setCancelConfirm(false)}
                      className="w-[50%] bg-gray-100 py-3 text-black"
                    >
                      No
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center gap-2">
                  <div className="w-14 h-14 rounded-full bg-[#F7F7F7] flex justify-center items-center">
                    <WonCongrats />
                  </div>
                  <h1 className="text-center text-2xl font-semibold">
                    You Won This Bid!
                  </h1>
                  <Button
                    onClick={() => setCancelConfirm(true)}
                    className="w-full bg-red-700 py-3 h-12 text-base text-white"
                  >
                    Cancel Bid
                  </Button>

                  <Link className="w-full" href={`/buy-now/${watch.watchId}`}>
                    <Button
                      onClick={() => {}}
                      className="w-full bg-primary py-3 h-12 text-base text-white"
                    >
                      Fill out details
                    </Button>
                  </Link>
                </div>
              )
            ) : (
              <>
                <h1 className=" font-semibold flex items-center gap-2">
                  Place your bid
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info size={14} color="gray" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-gray-100 w-[200px] text-gray-600">
                      <p>
                        10% of your bidding amount will be holdin escrow. In
                        case of cancelling your bid that amount in
                        non-refundable
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </h1>
                <div>
                  <div className="text-center">
                    <h1 className="text-2xl font-semibold">${price}.00</h1>
                    <h3 className="text-xs">Your Bid</h3>
                  </div>
                </div>
                {bidPlaced && (
                  <Button
                    onClick={() => setCancelConfirm(true)}
                    className="w-full bg-red-700 py-3 text-white"
                  >
                    Cancel Bid
                  </Button>
                )}
                {!bidPlaced && (
                  <Button
                    onClick={() => setPrice((prev) => prev + 100)}
                    className="bg-[#415A77] w-full py-3"
                  >
                    +100
                  </Button>
                )}
              </>
            )}
          </div>

          {!bidPlaced && (
            <div className="flex items-center px-6 p-4 gap-2">
              <Input
                placeholder="Enter your amount"
                type="number"
                value={price}
                onChange={(e) => setPrice(+e.target.value)}
              />
              <Button
                onClick={() => setBidPlaced(true)}
                className="text-sm md:px-20 py-3"
                disabled={price === 0}
              >
                Place Bid
              </Button>
            </div>
          )}
          {/* <div className="flex items-center px-6 p-4 gap-2">
            <Input placeholder="Enter your amount" />
            <Button
              onClick={() => setSubsPopup(true)}
              className="text-sm md:px-20 py-3"
            >
              Place Bid
            </Button>
          </div> */}
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
