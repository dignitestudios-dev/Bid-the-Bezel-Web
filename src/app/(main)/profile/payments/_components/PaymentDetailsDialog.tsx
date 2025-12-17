import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import Badge from "./Badge";
import { Button } from "@/components/ui/button";

const PaymentDetailsDialog = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: any;
}) => {
  return (
    <Dialog open={open} onOpenChange={(v) => onClose(v)}>
      <DialogContent className="w-[700px] max-w-full p-10">
        <DialogHeader>
          <DialogTitle />
        </DialogHeader>

        <div>
          <div className="rounded-md border p-4 flex items-center gap-4 mb-6">
            <img
              src="/images/fav.jpg"
              alt="watch"
              className="w-16 h-16 rounded-md object-cover"
            />
            <div className="flex-1">
              <div className="font-medium">Audemars Piguet Royal Oak</div>
              <div className=" text-muted-foreground flex items-center gap-2 mt-1">
                <div className="w-6 h-6 rounded-full overflow-hidden">
                  <img
                    src="/images/user2.jpg"
                    alt="user"
                    className="w-full h-full object-cover"
                  />
                </div>
                Arandomuser
              </div>
            </div>
            <div className="font-semibold text-lg">$765.76</div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className=" text-[#0D0D0D]">Payment Amount</div>
            <div className=" font-medium text-right">$18</div>

            <div className=" text-[#0D0D0D]">Date</div>
            <div className=" font-medium text-right">12 Jan 2024, 12:31pm</div>

            <div className=" text-[#0D0D0D]">Status</div>
            <div className="text-right">
              <Badge color="bg-yellow-100 text-yellow-800">On Hold</Badge>
            </div>
          </div>

          <DialogFooter>
            <div className="w-full">
              <Button
                onClick={onClose}
                className="w-full h-12 rounded-full bg-gray-100 text-black"
              >
                Close
              </Button>
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDetailsDialog;
