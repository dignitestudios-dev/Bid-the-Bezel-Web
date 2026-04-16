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
      <AlertDialogContent className="rounded-2xl">
        <div className="flex flex-col items-center text-center py-4">
          {/* Icon */}
          <div className="mb-4">
            <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
          </div>

          {/* Header */}
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center text-xl font-semibold">
              Payment Successful
            </AlertDialogTitle>

            <AlertDialogDescription className="text-center text-sm text-gray-500 mt-2">
              Your subscription has been activated successfully.
            </AlertDialogDescription>
          </AlertDialogHeader>
        </div>

        {/* Single Action Button */}
        <div className="w-full">
          <AlertDialogAction
            className="w-full bg-[#25313F] hover:bg-[#25313F]/90 text-white rounded-xl"
            onClick={() => onOpenChange?.(false)}
          >
            Continue
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PlanSuccessDialog;