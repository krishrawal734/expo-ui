import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

import {
  NotificationCallback,
  setupWebNotifications,
} from "./webNotifications";

// Set foreground notification handler for native (Android/iOS) according to Expo SDK 57 spec
if (Platform.OS !== "web") {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
}

export { setupWebNotifications };

export async function registerNotificationListener(
  onNotification: NotificationCallback,
): Promise<(() => void) | undefined> {
  if (Platform.OS === "web") {
    return setupWebNotifications(onNotification);
  }

  // Native Platform setup (Android / iOS)
  try {
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "General notifications",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        sound: "default",
        enableVibrate: true,
        showBadge: true,
      });
    }

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      console.log("[Native Push] Notification permission denied");
      return;
    }

    try {
      const projectId =
        Constants.expoConfig?.extra?.eas?.projectId ??
        Constants.easConfig?.projectId;
      const expoToken = (
        await Notifications.getExpoPushTokenAsync(
          projectId ? { projectId } : undefined,
        )
      ).data;
      console.log("==================================================");
      console.log("[Native Push] EXPO PUSH TOKEN:", expoToken);
      console.log("==================================================");
    } catch (tokenErr) {
      console.log("[Native Push] Could not fetch Expo token:", tokenErr);
    }

    try {
      const deviceToken = (await Notifications.getDevicePushTokenAsync()).data;
      console.log("==================================================");
      console.log("[Native Push] DEVICE FCM TOKEN:", deviceToken);
      console.log("==================================================");
    } catch (deviceErr) {
      console.log("[Native Push] Could not fetch device FCM token:", deviceErr);
    }

    const receivedSubscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("[Native Push] Notification received:", notification);
        const title = notification.request.content.title || "New Notification";
        const body = notification.request.content.body || "";
        onNotification(title, body);
      },
    );

    return () => {
      receivedSubscription.remove();
    };
  } catch (error) {
    console.error("[Native Push] Setup error:", error);
    return;
  }
}
