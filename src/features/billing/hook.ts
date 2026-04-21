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

  export const useDeleteCard = (cardId: string) =>
  useApiMutation<any, { cardId: string }>({
    endpoint: `/billing/delete-card/${cardId}`, 
    method: "POST",
    invalidateKeys: ["get-profile", "get-cards"],
    mutationOptions: {
      onSuccess: (data) => {
        showSuccess(data?.data?.message || "Card deleted successfully");
      }
    },
  });
export const useSetDefaultCard = (cardId: string) =>

  useApiMutation<any, { cardId: string }>({
    endpoint: `/billing/default-card/${cardId}`,
    method: "POST",
    invalidateKeys: ["get-profile", "get-cards"],
    mutationOptions: {
      onSuccess: (data) => {
        showSuccess(data?.data?.message || "Default card updated successfully");
      }
    },
  });
export const useAddBankAccount = () =>
  useApiMutation<any, { url: string }>({
    endpoint: "/billing/create-account",
    method: "POST",
    invalidateKeys: ["get-profile", "get-cards"],
    mutationOptions: {
      onSuccess: (data) => {
        window.location.href = data?.data?.url;
      },
      onError: (err) => {
        showError(err);
      },
    },
  });
export const useUpdateBankAccount = () =>
  useApiMutation<any, { token: string }>({
    endpoint: "/billing/add-bank",
    method: "POST",
    invalidateKeys: ["get-profile", "get-cards"],
    mutationOptions: {
      onSuccess: (data) => {
        // window.location.href = data?.data?.url;
        showSuccess(data?.message)
      },
      onError: (err) => {
        showError(err);
      },
    },
  });

export const useGetCard = () => {
  return useQuery<FinancialDetailsResponse>({
    queryKey: ["get-cards"],
    queryFn: async () => {
      const res = await apiClient.get("/billing/financials/details");
      return res.data;
    },
  });
};
