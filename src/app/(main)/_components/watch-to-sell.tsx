import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React from "react";

type Props = {};

const WatchTosell = (props: Props) => {
  return (
    <div className="max-w-screen-2xl mx-auto p-12">
      <div className="flex md:flex-row flex-col items-center justify-between bg-[#0D1B2A] rounded-xl">
        <div className=" md:w-[50%] p-6 md:p-12 space-y-8">
          <h1 className="text-3xl md:text-7xl uppercase text-[#778DA9] font-semibold">
            Have a watch to sell?
          </h1>
          <p className="text-white/90 ">
            Explore our curated collection of watches available for immediate
            purchase. Find the perfect timepiece to add to your collection
            today.
          </p>
          <button className="flex items-center gap-2 bg-[#415A77]  rounded-full px-2 pl-2 py-2 hover:shadow-md transition">
            <span className="text-white font-medium">Start Selling</span>
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-linear-to-r from-[#415A77] to-gray-400">
              <ArrowRight size={14} color="white" />
            </span>
          </button>
        </div>
        <div className="">
          <Image
            src={"/images/watch.png"}
            alt="watch"
            width={700}
            height={700}
          />
        </div>
      </div>
    </div>
  );
};

export default WatchTosell;
