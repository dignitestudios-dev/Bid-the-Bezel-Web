
import { useApiMutation } from "@/hooks/api/use-api-mutation";
import { apiClient } from "@/lib/apiClient";
import { showError, showSuccess } from "@/lib/toast";
import { useQuery } from "@tanstack/react-query";



export const useGetQuestions = (id: string, page: number, limit: number = 10) => {
    return useQuery<any>({
        queryKey: ["get-questions", id, page, limit],
        queryFn: async () => {
            const res = await apiClient.get(`/productQna/${id}?page=${page}&limit=${limit}`);
            return res.data;
        },
    });
};


export const useCreateQuestion = (id: string) =>
    useApiMutation<any, any>({
        endpoint: `/productQna/${id}/questions`,
        method: "POST",
        invalidateKeys: ["get-questions"],
        mutationOptions: {
            onSuccess: (data: any) => {
                showSuccess(data?.message);
            },
            onError: (error: any) => {
                showError(error?.response.data.message);
            }
        },
    });

export const useCreateAnswer = (questionId: string) =>
    useApiMutation<any, any>({
        endpoint: `/productQna/${questionId}/answer`,
        method: "POST",
        invalidateKeys: ["get-questions"],
        mutationOptions: {
            onSuccess: (data: any) => {
                showSuccess(data?.message);
            },
            onError: (error: any) => {
                showError(error?.response.data.message);
            }
        },
    });