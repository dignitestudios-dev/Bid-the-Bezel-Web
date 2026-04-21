"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export const useRequireProfileCompletion = (
  user: any,
  isLoading: boolean
) => {
  const router = useRouter();
  const hasRedirected = useRef(false);

  useEffect(() => {
    if (isLoading) return;
    if (!user) return;

    if (user?.data?.isProfileCompleted) return;

    if (hasRedirected.current) return;

    hasRedirected.current = true;

    router.replace("/?authstep=username");
  }, [user, isLoading, router]);
};