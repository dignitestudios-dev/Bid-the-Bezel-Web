"use client";
import { useApiMutation } from "@/hooks/api/useApiMutation";
import { apiClient } from "@/lib/apiClient";
import { showError, showSuccess } from "@/lib/toast";
import { useQuery } from "@tanstack/react-query";



export const useAddCard = () =>
  useApiMutation<AddCardResponse, { paymentMethodId: string; bankName?: string }>({
    endpoint: "/billing/add-card",
    method: "POST",
    invalidateKeys: ["get-profile", "get-cards"],
    mutationOptions: {
      onSuccess: (data) => {
        showSuccess(data?.data?.message || "Card added successfully");
      },
      onError: (err) => {
        showError(err);
      },
    },
  });

export const useGetCard = () => {
  return useQuery({
    queryKey: ["get-cards"],
    queryFn: async () => {
      const res = await apiClient.get("/billing/cards");
      return res.data;
    },
  });
};
