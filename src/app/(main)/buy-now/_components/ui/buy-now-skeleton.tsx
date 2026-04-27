import { Skeleton } from "@/components/ui/skeleton"

const BuyNowSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
      
      {/* LEFT SIDE */}
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div>
              <Skeleton className="h-4 w-48 mb-2" />
              <Skeleton className="h-3 w-64" />
            </div>
          </div>
          <Skeleton className="h-6 w-10 rounded-full" />
        </div>

        {/* Contact */}
        <div>
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        {/* Payment */}
        <div className="space-y-3">
          <Skeleton className="h-4 w-24" />

          {[1, 2].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between border rounded-lg p-4"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="h-6 w-10" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-5 w-5 rounded-full" />
            </div>
          ))}

          <Skeleton className="h-4 w-24" />
        </div>

        {/* Delivery */}
        <div className="space-y-3">
          <Skeleton className="h-4 w-24" />

          <Skeleton className="h-10 w-full rounded-md" />

          <div className="grid grid-cols-2 gap-3">
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="border rounded-xl p-6 space-y-6">
        
        {/* Watch Reference */}
        <Skeleton className="h-10 w-full rounded-md" />

        {/* Product */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>

        {/* Totals */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-16" />
          </div>

          <div className="flex justify-between">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-24" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BuyNowSkeleton