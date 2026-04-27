"use client";

import Badge from "@/components/ui/badge";
import { displayPrice } from "@/lib/helper";
import { mapProductToUI } from "@/lib/mappers/product.mapper";
import { cn } from "@/lib/utils";
import { formatTimeLeft } from "@/lib/utils/date.utils";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";


const ProductCard = ({
  prod,
}: {
  prod: AuctionProduct | FixedPriceProduct;
}) => {
  const [isFav, setIsFav] = useState(false);

  if (!prod) return null;

  const product = mapProductToUI(prod);

  return (
    <Link href={product.route}>
      <div className={cn("flex flex-col h-full text-xs md:text-base p-4 rounded-xl  hover:shadow-lg transition-all" , product.isAuction ? "border bg-gray-300/10" : " bg-gray-700/10")}>
        <div className="relative">

          <button
            onClick={(e) => {
              e.preventDefault(); 
              setIsFav((prev) => !prev);
            }}
            className={cn(
              "absolute top-3 right-3 z-10 w-10 h-10 rounded-lg flex items-center justify-center",
              "bg-gray-300/20 backdrop-blur-md shadow-md transition-all duration-300",
              isFav ? "scale-110" : "scale-100"
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={isFav ? "red" : "none"}
              viewBox="0 0 24 24"
              stroke="white"
              strokeWidth={1}
              className={cn("w-7 h-7", isFav && "animate-ping-once")}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.687-4.5-1.935 0-3.597 1.126-4.313 2.733-.716-1.607-2.378-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </button>

          {/* Image */}
          <div className="relative w-full h-64 rounded-lg overflow-hidden">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>

        {/* CONTENT */}
        <div className="pt-4">

          {/* Title + Badge */}
          <h1 className="flex items-center gap-2">
            <span className="font-semibold text-lg">
              {product.title}
            </span>

            {product.isAuthenticated && (
              <Badge
                className="bg-linear-to-r from-[#0D1B2A] to-[#415A77] text-white py-1 px-4 text-sm"
                title="Authenticated"
              />
            )}
          </h1>

          {/* PRICE + AUCTION INFO */}
          <div className="flex text-center items-center w-full justify-between pt-2">

            {/* Price */}
            <div className="w-1/3">
              <h2 className="font-thin">{product.isAuction ? "Starting Price" : ""}</h2>
              <h1 className={cn("font-semibold" , product.isAuction ? "text-center" : "text-start")}>
                ${product.price}
              </h1>
            </div>

            {/* Auction Only Section */}
            {product.isAuction && (
              <>
                <div className="h-10 w-px bg-white/50" />

                {/* Current Bid */}
                <div className="w-1/3">
                  <h2 className="font-thin">Current Bid</h2>
                  <h1 className="font-semibold">
                    ${product.currentBid}
                  </h1>
                </div>

                <div className="h-10 w-px bg-white/50" />

                {/* Ends In */}
                <div className="w-1/3">
                  <h2 className="font-thin">Ends In</h2>
                  <h1 className="font-semibold">
                    {formatTimeLeft(product.endsAt)}
                  </h1>
                </div>
              </>
            )}

          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;