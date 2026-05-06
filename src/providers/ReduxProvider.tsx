"use client";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/lib/store";
import { getFirebaseMessaging } from "@/lib/firebase";
import { onMessage } from "firebase/messaging";
import { showSuccess } from "@/lib/toast";

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const setupListener = async () => {
      try {
        const messaging = await getFirebaseMessaging();
        if (!messaging) return;

        const unsubscribe = onMessage(messaging, (payload) => {
          console.log("Foreground message received:", payload);
          if (payload.notification?.title && Notification.permission === "granted") {
            new Notification(payload.notification.title, {
              body: payload.notification.body,
              icon: "/icon.png",
            });
          }
        });

        return () => unsubscribe();
      } catch (error) {
        console.error("Failed to setup foreground listener:", error);
      }
    };

    setupListener();
  }, []);

  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
