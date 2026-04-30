export const ProfileSkeleton = () => {
    return (
        <div className="card animate-pulse">
            <div className="border-b border-border pb-3">
                <div className="h-6 bg-gray-300 rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>

            <div className="py-6 border-b border-border space-y-6">
                {/* Profile Image */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-24 h-24 rounded-full bg-gray-300"></div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-2 gap-5">
                    <div className="h-10 bg-gray-200 rounded col-span-1"></div>
                    <div className="h-10 bg-gray-200 rounded col-span-1"></div>
                    <div className="h-12 bg-gray-200 rounded col-span-full"></div>
                </div>
            </div>

            <div className="pt-6 space-y-3">
                <div className="h-5 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
        </div>
    );
};
export const PlanSkeleton = () => {
    return (

        <div className="flex flex-col h-80 gap-4 p-6 rounded-xl shadow-md border border-gray-300 animate-pulse">
            {/* Title */}
            <div className="h-6 w-32 bg-gray-300 rounded"></div>

            {/* Price */}
            <div className="flex gap-2 items-end">
                <div className="h-10 w-20 bg-gray-300 rounded"></div>
                <div className="h-4 w-24 bg-gray-300 rounded mt-1"></div>
            </div>

            {/* Button */}
            <div className="h-12 w-full bg-gray-300 rounded-full mt-2"></div>

            {/* Features */}
            <div className="flex flex-col gap-3 mt-2">
                <div className="h-4 w-full bg-gray-300 rounded"></div>
                <div className="h-4 w-5/6 bg-gray-300 rounded"></div>
                <div className="h-4 w-4/6 bg-gray-300 rounded"></div>
            </div>
        </div>
    );
};

export const CardSkeleton = () => {
    return (
        <div className="rounded-lg border bg-white p-5 shadow-sm animate-pulse">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="h-5 w-24 bg-gray-200 rounded"></div>
                <div className="h-10 w-24 bg-gray-200 rounded-md"></div>
            </div>

            {/* Card Info */}
            <div className="flex items-center justify-between py-2 border-b mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-gray-200 rounded"></div>
                    <div className="h-4 w-40 bg-gray-200 rounded"></div>
                </div>
            </div>

            {/* Invoices Title */}
            <div className="h-4 w-24 bg-gray-200 rounded mb-3"></div>

            {/* Table Rows */}
            <div className="space-y-3">
                {[1, 2].map((_, i) => (
                    <div key={i} className="flex justify-between items-center">
                        <div className="h-4 w-24 bg-gray-200 rounded"></div>
                        <div className="h-4 w-16 bg-gray-200 rounded"></div>
                        <div className="h-4 w-20 bg-gray-200 rounded"></div>
                        <div className="h-8 w-16 bg-gray-200 rounded"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export const ChangeSubscriptionSkeleton = () => {
    return (
        <div className="animate-pulse">
            {/* Header */}
            <div className="flex items-center justify-between px-10 py-5 border-b">
                <div className="h-6 w-48 bg-gray-200 rounded"></div>
                <div className="w-5 h-5 bg-gray-200 rounded"></div>
            </div>

            {/* Body */}
            <div className="flex flex-col gap-4 px-10 py-4">

                {/* Current Plan */}
                <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
                    <div className="space-y-2">
                        <div className="h-3 w-24 bg-gray-200 rounded"></div>
                        <div className="h-4 w-32 bg-gray-200 rounded"></div>
                    </div>

                    <div className="h-5 w-16 bg-gray-200 rounded"></div>

                    <div className="h-8 w-36 bg-gray-200 rounded-full"></div>
                </div>

                {/* Plans Grid */}
                <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((_, i) => (
                        <div key={i} className="p-6 rounded-2xl border">

                            {/* Title */}
                            <div className="h-6 w-24 bg-gray-200 rounded mb-4"></div>

                            {/* Price */}
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-8 w-16 bg-gray-200 rounded"></div>
                                <div className="h-4 w-32 bg-gray-200 rounded"></div>
                            </div>

                            {/* Button */}
                            <div className="h-10 w-full bg-gray-200 rounded-full mb-4"></div>

                            {/* Features */}
                            <div className="space-y-2">
                                {[1, 2, 3].map((_, j) => (
                                    <div key={j} className="h-4 w-full bg-gray-200 rounded"></div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 px-10 py-4 border-t">
                <div className="h-10 w-24 bg-gray-200 rounded-full"></div>
                <div className="h-10 w-24 bg-gray-200 rounded-full"></div>
            </div>
        </div>
    );
};

export const ListingSkeleton = () => {
  return (
    <div className="p-4 rounded-2xl w-[300px] border bg-white animate-pulse">
      {/* Image */}
      <div className="w-full h-48 bg-gray-200 rounded-xl"></div>

      {/* Title */}
      <div className="mt-4 h-5 bg-gray-200 rounded w-1/3"></div>

      {/* Price Row */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex-1">
          <div className="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
          <div className="h-5 bg-gray-200 rounded w-1/2"></div>
        </div>

        {/* Divider */}
        <div className="w-px h-10 bg-gray-200 mx-4"></div>

        <div className="flex-1">
          <div className="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
          <div className="h-5 bg-gray-200 rounded w-1/2"></div>
        </div>

        {/* Heart Icon */}
        <div className="ml-4 w-6 h-6 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );
};

export const ProductDetailSkeleton = () => {
    return (
        <div className="max-w-screen-2xl mx-auto w-[90%] py-12 animate-pulse">

            {/* Breadcrumb Skeleton */}
            <div className="h-5 w-40 bg-gray-200 rounded mb-6"></div>

            <div className="flex gap-6">

                {/* Left: Image Skeleton */}
                <div className="w-1/2 space-y-4">
                    <div className="h-[400px] bg-gray-200 rounded-xl"></div>
                    <div className="flex gap-2">
                        <div className="h-20 w-20 bg-gray-200 rounded"></div>
                        <div className="h-20 w-20 bg-gray-200 rounded"></div>
                        <div className="h-20 w-20 bg-gray-200 rounded"></div>
                    </div>
                </div>

                {/* Right: Details Skeleton */}
                <div className="w-1/2 space-y-4">
                    <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
                    <div className="h-6 w-1/2 bg-gray-200 rounded"></div>
                    <div className="h-10 w-1/3 bg-gray-200 rounded"></div>

                    <div className="space-y-2">
                        <div className="h-4 w-full bg-gray-200 rounded"></div>
                        <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                        <div className="h-4 w-4/6 bg-gray-200 rounded"></div>
                    </div>

                    <div className="h-12 w-full bg-gray-200 rounded mt-6"></div>
                </div>

            </div>
        </div>
    )
}

export const QASkeleton = () => {
    return (
        <div className="rounded-xl border border-[#E3E3E3]">
            <div className="bg-[#F7F7F7] rounded-t-xl flex gap-2 items-center px-6 py-4 border-b">
                <div className="animate-pulse bg-gray-200 rounded-full w-6 h-6" />
                <div className="animate-pulse bg-gray-200 rounded w-52 h-5" />
            </div>
            <div className="p-4">
                <div className="h-[400px] overflow-hidden space-y-1">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="border-b border-[#E3E3E3] pb-4">
                            <div className="flex items-start gap-4 py-2">
                                <div className="animate-pulse bg-gray-200 rounded w-[30px] h-[30px] flex-shrink-0" />
                                <div className="flex-1 space-y-2">
                                    <div className="animate-pulse bg-gray-200 rounded h-3 w-[85%]" />
                                    <div className="animate-pulse bg-gray-200 rounded h-3 w-[55%]" />
                                    <div className="flex gap-2">
                                        <div className="animate-pulse bg-gray-200 rounded h-2.5 w-16" />
                                        <div className="animate-pulse bg-gray-200 rounded h-2.5 w-20" />
                                    </div>
                                </div>
                            </div>
                            <div className="animate-pulse bg-gray-200 rounded ml-10 h-3 w-10" />
                        </div>
                    ))}
                </div>
                <div className="flex items-center justify-center gap-4 mt-3 pt-3 border-t border-[#E3E3E3]">
                    <div className="animate-pulse bg-gray-200 rounded w-12 h-7" />
                    <div className="animate-pulse bg-gray-200 rounded w-10 h-3" />
                    <div className="animate-pulse bg-gray-200 rounded w-12 h-7" />
                </div>
            </div>
        </div>
    );
};

export const FavSkeleton = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, idx) => (
                <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl border border-gray-200 bg-white animate-pulse"
                >
                    {/* LEFT SIDE */}
                    <div className="flex items-center gap-6 w-full">

                        {/* Image skeleton */}
                        <div className="w-24 h-24 rounded-lg bg-gray-200 shrink-0" />

                        {/* TEXT skeleton */}
                        <div className="space-y-3 w-full">
                            <div className="h-4 w-40 bg-gray-200 rounded" />

                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-gray-200" />
                                <div className="h-3 w-24 bg-gray-200 rounded" />
                            </div>

                            <div className="h-5 w-28 bg-gray-200 rounded" />
                        </div>
                    </div>

                    {/* BUTTON skeleton */}
                    <div className="h-6 w-16 bg-gray-200 rounded" />
                </div>
            ))}
        </div>
    )
}