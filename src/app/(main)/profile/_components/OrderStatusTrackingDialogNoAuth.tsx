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

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const OrderStatusTrackingDialogNoAuth: React.FC<Props> = ({
  open,
  onOpenChange,
}) => {
  return (
    <Dialog open={open} onOpenChange={(v) => onOpenChange(v)}>
      <DialogContent className="w-[700px] max-w-fit p-5">
        <DialogHeader>
          <DialogTitle>Order Status</DialogTitle>
        </DialogHeader>

        <div className="flex gap-5 mt-4">
          {/* Left timeline */}
          <div className="flex">
            <div className="relative">
              <div className="flex flex-col items-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white border-2 border-[#14A752] flex items-center justify-center text-[#14A752] font-semibold">
                    ✓
                  </div>
                </div>

                <div className="h-10 w-0.5 bg-[#14A752] transform -translate-x-1/2" />

                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white border-2 border-[#14A752] flex items-center justify-center text-[#14A752] font-semibold">
                    ✓
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right details */}
          <div className="">
            <div className="mb-6">
              <h4 className="text-lg font-semibold">Order Booked</h4>
              <p className="text-sm text-muted-foreground">
                Order tracking link:{" "}
                <span className="underline cursor-pointer">
                  www.ordertraking.com/BDG-1243
                </span>
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold">Delivery</h4>
              <p className="text-sm text-muted-foreground">
                After authentication your watch will be delivered to you.
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <div className="flex gap-3 w-full mt-4">
            <Button className="rounded-full flex-1 bg-[#14A752] text-white">
              Mark as Received
            </Button>
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

export default OrderStatusTrackingDialogNoAuth;
