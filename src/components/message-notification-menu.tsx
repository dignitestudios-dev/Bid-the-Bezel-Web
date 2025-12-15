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

const MessageNotificationMenu = () => {
  const dispatch = useAppDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const dummyArray = [1, 2];
  const tabs = [
    { title: "Message", label: "messages", icon: <Message /> },
    { title: "Notifications", label: "notifications", icon: <Bell /> },
  ];
  const [activeTab, setActiveTab] = useState<"messages" | "notifications">(
    "notifications"
  );

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
                  <DropdownMenuItem
                    key={index}
                    className="cursor-pointer flex gap-2 p-2 rounded-lg group hover:bg-primary! transition-all"
                  >
                    <div className="h-9 w-9 rounded-full relative overflow-hidden">
                      <Image
                        src="/images/user.jpg"
                        alt="User"
                        width={36}
                        height={36}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <p className="group-hover:text-white font-semibold">
                        Iamactive & Admin
                      </p>
                      <div className="mt-1 flex items-center justify-between gap-5">
                        <p className="group-hover:text-gray-100 flex-1 text-gray-700 text-sm truncate">
                          Lectus neque eget ipsum mi tempus sed.
                        </p>

                        <p className="group-hover:text-white text-black font-medium text-sm">
                          1 min
                        </p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))}

                <div className="mt-2 bg-gray-200 w-full h-px" />

                <DropdownMenuItem className="bg-transparent text-black w-full font-semibold mt-2 py-2 flex justify-center">
                  <p className="text-center">View All</p>
                </DropdownMenuItem>
              </div>
            ) : (
              <div className="w-full pt-3">
                {dummyArray.map((msg, index) => (
                  <DropdownMenuItem
                    key={index}
                    className="cursor-pointer flex gap-2 p-2 rounded-lg group hover:bg-primary! transition-all"
                  >
                    <div className="w-9 h-9 rounded-full flex justify-center items-center bg-gray-100 group-hover:bg-gray-800">
                      <NotificationItem />
                    </div>

                    <div className="flex-1">
                      <p className="group-hover:text-white font-semibold">
                        You won a bid
                      </p>
                      <div className="mt-1 mb-3 flex items-center justify-between gap-5">
                        <p className="group-hover:text-gray-100 flex-1 text-gray-700 text-sm truncate">
                          Review your bid and add shipping details{" "}
                        </p>

                        <p className="group-hover:text-white text-black font-medium text-sm">
                          1 min
                        </p>
                      </div>

                      <Button
                        className="group-hover:bg-gray-800 hover:bg-gray-700"
                        size={"sm"}
                      >
                        View
                      </Button>
                    </div>
                  </DropdownMenuItem>
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
