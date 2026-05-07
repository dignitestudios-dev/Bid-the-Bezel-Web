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
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  product: AuctionProduct;
};

const BiddingDetail = ({ product }: Props) => {
  const user = useAppSelector((state) => state.auth.user);
  const isAuthenticated = product?.authentication?.status === 'authenticated';
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();

  const { data: bidsData, isLoading: bidsLoading } = useGetProductBids(product?._id, 1, 10);
  const { data: paginatedBids, isLoading: paginatedBidsLoading } = useGetProductBids(product?._id, currentPage, 10);

  const noBids = !bidsLoading && (bidsData?.data?.bids.length ?? 0) === 0;

  if (noBids) {
    queryClient.invalidateQueries({ queryKey: ["get-listing-detail", product?._id] });
  }

  if (bidsLoading) {
    return <BidSkeleton />;
  }
  return (
    <div className="lg:w-[40%] space-y-7">
      {product.isMyProduct ? (
        <CurrentBidSeller product={product} bidsData={bidsData!} />
      ) : (
        <CurrentBid product={product} bidsData={bidsData!} />
      )}
      <TopBids
        topBids={bidsData?.data?.bids ?? []}
        paginatedBids={paginatedBids?.data?.bids ?? []}
        pagination={paginatedBids?.pagination}
        currentPage={currentPage}
        paginatedBidsLoading={paginatedBidsLoading}
        setCurrentPage={setCurrentPage}
      />
      {isAuthenticated ? <AuthStatus /> : <UnAuthStatus />}
      <Reviews sellerId={product?.seller?._id} />
    </div>
  );
};

export default BiddingDetail;
