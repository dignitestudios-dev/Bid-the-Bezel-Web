import { getToken } from "firebase/messaging";
import { getFirebaseMessaging } from "./firebase";
// import { getFirebaseMessaging } from "./firebase";

export const generateFCMToken = async () => {
  try {
    const messaging = await getFirebaseMessaging();
    if (!messaging) return null;

    const permission = await Notification.requestPermission();
    if (permission !== "granted") return null;

    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY!,
    });

    return token;
  } catch (error) {
    console.error("FCM error:", error);
    return null;
  }
};