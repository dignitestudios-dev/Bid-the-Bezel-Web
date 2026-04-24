import { useApiMutation } from "@/hooks/api/useApiMutation";
import { showError, showSuccess } from "@/lib/toast";
import { OrderPayload } from "@/types/order";


export const useCreateOrder = () =>

    useApiMutation<any, OrderPayload>({
        endpoint: `/orders`,
        method: "POST",
        invalidateKeys: ["get-home-listing"],
        mutationOptions: {
            onError: (error: any) => {
                showError(error?.response.data.message);
            }
        },
    });