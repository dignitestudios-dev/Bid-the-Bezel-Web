"use client"
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { useAppDispatch } from "@/lib/hooks";
import { logout } from "@/lib/slices/authSlice";
import LogoutDialog from "./auth/LogoutDialog";
import MessageNotification from "./icons/MessageNotification";
import Message from "./icons/Message";
import Bell from "./icons/Bell";
import { useRouter } from "next/navigation";
import MessageTab from "./ui/message-tab";
import NotificationsPanel from "./ui/notifications-panel";
import { useGetChatRooms } from "@/features/chat/hooks";
import { Skeleton } from "./ui/skeleton";
import { useQueryClient } from "@tanstack/react-query";
import { createSocket } from "@/sockets";
import { useGetNotifications } from "@/features/notifications/hooks";

const notifications = [
  {
    title: "You won a bid",
    description: "Review your bid and add shipping details",
    isShippingDetails: true,
    isFav: false
  },
  {
    title: "Watch Authenticated",
    description: "Your watch authentication approved",
    isShippingDetails: false,
    isFav: false
  },
  {
    title: "24 Hours remainig",
    description: "fav watch",
    isShippingDetails: false,
    isFav: true
  },
];

const MessageNotificationMenu = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const { socket, connect } = createSocket();
  const queryClient = useQueryClient();
  const { data: allChatRooms, isLoading: roomsLoading } = useGetChatRooms()
  const { data: notificationsData } = useGetNotifications();

  const hasUnreadNotifications = notificationsData?.pages?.some((page: any) => 
    page?.data?.some((notification: any) => !notification.isRead)
  );

  const dummyArray = [1, 2];
  const tabs = [
    { title: "Message", label: "messages", icon: <Message /> },
    { title: "Notifications", label: "notifications", icon: <Bell /> },
  ];
  const [activeTab, setActiveTab] = useState<"messages" | "notifications">(
    "notifications",
  );

  const handleGoToChats = () => {
    router.push("/chats");
  };



  useEffect(() => {
    connect();

    const handleNewMessage = (incomingMsg: any) => {

      // React Query invalidate
      queryClient.invalidateQueries({
        queryKey: ["get-chat-rooms"],
      });

      queryClient.invalidateQueries({
        queryKey: ["get-chat-messages"],
      });
    };

    socket.on("new_message", handleNewMessage);

    return () => {
      socket.off("new_message", handleNewMessage);
    };
  }, []);
  
  return (
    <>
      <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
        <DropdownMenuTrigger asChild>
          <Button className="border-none ring-0 bg-[#F7F7F7] hover:bg-[#ededed] rounded-full h-14 w-14 relative">
            <MessageNotification />
            {hasUnreadNotifications && (
              <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[450px] max-w-full p-2 flex flex-col"
          align="end"
        >
          <div className="grid grid-cols-2 gap-4 font-medium border-b">
            {tabs.map((tab) => (
              <div
                key={tab.label}
                className={`py-2 flex gap-1 items-center border-b-2 transition-all ${activeTab === tab.label
                  ? "border-gray-900 text-black"
                  : "text-gray-600 cursor-pointer border-transparent"
                  }`}
                onClick={() =>
                  setActiveTab(tab.label as "messages" | "notifications")
                }
              >
                {tab.icon}&nbsp;&nbsp;{tab.title}
              </div>
            ))}
          </div>

          <div className="overflow-y-auto">
            {activeTab === "messages" ? (
              <div className="w-full pt-3">
                {roomsLoading ? (
                  <div>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Skeleton key={i} className="w-full h-20 rounded-lg" />
                    ))}</div>
                ) : allChatRooms?.length === 0 ? (
                  <div className="text-center text-sm text-gray-500 my-10">No active chats</div>
                ) : (
                  allChatRooms?.data?.map((c: any, index: number) => (
                    <MessageTab key={index} handleGoToChats={handleGoToChats} chat={c} />
                  ))
                )}

                <div className="mt-2 bg-gray-200 w-full h-px" />

                <DropdownMenuItem
                  className="bg-transparent text-black w-full font-semibold mt-2 py-2 flex justify-center"
                  onClick={handleGoToChats}
                >
                  <p className="text-center">View All</p>
                </DropdownMenuItem>
              </div>
            ) : (
              <NotificationsPanel />
            )}


          </div>
        </DropdownMenuContent>
      </DropdownMenu >

      <LogoutDialog
        open={logoutOpen}
        onOpenChange={setLogoutOpen}
        onConfirm={() => dispatch(logout())}
      />
    </>
  );
};

export default MessageNotificationMenu;
