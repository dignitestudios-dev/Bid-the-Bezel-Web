"use client";
import { useApiMutation } from "@/hooks/api/useApiMutation";
import { apiClient } from "@/lib/apiClient";
import { useQuery } from "@tanstack/react-query";

export const useSubscription = () => {
    return useQuery({
        queryKey: ["subscription-plans"],
        queryFn: async () => {
            const res = await apiClient.get("/billing/subscription-plans");
            return res.data;
        },
    });
};


export const useBuySubscription = () =>
    useApiMutation<SubscriptionResponse, { priceId: string }>({
        endpoint: "/billing/subscription-purchase",
        method: "POST",
        invalidateKeys: ["subscription-purchase"],
        mutationOptions: {
            onSuccess: (data) => {
                window.location.href = data?.data;

            },
        },
    });