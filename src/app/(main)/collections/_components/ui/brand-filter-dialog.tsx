"use client";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";

type Props = {};

const BrandFilterDialog = (props: Props) => {
  const [open, setOpen] = useState(false);
  const brands = [
    "All",
    "Jacobs & Co",
    "Ricard Mille",
    "Bovet",
    "Greubel Forsey",
    "H Moses & Cie",
    "Louis Monne",
  ];
  const [selected, setSelected] = useState<Record<string, boolean>>(() => {
    const map: Record<string, boolean> = {};
    brands.forEach((b) => (map[b] = false));
    return map;
  });

  const toggle = (b: string) => setSelected((s) => ({ ...s, [b]: !s[b] }));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          className="flex items-center justify-between gap-2 border-2 border-border py-3 w-[100px] rounded-xl"
        >
          Brand <ChevronDown size={16} />
        </Button>
      </DialogTrigger>

      <DialogContent
        className="w-[600px] max-w-full p-0"
        showCloseButton={false}
      >
        <div className="w-full flex">
          <div className="w-[250px] border-r p-6 space-y-6">
            <div className="font-semibold p-3 hover:bg-gray-100 transition-all rounded-lg cursor-pointer flex gap-5 items-center justify-between">
              Ultra Luxury <ChevronRight />
            </div>
            <div className="font-semibold p-3 hover:bg-gray-100 transition-all rounded-lg cursor-pointer flex gap-5 items-center justify-between">
              High End Luxury <ChevronRight />
            </div>
            <div className="font-semibold p-3 hover:bg-gray-100 transition-all rounded-lg cursor-pointer flex gap-5 items-center justify-between">
              Luxury <ChevronRight />
            </div>
            <div className="font-semibold p-3 hover:bg-gray-100 transition-all rounded-lg cursor-pointer flex gap-5 items-center justify-between">
              Basic Luxury <ChevronRight />
            </div>
          </div>

          <div className="flex-1 p-6">
            <div className="space-y-8">
              {brands.map((b) => (
                <div key={b} className="flex items-center justify-between">
                  <div>
                    {b}{" "}
                    <span className="text-sm text-muted-foreground">(65)</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={!!selected[b]}
                    onChange={() => toggle(b)}
                    className="h-5 w-5 rounded"
                  />
                </div>
              ))}
            </div>

            <div className="mt-10 flex justify-end gap-3">
              <Button
                variant="ghost"
                onClick={() => setOpen(false)}
                className="bg-gray-100 rounded-full w-[130px]"
              >
                Cancel
              </Button>
              <Button
                onClick={() => setOpen(false)}
                className="rounded-full w-[130px]"
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BrandFilterDialog;
