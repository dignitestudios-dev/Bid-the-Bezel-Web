"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import Logout from "../icons/Logout";

type LogoutDialogProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onConfirm?: () => void;
};

const LogoutDialog = ({ open, onOpenChange, onConfirm }: LogoutDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <div className="flex flex-col items-center text-center">
          <div className="mb-4">
            <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center">
              <div className="text-red-600">
                <div className="rotate-180">
                  <Logout color="red" />
                </div>{" "}
              </div>
            </div>
          </div>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">Log Out</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              Volutpat pretium blandit amet ac tempor nulla hendrerit ultricies.
              Aenean in quis faucibus purus at.
            </AlertDialogDescription>
          </AlertDialogHeader>
        </div>

        <AlertDialogFooter className="w-full grid grid-cols-2 gap-4">
          <AlertDialogCancel
            className="mr-2 w-full"
            onClick={() => onOpenChange?.(false)}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="w-full bg-red-600 text-white"
            onClick={() => {
              onConfirm?.();
              onOpenChange?.(false);
            }}
          >
            Log Out
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutDialog;
