import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import OrderStatusTrackingDialog from "./order-status-tracking-dialog";
import OrderStatusTrackingDialogNoAuth from "./order-status-tracking-dialog-no-auth";
import { useGetOrders } from "@/features/order/hooks";
import { Skeleton } from "@/components/ui/skeleton";

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
  isAuthenticated: boolean;
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
    isAuthenticated: true,
  },
  {
    id: "2",
    title: "Rolex Submariner Date",
    user: "WatchCollector",
    price: "$1,250.00",
    image: "/images/fav.jpg",
    type: "auction",
    isReceived: false,
    isAuthenticated: false,
  },
  {
    id: "3",
    title: "Patek Philippe Nautilus",
    user: "LuxuryHub",
    price: "$3,500",
    image: "/images/fav.jpg",
    type: "auction",
    isReceived: false,
    isAuthenticated: true,
  },
  {
    id: "4",
    title: "Omega Speedmaster Moonwatch",
    user: "TimeVault",
    price: "$980.00",
    image: "/images/fav.jpg",
    type: "taking-offers",
    isReceived: true,
    isAuthenticated: false,
  },
  {
    id: "5",
    title: "Cartier Santos Large",
    user: "EliteWatches",
    price: "$1,120.00",
    image: "/images/fav.jpg",
    type: "fixed",
    isReceived: false,
    isAuthenticated: true,
  },
  {
    id: "6",
    title: "Cartier Santos Large",
    user: "EliteWatches",
    price: "$1,120.00",
    image: "/images/fav.jpg",
    type: "fixed",
    isReceived: false,
    isAuthenticated: false,
  },
];

const MyOrdersItems = () => {
  const { data: orders, isLoading } = useGetOrders()
  const [open, setOpen] = useState(false);
  const [openNoAuth, setOpenNoAuth] = useState(false);
console.log(orders)
  const [selected, setSelected] = useState<TrackingHistory[] | null>(null);

  function openDialog(item: TrackingHistory[]) {
    setSelected(item);
    setOpen(true);
  }

  // function openDialogNoAuth(item: TrackingHistory) {
  //   setSelected(item);
  //   setOpenNoAuth(true);
  // }
if(isLoading){
  return <Skeleton className="w-full h-24" />
}
  return (
    <>
      <div className="grid grid-cols-2 gap-5 max-h-[600px] overflow-y-auto">
        {!isLoading && orders?.data?.length === 0 ?
          <div className="col-span-2 text-center">No Orders Yet</div>
          :
          orders?.data?.map((item: Order, index: number) => (
            <div
              key={`${item._id}-${index}`}
              className="card p-0 relative overflow-hidden"
            >
              {/* {item?.isReceived && (
                <div className="absolute top-5 -left-[52px] -rotate-45 w-[180px] text-center py-1 bg-[#14A752] border-b-2 font-medium text-white border-[#E3E3E3]">
                  Received
                </div>
              )} */}

              <div className="p-3 w-full flex items-start gap-3">
                <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-50 shrink-0">
                  <Image
                    src={item?.product?.images?.[0]?.location}
                    alt={item?.product?.brandName}
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                </div>

                <div className="flex-1">
                  <p className="text-lg font-semibold text-end">{item?.product?.price}</p>
                  <p className="text-lg font-medium">{item?.product?.brandName}</p>
                </div>
              </div>

              <div className="p-3 flex justify-end">
                <Button className="w-[200px]" onClick={() => openDialog(item?.trackingHistory)}>
                  Track
                </Button>
              </div>

              <div
                className={`p-3 text-white font-medium text-center  ${item?.product?.type === "auction"
                  ? "bg-[#415A77]"
                  : item?.product?.type === "fixed_price"
                    ? "bg-[#778DA9]"
                    : "bg-[#D9B918]"
                  }`}
              >
                {item?.product?.type === "auction"
                  ? "Auction"
                  : item?.product?.type === "fixed_price"
                    ? "Marketplace"
                    : "Taking Offers"}
              </div>
            </div>
          ))}
      </div>

      <OrderStatusTrackingDialog
        open={open}
        item={selected!}
        onOpenChange={(v) => {
          if (!v) setSelected(null);
          setOpen(v);
        }}
      />

      {/* <OrderStatusTrackingDialogNoAuth
        open={openNoAuth}
        onOpenChange={(v) => {
          if (!v) setSelected(null);
          setOpenNoAuth(v);
        }}
      /> */}
    </>
  );
};

export default MyOrdersItems;
