import { useApiMutation } from "@/hooks/api/useApiMutation";
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
        params: {
          page,
          limit,
        },
      });

      return res.data;
    },

    enabled: !!id,
  });
};

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