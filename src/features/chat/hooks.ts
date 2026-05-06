
import { apiClient } from "@/lib/apiClient";
import { useQuery } from "@tanstack/react-query";

export const useGetChatRooms = () => {
    return useQuery<ChatRoomsResponse>({
        queryKey: ["get-chat-rooms"],
        queryFn: async () => {
            const res = await apiClient.get("/chat/rooms/");
            return res.data;
        },
    });
};