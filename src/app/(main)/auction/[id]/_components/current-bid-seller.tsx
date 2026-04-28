import Move from "@/components/icons/Move";
import { Button } from "@/components/ui/button";
import { Clock3, MessageCircleMore } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import CancelListingDialog from "./cancel-listing-dialog";
import ConfirmCancel from "./confirm-cancel";
import MoveToTakingDialog from "./move-taking-offer-dialog";


type Props = {
  product: any;
};

const CurrentBidSeller = ({ product }: Props) => {
  const [cancelListing, setCancelListing] = useState(false);
  const [cancelSuccess, setCancelSuccess] = useState(false);
  const [moveToTakingOffer, setMoveToTakingOffer] = useState(false);
  const auction = product?.auction;

  const timeLeft = React.useMemo(() => {
    if (!auction?.endsAt) return "--";
    const diff = new Date(auction.endsAt).getTime() - Date.now();
    if (diff <= 0) return "Ended";
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    return `${d}D ${h}H ${m}M`;
  }, [auction?.endsAt]);
  const isEnded = timeLeft === "Ended"; 
  const hasBidder = !!auction?.currentBidder;
  return (
    <div className=" border  rounded-2xl mt-4">
      <h1 className="bg-[#F7F7F7] rounded-t-xl flex font-semibold justify-center gap-2 border-b border-[#E3E3E3] py-4">
        <Clock3 color="red" /> {timeLeft}
        <span className="font-medium">left</span>
      </h1>
      <div className="flex justify-between p-5">
        <h3 className="font-semibold">{hasBidder && isEnded ? "Bid Winner" : "Current Bid"}</h3>
        <h1 className="text-2xl font-semibold">
          {auction?.currentBidAmount > 0 ? `$${auction.currentBidAmount.toFixed(2)}` : "$00.0"}
        </h1>
      </div>
    {isEnded ? (
  hasBidder && product.status === "sold" && product.deliveryFlow == "at_seller" ? (
    <>
      <div className="flex border-b items-center p-5 gap-3">
        <Image src={"/images/dp.png"} alt="al" width={60} height={60} />
        <div>
          <h1 className="font-semibold mb-2">
            {auction.currentBidder?.userName ?? "Anonymous"}
          </h1>
          <h5>Current highest bidder</h5>
        </div>
      </div>

      <div className="flex flex-col gap-2 p-5 w-full">
        <Link href={"/chats"} className="w-full">
          <Button className="w-full h-12 py-2 text-base bg-[#F7F7F7] hover:bg-[#f8f3f3] text-primary hover:text-primary flex justify-center gap-2">
            <MessageCircleMore size={25} />
            Chat with Buyer
          </Button>
        </Link>
        <Link href={"/seller/shipping-details"} className="w-full">
          <Button className="text-base w-full">Fill out Shipping</Button>
        </Link>
      </div>
    </>
  ) : (
    <>
      <div className="flex capitalize font-semibold justify-center py-4 items-center">
        <h4>no bid yet</h4>
      </div>

      <div className="flex flex-col gap-2 p-5 w-full border-t">
        <p className="text-sm">
          Your listing failed to atrract any buyers.
        </p>

        <Button
          onClick={() => setMoveToTakingOffer(true)}
          className="text-base bg-[#F7F7F7] hover:bg-[#f8f3f3] text-primary hover:text-primary flex justify-center gap-2"
        >
          <Move />
          Move to takings offers section
        </Button>

        <Button
          onClick={() => setCancelListing(true)}
          className="text-base bg-red-700 text-white w-full"
        >
          Cancel Listing
        </Button>
      </div>
    </>
  )
) : (
  hasBidder ? (
    <div className="flex items-center px-5 pb-5 gap-3">
      <Image src={"/images/dp.png"} alt="al" width={60} height={60} />
      <div>
        <h1 className="font-semibold mb-2">
          {auction.currentBidder?.userName ?? "Anonymous"}
        </h1>
        <h5>Current highest bidder</h5>
      </div>
    </div>
  ) : (
    <div className="flex capitalize font-semibold justify-center py-4 items-center">
      <h4>no bid yet</h4>
    </div>
  )
)}
      <CancelListingDialog
        cancelListing={cancelListing}
        setCancelListing={setCancelListing}
        setCancelSuccess={setCancelSuccess}
      />
      <ConfirmCancel
        cancelSuccess={cancelSuccess}
        setCancelSuccess={setCancelSuccess}
      />
      <MoveToTakingDialog
        setMoveToTakingOffer={setMoveToTakingOffer}
        moveToTakingOffer={moveToTakingOffer}
      />
    </div>
  );
};

export default CurrentBidSeller;
