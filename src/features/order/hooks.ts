
import { useApiMutation } from "@/hooks/api/use-api-mutation";
import { showError } from "@/lib/toast";
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