import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const WatchTosell = (props: Props) => {
  return (
    <div className="max-w-screen-2xl mx-auto p-12">
      <div className="flex md:flex-row flex-col items-center justify-between bg-radial from-[#172f49] to-[#0D1B2A] rounded-xl">
        <div className=" md:w-[50%] p-6 md:p-12 space-y-8">
          <h1 className="text-3xl md:text-7xl uppercase text-[#778DA9] font-semibold">
            Have a watch to sell?
          </h1>
          <p className="text-white/90 ">
            Explore our curated collection of watches available for immediate
            purchase. Find the perfect timepiece to add to your collection
            today.
          </p>
          <Link href={"/seller/plans"}>
            <button className="cursor-pointer bg-white/5 flex items-center gap-2 rounded-full p-1.5 pl-3 hover:shadow-md transition">
              <span className="text-white font-medium">Start Selling</span>
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-linear-to-bl from-white/25 to-white/5">
                <ArrowRight size={14} color="white" />
              </span>
            </button>
          </Link>
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
