"use client"
import { useGetAllListing } from "@/features/listing/hook";
import Aunctions from "./_components/auctions";
import BrowseByCategories from "./_components/browse-by-categories";
import FixedPrice from "./_components/fixed-price";
import Hero from "./_components/hero";
import Plans from "./_components/plans";
import TakingOffers from "./_components/taking-offers";
import WatchTosell from "./_components/watch-to-sell";

export default function Home() {
  const { data } = useGetAllListing()
  
  return (
    <div>
      <Hero />
      <Aunctions auctionWatches={data?.data.auction || []}  />
      <FixedPrice fixedPrice={data?.data?.fixed_price || []} />
      <TakingOffers />
      <BrowseByCategories />
      <WatchTosell />
      <Plans />
    </div>
  );
}
