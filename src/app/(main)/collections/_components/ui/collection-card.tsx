"use client";
import { useMe } from "@/features/auth/hooks";
import { useAddProductToFavorite } from "@/features/fav-product/hook";
import { showError, showSuccess } from "@/lib/toast";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

type Props = any;
const typeRouteMap: Record<string, string> = {
  fixed_price: "fixed-price",
  auction: "auction",
  taking_offers: "taking-offer",
};
const CollectionCard = (props: Props) => {
  const [isFav, setIsFav] = useState(props?.watch?.isFavorite);
  const watch = props.watch;
  const { data: userData } = useMe()

  const { mutate: addProductToFavorite, isPending } = useAddProductToFavorite(watch?._id || "");
  const handleAddToFavorite = () => {
    if (!userData?.data) return showError("Please login to add product to favorites");
    addProductToFavorite(undefined, {
      onSuccess: () => {
        setIsFav((prev: boolean) => !prev);
        showSuccess(
          isFav
            ? "Product removed from favorites"
            : "Product added to favorites"
        );

      },
    });
  };
  return (
    <Link href={`/${typeRouteMap[watch?.type]}/${watch?._id}`}>
      <div className="flex flex-col h-full bg-[#F7F7F7] border border-gray-200 rounded-xl p-4">
        <div className="relative w-full">
          {watch.isAuthenticated && (
            <div className="rounded-full absolute top-2 left-2 text-white bg-black/40 px-3 py-1 text-sm bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
              Authenticated
            </div>
          )}
          {watch.type === "auction" && (
            <div className="rounded-tl-sm absolute bottom-0 right-0 p-3 text-center text-white bg-black/10 px-3 text-sm bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 rounded-br-xl">
              <h2>Ends In</h2>
              <h1 className="font-semibold">2D 5H 42M</h1>
            </div>
          )}
          <div className="relative w-full h-[220px]">
            <Image
              src={watch.images[0]?.location || "/images/watch.png"}
              alt="img"
              fill
              className="object-cover rounded-xl"
              unoptimized
            />
          </div>
        </div>
        <div className="pt-4">
          <h1 className="text-lg font-semibold mb-2 truncate">{watch?.brandName} {watch.model}</h1>
          <div className="flex justify-between gap-4">
            <div>
              <h2 className="text-sm">
                {watch?.type === "fixed_price" ? "Price" : "Starting Price"}
              </h2>{" "}
              <h1 className="font-semibold text-lg">
                {/* ${watch.basePrice || watch.price || watch.expectedPrice} */}
                ${watch?.price}
              </h1>
            </div>
            {watch.type === "auction" && (
              <>
                <div className="w-px bg-gray-400 " />
                <div>
                  <h2 className="text-sm">Current Bid</h2>{" "}
                  <h1 className="font-semibold text-lg">
                    ${watch?.auction.currentBidAmount || "0"}
                  </h1>
                </div>
              </>
            )}
            <div className="">
              <button
                disabled={isPending}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleAddToFavorite();
                }}
                className={` w-10 h-10 rounded-lg flex cursor-pointer items-center justify-center 
                    bg-white/30  transition-all duration-300
                    ${isFav ? "scale-110" : "scale-100"}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={isFav ? "red" : "none"}
                  viewBox="0 0 24 24"
                  stroke="red"
                  strokeWidth={1}
                  className={`w-7 h-7 transition-all duration-300 ${isFav ? "animate-ping-once" : ""
                    }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.687-4.5-1.935 0-3.597 1.126-4.313 2.733-.716-1.607-2.378-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CollectionCard;
