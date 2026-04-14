"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import MyListings from "../_components/MyListings";
import MyOrdersItems from "../_components/MyOrdersItems";
import { useGetMyListing } from "@/features/listing/hook";
import { ListingSkeleton } from "@/components/skeleton";

const MyOrders = () => {
  const [selectedTab, setSelectedTab] = useState<"orders" | "listings" | "draft">(
    "orders"
  );
  const [isFulfilled, setIsFulfilled] = useState(true);
  const status =

    selectedTab === "listings"
      ? "active"
      : isFulfilled
        ? "pending"
        : "draft";

  const { data, isLoading } = useGetMyListing(status);



  return (
    <div className="card">
      <div className="flex items-center gap-4 border-b-2">
        <button
          className={`border-b-[3px] cursor-pointer ${selectedTab === "orders" ? "border-primary" : "border-transparent"
            } font-medium text-primary pb-2 transition-all`}
          onClick={() => setSelectedTab("orders")}
        >
          My Orders
        </button>
        <button
          className={`border-b-[3px] cursor-pointer ${selectedTab === "listings" ? "border-primary" : "border-transparent"
            } font-medium text-primary pb-2 transition-all`}
          onClick={() => setSelectedTab("listings")}
        >
          My Listings
        </button>
        <button
          className={`border-b-[3px] cursor-pointer ${selectedTab === "draft" ? "border-primary" : "border-transparent"
            } font-medium text-primary pb-2 transition-all`}
          onClick={() => {
            setSelectedTab("draft")
            setIsFulfilled(true)
          }}
        >
          Drafts
        </button>
      </div>

      <div className="w-full pt-6">
        {selectedTab === "orders" ? (
          <MyOrdersItems />
        ) : selectedTab === "listings" || selectedTab === "draft" ? (
          isLoading ? (
            <ListingSkeleton />
          ) : (

            <MyListings selectedTab={selectedTab} productData={data?.data} isFulfilled={isFulfilled} setIsFulfilled={setIsFulfilled} />
          )
        ) : null}
      </div>
    </div>
  );
};

export default MyOrders;

