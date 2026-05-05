import React, { useCallback, useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import ProfileUser from "./icons/ProfileUser";
import User from "./icons/User";
import Heart from "./icons/Heart";
import Logout from "./icons/Logout";
import { useAppDispatch } from "@/lib/hooks";
import { logout } from "@/lib/slices/authSlice";
import LogoutDialog from "./auth/LogoutDialog";
import MessageNotification from "./icons/MessageNotification";
import Message from "./icons/Message";
import Bell from "./icons/Bell";
import Image from "next/image";
import NotificationItem from "./icons/NotificationItem";
import { useRouter } from "next/navigation";
import NotificationTab from "./ui/notification-tab";
import MessageTab from "./ui/message-tab";
import { useGetNotifications } from "@/features/notifications/hooks";
import { Skeleton } from "./ui/skeleton";
import { useVirtualizer } from "@tanstack/react-virtual";

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
  const dummyArray = [1, 2];
  const tabs = [
    { title: "Message", label: "messages", icon: <Message /> },
    { title: "Notifications", label: "notifications", icon: <Bell /> },
  ];
  const [activeTab, setActiveTab] = useState<"messages" | "notifications">(
    "messages",
  );

  const handleGoToChats = () => {
    router.push("/chats");
  };


  const { data: notificationsData, isLoading: notiLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetNotifications();

  const allNotifications =
    notificationsData?.pages?.flatMap(
      (p) => p?.data
    ) ?? [];

  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: allNotifications.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 120,
    overscan: 5,
  });

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;

    const isNearBottom =
      el.scrollTop + el.clientHeight >= el.scrollHeight - 100;

    if (isNearBottom && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };
  return (
    <>
      <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
        <DropdownMenuTrigger asChild>
          <Button className="border-none ring-0 bg-[#F7F7F7] hover:bg-[#ededed] rounded-full h-14 w-14">
            <MessageNotification />
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
                {dummyArray.map((msg, index) => (
                  <MessageTab key={index} handleGoToChats={handleGoToChats} />
                ))}

                <div className="mt-2 bg-gray-200 w-full h-px" />

                <DropdownMenuItem
                  className="bg-transparent text-black w-full font-semibold mt-2 py-2 flex justify-center"
                  onClick={handleGoToChats}
                >
                  <p className="text-center">View All</p>
                </DropdownMenuItem>
              </div>
            ) : (
              <div
                ref={parentRef}
                onScroll={handleScroll}
                className="h-[400px] overflow-y-auto relative"
              >
                {notiLoading ? (
                  <div className="space-y-2 p-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Skeleton key={index} className="w-full h-20 rounded-lg" />
                    ))}
                  </div>
                ) : !notiLoading && allNotifications.length === 0 ? (
                  <div className="p-2 text-center">No Notification Found</div>
                ) : (
                  <div
                    key={allNotifications.length}
                    style={{
                      height: `${virtualizer.getTotalSize()}px`,
                      position: "relative",
                    }}
                  >
                    {virtualizer.getVirtualItems().map((virtualItem) => {
                      const msg = allNotifications[virtualItem.index];

                      return (
                        <div
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            transform: `translateY(${virtualItem.start}px)`,
                          }}
                        >
                          <NotificationTab
                            msg={msg}
                            title={msg.title}
                            description={msg.description}
                            isFav={msg?.isFav ?? false}
                            createdAt={msg.createdAt}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
            {isFetchingNextPage && (
              <div className="p-2 text-center text-sm text-gray-500">
                Loading more...
              </div>
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
