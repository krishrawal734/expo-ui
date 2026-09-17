import {
  getMessaging,
  getToken,
  isSupported,
  onMessage,
} from "firebase/messaging";

import { app } from "../config/firebase";

export type NotificationCallback = (title: string, body: string) => void;

const VAPID_KEY =
  "BGYXBd0Y3f2dqoV_sstTZbzLUiinKSiB8K-GxGYaCZvhHVg-lCYVnfAxjpuHcgzczvT3zgHIU3r7EM3mFhxWaEM";

export async function setupWebNotifications(
  onNotification?: NotificationCallback
): Promise<(() => void) | undefined> {
  console.log("[FCM Web] Setup started");

  if (typeof window === "undefined") {
    return;
  }

  try {
    if (!("Notification" in window)) {
      console.log("[FCM Web] Browser notifications not supported");
      return;
    }

    if (!("serviceWorker" in navigator)) {
      console.log("[FCM Web] Service workers not supported");
      return;
    }

    const supported = await isSupported();
    if (!supported) {
      console.log("[FCM Web] Firebase Messaging is not supported");
      return;
    }

    const permission = await Notification.requestPermission();
    console.log("[FCM Web] Permission status:", permission);

    if (permission !== "granted") {
      console.log("[FCM Web] Permission denied");
      return;
    }

    await navigator.serviceWorker.register("/firebase-messaging-sw.js");
    const activeRegistration = await navigator.serviceWorker.ready;

    if (!activeRegistration.active) {
      console.log("[FCM Web] Service worker not active");
      return;
    }

    const messaging = getMessaging(app);
    const token = await getToken(messaging, {
      vapidKey: VAPID_KEY,
      serviceWorkerRegistration: activeRegistration,
    });

    if (token) {
      console.log("==================================================");
      console.log("FCM TOKEN (Copy & paste into Firebase Console):");
      console.log(token);
      console.log("==================================================");
    } else {
      console.log("[FCM Web] Could not retrieve FCM token");
    }

    // Handle foreground notifications
    const unsubscribeOnMessage = onMessage(messaging, (payload) => {
      console.log("[FCM Web] Foreground notification received:", payload);

      const title =
        payload.notification?.title ||
        payload.data?.title ||
        "New Notification";

      const body =
        payload.notification?.body ||
        payload.data?.body ||
        payload.data?.message ||
        "You received a new notification.";

      if (onNotification) {
        onNotification(title, body);
      }
    });

    // Handle background notification click/messages sent from service worker
    const handleSWMessage = (event: MessageEvent) => {
      if (
        event.data &&
        (event.data.type === "FCM_NOTIFICATION_CLICK" ||
          event.data.type === "FCM_BG_NOTIFICATION")
      ) {
        console.log("[FCM Web] Received message from Service Worker:", event.data);
        if (onNotification && event.data.title) {
          onNotification(event.data.title, event.data.body || "");
        }
      }
    };

    navigator.serviceWorker.addEventListener("message", handleSWMessage);

    console.log("[FCM Web] Setup completed successfully");

    return () => {
      unsubscribeOnMessage();
      navigator.serviceWorker.removeEventListener("message", handleSWMessage);
    };
  } catch (error) {
    console.error("[FCM Web] Setup failed with error:", error);
    return;
  }
}
