"use client";

import React, { useRef } from "react";
import { useGetNotifications, useMarkAllRead } from "@/features/notifications/hooks";
import { Skeleton } from "@/components/ui/skeleton";
import NotificationTab from "@/components/ui/notification-tab";
import { Button } from "./button";

const NotificationsPanel = () => {
  const {
    data: notificationsData,
    isLoading: notiLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetNotifications();
  const { mutate, isPending } = useMarkAllRead()

  const allNotifications =
    notificationsData?.pages?.flatMap((p) => p?.data) ?? [];

  const hasNextPageRef = useRef(hasNextPage);
  const isFetchingRef = useRef(isFetchingNextPage);
  hasNextPageRef.current = hasNextPage;
  isFetchingRef.current = isFetchingNextPage;

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (
      scrollHeight - scrollTop - clientHeight < 80 &&
      hasNextPageRef.current &&
      !isFetchingRef.current
    ) {
      fetchNextPage();
    }
  };
  const handleMarkAllRead = () => {
    mutate()
  };

  return (
    <div onScroll={handleScroll} className="h-[400px] overflow-y-auto">
      <div className="flex items-center justify-end px-3 py-2  bg-white sticky top-0 z-10">

        {allNotifications.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleMarkAllRead}
            className="text-xs text-blue-600 hover:text-blue-700"
          >
            {isPending ? " Loading..." : " Mark all as read"}
          </Button>
        )}
      </div>
      {notiLoading ? (
        <div className="space-y-2 p-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="w-full h-20 rounded-lg" />
          ))}
        </div>
      ) : allNotifications.length === 0 ? (
        <div className="p-4 text-center text-sm text-gray-500">
          No Notifications Found
        </div>
      ) : (
        <>
          {allNotifications.map((msg: any, i: number) => (
            <NotificationTab
              key={msg?._id ?? i}
              msg={msg}
              title={msg.title}
              description={msg.description}
              isFav={msg?.isFav ?? false}
              createdAt={msg.createdAt}
            />
          ))}
          {isFetchingNextPage && (
            <p className="py-2 text-center text-sm text-gray-400">Loading more...</p>
          )}
          {!hasNextPage && allNotifications.length > 0 && (
            <p className="py-2 text-center text-sm text-gray-400">No more notifications</p>
          )}
        </>
      )}
    </div>
  );
};

export default NotificationsPanel;
