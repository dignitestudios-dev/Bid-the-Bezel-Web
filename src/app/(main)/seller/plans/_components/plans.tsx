"use client";

import Plans from "@/app/(main)/_components/plans";
import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";

const PlansSubs = () => {
  const router = useRouter();

  const isSubscribed = useAppSelector(
    (state) => state.auth.user?.isSubscribed
  );

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