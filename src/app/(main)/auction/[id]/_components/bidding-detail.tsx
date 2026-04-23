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

type Props = {
  product: AuctionProduct;
};

const BiddingDetail = ({ product }: Props) => {
  const user = useAppSelector((state) => state.auth.user);
  const isSeller = user?.id === product?.seller?._id;
  const isAuthenticated = product?.authentication?.status === 'authenticated';
    const [currentPage, setCurrentPage] = useState(1);
  const { data: bidsData , isLoading } = useGetProductBids(product?._id);

  if(isLoading){
    return <div>Loading...</div>
  }
  return (
    <div className="lg:w-[40%] space-y-7">
      {product.isMyProduct ? (
        <CurrentBidSeller product={product} />
      ) : (
        <CurrentBid product={product} bidsData={bidsData!} />
      )}  
      <TopBids bidsData={bidsData!} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {isAuthenticated ? <AuthStatus /> : <UnAuthStatus />}
      <Reviews />
    </div>
  );
};

export default BiddingDetail;
