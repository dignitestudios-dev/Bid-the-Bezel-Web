"use client";
import React, { useState } from "react";
import CurrentBid from "./current-bid";
import TopBids from "./top-bids";
import AuthStatus from "./auth-status";
import Reviews from "./reviews";
import { useAppSelector } from "@/lib/hooks";
import CurrentBidSeller from "./current-bid-seller";
import UnAuthStatus from "./unauth-status";
import { useGetProductBids } from "@/features/bidding/hooks";
import BidSkeleton from "./ui/bid-skeleton";

type Props = {
  product: AuctionProduct;
};

const BiddingDetail = ({ product }: Props) => {
  const user = useAppSelector((state) => state.auth.user);
  const isSeller = user?.id === product?.seller?._id;
  const isAuthenticated = product?.authentication?.status === 'authenticated';
    const [currentPage, setCurrentPage] = useState(1);
  const { data: bidsData , isLoading:bidsLoading } = useGetProductBids(product?._id,1 , 10);
  const { data: paginatedBids , isLoading:
paginatedBidsLoading } = useGetProductBids(product?._id,currentPage , 10);
// bidsData?.data?.[0]?.currentBidder?.
  if(bidsLoading ){
    return <BidSkeleton/>
  }
  return (
    <div className="lg:w-[40%] space-y-7">
      {product.isMyProduct ? (
        <CurrentBidSeller product={product} />
      ) : (
        <CurrentBid product={product} bidsData={bidsData!} />
      )}  
    <TopBids
  topBids={bidsData?.data ?? []}
  paginatedBids={paginatedBids?.data ?? []}
  pagination={paginatedBids?.pagination}
  currentPage={currentPage}
  paginatedBidsLoading={paginatedBidsLoading}
  setCurrentPage={setCurrentPage}
/>
      {isAuthenticated ? <AuthStatus /> : <UnAuthStatus />}
      <Reviews />
    </div>
  );
};

export default BiddingDetail;
