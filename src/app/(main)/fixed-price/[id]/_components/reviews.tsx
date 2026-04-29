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
import { useGetReviews } from "@/features/review/hooks";
type Props = {
  sellerId: string;
};
const Reviews = ({ sellerId }: Props) => {
  const [open, setOpen] = useState(false);
  const ratings = [
    { star: 5, percent: 90 },
    { star: 4, percent: 40 },
    { star: 3, percent: 20 },
    { star: 2, percent: 10 },
    { star: 1, percent: 5 },
  ];
  const { data: reviewsData, isLoading } = useGetReviews({ id: sellerId })
  

  return (
    <div className="w-full rounded-xl border">

      <div className="flex justify-between items-center font-semibold gap-2 border-b p-4 rounded-t-xl bg-[#F7F7F7]   px-5">
        <h1 className=" flex gap-2 items-center">
          <Star size={18} />Seller Reviews
        </h1>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="text-sm cursor-pointer hover:underline">
              View All
            </button>
          </DialogTrigger>

          <DialogContent className="  w-full p-0 ">
            <DialogHeader className="border-b px-6 py-4">
              <DialogTitle>Rating And Reviews</DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-3 gap-6 p-6">
              <div>
                <h2 className="text-4xl font-bold">
                  {reviewsData?.data?.summary?.rating}
                </h2>
                <div className="flex gap-1 my-2">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const rating = reviewsData?.data?.summary?.rating || 0;
                    const starValue = i + 1;

                    return (
                      <Star
                        key={i}
                        size={16}
                        className={
                          starValue <= Math.floor(rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : starValue - rating <= 0.5
                              ? "fill-yellow-400/50 text-yellow-400"
                              : "text-gray-300"
                        }
                      />
                    );
                  })}
                </div>
                <p className="text-sm text-gray-500">{reviewsData?.data?.summary?.reviewsReceived} Reviews</p>
              </div>
              <div className="col-span-2 space-y-2">
                {Object.entries(reviewsData?.data?.summary?.distribution || {})
                  .map(([star, count]) => {
                    const total = reviewsData?.data?.summary?.reviewsReceived;
                    return (
                      <div key={star} className="flex items-center gap-3">
                        <span className="w-4 text-sm">{star}</span>

                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-400 rounded-full"
                            style={{ width: `${(Number(count) / total) * 100}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
            <h1 className="px-6">Seller Reviews</h1>
            <ScrollArea className="h-[200px] overflow-y-auto px-6">
              {reviewsData?.data?.reviews?.map((item: any) => (
                <div key={item._id} className="border-b pb-3 mb-3">
                  <div className="flex items-center gap-1 mb-1">
                    {Array.from({ length: item.stars }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  <p className="text-sm font-medium">
                    {item.reviewer.name} –{" "}
                    <span className="text-gray-500">
                      {new Date(item.createdAt).toDateString()}
                    </span>
                  </p>

                  <p className="text-sm text-gray-600 mt-1 break-all">
                    {item.description}
                  </p>
                </div>
              ))}
            </ScrollArea>

            <DialogFooter className="border-t  px-6 py-4">
              <Button onClick={() => setOpen(false)} className="rounded-[30px] w-[100px]" variant="secondary">Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-4xl font-bold">
            {reviewsData?.data?.summary?.rating}
          </h2>
          <span className="text-yellow-400 text-lg">★</span>
          <span className="text-sm text-gray-500">{reviewsData?.data?.summary?.reviewsReceived} Reviews</span>
        </div>

        <div className="space-y-2">
          {Object.entries(reviewsData?.data?.summary?.distribution || {})
            .map(([star, count]) => {
              const total = reviewsData?.data?.summary?.reviewsReceived;

              return (
                <div key={star} className="flex items-center gap-3">
                  <span className="w-4 text-sm">{star}</span>

                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 rounded-full"
                      style={{ width: `${(Number(count) / total) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
