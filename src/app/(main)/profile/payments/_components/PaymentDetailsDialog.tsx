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
  transaction,
}: {
  open: boolean;
  onClose: any;
  transaction?: any;
}) => {
  if (!transaction) return null;

  return (
    <Dialog open={open} onOpenChange={(v) => onClose(v)}>
      <DialogContent  className="w-[700px] [&>button]:hidden max-w-full p-10">
        <DialogHeader>
          <DialogTitle>Payment Details</DialogTitle>
        </DialogHeader>

        <div>
          {transaction.product && 
          <div className="rounded-md border p-4 flex items-center gap-4 mb-6">
            <img
              src="/images/fav.jpg"
              alt="watch"
              className="w-16 h-16 rounded-md object-cover"
            />
            <div className="flex-1">
              <div className="font-medium">{transaction.product?.brandName} {transaction.product?.model}</div>
              <div className=" text-muted-foreground mt-1">
                Ref: {transaction.product?.referenceId}
              </div>
            </div>
            <div className="font-semibold text-lg">${transaction.type === 'credit' ? transaction.netAmount?.toFixed(2) : transaction.amount?.toFixed(2)}</div>
          </div>
}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className=" text-[#0D0D0D]">Payment Amount</div>
            <div className=" font-medium text-right">${transaction.amount?.toFixed(2)}</div>

            {transaction.type === 'credit' && (
              <>
                <div className=" text-[#0D0D0D]">Platform Fee</div>
                <div className=" font-medium text-right">${transaction.platformFee?.toFixed(2)}</div>

                <div className=" text-[#0D0D0D]">Payment Fee</div>
                <div className=" font-medium text-right">${transaction.paymentFee?.toFixed(2)}</div>

                <div className=" text-[#0D0D0D]">Net Amount</div>
                <div className=" font-medium text-right">${transaction.netAmount?.toFixed(2)}</div>
              </>
            )}

            <div className=" text-[#0D0D0D]">Purpose</div>
            <div className=" font-medium text-right capitalize">{transaction.purpose?.replace(/_/g, ' ')}</div>

            <div className=" text-[#0D0D0D]">Date</div>
            <div className=" font-medium text-right">{new Date(transaction.createdAt).toLocaleString()}</div>

            <div className=" text-[#0D0D0D]">Status</div>
            <div className="text-right capitalize">
              <Badge color={transaction.status === "initiated" ? "bg-yellow-100 text-yellow-800" : "bg-emerald-100 text-emerald-800"}>
                {transaction.status}
              </Badge>
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
