import { useApiMutation } from "@/hooks/api/use-api-mutation";
// import { WatchDetailPayload } from "./schema";
import { showError, showSuccess } from "@/lib/toast";
import { AuthenticatePayload } from "@/app/(main)/seller/shipping-details-auth/[id]/_components/shipping-form";
import { BillingPaylod } from "../billing/schema";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

export const useGetProductBids = (
  id: string,
  page: number = 1,
  limit: number = 10
) => {
  const queryClient = useQueryClient();

  const previousCountRef = useRef(0);

  const query = useQuery<ProductBidsResponse>({
    queryKey: ["product-bids", id, page, limit],

    queryFn: async () => {
      const res = await apiClient.get(`/products/${id}/bids`, {
        params: { page, limit },
      });

      return res.data;
    },

    enabled: !!id,

    refetchInterval: 10000,

    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    const newCount = query.data?.data.bids.length ?? 0;

    if (newCount > previousCountRef.current) {
      queryClient.invalidateQueries({
        queryKey: ["get-listing-detail", id],
      });
    }

    previousCountRef.current = newCount;
  }, [query.data, id, queryClient]);

  return query;
};

export const useCancelBid = () =>
  useApiMutation<any, { id: string }>({
    endpoint: ({ id }) => `/products/${id}/bid`,
    method: "DELETE",
    invalidateKeys: [
      "get-profile",
      "get-cards",
      "shipping-result",
      "get-my-listing",
      "get-listing-detail",
      "product-bids",
      "get-notifications"
    ],
    mutationOptions: {
      onError: (err) => {
        showError(err);
      },
    },
  });

export const useConfirmBid = () =>
  useApiMutation<any, { id: string }>({
    endpoint: ({ id }) => `products/bids/${id}/accept`,
    method: "POST",
    invalidateKeys: [
      "get-profile",
      "get-cards",
      "shipping-result",
      "get-my-listing",
      "get-listing-detail",
      "product-bids",
      "get-notifications"
    ],
    mutationOptions: {
      onError: (err) => {
        showError(err);
      },
    },
  });

export const usePlaceBid = () => {
  return useApiMutation<
    any,
    { id: string; amount: number }
  >({
    endpoint: ({ id }) => `/products/${id}/bid`,
    method: "POST",

    toBody: (variables) => ({
      amount: variables.amount,
    }),

    invalidateKeys: ["product-bids", "get-listing-detail", "get-notifications"],
    mutationOptions: {
      onSuccess: () => {
        // showSuccess("Bid placed successfully!");
      },
      onError: (err) => {
        showError(err);
      },
    },
  });
};