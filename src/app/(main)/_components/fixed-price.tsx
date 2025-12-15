import React from "react";
import ViewAll from "./ui/view-all-btn";
import EmblaCarousel from "./ui/carousel/embla-carousel";
import { EmblaOptionsType } from "embla-carousel";
import Link from "next/link";


type Props = {};
const OPTIONS: EmblaOptionsType = { dragFree: true };
const SLIDE_COUNT = 16;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
const FixedPrice = (props: Props) => {
  return (
    <div className=" bg-[#101f2f]">
        <div className="max-w-screen-2xl text-white py-12 mx-auto bg-[url('/images/fixed-bg.png')]" >
      <div className="space-y-6">
        <div className="flex justify-between px-12">
          <h2 className="font-semibold">Fixed Price</h2>
          <Link
            href={"#"}
            className="border border-[#E3E3E3]/30 rounded-full px-2 py-1 flex items-center text-sm gap-2"
          >
           <span> View All</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.793 7.50002H2.5C2.36739 7.50002 2.24021 7.5527 2.14645 7.64647C2.05268 7.74024 2 7.86741 2 8.00002C2 8.13263 2.05268 8.25981 2.14645 8.35357C2.24021 8.44734 2.36739 8.50002 2.5 8.50002H11.793L8.146 12.146C8.05211 12.2399 7.99937 12.3672 7.99937 12.5C7.99937 12.6328 8.05211 12.7601 8.146 12.854C8.23989 12.9479 8.36722 13.0007 8.5 13.0007C8.63278 13.0007 8.76011 12.9479 8.854 12.854L13.354 8.35402C13.4006 8.30758 13.4375 8.2524 13.4627 8.19165C13.4879 8.13091 13.5009 8.06579 13.5009 8.00002C13.5009 7.93425 13.4879 7.86913 13.4627 7.80839C13.4375 7.74764 13.4006 7.69247 13.354 7.64602L8.854 3.14602C8.76011 3.05213 8.63278 2.99939 8.5 2.99939C8.36722 2.99939 8.23989 3.05213 8.146 3.14602C8.05211 3.23991 7.99937 3.36725 7.99937 3.50002C7.99937 3.6328 8.05211 3.76013 8.146 3.85402L11.793 7.50002Z"
                fill="white"
              />
            </svg>
          </Link>
        </div>
        <EmblaCarousel FColor="16, 31, 47" slides={SLIDES} options={OPTIONS} />
      </div>
    </div>
    </div>
  );
};

export default FixedPrice;
