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
            {/* Title */}   <div className="h-6 w-32 bg-gray-300 rounded"></div>

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