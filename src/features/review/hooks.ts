import { useApiMutation } from "@/hooks/api/use-api-mutation";
import { showError } from "@/lib/toast";
import { ReviewPaylod } from "./schema";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";

export const useAddReview = () =>

    useApiMutation<any, ReviewPaylod>({
        endpoint: `/review`,
        method: "POST",
        invalidateKeys: ["get-orders"],
        mutationOptions: {
            onError: (error: any) => {
                showError(error?.response.data.message);
            }
        },
    });


export const useGetReviews = ({ id, page = 1 }: { id: string; page?: number }) => {
    return useQuery<any>({
        queryKey: ["get-reviews", id, page],
        queryFn: async () => {
            const res = await apiClient.get(`/review?userId=${id}&page=${page}`);
            return res.data;
        },
        refetchOnWindowFocus: false,
    });
};