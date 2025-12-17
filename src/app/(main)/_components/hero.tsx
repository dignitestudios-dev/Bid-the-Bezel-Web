
import { ArrowRight } from "lucide-react";
import React from "react";
import HeroCard from "./ui/hero-card";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="p-4 md:p-8 max-w-screen-2xl mx-auto">
      <div className="bg-[url('/images/banner2.jpg')] bg-cover relative bg-center w-full rounded-4xl">
      <div className="absolute inset-0 bg-black/50 rounded-4xl"></div>
        <div className="flex flex-wrap justify-between items-center text-white h-full md:px-14 px-4 min-h-[750px]">
          <div className="md:w-[42%] relative z-50 w-full space-y-4">
            <h1 className="text-3xl md:text-6xl text-white font-semibold">
              Discover Certified Timepieces
            </h1>
            <p className="text-white/90 ">
              Explore our curated collection of watches available for immediate
              purchase. Find the perfect timepiece to add to your collection
              today.
            </p>
            <Link href={"/seller/plans"} className="flex items-center w-fit gap-2 bg-[#415A77]  rounded-full pr-2 pl-3 py-2 hover:shadow-md transition">
              <span className="text-white font-medium">Start Selling</span>
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-linear-to-r from-[#415A77] to-gray-400">
                <ArrowRight size={14} color="white" />
              </span>
            </Link>
          </div>
          <div className="md:w-[30%] w-full">
            <HeroCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
