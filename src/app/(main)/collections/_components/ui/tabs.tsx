import { cn } from "@/lib/utils";
import React, { Dispatch, SetStateAction } from "react";

type Props = {
  filter: string;
  setFilter: Dispatch<SetStateAction<"all" | "auction" | "fixed" | "offer">>;
};

const Tabs = ({ filter, setFilter }: Props) => {
  return (
    <div className="bg-[#0D1B2A] rounded-xl w-fit text-sm text-background p-2 text-white">
      <button
        className={cn(
          "px-4 py-2 rounded-xl cursor-pointer transition-all font-semibold",
          filter == "all" && "bg-white text-(--primary)"
        )}
        onClick={() => setFilter("all")}
      >
        All
      </button>
      <button
        className={cn(
          "px-4 py-2 rounded-xl cursor-pointer transition-all font-semibold",
          filter == "auction" && "bg-white text-(--primary)"
        )}
        onClick={() => setFilter("auction")}
      >
        Auction
      </button>
      <button
        className={cn(
          "px-4 py-2 rounded-xl cursor-pointer transition-all font-semibold",
          filter == "fixed" && "bg-white text-(--primary)"
        )}
        onClick={() => setFilter("fixed")}
      >
        Fixed Price{" "}
      </button>
      <button
        className={cn(
          "px-4 py-2 rounded-xl cursor-pointer transition-all font-semibold",
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
