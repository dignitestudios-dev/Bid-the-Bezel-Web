import Move from "@/components/icons/Move";
import { Button } from "@/components/ui/button";
import { Clock3, MessageCircleMore } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import CancelListingDialog from "./cancel-listing-dialog";
import ConfirmCancel from "./confirm-cancel";
import MoveToTakingDialog from "./move-taking-offer-dialog";
import RepostDialog from "./repost-dialog";
import ConfirmBid from "./confirm-bid";


type Props = {
  bidders: Offer[];
};

const CurrentBidSeller = ({ bidders }: Props) => {
    const [cancelListing , setCancelListing] = useState(false);
    const [cancelSuccess , setCancelSuccess] = useState(false);
    const [moveToTakingOffer , setMoveToTakingOffer] = useState(false);
    const [repostPopup , setRepostPopup] = useState(false);
    const [confirmBidPopup , setConfirmBidPopup] = useState(false);
  return (
    <div className=" border  rounded-2xl mt-4">
      <h1 className="bg-[#F7F7F7] rounded-t-xl flex font-semibold justify-center gap-2 border-b  border-[#E3E3E3]  py-4">
        {" "}
       <Clock3 color="#D9B918" /> Taking Offers
        {/* <span className="font-medium">left</span> */}
      </h1>
      <div className="flex justify-between px-5 pt-5">
        <h3 className="font-semibold">{"Current Bid"}</h3>{" "}
        <h1 className="text-2xl font-semibold"> {bidders.length>=1 ? "$900.0" :"$00.0"}</h1>{" "}
      </div>
      {bidders.length >= 1 ? (
        <>
          <div className="flex border-b items-center p-5 gap-3">
            <Image src={"/images/dp.png"} alt="al" width={60} height={60} />
            <div>
              <h1 className="font-semibold ">GuessMyname</h1>
              <h5 className="text-xs">Bid 20m ago</h5>
            </div>
          </div>

          <div className="flex flex-col gap-2 p-5 w-full">
            <Button onClick={()=>setRepostPopup(true)} className="py-2 text-base bg-[#415A77] hover:bg-[#f8f3f3] border text-white hover:text-primary flex justify-center gap-2">
              {" "}
              <MessageCircleMore size={25} />
              Repost Listing
            </Button>
            <div className="flex items-center gap-2" >
            {/* <Link href={"/seller/shipping-details"} className="w-full"> */}
              <Button onClick={()=>setCancelListing(true)} className="text-base py-2 bg-[#BA1818] text-white w-[50%]">Cancel Listing</Button>
            {/* </Link> */}
            <Button onClick={()=>setConfirmBidPopup(true)}  className="text-base py-2 w-[50%] bg-[#14A752] text-white">Confirm Bid</Button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex capitalize font-semibold justify-center py-4 items-center">
            <h4>no bid yet</h4>
          </div>
          <div className="flex flex-col gap-2 p-5 w-full border-t">
            <p className="text-sm">Your listing failed to atrract any buyers.</p>
            <Button onClick={()=>setMoveToTakingOffer(true)} className=" text-base bg-[#F7F7F7] hover:bg-[#f8f3f3] text-primary hover:text-primary flex justify-center gap-2">
              {" "}
             <Move/>
             Move to takings offers section
            </Button>
            {/* <Link href={"/seller/shipping-details"} className="w-full"> */}
              <Button onClick={()=>setCancelListing(true)} className="text-base bg-red-700 text-white w-full">Cancel Listing</Button>
            {/* </Link> */}
          </div>
        </>
      )}
      <CancelListingDialog cancelListing={cancelListing} setCancelListing={setCancelListing} setCancelSuccess={setCancelSuccess} />
      <ConfirmCancel cancelSuccess={cancelSuccess} setCancelSuccess={setCancelSuccess} />
      <MoveToTakingDialog setMoveToTakingOffer={setMoveToTakingOffer} moveToTakingOffer={moveToTakingOffer} />
      <RepostDialog repostPopup={repostPopup} setRepostPopup={setRepostPopup} />
      <ConfirmBid confirmBidPopup={confirmBidPopup} setConfirmBidPopup={setConfirmBidPopup}/>
    </div>
  );
};

export default CurrentBidSeller;
