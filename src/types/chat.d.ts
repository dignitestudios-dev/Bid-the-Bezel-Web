interface ChatRoomsResponse {
    message: string;
    data: ChatRoom[];
    total: number;
}
interface ChatRoom {
    _id: string;
    status: string;
    updatedAt: string;
    createdAt: string;
    users: User[];
    chats: Chat[];
}