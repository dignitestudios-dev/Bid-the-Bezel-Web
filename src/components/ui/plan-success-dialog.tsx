"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { CheckCircle2 } from "lucide-react";

type PlanSuccessDialogProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const PlanSuccessDialog = ({
  open,
  onOpenChange,
}: PlanSuccessDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="rounded-2xl max-w-[400px] backdrop-blur-sm bg-white/95">
        <div className="flex flex-col items-center text-center py-6">
          {/* Icon with Animation */}
          <div className="mb-6">
            <div className="w-20 h-20 bg-[#415A77]/10 rounded-full flex items-center justify-center animate-in zoom-in duration-500">
              <div className="w-16 h-16 bg-[#415A77] rounded-full flex items-center justify-center animate-ping-once">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          <AlertDialogHeader>
            <AlertDialogTitle className="text-center text-2xl font-bold text-[#0D1B2A]">
              Payment Successful
            </AlertDialogTitle>

            <AlertDialogDescription className="text-center text-base text-gray-600 mt-2 px-4">
              Your subscription has been activated. You can now start listing your watches and managing your bids.
            </AlertDialogDescription>
          </AlertDialogHeader>
        </div>

        <div className="w-full pt-2">
          <AlertDialogAction
            className="w-full bg-[#0D1B2A] hover:bg-[#1B263B] text-white py-6 rounded-xl text-lg font-semibold transition-all duration-200 active:scale-[0.98]"
            onClick={() => onOpenChange?.(false)}
          >
            Continue to Dashboard
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>

  );
};

export default PlanSuccessDialog;