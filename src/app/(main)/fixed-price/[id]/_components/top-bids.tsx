import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Crown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const bids = [
  {
    name: "Guessmyusername",
    time: "11:12:22 AM",
    amount: "$702.87",
    top: true,
  },
  { name: "Arandomuser", time: "11:12:22 AM", amount: "$902.87" },
  { name: "Justabidder", time: "11:12:22 AM", amount: "$1287.87" },
  { name: "Anotherparticipant", time: "11:13:10 AM", amount: "$675.50" },
  { name: "UserX123", time: "11:13:45 AM", amount: "$1450.00" },
  { name: "BidMaster88", time: "11:14:01 AM", amount: "$230.00" },
  { name: "CompetitiveBidder", time: "11:14:30 AM", amount: "$320.75" },
  { name: "SmartInvestor", time: "11:15:10 AM", amount: "$500.99" },
  { name: "DailyBidder", time: "11:15:45 AM", amount: "$1255.50" },
];

function BidsList({ bidsToShow }: { bidsToShow: typeof bids }) {
  return (
    <div className="space-y-3">
      {bidsToShow.map((bid, idx) => (
        <div
          key={idx}
          className="grid grid-cols-[1fr_auto_auto] items-center gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-200" />
            <div className="flex items-center gap-1">
              {bid.top && <Crown className="w-4 h-4 text-yellow-500" />}
              <p className="text-sm font-medium">{bid.name}</p>
            </div>
          </div>
          {/* <p className="text-xs text-muted-foreground text-right">{bid.time}</p> */}
          <p className="text-sm font-semibold text-right">{bid.amount}</p>
        </div>
      ))}
    </div>
  );
}

export default function TopBids() {
  const [currentPage, setCurrentPage] = useState(1);
  const bidsPerPage = 10;

  const totalPages = Math.ceil(bids.length / bidsPerPage);
  const startIndex = (currentPage - 1) * bidsPerPage;
  const currentBids = bids.slice(startIndex, startIndex + bidsPerPage);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="w-full rounded-xl border border-[#E3E3E3]">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold">Recent Top Bids</h3>
            <span className="w-2 h-2 rounded-full bg-green-500" />
          </div>
        </div>

        <BidsList bidsToShow={bids.slice(0, 3)} />

        <div className="mt-4 pt-3 border-t">
          <h1 className="text-xl font-semibold mb-3">All Bidders</h1>
          <div className="flex items-center justify-between">
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full border bg-gray-200"
                />
              ))}
              <div className="w-7 h-7 rounded-full border bg-gray-100 flex items-center justify-center text-xs">
                +191
              </div>
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
                  <h1>User</h1> <h2>bids</h2>{" "}
                </div>
                <BidsList bidsToShow={currentBids} />

                {/* Pagination */}
                <div className="flex justify-center text-sm items-center mt-4 gap-3">
                  <button
                    className="px-3 py-1 border flex items-center rounded disabled:opacity-50"
                    disabled={currentPage === 1}
                    onClick={() => goToPage(currentPage - 1)}
                  >
                    <ChevronLeft size={14} /> Back
                  </button>

                  {/* Page numbers */}
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
