import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

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
const MyListings = () => {
  const [isFulfilled, setIsFulfilled] = useState<boolean>(true);
  return (
    <div>
      <div className="bg-[#F7F7F7] p-2 rounded-xl space-x-2 w-fit">
        <Button
          className={`font-semibold w-[130px] max-w-full ${
            !isFulfilled
              ? "bg-white text-primary"
              : "bg-transparent text-primary"
          }`}
          onClick={() => setIsFulfilled(false)}
        >
          Unfulfilled
        </Button>
        <Button
          className={`font-semibold w-[130px] max-w-full ${
            isFulfilled
              ? "bg-white text-primary"
              : "bg-transparent text-primary"
          }`}
          onClick={() => setIsFulfilled(true)}
        >
          Fulfilled
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-5 max-h-[600px] overflow-y-auto mt-5">
        {items.map((it, index) => (
          <div className="card p-0 relative overflow-hidden">
            <div key={index} className="p-3 w-full flex items-start gap-3">
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

            {!isFulfilled && (
              <div className="p-3 grid grid-cols-2 gap-5">
                <span></span>
                <Button>
                  <Link
                    href={"/seller/shipping-details-auth"}
                    className="w-full"
                  >
                    Fill Shipping Details
                  </Link>
                </Button>
              </div>
            )}

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
    </div>
  );
};

export default MyListings;
