"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {};

const BidSkeleton = (props: Props) => {
  return (
    <div className="md:w-[40%] rounded-xl border border-[#E3E3E3] p-4 space-y-6">

      <div className="flex justify-center">
        <Skeleton className="h-6 w-28 rounded-md" />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-6 w-20" />
        </div>

        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t">
        <Skeleton className="h-5 w-32" />

        <div className="text-center space-y-2">
          <Skeleton className="h-8 w-24 mx-auto" />
          <Skeleton className="h-3 w-16 mx-auto" />
        </div>

        <Skeleton className="h-10 w-full rounded-md" />

        <div className="flex gap-2">
          <Skeleton className="h-10 flex-1 rounded-md" />
          <Skeleton className="h-10 w-32 rounded-md" />
        </div>
      </div>

      <div className="space-y-3 pt-4 border-t">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-2 w-2 rounded-full" />
        </div>

        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </div>

      <div className="space-y-3 pt-4 border-t">
        <div className="flex justify-between items-center">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-4 w-16" />
        </div>

        <div className="flex gap-2 items-center">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-7 w-7 rounded-full" />
          ))}
          <Skeleton className="h-7 w-10 rounded-full" />
        </div>
      </div>

    </div>
  );
};

export default BidSkeleton;