import { timeAgo } from "@/lib/helper";
import { Clock3, MessageCircleMore } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import CancelListingDialog from "./cancel-listing-dialog";
import ConfirmCancel from "./confirm-cancel";
import RepostAuctionDialog from "./repost-auction-dialog";
import ConfirmBidDialog from "./confirm-bid-dialog";
import { Button } from "@/components/ui/button";

type Props = {
  product: AuctionProduct;
  bidsData: ProductBidsResponse;
};

const CurrentBidSeller = ({ product, bidsData }: Props) => {
  const [cancelListing, setCancelListing] = useState(false);
  const [cancelSuccess, setCancelSuccess] = useState(false);
  const [repostAuction, setRepostAuction] = useState(false);
 
  const [confirmBid, setConfirmBid] = useState(false);

  const [moveToTakingOffer, setMoveToTakingOffer] = useState(false);

  const currentBidder = bidsData?.data?.[0]?.currentBidder;
  const isSold = product?.status === "sold";
  const hasBidder = !!currentBidder;
  return (
    <div className=" border  rounded-2xl mt-4">
      <h1 className="bg-[#F7F7F7] rounded-t-xl flex font-semibold justify-center gap-2 border-b border-[#E3E3E3] py-4">
        <Clock3 color="#D9B918" />
        Taking Offers
      </h1>
      <div className="flex justify-between p-5">
        <h3 className="font-semibold">
          {hasBidder && isSold ? "Offer Winner" : "Current Offer"}
        </h3>
        <h1 className="text-2xl font-semibold">
          {product?.auction?.currentBidAmount > 0
            ? `$${product?.auction?.currentBidAmount.toFixed(2)}`
            : "$00.0"}
        </h1>
      </div>
      {!hasBidder ? (
        <div className="flex capitalize font-semibold justify-center py-8 items-center">
          <h4>no bid yet</h4>
        </div>
      ) : (
        <>
          <div className="flex gap-2 items-start p-5">
            <Image
              src={currentBidder.profilePicture.location}
              alt="dp"
              className="rounded-full"
              width={60}
              height={60}
            />
            <div className="my-2">
              <h1 className="font-semibold mb-1">{currentBidder.userName}</h1>
              <h5 className="text-xs ">Bid {" "}
                {bidsData?.data?.[0]?.bidPlacedAt ? timeAgo(bidsData.data[0].bidPlacedAt) : 'Top offer'}
              </h5>
            </div>
          </div>

          {isSold ? (
            product.deliveryFlow === "at_seller" && product.isMyProduct && (
              <div className="flex flex-col gap-2 p-5 w-full">
                <Link href={"/chats"} className="w-full">
                  <Button className="w-full h-12 py-2 text-base bg-[#F7F7F7] hover:bg-[#f8f3f3] text-primary hover:text-primary flex justify-center gap-2">
                    <MessageCircleMore size={25} />
                    Chat with Buyer
                  </Button>
                </Link>
                <Link href={`/seller/shipping-details/${product._id}`} className="w-full">
                  <Button className="text-base w-full">Fill out Shipping</Button>
                </Link>
              </div>
            )
          ) : bidsData.data[0].status === "pending" && (
            <div className="flex flex-col gap-2 p-5 w-full border-t space-y-2">
            
              <div className="flex items-center gap-2">
              <Button
              variant={"dangerous"}
                onClick={() => setCancelListing(true)}
                className=" w-[50%]"
              >
                Cancel Listing
              </Button>
              <Button
                onClick={() => setConfirmBid(true)}
                className="text-base bg-green-600 w-[50%] hover:bg-green-700 text-white"
              >
                Confirm Bid
              </Button>
              </div>
            </div>
          )}
        </>
      )}
      <ConfirmBidDialog
        open={confirmBid}
        setOpen={setConfirmBid}
        productId={bidsData?.data[0]?._id}
        bidder={currentBidder}
        amount={bidsData?.data?.[0]?.amount ?? 0}
      />
      <RepostAuctionDialog
        open={repostAuction}
        setOpen={setRepostAuction}
        productId={product?._id}
      />
      <CancelListingDialog
      id={product?._id}
        cancelListing={cancelListing}
        setCancelListing={setCancelListing}
        setCancelSuccess={setCancelSuccess}
      />
      <ConfirmCancel
        cancelSuccess={cancelSuccess}
        setCancelSuccess={setCancelSuccess}
      />
 

    </div>
  );
};

export default CurrentBidSeller;
