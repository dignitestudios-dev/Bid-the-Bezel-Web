import { useApiMutation } from "@/hooks/api/use-api-mutation";
// import { WatchDetailPayload } from "./schema";
import { showError, showSuccess } from "@/lib/toast";
import { AuthenticatePayload } from "@/app/(main)/seller/shipping-details-auth/[id]/_components/shipping-form";
import { BillingPaylod } from "../billing/schema";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";


export const useGetProductBids = (
  id: string,
  page: number = 1,
  limit: number = 10
) => {
  return useQuery<ProductBidsResponse>({
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

    invalidateKeys: ["product-bids" , "get-listing-detail"],
  });
};