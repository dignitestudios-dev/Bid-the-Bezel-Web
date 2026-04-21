import React, { useState } from "react";
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

const notifications = [
  {
    title: "You won a bid",
    description: "Review your bid and add shipping details",
    isShippingDetails: true,
    isFav:false
  },
  {
    title: "Watch Authenticated",
    description: "Your watch authentication approved",
    isShippingDetails: false,
     isFav:false
  },
  {
    title: "24 Hours remainig",
    description: "fav watch",
    isShippingDetails: false,
     isFav:true
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
    "notifications",
  );

  const handleGoToChats = () => {
    router.push("/chats");
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
          className="w-[450px] max-w-full max-h-[400px] overflow-y-auto p-2 flex flex-col"
          align="end"
        >
          <div className="grid grid-cols-2 gap-4 font-medium border-b">
            {tabs.map((tab) => (
              <div
                key={tab.label}
                className={`py-2 flex gap-1 items-center border-b-2 transition-all ${
                  activeTab === tab.label
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
                 <MessageTab key={index} handleGoToChats={handleGoToChats}  />
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
              <div className="w-full pt-3">
                {notifications.map((msg, index) => (
                  <NotificationTab
                    key={index}
                    title={msg.title}
                    description={msg.description}
                    isFav={msg.isFav}
                    isShippingDetails={msg.isShippingDetails}
                    handleGoToChats={handleGoToChats}
                  />
                ))}
              </div>
            )}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <LogoutDialog
        open={logoutOpen}
        onOpenChange={setLogoutOpen}
        onConfirm={() => dispatch(logout())}
      />
    </>
  );
};

export default MessageNotificationMenu;
