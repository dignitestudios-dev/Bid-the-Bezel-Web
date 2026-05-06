
import { apiClient } from "@/lib/apiClient";
import { useQuery } from "@tanstack/react-query";

export const useGetChatRooms = () => {
    return useQuery<any>({
        queryKey: ["get-chat-rooms"],
        queryFn: async () => {
            const res = await apiClient.get("/chat/rooms");
            return res.data;
        },
    });
};
export const useGetChatRoomById = (productId: string) => {
    return useQuery<ChatRoomsResponse>({
        queryKey: ["get-chat-room-by-id", productId],
        queryFn: async () => {
            const res = await apiClient.get(`/chat/rooms/context/${productId}`);
            return res.data;
        },
    });
};