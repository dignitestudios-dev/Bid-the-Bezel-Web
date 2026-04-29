"use client"
import { getToken } from "firebase/messaging";
import { getFirebaseMessaging } from "./firebase";
// import { getFirebaseMessaging } from "./firebase";

export const generateFCMToken = async () => {
  try {
    const messaging = await getFirebaseMessaging();
    // console.log(messaging)
    if (!messaging) return null;



    const permission = await Notification.requestPermission();
    console.log(permission)
    if (permission !== "granted") return null;
    
    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY!,
    });

console.log(token , "===============>")
    return token;
  } catch (error) {
    console.error("FCM error:", error);
    return null;
  }
};