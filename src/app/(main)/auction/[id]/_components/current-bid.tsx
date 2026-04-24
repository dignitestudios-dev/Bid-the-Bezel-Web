"use client";

import React, { Suspense, useMemo } from "react";
import Image from "next/image";
import { Clock3, Info } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useMe } from "@/features/auth/hooks";
import { usePlaceBid } from "@/features/bidding/hooks";
import { showSuccess } from "@/lib/toast";

import AuthSidebar from "@/components/auth-sidebar";
import SubscriptionsDialog from "@/app/(main)/_components/subscription-dialog";
import NoCardAdded from "@/app/(main)/_components/no-card-added-dialog";
import VisaCardPopup from "@/app/(main)/_components/visa-card-dialog";
import SubscribeSuccessfully from "@/app/(main)/_components/subscribe-successfully-dialog";
import { cn } from "@/lib/utils";

type Props = {
  product: AuctionProduct;
  bidsData: ProductBidsResponse;
};


const bidSchema = (currentBid: number) =>
  z.object({
    amount: z
      .number({ message: "Enter valid amount" })
      .positive("Must be greater than 0")
      .min(1 , {message:"Must be greater than 0"})
       .int("Must be a whole number")
      ,
  });

type BidForm = {
  amount: number;
};

const CurrentBid = ({ product, bidsData }: Props) => {
  const { data: user, isLoading } = useMe();
  const placeBidMutation = usePlaceBid();



  const auction = product?.auction;

  const currentBid = useMemo(() => {
    return bidsData?.data?.[0]?.amount ?? 0;
  }, [bidsData]);

  const currentBidder = bidsData?.data?.[0]?.currentBidder;
const isWinner = product.auction.currentBidder === user?.data?._id;
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<BidForm>({
    resolver: zodResolver(bidSchema(currentBid)),
    mode: "onChange",
  });

  const watchedAmount = watch("amount");

  /* ---------------- TIME ---------------- */
  const timeLeft = useMemo(() => {
    if (!auction?.endsAt) return "--";
    const diff = new Date(auction.endsAt).getTime() - Date.now();
    if (diff <= 0) return "Ended";
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    return `${d}D ${h}H ${m}M`;
  }, [auction?.endsAt]);


  
  const isEnded = timeLeft === "Ended"; 

const displayTime = isEnded ? "0D 0H 0M" : timeLeft;
const iconColor = isEnded ? "#FF0000" : "#14A752";

  /* ---------------- POPUPS ---------------- */
  const [subsPopup, setSubsPopup] = React.useState(false);
  const [cardPopup, setCardPopup] = React.useState(false);
  const [visaCardPopup, setVisaCardPopup] = React.useState(false);
  const [successPopup, setSuccessPopup] = React.useState(false);

  /* ---------------- +200 BUTTON (FIXED) ---------------- */
const handleIncrease = () => {
  const current = Number(watchedAmount);

  const base = Number.isFinite(current) ? current : 0;

  setValue("amount", base + 200, {
    shouldValidate: true,
    shouldDirty: true,
  });
};

  const onSubmit = (data: BidForm) => {
    if (!user?.data.isBuyerPlanPurchased) {
      setSubsPopup(true);
      return;
    }

    placeBidMutation.mutate(
      { id: product._id, amount: data.amount },
      {
        onSuccess: (res) => {
          showSuccess(res?.data?.message || "Bid placed successfully!");
          reset();
        },
        onError: (err) => console.error(err),
      }
    );
  };

  return (
    <div className="rounded-xl w-full border border-[#E3E3E3]">
     <h1 className="bg-[#F7F7F7] rounded-t-xl flex font-semibold justify-center gap-2 border-b border-[#E3E3E3] py-4">
  <Clock3 color={iconColor} />
  {displayTime} left
</h1>

      <div className="p-6 border-[#E3E3E3]">
        <div className="flex justify-between mb-4 items-center">
          <h3 className="font-semibold">Current Bid</h3>
          <h1 className="text-2xl font-semibold">
            {currentBid > 0 ? `$${currentBid.toFixed(2)}` : "$00.00"}
          </h1>
        </div>

        {currentBidder ? (
          <div className="flex gap-2 items-start">
            <Image
              src={currentBidder.profilePicture.location}
              alt="dp"
              width={60}
              height={60}
            />
            <div className="my-2">
              <h1 className="font-semibold mb-1">
                {currentBidder.userName}
              </h1>
              <h5 className="text-xs">Current highest bidder</h5>
            </div>
          </div>
        ) : (
          <div className="p-8 flex items-center justify-center capitalize font-semibold">
            <h4>no bid yet</h4>
          </div>
        )}
      </div>

      {/* BID SECTION (UNCHANGED STRUCTURE) */}
     {!isLoading && user ? (
  isEnded ? (
    <div className="px-6 py-6 border-t text-center">
      {isWinner ? (
        <>
          <h1 className="text-xl font-semibold text-green-600">
            You won the bid 🎉
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Congratulations! You placed the highest bid.
          </p>
        </>
      ) : (
        <>
        <div className="bg-gray-100 gap-2 p-2 w-[30%] mx-auto flex items-center justify-center rounded-lg" >
          <Image unoptimized width={50} height={50} src={currentBidder?.profilePicture?.location} alt="pic" className="w-6 h-6 rounded-full" />
          <h1 className="text-xl font-semibold">
            {currentBidder?.userName}
          </h1>
          </div>
          <h1 className="text-2xl font-bold mt-5">
            Bid winner
          </h1>
        </>
      )}
    </div>
  ) : (
    <>
      <div className="px-6 pt-6 border-t space-y-4">
        <h1 className="font-semibold flex items-center gap-2">
          Place your bid
          <Tooltip>
            <TooltipTrigger asChild>
              <Info size={14} color="gray" />
            </TooltipTrigger>
            <TooltipContent className="bg-gray-100 w-[200px] text-gray-600">
              10% escrow fee applies
            </TooltipContent>
          </Tooltip>
        </h1>

        <div>
          <div className="text-center">
            <h1 className="text-2xl font-semibold">
              ${watchedAmount || 0}.00
            </h1>
            <h3 className="text-xs">Your Bid</h3>
          </div>
        </div>

        <Button
          onClick={handleIncrease}
          className="bg-[#415A77] w-full py-3"
        >
          +200
        </Button>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center px-6 p-4 gap-2"
      >
        <div className="w-full">
          <Input
            placeholder="Enter your amount"
            className={cn("w-full", errors.amount && "border-red-500")}
            type="number"
            {...register("amount", { valueAsNumber: true })}
          />
        </div>

        <Button
          type="submit"
          className="text-sm md:px-20 py-3"
          disabled={!isValid || placeBidMutation.isPending}
        >
          Place Bid
        </Button>
      </form>

      {errors.amount && (
        <p className="text-red-500 text-xs px-6 -mt-2">
          {errors.amount.message}
        </p>
      )}
    </>
  )
) : null}

      {/* AUTH SIDEBAR (UNCHANGED) */}
      <div className={!isLoading && user ? "w-full flex py-4 justify-center" : "hidden"}>
        <Suspense fallback={null}>
          <AuthSidebar hideTrigger={!!user || isLoading} loader={isLoading} />
        </Suspense>
      </div>

      {/* DIALOGS (UNCHANGED) */}
      <SubscriptionsDialog
        id={product._id}
        subsPopup={subsPopup}
        setSubsPopup={setSubsPopup}
        setCardPopup={setCardPopup}
      />

      <NoCardAdded
        cardPopup={cardPopup}
        setCardPopup={setCardPopup}
        setVisaCardPopup={setVisaCardPopup}
      />

      <VisaCardPopup
        visaCardPopup={visaCardPopup}
        setVisaCardPopup={setVisaCardPopup}
        setSuccessPopup={setSuccessPopup}
      />

      <SubscribeSuccessfully
        successPopup={successPopup}
        setSuccessPopup={setSuccessPopup}
        onClose={() => {}}
      />
    </div>
  );
};

export default CurrentBid;