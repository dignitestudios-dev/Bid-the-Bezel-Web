import { apiClient } from "@/lib/apiClient";
import { useQuery } from "@tanstack/react-query";

export const useGetMyListing = (status?: string) => {
    return useQuery({
        queryKey: ["get-my-listing", status],
        queryFn: async () => {
            const res = await apiClient.get("/products/seller/list", {
                params: { status },
            });
            return res.data;
        },
    });
};

export const useGetMyListingDetail = (id: string) => {
    return useQuery({
        queryKey: ["get-listing-detail", id],
        queryFn: async () => {
            const res = await apiClient.get(`/products/${id}`);
            return res.data;
        },
    });
};
