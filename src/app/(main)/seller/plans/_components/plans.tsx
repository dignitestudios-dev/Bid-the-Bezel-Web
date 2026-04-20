"use client";

import Plans from "@/app/(main)/_components/plans";
import SellerPlans from "@/app/(main)/_components/seller-plans";
import { Skeleton } from "@/components/ui/skeleton";
import { useMe } from "@/features/auth/hooks";
import { useRouter } from "next/navigation";

const PlansSubs = () => {
  const router = useRouter();
  const { data, isLoading } = useMe();

  const isSubscribed = data?.data?.isSellerPlanPurchased;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Skeleton className="h-12 bg-gray-200 w-24 rounded-full" />
      </div>
    );
  }

  if (isSubscribed && !isLoading) {
    router.push("/seller/sale-type");
  } else {
    return (
      <div>
        <SellerPlans />
      </div>
    );
  }
};

export default PlansSubs;
