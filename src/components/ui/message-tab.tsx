import React from "react";
import { DropdownMenuItem } from "./dropdown-menu";
import Image from "next/image";
import { formatTime } from "@/lib/utils/date.utils";

type Props = {
  handleGoToChats: () => void;
  chat: any;
};

const MessageTab = ({ handleGoToChats, chat }: Props) => {
  const participants = chat?.participants || [];
console.log(participants)
  return (
    <DropdownMenuItem
      className="cursor-pointer flex items-center gap-3 p-3 rounded-lg transition-all group"
      onClick={handleGoToChats}
    >

      <div className="flex -space-x-2 flex-shrink-0">
        {participants.slice(0, 3).map((item: any) => (
          <div
            key={item?._id}
            className="h-10 w-10 rounded-full overflow-hidden border-2 border-white"
          >
            {item?.user?.profilePicture ?     <Image
              src={
                item?.user?.profilePicture?.location ||
                "/default-avatar.png"
              }
              alt="User"
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />:      
            <div className="bg-blue-200 rounded-full w-10 h-10 flex justify-center items-center font-bold" >AD</div>
            }
       
          </div>
        ))}
      </div>


      <div className="flex-1 min-w-0">

        <p className="font-semibold text-gray-900 truncate">
          {participants.length > 2
            ? `${participants[0]?.user?.userName}, ${participants[1]?.user?.userName} +${participants.length - 2}`
            : participants
              .map((p: any) => p?.user?.userName)
              .join(", ")}
        </p>


        <p className="text-sm text-gray-600 truncate">
          {chat?.lastMessage?.text || "No messages yet"}
        </p>
      </div>


      <div className="text-xs text-gray-500 whitespace-nowrap">
        {chat?.lastMessage?.sentAt
          ? formatTime(chat.lastMessage.sentAt)
          : ""}
      </div>
    </DropdownMenuItem>
  );
};

export default MessageTab;