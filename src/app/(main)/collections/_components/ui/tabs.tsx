import { cn } from "@/lib/utils";
import React, { Dispatch, SetStateAction } from "react";

type Props = {
  filter: string;
  setFilter: any;
};

const Tabs = ({ filter, setFilter }: Props) => {
  return (
    <div className="bg-[#0D1B2A] rounded-lg sm:rounded-xl w-fit text-sm text-background p-1 sm:p-2 text-white">
      <button
        className={cn(
          "px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl cursor-pointer transition-all font-semibold text-xs sm:text-base",
          filter == "all" && "bg-white text-primary"
        )}
        onClick={() => setFilter("all")}
      >
        All
      </button>
      <button
        className={cn(
          "px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl cursor-pointer transition-all font-semibold text-xs sm:text-base",
          filter == "auction" && "bg-white text-(--primary)"
        )}
        onClick={() => setFilter("auction")}
      >
        Auction
      </button>
      <button
        className={cn(
          "px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl cursor-pointer transition-all font-semibold text-xs sm:text-base",
          filter == "fixed" && "bg-white text-(--primary)"
        )}
        onClick={() => setFilter("fixed")}
      >
        Fixed Price{" "}
      </button>
      <button
        className={cn(
          "px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl cursor-pointer transition-all font-semibold text-xs sm:text-base",
          filter == "offer" && "bg-white text-(--primary)"
        )}
        onClick={() => setFilter("offer")}
      >
        Taking Offers
      </button>
    </div>
  );
};

export default Tabs;
