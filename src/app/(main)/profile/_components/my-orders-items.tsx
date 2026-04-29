import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import OrderStatusTrackingDialog from "./order-status-tracking-dialog";
import OrderStatusTrackingDialogNoAuth from "./order-status-tracking-dialog-no-auth";
import { useGetOrders } from "@/features/order/hooks";
import { Skeleton } from "@/components/ui/skeleton";
import LeaveAReviewModal from "../../review/_components/LeaveAReview";

// Dummy data for illustration purposes
type ListingType = "fixed" | "auction" | "taking-offers";


const MyOrdersItems = () => {
  const { data: orders, isLoading } = useGetOrders()
  const [open, setOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [selected, setSelected] = useState<any | null>(null);

  function openDialog(item: any) {
    setSelected(item);
    setOpen(true);
  }

  function openReviewDialog(item: any) {
    setSelectedReview(item);
    setReviewOpen(true);
  }

  // function openDialogNoAuth(item: TrackingHistory) {
  //   setSelected(item);
  //   setOpenNoAuth(true);
  // }
  if (isLoading) {
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
                  <p className="text-lg font-medium">{item?.product?.model}</p>
                </div>
              </div>

              <div className="p-3 flex justify-end gap-3">
                {item?.status === "delivered" && !item?.isReviewSubmitted &&
                  (
                    <Button className="w-[200px]" variant={'secondary'} onClick={() => openReviewDialog(item)}>
                      Leave A Review
                    </Button>

                  )}
                <Button className="w-[200px]" onClick={() => openDialog({
                  orderItem: item,
                  trackingHistory: item?.trackingHistory,
                })}>
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
      <LeaveAReviewModal selectedReview={selectedReview} open={reviewOpen} onOpenChange={setReviewOpen} />

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
