
import { useApiMutation } from "@/hooks/api/use-api-mutation";
import { apiClient } from "@/lib/apiClient";
import { showError } from "@/lib/toast";
import { OrderPayload } from "@/types/order";
import { useQuery } from "@tanstack/react-query";


export const useCreateOrder = () =>

    useApiMutation<any, OrderPayload>({
        endpoint: `/orders`,
        method: "POST",
        invalidateKeys: ["get-home-listing", "get-listing-detail"],
        mutationOptions: {
            onError: (error: any) => {
                showError(error?.response.data.message);
            }
        },
    });


export const useGetOrders = () => {
    return useQuery({
        queryKey: ["get-orders"],
        queryFn: async () => {
            const res = await apiClient.get(`/orders`);
            return res.data;
        },
        refetchOnWindowFocus: false,
    });
};
