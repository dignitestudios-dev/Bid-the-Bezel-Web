import { useInfiniteQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { useApiMutation } from "@/hooks/api/use-api-mutation";
import { showError, showSuccess } from "@/lib/toast";


export const useGetNotifications = () => {
    return useInfiniteQuery({
        queryKey: ["get-notifications"],
        initialPageParam: 1,

        queryFn: async ({ pageParam = 1, }) => {
            const res = await apiClient.get(
                `/notification/me?page=${pageParam}&limit=5`
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

export const useMarkAllRead = () =>
    useApiMutation<void, void>({
        endpoint: `/notification/read`,
        method: "PATCH",
        invalidateKeys: ["get-notifications"],
        mutationOptions: {
            onSuccess: (data: any) => {
                showSuccess(data?.message);
            },
            onError: (error: any) => {
                showError(error?.response.data.message);
            }
        },
    });
