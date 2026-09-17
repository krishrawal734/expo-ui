import { Stack } from "expo-router";
import { useEffect } from "react";

import { setupWebNotifications } from "../../services/webNotifications";

export default function RootLayout() {
  useEffect(() => {
    setupWebNotifications();
  }, []);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
