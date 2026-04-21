import React from "react";
import { DropdownMenuItem } from "./dropdown-menu";
import Image from "next/image";
import NotificationItem from "../icons/NotificationItem";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";

type Props = {
  title: string;
  description: string;
  isShippingDetails: boolean;
  isFav: boolean;
  handleGoToChats: () => void;
};

const NotificationTab = ({
  title,
  description,
  isShippingDetails,
  isFav,
  handleGoToChats,
}: Props) => {
  return (
    <DropdownMenuItem className="cursor-pointer items-start flex gap-2 p-2 rounded-lg group  transition-all">
      <div className="w-9 h-9 rounded-full flex justify-center items-center bg-gray-100 group-hover:bg-gray-800">
        {isFav ? <Heart size={80} color="red" fill="red" /> : <NotificationItem />}
      </div>

      <div className="flex-1">
        <p className="group-hover:text-black font-semibold">{title}</p>
        <div className="mt-1 mb-3 flex items-center justify-between gap-5">
          <p className="group-hover:text-gray-800 flex-1 text-gray-700 text-sm truncate">
            {description}
          </p>

          <p className="group-hover:text-black text-black font-medium text-sm">
            1 min
          </p>
        </div>

        <Button
          className={cn(
            "bg-white border border-gray-200 text-black hover:bg-gray-800",
            {
              " text-green-500": isShippingDetails,
            },
          )}
          size={"sm"}
        >
          {isShippingDetails ? "Add Shipping Details" : "View"}
        </Button>
      </div>
    </DropdownMenuItem>
  );
};

export default NotificationTab;
