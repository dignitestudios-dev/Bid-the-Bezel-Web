"use client";

import { useEffect, useRef } from "react";
import { getToken, onMessage } from "firebase/messaging";
import { getFirebaseMessaging } from "@/lib/firebase";
import { useMe, useUpdateFcmToken } from "@/features/auth/hooks";
import { apiClient } from "@/lib/apiClient";

const VAPID_KEY = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY!;

export const useFcmNotification = () => {
  const { data: user } = useMe();
  const userId = user?.data?._id;
  const { mutate: updateFcmToken } = useUpdateFcmToken();
  const unsubscribeRef = useRef<(() => void) | null>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!userId) {
      // cleanup on logout
      unsubscribeRef.current?.();
      unsubscribeRef.current = null;
      initializedRef.current = false;
      return;
    }

    // already initialized for this user
    if (initializedRef.current) return;

    const init = async () => {
      const messaging = await getFirebaseMessaging();
      if (!messaging) return;

      const permission = await Notification.requestPermission();
      if (permission !== "granted") return;

      try {
        const swRegistration = await navigator.serviceWorker.register(
          "/firebase-messaging-sw.js"
        );

        const token = await getToken(messaging, {
          vapidKey: VAPID_KEY,
          serviceWorkerRegistration: swRegistration,
        });

        if (token) {
          console.log("FCM Token:", token);
          // Send token to backend
          updateFcmToken(token as any);
        }
      } catch (err) {
        console.error("FCM token error:", err);
        return;
      }

      // Foreground message listener
      unsubscribeRef.current = onMessage(messaging, (payload) => {
        const title = payload.notification?.title ?? "New Notification";
        const body = payload.notification?.body ?? "";
        const icon = payload.notification?.icon ?? "/favicon.ico";

        navigator.serviceWorker.ready.then((sw) => {
          sw.showNotification(title, { body, icon });
        });
      });

      initializedRef.current = true;
    };

    init();

    return () => {
      unsubscribeRef.current?.();
      unsubscribeRef.current = null;
      initializedRef.current = false;
    };
  }, [userId]);
};
