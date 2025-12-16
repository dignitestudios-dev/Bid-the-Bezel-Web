"use client"
import { Star } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

const Reviews = () => {
    const [open, setOpen] = useState(false);
  const ratings = [
    { star: 5, percent: 90 },
    { star: 4, percent: 40 },
    { star: 3, percent: 20 },
    { star: 2, percent: 10 },
    { star: 1, percent: 5 },
  ];

  return (
    <div className="w-full rounded-xl border">

      <div className="flex justify-between items-center font-semibold gap-2 border-b px-4 rounded-t-xl bg-[#F7F7F7] p-2">
        <h1 className="text-sm flex gap-2 items-center">
          <Star size={18} /> Rating & Reviews
        </h1>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="text-sm hover:underline">
              View All
            </button>
          </DialogTrigger>

          <DialogContent className="  w-full p-0">
            <DialogHeader className="border-b px-6 py-4">
              <DialogTitle>Rating And Reviews</DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-3 gap-6 p-6">
              <div>
                <h2 className="text-4xl font-bold">4.5</h2>
                <div className="flex gap-1 my-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-500">419 Reviews</p>
              </div>
              <div className="col-span-2 space-y-2">
                {ratings.map((item) => (
                  <div key={item.star} className="flex items-center gap-3">
                    <span className="w-4 text-sm">{item.star}</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full"
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <ScrollArea className="h-[300px] px-6">
              <div className="space-y-6">
                {[1, 2, 3].map((_, i) => (
                  <div key={i}>
                    <div className="flex items-center gap-1 mb-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className="fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="text-sm font-medium">
                      Anonymous – <span className="text-gray-500">4 days ago</span>
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Lorem ipsum dolor sit amet consectetur. Sed consequat
                      suspendisse diam nibh habitant urna purus sollicitudin.
                    </p>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <DialogFooter className="border-t px-6 py-4">
              <Button onClick={() => setOpen(false)} variant="outline">Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-4xl font-bold">4.5</h2>
          <span className="text-yellow-400 text-lg">★</span>
          <span className="text-sm text-gray-500">419 Reviews</span>
        </div>

        <div className="space-y-2">
          {ratings.map((item) => (
            <div key={item.star} className="flex items-center gap-2">
              <span className="w-4 text-sm text-gray-600">{item.star}</span>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400 rounded-full"
                  style={{ width: `${item.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
