import React from "react";
import EmblaCarousel from "./ui/carousel/embla-carousel";
import { EmblaOptionsType } from "embla-carousel";
import ViewAll from "./ui/view-all-btn";

const OPTIONS: EmblaOptionsType = { dragFree: true };
const SLIDE_COUNT = 16;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
const Aunctions = () => {
  return (
    <div className="max-w-screen-2xl mx-auto ">
      <div className="space-y-6">
        <div className="flex justify-between px-12">
          <h2 className="font-semibold">Latest Auctions</h2>
          <ViewAll href="" />
        </div>
        <EmblaCarousel FColor="255, 255, 255" slides={SLIDES} options={OPTIONS} />
      </div>
    </div>
  );
};

export default Aunctions;
