import { useApiMutation } from "@/hooks/api/use-api-mutation";
import { showError } from "@/lib/toast";
import { ShippingPayload } from "../products/schema";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";

export const useAddBuyerShippingDetails = (id: string) =>
    useApiMutation<any, ShippingPayload>({
        endpoint: `orders/product/${id}`,
        method: "PATCH",
        isMultiPart: true,
        invalidateKeys: ["get-my-deleted-listing", "get-my-active-listing", "get-my-listing"],
        toBody: (variables) => {
            const formData = new FormData();
            formData.append("courier", variables.courier);
            formData.append("trackingNumber", variables.trackingNumber);
            formData.append("trackingLink", variables.trackingLink);
            formData.append("status", "shipped");
            const filesArray = Array.from(variables.images || []);
            filesArray.forEach((file: any) => {
                formData.append("images", file);
            });

            return formData;
        },
        mutationOptions: {
            onError: (err) => {
                showError(err);
            },
        },
    });




export const useGetAuthenticateDetail = (id: string) => {
    return useQuery<any>({
        queryKey: ["get-authenticate-detail", id],
        queryFn: async () => {
            const res = await apiClient.get(`/orders/product/${id}/shipment-info`);
            return res.data;
        },
    });
};
