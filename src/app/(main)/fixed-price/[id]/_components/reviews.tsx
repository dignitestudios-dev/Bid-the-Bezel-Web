"use client"
import { Star } from "lucide-react";
import React, { useCallback, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useGetReviewsInfinite } from "@/features/review/hooks";
import { useVirtualizer } from "@tanstack/react-virtual";

type Props = { sellerId: string };

const ReviewsList = ({ sellerId }: { sellerId: string }) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetReviewsInfinite(sellerId);

  const allReviews = data?.pages.flatMap((p) => p?.data?.reviews ?? []) ?? [];
  const summary = data?.pages[0]?.data?.summary;

  const parentRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const virtualizer = useVirtualizer({
    count: allReviews.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
    overscan: 5,
  });

  const sentinelCallback = useCallback(
    (el: HTMLDivElement | null) => {
      if (observerRef.current) observerRef.current.disconnect();
      if (!el) return;
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        },
        { threshold: 0.1 }
      );
      observerRef.current.observe(el);
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage]
  );

  return (
    <>
      <div className="grid grid-cols-3 gap-6 p-6">
        <div>
          <h2 className="text-4xl font-bold">{summary?.rating}</h2>
          <div className="flex gap-1 my-2">
            {Array.from({ length: 5 }).map((_, i) => {
              const rating = summary?.rating || 0;
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
          <p className="text-sm text-gray-500">{summary?.reviewsReceived} Reviews</p>
        </div>
        <div className="col-span-2 space-y-2">
          {Object.entries(summary?.distribution || {}).map(([star, count]) => (
            <div key={star} className="flex items-center gap-3">
              <span className="w-4 text-sm">{star}</span>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400 rounded-full"
                  style={{
                    width: `${(Number(count) / summary?.reviewsReceived) * 100}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <h1 className="px-6 font-medium">Seller Reviews</h1>

      <div ref={parentRef} className="h-[400px] overflow-y-auto px-6 mt-2">
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {virtualizer.getVirtualItems().map((virtualItem) => {
            const item = allReviews[virtualItem.index];
            return (
              <div
                key={virtualItem.key}
                data-index={virtualItem.index}
                ref={virtualizer.measureElement}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  transform: `translateY(${virtualItem.start}px)`,
                }}
                className="border-b pb-3"
              >
                <div className="flex items-center gap-1 mb-1">
                  {Array.from({ length: item?.stars ?? 0 }).map((_, i) => (
                    <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm font-medium">
                  {item?.reviewer?.name}{" "}–{" "}
                  <span className="text-gray-500">
                    {new Date(item?.createdAt).toDateString()}
                  </span>
                </p>
                <p className="text-sm text-gray-600 mt-1 break-all">
                  {item?.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Sentinel — sits outside the virtualizer, triggers next page fetch */}
        <div ref={sentinelCallback} className="h-4" />

        {isFetchingNextPage && (
          <p className="py-2 text-center text-sm text-gray-400">Loading more...</p>
        )}
        {!hasNextPage && allReviews.length > 0 && (
          <p className="py-2 text-center text-sm text-gray-400">No more reviews</p>
        )}
      </div>
    </>
  );
};

const ReviewSummary = ({ sellerId }: { sellerId: string }) => {
  const { data } = useGetReviewsInfinite(sellerId);
  const summary = data?.pages[0]?.data?.summary;

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-4xl font-bold">{summary?.rating}</h2>
        <span className="text-yellow-400 text-lg">★</span>
        <span className="text-sm text-gray-500">{summary?.reviewsReceived} Reviews</span>
      </div>
      <div className="space-y-2">
        {Object.entries(summary?.distribution || {}).map(([star, count]) => (
          <div key={star} className="flex items-center gap-3">
            <span className="w-4 text-sm">{star}</span>
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-400 rounded-full"
                style={{
                  width: `${(Number(count) / summary?.reviewsReceived) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Reviews = ({ sellerId }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full rounded-xl border">
      <div className="flex justify-between items-center font-semibold gap-2 border-b p-4 rounded-t-xl bg-[#F7F7F7] px-5">
        <h1 className="flex gap-2 items-center">
          <Star size={18} /> Seller Reviews
        </h1>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="text-sm cursor-pointer hover:underline">View All</button>
          </DialogTrigger>

         <DialogContent className="w-full p-0 h-[80vh] flex flex-col">
            <DialogHeader className="border-b px-6 py-4">
              <DialogTitle>Rating And Reviews</DialogTitle>
            </DialogHeader>

            {open && <ReviewsList sellerId={sellerId} />}

            <DialogFooter className="border-t px-6 py-4">
              <Button
                onClick={() => setOpen(false)}
                className="rounded-[30px] w-[100px]"
                variant="secondary"
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <ReviewSummary sellerId={sellerId} />
    </div>
  );
};

export default Reviews;