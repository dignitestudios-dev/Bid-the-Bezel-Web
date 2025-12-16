"use client"

import Badge from "@/components/ui/badge";
import Image from "next/image";
import React, { useState } from "react";

type Props = {
  isAuthenticated:boolean
}

const ProductCard = ({isAuthenticated}: Props) => {
  const [isFav, setIsFav] = useState(false);

  return (
    <div className="md:w-[400px] md:h-[400px] text-xs md:text-base p-4 rounded-xl bg-gray-200/30 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">


      <div className="relative">

    
        <button
          onClick={() => setIsFav(!isFav)}
          className={`absolute top-3 right-3 z-10 w-10 h-10 rounded-lg flex items-center justify-center 
          bg-white/30 backdrop-blur-md shadow-md transition-all duration-300
          ${isFav ? "scale-110" : "scale-100"}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={isFav ? "red" : "none"}
            viewBox="0 0 24 24"
            stroke="white"
            strokeWidth={1}
            className={`w-7 h-7 transition-all duration-300 ${
              isFav ? "animate-ping-once" : ""
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.687-4.5-1.935 0-3.597 1.126-4.313 2.733-.716-1.607-2.378-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>

   
        <Image
          src={"/images/hero-card.png"}
          alt="card"
          width={500}
          height={500}
          className="rounded-lg"
        />
      </div>

      <div className="pt-4">
        <h1 className="flex items-center gap-2">
          2021 Rolex Datejust 41
          {isAuthenticated && 
          
          <Badge
            className="bg-linear-to-r from-[#0D1B2A] to-[#415A77]"
            title="Authenticated"
          />
          }
        </h1>

        <div className="flex text-center items-center justify-between py-4">
          <div className="w-1/3">
            <h2 className="font-thin">Starting Price</h2>
            <h1 className="font-semibold">$8700</h1>
          </div>

          <div className="h-10 w-px bg-white/50" />

          <div className="w-1/3">
            <h2 className="font-thin">Current Bid</h2>
            <h1 className="font-semibold">$8700</h1>
          </div>

          <div className="h-10 w-px bg-white/50" />

          <div className="w-1/3">
            <h2 className="font-thin">Ends In</h2>
            <h1 className="font-semibold">$8700</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
