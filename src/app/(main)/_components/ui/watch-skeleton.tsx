import { Skeleton } from "@/components/ui/skeleton";

export function WatchCardSkeleton() {
  return (
    <div className="w-full rounded-3xl border my-5  bg-white/10 p-4">
      {/* Image */}
      <div className="relative">
        <Skeleton className="h-[280px] w-full rounded-2xl" />

        {/* Wishlist Button */}
        <div className="absolute right-4 top-4">
          <Skeleton className="h-12 w-12 rounded-2xl" />
        </div>
      </div>

      {/* Title */}
      <div className="mt-6 space-y-3">
        <Skeleton className="h-7 w-3/4 rounded-md" />

        {/* Price Section */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          {/* Starting Price */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-24 rounded-md" />
            <Skeleton className="h-6 w-20 rounded-md" />
          </div>

          {/* Current Bid */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-24 rounded-md" />
            <Skeleton className="h-6 w-20 rounded-md" />
          </div>

          {/* Ends In */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-16 rounded-md" />
            <Skeleton className="h-6 w-24 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}