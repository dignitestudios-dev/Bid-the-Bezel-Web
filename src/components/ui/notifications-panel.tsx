"use client";

import React, { useRef } from "react";
import { useGetNotifications } from "@/features/notifications/hooks";
import { Skeleton } from "@/components/ui/skeleton";
import NotificationTab from "@/components/ui/notification-tab";

const NotificationsPanel = () => {
  const {
    data: notificationsData,
    isLoading: notiLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetNotifications();

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

  return (
    <div onScroll={handleScroll} className="h-[400px] overflow-y-auto">
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
