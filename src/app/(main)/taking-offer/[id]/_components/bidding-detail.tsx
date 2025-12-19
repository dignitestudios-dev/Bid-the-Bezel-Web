"use client";
import React from "react";
import CurrentBid from "./current-bid";
import TopBids from "./top-bids";
import AuthStatus from "./auth-status";
import Reviews from "./reviews";
import { useAppSelector } from "@/lib/hooks";
import CurrentBidSeller from "./current-bid-seller";
import UnAuthStatus from "@/app/(main)/auction/[id]/_components/unauth-status";

type Props = {
  sellerId?: string;
  name?: string;
  price?: number;
  watch: OfferWatch;
};

const BiddingDetail = ({ sellerId, watch }: Props) => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div className="lg:w-[40%] space-y-7">
      {user?.id == sellerId ? (
        <CurrentBidSeller bidders={watch.offers} />
      ) : (
        <CurrentBid bidders={watch.offers} watch={watch} />
      )}

      <TopBids />
      {watch.isAuthenticated ? <AuthStatus /> : <UnAuthStatus />}
      <Reviews />
    </div>
  );
};

export default BiddingDetail;
