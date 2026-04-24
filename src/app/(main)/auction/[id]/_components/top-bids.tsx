import React from "react";
import { ChevronLeft, ChevronRight, Crown, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

function BidsList({
  bidsToShow,
  time,
  topBidAmount,
  isLoading = false,
}: {
  bidsToShow: Bid[];
  time: boolean;
  isLoading?: boolean;
  topBidAmount?: number;
}) {
  return (
    <div className="space-y-3">
      {isLoading&& (
        <div className="text-center py-10">
          <Loader2 className="animate-spin mx-auto" size={24} />
        </div>
      )}
      {bidsToShow.map((bid, idx) => (
        <div
          key={idx}
          className="grid grid-cols-[1fr_auto_auto] items-center gap-4"
        >
          <div className="flex items-center gap-3">
            {bid.currentBidder?.profilePicture?.location ? (
              <Image
                src={bid.currentBidder.profilePicture.location}
                alt={bid.currentBidder.userName}
                width={32}
                height={32}
                className="w-5 h-5 md:w-8 md:h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-5 h-5 md:w-8 md:h-8 rounded-full bg-gray-200" />
            )}
            <div className="flex items-center gap-1">
              {idx == 0 && (
                <Crown className="h-3 w-3 md:w-4 md:h-4 text-yellow-500" />
              )}
              <p className="md:text-base text-sm font-medium">
                {bid.currentBidder?.userName}
              </p>
            </div>
          </div>

          {time && (
            <p className="text-xs md:text-sm text-right">
              {new Date(bid.bidPlacedAt).toLocaleTimeString()}
            </p>
          )}

          <p className="text-xs md:text-sm font-semibold text-right">
            ${bid.amount}+
          </p>
        </div>
      ))}
    </div>
  );
}

export default function TopBids({
  topBids,
  paginatedBids,
  pagination,
  currentPage,
  paginatedBidsLoading,
  setCurrentPage,
}: {
  topBids: Bid[];
  paginatedBids: Bid[];
  paginatedBidsLoading: boolean;
  pagination?: {
    totalItems: number;
    totalPages: number;
  };
  currentPage: number;
  setCurrentPage: (page: number) => void;
}) {
  const totalItems = pagination?.totalItems ?? 0;
  const totalPages = pagination?.totalPages ?? 1;
  const topBidAmount = topBids?.[0]?.amount;

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="w-full rounded-xl border border-[#E3E3E3]">
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">Recent Top Bids</h3>
            <span className="w-2 h-2 rounded-full bg-green-500" />
          </div>
        </div>

        <BidsList
          bidsToShow={topBids}
          time={true}
          topBidAmount={topBidAmount}
        />

        <div className="mt-4 pt-3 border-t">
          <h1 className="text-xl font-semibold mb-3">All Bidders</h1>

          <div className="flex items-center justify-between">
            {/* Avatars (use topBids or paginatedBids — your choice) */}
            <div className="flex -space-x-2">
              {topBids?.slice(0, 5).map((bid, i) => {
                const img = bid.currentBidder?.profilePicture?.location;

                return img ? (
                  <Image
                    key={i}
                    src={img}
                    alt={bid.currentBidder?.userName || "bidder"}
                    width={28}
                    height={28}
                    className="w-7 h-7 rounded-full border object-cover"
                  />
                ) : (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full border bg-gray-200"
                  />
                );
              })}

              {totalItems > 5 && (
                <div className="w-7 h-7 rounded-full border bg-gray-100 flex items-center justify-center text-xs">
                  +{totalItems - 5}
                </div>
              )}
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <button className="text-sm font-semibold text-primary">
                  View All
                </button>
              </DialogTrigger>

              <DialogContent className="max-w-md!">
                <DialogHeader>
                  <DialogTitle>All Bidders</DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-[1fr_auto_auto] font-semibold items-center gap-4">
                  <h1>User</h1>
                  <h2>bids</h2>
                </div>

                {/* PAGINATED DATA */}
                <BidsList
                  bidsToShow={paginatedBids}
                  time={false}
                  topBidAmount={topBidAmount}
                  isLoading={paginatedBidsLoading}
                />
                <div className="flex justify-center text-sm items-center mt-4 gap-3">
                  <button
                    className="px-3 py-1 border flex items-center rounded disabled:opacity-50"
                    disabled={currentPage === 1}
                    onClick={() => goToPage(currentPage - 1)}
                  >
                    <ChevronLeft size={14} /> Back
                  </button>

                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      className={`px-3 py-1 border rounded ${
                        currentPage === i + 1
                          ? "bg-primary text-white"
                          : "bg-white text-black"
                      }`}
                      onClick={() => goToPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    className="px-3 py-1 border flex items-center rounded disabled:opacity-50"
                    disabled={currentPage === totalPages}
                    onClick={() => goToPage(currentPage + 1)}
                  >
                    Next <ChevronRight size={14} />
                  </button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}