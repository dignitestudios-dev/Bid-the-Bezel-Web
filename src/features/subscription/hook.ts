"use client";
import { useApiMutation } from "@/hooks/api/useApiMutation";
import { apiClient } from "@/lib/apiClient";
import { showError, showSuccess } from "@/lib/toast";
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
    useApiMutation<SubscriptionResponse, { planId: string, url: string }>({
        endpoint: "/billing/subscription-purchase",
        method: "POST",
        invalidateKeys: ["subscription-purchase", 'get-profile'],
        mutationOptions: {
            onSuccess: (data) => {
                window.location.href = data?.data;

            },
            onError: (err) => {
                showError(err)
            },
        },
    });

export const useCancelSubscription = () =>
    useApiMutation<CancelSubscriptionResponse, { planId: string }>({
        endpoint: "/billing/subscription-cancel",
        method: "POST",
        invalidateKeys: ["get-profile", "subscription-plans"],
        mutationOptions: {
            onSuccess: (data) => {
                showSuccess(data?.data?.message)

            },


        },
    });