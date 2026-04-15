import { Button } from "@/components/ui/button";
import { useGetMyListing } from "@/features/listing/hook";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";


type ListingType = "fixed" | "auction" | "taking-offers";

type Fav = {
  id: string;
  title: string;
  user: string;
  price: string;
  image: string;
  type: ListingType;
  isReceived: boolean;
};


const MyListings = ({ productData, isFulfilled, setIsFulfilled, selectedTab }: { productData: any, isFulfilled: boolean, setIsFulfilled: (value: boolean) => void, selectedTab: string }) => {
  const router = useRouter()
  const queryClient = useQueryClient()

  return (
    <div>
      {selectedTab === "draft" && (
        <div className="bg-[#F7F7F7] p-2 rounded-xl space-x-2 w-fit">

          <Button
            className={`font-semibold w-[130px] max-w-full ${!isFulfilled
              ? "bg-white text-primary"
              : "bg-transparent text-primary"
              }`}
            onClick={() => setIsFulfilled(false)}
          >
            Unfulfilled
          </Button>
          <Button
            className={`font-semibold w-[130px] max-w-full ${isFulfilled
              ? "bg-white text-primary"
              : "bg-transparent text-primary"
              }`}
            onClick={() => setIsFulfilled(true)}
          >
            Fulfilled
          </Button>
        </div>

      )}

      <div className="grid grid-cols-2 gap-5 max-h-[600px] overflow-y-auto mt-5">
        {productData?.length === 0 ? (
          <div className="col-span-2 flex items-center justify-center text-center">
            No Product Found
          </div>

        ) : productData?.map((product: any, index: number) => (
          <div className="card p-0 relative overflow-hidden">
            <div onClick={() => {
              queryClient.invalidateQueries({ queryKey: ["get-listing-detail"] })
              router.push(`/fixed-price/${product?._id}`)
            }}
              key={index} className="p-3 cursor-pointer w-full flex items-start gap-3">
              <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-50 shrink-0">
                <Image
                  src={product?.images[0]?.location}
                  alt={product?.title}
                  width={96}
                  height={96}
                  unoptimized
                  className="object-contain w-full h-full"
                />
              </div>

              <div className="flex-1">
                <p className="text-lg font-semibold text-end">${product?.price}</p>
                <p className="text-lg font-medium">{product?.brandName}</p>
              </div>
            </div>

            {!isFulfilled && (
              <div className="p-3 grid grid-cols-2 gap-5">
                <span></span>
                <Button onClick={() => router.push(`/fixed-price/${product?._id}`)}  >
                  {/* <Link href={`/buyer/shipping-details/${product?._id}`} className="w-full"> */}
                  Fill Shipping Details
                  {/* </Link> */}
                </Button>
              </div>
            )}

            <div
              className={`p-3 text-white font-medium text-center  ${product.type === "auction"
                ? "bg-[#415A77]"
                : product.type === "fixed_price"
                  ? "bg-[#778DA9]"
                  : "bg-[#D9B918]"
                }`}
            >
              {product.type === "auction"
                ? "Auction"
                : product.type === "fixed_price"
                  ? "Fixed Price"
                  : "Taking Offers"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyListings;
