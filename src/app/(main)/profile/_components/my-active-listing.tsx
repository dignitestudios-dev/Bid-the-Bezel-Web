import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetMyActiveListing, useGetMyListing } from "@/features/listing/hook";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ListingCard from "./ui/listing-card";

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


const MyActiveListing = ({ isFulfilled, setIsFulfilled, selectedTab }: { isFulfilled: boolean, setIsFulfilled: (value: boolean) => void, selectedTab: string }) => {
  const [status, setStatus] = useState<"active" | "sold">("active")
  const { data, isLoading } = useGetMyListing(status);
  return (
    <div>
  <div className="bg-[#F7F7F7] p-2 rounded-xl space-x-2 w-fit">
        <Button
          className={`font-semibold w-[130px] max-w-full rounded-lg transition ${status === "active"
            ? "bg-white text-black shadow"
            : "bg-transparent text-gray-500"
            }`}
          onClick={() => setStatus("active")}
        >
          Unfulfilled
        </Button>
    
        <Button
          className={`font-semibold w-[130px] max-w-full rounded-lg transition ${status === "sold"
              ? "bg-white text-black shadow"
              : "bg-transparent text-gray-500"
            }`}
          onClick={() => setStatus("sold")}
        >
          Sold
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-5 max-h-[600px] overflow-y-auto mt-5">
        {isLoading && <Skeleton className="w-full h-24" />}
        {data?.data && data?.data?.length === 0 ? (
          <div className="col-span-2 flex items-center justify-center text-center">
            No Product Found
          </div>

        ) : data?.data?.map((product:any, index:any) => (
          <ListingCard key={index}
              image={product?.images[0]?.location}
              title={product?.title}
              brandName={product?.brandName}
              price={product?.price}
              type={product?.type}
              model={product?.model}
              description={product?.description}
              status={product.status}
              id={product?._id}
              isDraftShown={product?.isDraftShown}  />
        ))}
      </div>
    </div>
  );
};

export default MyActiveListing;
