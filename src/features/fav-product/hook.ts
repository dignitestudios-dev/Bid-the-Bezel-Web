import { useApiMutation } from "@/hooks/api/use-api-mutation";
import { apiClient } from "@/lib/apiClient";
import { showError } from "@/lib/toast";
import { useQuery } from "@tanstack/react-query";

export const useAddProductToFavorite = (id: string) =>

    useApiMutation<any, any>({
        endpoint: `/favorites/${id}`,
        method: "POST",
        invalidateKeys: ["get-home-listing", "fav-list", "get-listing-detail", "get-listing"],
        mutationOptions: {

            onError: (error: any) => {
                showError(error?.response.data.message);
            }
        },
    });

export const useGetFavoriteProducts = () => {
    return useQuery<any>({
        queryKey: ["fav-list"],
        queryFn: async () => {
            const res = await apiClient.get(`/favorites`);
            return res.data;
        },
    });
};
