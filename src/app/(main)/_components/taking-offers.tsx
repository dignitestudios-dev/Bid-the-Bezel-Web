"use client"
import React from "react";
import EmblaCarousel from "./ui/carousel/embla-carousel";
import { EmblaOptionsType } from "embla-carousel";
import ViewAll from "./ui/view-all-btn";
import { WatchCardSkeleton } from "./ui/watch-skeleton";

const OPTIONS: EmblaOptionsType = { dragFree: true };
const TakingOffers = ({ takingOffers , loading }: { takingOffers: any[]; loading: boolean }) => {
  return (
    <div className="max-w-screen-2xl mx-auto py-12">
      <div className="space-y-6">
        <div className="flex justify-between px-12">
          <h2 className="font-bold text-xl">Taking Offers</h2>
          <ViewAll href="/collections?category=offer" />
        </div>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <WatchCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <EmblaCarousel slides={takingOffers} options={OPTIONS} />
        )}
      </div>
    </div>
  );
};

export default TakingOffers;
