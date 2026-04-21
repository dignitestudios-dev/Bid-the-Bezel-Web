"use client";
import { useState } from "react";
import MyOrdersItems from "../_components/MyOrdersItems";
import MyActiveListing from "../_components/my-active-listing";
import MyDraftListing from "../_components/my-draft-listing";
import MyDeletedListing from "../_components/my-deleted-listing";

const MyOrders = () => {
  const [selectedTab, setSelectedTab] = useState<"orders" | "listings" | "draft" | "rejected" | "deleted">(
    "orders"
  );
  const [isFulfilled, setIsFulfilled] = useState(true);

  selectedTab === "listings"
    ? "active"
    : selectedTab === "deleted"
      ? "deleted"
      : selectedTab === "draft"
        ? "draft"
        : isFulfilled
          ? "pending"
          : "";




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
        <button
          className={`border-b-[3px] cursor-pointer ${selectedTab === "deleted" ? "border-primary" : "border-transparent"
            } font-medium text-primary pb-2 transition-all`}
          onClick={() => {
            setSelectedTab("deleted")
            setIsFulfilled(true)
          }}
        >
          Deleted
        </button>
      </div>

      <div className="w-full pt-6">
        {selectedTab === "draft" && (
          <MyDraftListing selectedTab={selectedTab} isFulfilled={isFulfilled} setIsFulfilled={setIsFulfilled} />
        )}
        {selectedTab === "listings" && (
          <MyActiveListing selectedTab={selectedTab} isFulfilled={isFulfilled} setIsFulfilled={setIsFulfilled} />
        )}
        {selectedTab === "deleted" && (
          <MyDeletedListing
            selectedTab={selectedTab}
            isFulfilled={isFulfilled}
            setIsFulfilled={setIsFulfilled}
          />
        )}
        {selectedTab === "orders" && (
          <MyOrdersItems />
        )}
      </div>
    </div>
  );
};

export default MyOrders;

