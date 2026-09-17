import { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useAuth } from "../../context/AuthContext";
import { setupWebNotifications } from "../../services/notifications";

export default function HomeScreen() {
  const { user, logout } = useAuth();
  const [notificationStatus, setNotificationStatus] = useState("Not enabled");

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error: any) {
      Alert.alert("Error", error.message || "Unable to logout.");
    }
  };

  const handleEnableNotifications = async () => {
    const result = await setupWebNotifications();
    setNotificationStatus(
      result !== undefined ||
        (typeof window !== "undefined" && Notification.permission === "granted")
        ? "Enabled"
        : "Setup failed; check browser console"
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome 👋</Text>

      <Text style={styles.email}>{user?.email}</Text>

      <Text style={styles.notificationStatus}>
        Notifications: {notificationStatus}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={handleEnableNotifications}
      >
        <Text style={styles.buttonText}>Enable notifications</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 10,
  },

  email: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
  },

  notificationStatus: {
    color: "#374151",
    fontSize: 15,
    marginBottom: 12,
  },

  button: {
    width: "100%",
    height: 52,
    borderRadius: 10,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  logoutButton: {
    backgroundColor: "#DC2626",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
