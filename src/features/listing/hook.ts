import { apiClient } from "@/lib/apiClient";
import { useQuery } from "@tanstack/react-query";

export const useGetMyListing = (status: string) => {
    return useQuery<ProductsResponse>({
        queryKey: ["get-my-listing", status],
        queryFn: async () => {
            const res = await apiClient.get("/products/seller/list", {
                params: { status },
            });
            return res.data;
        },
    });
};
export const useGetMyActiveListing = () => {
    return useQuery<ProductsResponse>({
        queryKey: ["get-my-active-listing"],
        queryFn: async () => {
            const res = await apiClient.get("/products/seller/list", {
                params: { status: "active" },
            });
            return res.data;
        },
    });
};
export const useGetMyDeletedActiveListing = () => {
    return useQuery({
        queryKey: ["get-my-deleted-listing"],
        queryFn: async () => {
            const res = await apiClient.get("/products/seller/list", {
                params: { status: "deleted" },
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


export const useGetListing = (
    type?: string,
    authentication?: string,
    priceStartAt?: number,
    priceEndAt?: number) => {
    return useQuery({
        queryKey: ["get-listing", type, authentication, priceStartAt, priceEndAt],


        queryFn: async () => {
            const params: any = {};
            if (type) params.type = type;
            if (authentication) {
                params.isAuth = authentication;
            }
            if (priceStartAt !== undefined) params.priceStartAt = priceStartAt;
            if (priceEndAt !== undefined) params.priceEndAt = priceEndAt;


            const res = await apiClient.get(`/products`, {
                params
            });
            return res.data;
        },
    });
};


export const useGetAllListing = () => {
    return useQuery<HomepageProductsResponse>({
        queryKey: ["get-home-listing"],
        queryFn: async () => {
            const res = await apiClient.get(`/products/homepage`);
            return res.data;
        },
    });
};
