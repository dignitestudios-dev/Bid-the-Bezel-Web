"use client";

import Plans from "@/app/(main)/_components/plans";
import { useMe } from "@/features/auth/hooks";
import { useRouter } from "next/navigation";

const PlansSubs = () => {
  const router = useRouter();
  const { data } = useMe()

  const isSubscribed = data?.data?.isSellerPlanPurchased;

  if (isSubscribed) {
    router.push("/seller/sale-type");
  } else {
    return (
      <div>

        <Plans />
      </div>
    );
  }
};

export default PlansSubs;