"use client";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

type Props = {};

const AuthFilterDialog = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [unauthenticated, setUnauthenticated] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          className="flex items-center justify-between gap-2 border-2 border-border py-3 w-[160px] rounded-xl"
        >
          Authentication <ChevronDown size={16} />
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[420px] max-w-full p-4" showCloseButton={false}>
        <div className="">
          <div className="p-4 bg-white rounded">
            <label className="flex items-center justify-between w-full">
              <span>Authenticated <span className="text-sm text-muted-foreground">(632)</span></span>
              <input
                type="checkbox"
                checked={authenticated}
                onChange={() => setAuthenticated((s) => !s)}
                className="h-5 w-5 rounded"
              />
            </label>
          </div>

          <div className="p-4 bg-white rounded">
            <label className="flex items-center justify-between w-full">
              <span>Un-Authenticated <span className="text-sm text-muted-foreground">(632)</span></span>
              <input
                type="checkbox"
                checked={unauthenticated}
                onChange={() => setUnauthenticated((s) => !s)}
                className="h-5 w-5 rounded"
              />
            </label>
          </div>

          <div className="pt-3 border-t flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setOpen(false)} className="bg-gray-100 rounded-full w-[130px]">
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)} className="rounded-full w-[130px]">
              Apply
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthFilterDialog;
