import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetMyListing } from "@/features/listing/hook";
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

const MyDraftListing = ({
  isFulfilled,
  setIsFulfilled,
  selectedTab,
}: {
  isFulfilled: boolean;
  setIsFulfilled: (value: boolean) => void;
  selectedTab: string;
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [status, setStatus] = useState<"draft" | "pending" | "rejected">(
    "pending",
  );
  const { data, isLoading, isPending } = useGetMyListing(status);
  return (
    <div>
      <div className="bg-[#F7F7F7] p-2 rounded-xl space-x-2 w-fit">
        <Button
          className={`font-semibold w-[130px] max-w-full ${
            status === "draft"
              ? "bg-white text-primary"
              : "bg-transparent text-primary"
          }`}
          onClick={() => setStatus("draft")}
        >
          Unfulfilled
        </Button>
        <Button
          className={`font-semibold w-[130px] max-w-full ${
            status === "pending"
              ? "bg-white text-primary"
              : "bg-transparent text-primary"
          }`}
          onClick={() => setStatus("pending")}
        >
          Pending Approval
        </Button>
        <Button
          className={`font-semibold w-[130px] max-w-full ${
            status === "rejected"
              ? "bg-white text-primary"
              : "bg-transparent text-primary"
          }`}
          onClick={() => setStatus("rejected")}
        >
          Rejected
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-5 max-h-[600px] overflow-y-auto mt-5">
        {(isLoading || isPending) && <Skeleton className="w-full h-24" />}
        {data?.data?.length === 0 ? (
          <div className="col-span-2 flex items-center justify-center text-center">
            No Product Found
          </div>
        ) : (
          data?.data?.map((product: any, index: number) => (
            <ListingCard
              key={index}
              image={product?.images[0]?.location}
              title={product?.title}
              brandName={product?.brandName}
              price={product?.price}
              type={product?.type}
              status={status}
              id={product?._id}
              isDraftShown={product?.isDraftShown}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MyDraftListing;
