"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import MyListings from "../_components/my-active-listing";
import MyOrdersItems from "../_components/MyOrdersItems";
import { useGetMyListing } from "@/features/listing/hook";
import { ListingSkeleton } from "@/components/skeleton";
import MyActiveListing from "../_components/my-active-listing";
import MyDraftListing from "../_components/my-draft-listing";

const MyOrders = () => {
  const [selectedTab, setSelectedTab] = useState<"orders" | "listings" | "draft" | "rejected">(
    "orders"
  );
  const [isFulfilled, setIsFulfilled] = useState(true);
  const status =

    selectedTab === "listings"
      ? "active"
      : isFulfilled
        ? "pending"
        : "draft";





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
        {selectedTab === "draft" && (
          <MyDraftListing selectedTab={selectedTab} isFulfilled={isFulfilled} setIsFulfilled={setIsFulfilled} />
        )}
        {selectedTab === "listings" && (
          <MyActiveListing selectedTab={selectedTab} isFulfilled={isFulfilled} setIsFulfilled={setIsFulfilled} />
        )}
        {selectedTab === "orders" && (
          <MyOrdersItems  />
        )}
      </div>
    </div>
  );
};

export default MyOrders;

