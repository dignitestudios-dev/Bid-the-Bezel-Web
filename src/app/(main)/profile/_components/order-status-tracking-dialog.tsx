import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMarkAsReceived } from "@/features/order/hooks";
interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: any;
}

const OrderStatusTrackingDialog: React.FC<Props> = ({ open, onOpenChange, item }) => {
  const { mutate: markAsReceived, isPending } = useMarkAsReceived(item?.orderItem?._id)

  return (
    <Dialog open={open} onOpenChange={(v) => onOpenChange(v)}>
      <DialogContent className="w-[700px] max-w-fit p-5">
        <DialogHeader>
          <DialogTitle>Order Status</DialogTitle>
        </DialogHeader>
        <div className="flex gap-5 mt-4">
          {/* Left timeline (static as you want) */}
          <div className="flex">
            <div className="relative">
              <div className="flex flex-col items-center">
                {item?.trackingHistory?.map((step: any, idx: number) => (
                  <React.Fragment key={idx}>
                    <div className="flex flex-col items-center gap-2">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold
              ${step?.isMarked
                            ? "bg-green-600 border-2 border-[#14A752] text-white"
                            : "bg-white border-2 border-[#14A752] text-[#14A752]"
                          }`}
                      >
                        {step?.isMarked ? "✓" : "✓"}
                      </div>
                    </div>

                    {idx !== item?.trackingHistory?.length - 1 && (
                      <div
                        className={`h-10 w-0.5 transform -translate-x-1/2
              ${step?.isMarked ? "bg-[#14A752]" : "bg-gray-300"
                          }`}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          <div>
            {item?.trackingHistory?.map((i: any, idx: number) => (
              <div key={idx} className="mb-6">
                <h4 className="text-lg font-semibold capitalize">
                  {i?.status?.replace("_", " ")}
                </h4>

                <p className="text-sm text-muted-foreground">
                  {i?.status === "order_booked" ? (
                    <p className="text-sm text-muted-foreground">
                      Order tracking link:{" "}
                      <a
                        href={i?.trackingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline cursor-pointer"
                      >
                        {i?.trackingLink}
                      </a>
                    </p>
                  ) : i?.status === "authentication"
                    ? "Your Watch will be authenticated by us"
                    : "After authentication your watch will be delivered to you."}
                </p>
              </div>
            ))}
          </div>
        </div>
        <DialogFooter>
          <div className="flex gap-3 w-full ">
            {(item?.orderItem?.status === "shipped" ||
              item?.orderItem?.status === "pending") && (
                <Button
                  disabled={isPending || !item?.orderItem?.allowMarkAsRecieved}
                  onClick={() =>
                    markAsReceived(
                      { orderId: item?.orderItem?._id },
                      {
                        onSuccess: () => {
                          onOpenChange(false);
                        },
                      }
                    )
                  }
                  className="rounded-full flex-1 bg-[#14A752] text-white "
                >
                  {isPending ? "Marking as received..." : "Mark as Received"}
                </Button>
              )}
            <Button
              variant={"outline"}
              className="flex-1 rounded-full"
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderStatusTrackingDialog;
