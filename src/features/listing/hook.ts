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
        enabled: !!id,
        // refetchInterval: 10000,
        refetchOnWindowFocus: true,
    });
};


export const useGetListing = (
    type?: string,
    authentication?: string,
    priceStartAt?: number,
    priceEndAt?: number,
    page?: number,
    brands?: string[],
    sort?: string) => {
    return useQuery({
        queryKey: ["get-listing", type, authentication, priceStartAt, priceEndAt, page, brands, sort],


        queryFn: async () => {
            const params: any = {};
            if (type) params.type = type;
            if (authentication) {
                params.isAuth = authentication;
            }
            if (priceStartAt !== undefined) params.priceStartAt = priceStartAt;
            if (priceEndAt !== undefined) params.priceEndAt = priceEndAt;
            if (page !== undefined) params.page = page;
            if (brands && brands.length > 0) {
                params.brand = brands;
            }
            if (sort) params.sort = sort;
            params.limit = 8


            const res = await apiClient.get(`/products`, {
                params
            });
            return res.data;
        },
        refetchInterval: type === "auction" ? 10000 : false,
    });
};


export const useGetAllListing = () => {
    return useQuery<HomepageProductsResponse>({
        queryKey: ["get-home-listing"],
        queryFn: async () => {
            const res = await apiClient.get(`/products/homepage`);
            return res.data;
        },
        refetchInterval: 10000, // 10 seconds polling
    });
};
