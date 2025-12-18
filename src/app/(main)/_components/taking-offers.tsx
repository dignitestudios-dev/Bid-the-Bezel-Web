import React from "react";
import EmblaCarousel from "./ui/carousel/embla-carousel";
import { EmblaOptionsType } from "embla-carousel";
import ViewAll from "./ui/view-all-btn";
import { offerWatches } from "@/lib/constants";

const OPTIONS: EmblaOptionsType = { dragFree: true };
const SLIDE_COUNT = 16;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
const TakingOffers = () => {
  return (
    <div className="max-w-screen-2xl mx-auto py-12">
      <div className="space-y-6">
        <div className="flex justify-between px-12">
          <h2 className="font-semibold">Taking Offers</h2>
          <ViewAll href="" />
        </div>
        <EmblaCarousel slides={offerWatches} options={OPTIONS} />
      </div>
    </div>
  );
};

export default TakingOffers;
