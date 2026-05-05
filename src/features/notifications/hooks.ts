import { useInfiniteQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";


export const useGetNotifications = () => {
    return useInfiniteQuery({
        queryKey: ["get-notifications"],
        initialPageParam: 1,

        queryFn: async ({ pageParam = 1 }) => {
            const res = await apiClient.get(
                `/notification/me?page=${pageParam}`
            );

            return res.data;
        },

        getNextPageParam: (lastPage) => {
            const pagination = lastPage?.pagination;

            if (!pagination) return undefined;

            return pagination.currentPage < pagination.totalPages
                ? pagination.currentPage + 1
                : undefined;
        },
    });
};