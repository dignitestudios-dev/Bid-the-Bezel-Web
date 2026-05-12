import React from "react";
import { DropdownMenuItem } from "./dropdown-menu";
import Image from "next/image";
import NotificationItem from "../icons/NotificationItem";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { timeAgo } from "@/lib/helper";
import { useGetAuthenticateDetail } from "@/features/buyer/hook";

type Props = {
  title: string;
  description: string;
  isFav: boolean;
  createdAt: string;
  msg: any,
};

const NotificationTab = ({
  title,
  description,
  isFav,
  createdAt,
  msg,
}: Props) => {
  const router = useRouter()
  const hasButtonShowSeller = msg.metadata?.type === "SHIPPING_DETAIL_SELLER"
  const hasButtonShowBuyer = msg.metadata?.type === "SHIPPING_DETAIL_BUYER"

  const handleNavigate = () => {
    if (msg.metadata?.type === "SHIPPING_DETAIL_SELLER") {
      router.push(`/seller/shipping-details/${msg.metadata?._id}`);
    } else if (msg.metadata?.type === "fixed_price") {
      router.push(`/fixed-price/${msg.metadata?._id}`);
    } else if (msg.metadata?.type === "taking_offers") {
      router.push(`/taking-offer/${msg.metadata?._id}`);
    } else if (msg.metadata?.type === "auction") {
      router.push(`/auction/${msg.metadata?._id}`);
    } else if (msg.metadata?.cta === "PRODUCT_TAKING_OFFER") {
      router.push(`/taking-offer/${msg.metadata?._id}`);
    } else if (msg.metadata?.type === "SELLER_ORDER") {
      router.push(`/profile/my-orders?tab=sold`);
    } else if (msg.metadata?.type === "BUYER_ORDER") {
      router.push(`/profile/my-orders`);
    } else if (msg.metadata?.type === "TRANSACTION") {
      router.push(`/profile/payments`);
    } else if (msg.metadata?.type === "SHIPPING_DETAIL_BUYER") {
      router.push(`/buy-now/${msg.metadata?._id}`);
    } else if (msg.metadata?.type === "PRODUCT_DRAFT") {
      router.push(`/profile/my-orders?isDraft=true`);
    }
  };



  const { data, isLoading } = useGetAuthenticateDetail(
    msg.metadata?._id,
    { enabled: hasButtonShowSeller }
  );

  const isDetailFilled = data?.data?.isDetailFilled;
  const isShippingDisabled = hasButtonShowSeller && (isDetailFilled || isLoading);

  return (
    <DropdownMenuItem className="cursor-pointer items-start flex gap-2 p-2 rounded-lg group  transition-all">
      <div className="w-9 h-9 rounded-full flex justify-center items-center bg-gray-100 group-hover:bg-gray-800">
        {isFav ? <Heart size={80} color="red" fill="red" /> : <NotificationItem />}
      </div>

      <div className="flex-1 min-w-0">
        <p className="group-hover:text-black font-semibold">
          {title}
        </p>

        <div className="mt-1 mb-3 flex items-center gap-3">
          <p className="group-hover:text-gray-800 flex-1 min-w-0 text-gray-700 text-sm truncate">
            {description}
          </p>

          <p className="group-hover:text-black text-black font-medium text-sm shrink-0">
            {timeAgo(createdAt)}{" "}
          </p>
        </div>

        <Button
          className={cn(
            "bg-white border border-gray-200 text-black hover:bg-gray-800",
            {
              "text-green-500": hasButtonShowSeller && !isDetailFilled,
              "opacity-50 cursor-not-allowed": isShippingDisabled,
            }
          )}
          size={"sm"}
          onClick={handleNavigate}
          disabled={isShippingDisabled}
        >
          {isLoading && hasButtonShowSeller
            ? "Checking..."
            : hasButtonShowSeller || hasButtonShowBuyer
              ? isDetailFilled
                ? "Details Added"
                : "Add Shipping Details"

              : "View"}
        </Button>
      </div>
    </DropdownMenuItem>
  );
};

export default NotificationTab;
