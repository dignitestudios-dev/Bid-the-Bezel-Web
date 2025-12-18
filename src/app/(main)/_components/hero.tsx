"use client";
import { ArrowRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import HeroCard from "./ui/hero-card";
import Link from "next/link";

const Hero = () => {
  const [index, setIndex] = useState(0);

  const cards = [
    {
      imageSrc: "/images/hero-card.png",
      title: "2021 Rolex Datejust 41",
      badgeTitle: "Authenticated",
      startingPrice: "$8700",
      currentBid: "$14200",
      endsIn: "2D 5H 42M",
    },
    {
      imageSrc: "/images/hero-card-2.png",
      title: "2019 Patek Philippe Nautilus",
      badgeTitle: "Authenticated",
      startingPrice: "$12000",
      currentBid: "$18200",
      endsIn: "1D 3H 10M",
    },
    {
      imageSrc: "/images/hero-card-3.png",
      title: "2020 Audemars Piguet Royal Oak",
      badgeTitle: "Authenticated",
      startingPrice: "$15000",
      currentBid: "$21000",
      endsIn: "3D 2H 5M",
    },
  ];

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % cards.length), 2000);
    return () => clearInterval(t);
  }, []);

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
            <Link
              href={"/seller/plans"}
              className="flex items-center w-fit gap-2 bg-[#415A77]  rounded-full pr-2 pl-3 py-2 hover:shadow-md transition"
            >
              <span className="text-white font-medium">Start Selling</span>
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-linear-to-r from-[#415A77] to-gray-400">
                <ArrowRight size={14} color="white" />
              </span>
            </Link>
          </div>
          <div className="md:w-[30%] w-full relative h-[420px]">
            {/* show all three tilted/stacked and rotate order over time */}
            <div className="relative w-full h-full flex items-center justify-center">
              {(() => {
                const order = [...cards.slice(index), ...cards.slice(0, index)];
                const transforms = [
                  "translate(0px,0px) rotate(0deg) scale(1)",
                  "translate(-12px,10px) rotate(-6deg) scale(1)",
                  "translate(-24px,20px) rotate(-10deg) scale(1)",
                ];
                return order.map((card, i) => (
                  <div
                    key={i}
                    className="absolute transition-all duration-300"
                    style={{
                      zIndex: 30 - i,
                      transform: transforms[i],
                      left: `0px`,
                    }}
                  >
                    <div className="w-full max-w-[380px]">
                      <HeroCard {...card} />
                    </div>
                  </div>
                ));
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
