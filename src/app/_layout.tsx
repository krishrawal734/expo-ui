import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import NotificationPopup from "../components/NotificationPopup";
import { AuthProvider } from "../context/AuthContext";
import { registerNotificationListener } from "../services/notifications";

type NotificationItem = {
  title: string;
  body: string;
};

export default function RootLayout() {
  const [notification, setNotification] = useState<NotificationItem | null>(
    null
  );

  useEffect(() => {
    console.log("[RootLayout] Initializing global push notification listener");

    let cleanupFn: (() => void) | undefined;

    registerNotificationListener((title, body) => {
      console.log("[RootLayout] Popup Notification Triggered:", title, body);
      setNotification({ title, body });
    }).then((unsubscribe) => {
      cleanupFn = unsubscribe;
    });

    return () => {
      if (cleanupFn) {
        cleanupFn();
      }
    };
  }, []);

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <View style={{ flex: 1 }}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(app)" />
          </Stack>

          {notification && (
            <NotificationPopup
              title={notification.title}
              body={notification.body}
              onClose={() => setNotification(null)}
            />
          )}
        </View>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
