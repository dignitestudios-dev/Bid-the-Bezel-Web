import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import OrderStatusTrackingDialog from "./OrderStatusTrackingDialog";

// Dummy data for illustration purposes
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

const items: Fav[] = [
  {
    id: "1",
    title: "Audemars Piguet Royal Oak",
    user: "Arandomuser",
    price: "$765.76",
    image: "/images/fav.jpg",
    type: "fixed",
    isReceived: true,
  },
  {
    id: "2",
    title: "Rolex Submariner Date",
    user: "WatchCollector",
    price: "$1,250.00",
    image: "/images/fav.jpg",
    type: "auction",
    isReceived: false,
  },
  {
    id: "3",
    title: "Patek Philippe Nautilus",
    user: "LuxuryHub",
    price: "$3,500",
    image: "/images/fav.jpg",
    type: "auction",
    isReceived: false,
  },
  {
    id: "4",
    title: "Omega Speedmaster Moonwatch",
    user: "TimeVault",
    price: "$980.00",
    image: "/images/fav.jpg",
    type: "taking-offers",
    isReceived: true,
  },
  {
    id: "5",
    title: "Cartier Santos Large",
    user: "EliteWatches",
    price: "$1,120.00",
    image: "/images/fav.jpg",
    type: "fixed",
    isReceived: false,
  },
  {
    id: "5",
    title: "Cartier Santos Large",
    user: "EliteWatches",
    price: "$1,120.00",
    image: "/images/fav.jpg",
    type: "fixed",
    isReceived: false,
  },
];

const MyOrdersItems = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Fav | null>(null);

  function openDialog(item: Fav) {
    setSelected(item);
    setOpen(true);
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-5 max-h-[600px] overflow-y-auto">
        {items.map((it, index) => (
          <div
            key={`${it.id}-${index}`}
            className="card p-0 relative overflow-hidden"
          >
            {it.isReceived && (
              <div className="absolute top-5 -left-[52px] -rotate-45 w-[180px] text-center py-1 bg-[#14A752] border-b-2 font-medium text-white border-[#E3E3E3]">
                Received
              </div>
            )}

            <div className="p-3 w-full flex items-start gap-3">
              <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-50 shrink-0">
                <Image
                  src={it.image}
                  alt={it.title}
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="flex-1">
                <p className="text-lg font-semibold text-end">{it.price}</p>
                <p className="text-lg font-medium">{it.title}</p>
              </div>
            </div>

            <div className="p-3 grid grid-cols-2 gap-5">
              <Button variant={"outline"}>Track Courier</Button>
              <Button onClick={() => openDialog(it)}>Track</Button>
            </div>

            <div
              className={`p-3 text-white font-medium text-center  ${
                it.type === "auction"
                  ? "bg-[#415A77]"
                  : it.type === "fixed"
                  ? "bg-[#778DA9]"
                  : "bg-[#D9B918]"
              }`}
            >
              {it.type === "auction"
                ? "Auction"
                : it.type === "fixed"
                ? "Fixed"
                : "Taking Offers"}
            </div>
          </div>
        ))}
      </div>

      <OrderStatusTrackingDialog
        open={open}
        onOpenChange={(v) => {
          if (!v) setSelected(null);
          setOpen(v);
        }}
      />
    </>
  );
};

export default MyOrdersItems;
