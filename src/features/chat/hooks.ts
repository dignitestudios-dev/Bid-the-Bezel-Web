
import { useApiMutation } from "@/hooks/api/use-api-mutation";
import { apiClient } from "@/lib/apiClient";
import { showError } from "@/lib/toast";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export const useGetChatRooms = () => {
    return useQuery<any>({
        queryKey: ["get-chat-rooms"],
        queryFn: async () => {
            const res = await apiClient.get("/chat/rooms");
            return res.data;
        },
    });
};

export const useGetChatMessages = (roomId: string) => {
    return useInfiniteQuery<any>({
        queryKey: ["get-chat-messages", roomId],
        initialPageParam: 1,
        queryFn: async ({ pageParam = 1 }) => {
            const res = await apiClient.get(`/chat/messages/${roomId}`, {
                params: { page: pageParam, limit: 15 }
            });
            return res.data;
        },
        getNextPageParam: (lastPage) => {
            const pagination = lastPage?.pagination;
            if (!pagination) return undefined;
            return pagination.page < pagination.pages ? pagination.page + 1 : undefined;
        },
        enabled: !!roomId,
    });
};


export const useSendMessages = (roomId: string) =>
    useApiMutation<any, { text: string, tempId: string }>({
        endpoint: `/chat/messages/${roomId}`,
        method: "POST",
        invalidateKeys: ["get-chat-messages", "get-chat-rooms"],
        mutationOptions: {
            onError: (err) => {
                showError(err);
            },
        },
    });
export const useSendMessagesMedia = (roomId: string) =>
    useApiMutation<any, FormData>({
        endpoint: `/chat/messages/${roomId}/media`,
        method: "POST",
        isMultiPart: true,
        invalidateKeys: ["get-chat-messages", "get-chat-rooms"],
        mutationOptions: {
            onError: (err) => {
                showError(err);
            },
        },
    });