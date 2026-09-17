import { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type NotificationPopupProps = {
  title: string;
  body: string;
  onClose: () => void;
  autoCloseDuration?: number; // in milliseconds
};

export default function NotificationPopup({
  title,
  body,
  onClose,
  autoCloseDuration = 9000,
}: NotificationPopupProps) {
  useEffect(() => {
    if (!autoCloseDuration) return;

    const timer = setTimeout(() => {
      onClose();
    }, autoCloseDuration);

    return () => clearTimeout(timer);
  }, [title, body, autoCloseDuration, onClose]);

  return (
    <View
      style={{
        position: "absolute",
        top: 50,
        left: 16,
        right: 16,
        zIndex: 999999,
        elevation: 999999,
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 18,
        borderWidth: 1.5,
        borderColor: "#2563EB",
        shadowColor: "#1E40AF",
        shadowOffset: {
          width: 0,
          height: 8,
        },
        shadowOpacity: 0.25,
        shadowRadius: 16,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: "#EFF6FF",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 10,
            }}
          >
            <Text style={{ fontSize: 18 }}>🔔</Text>
          </View>
          <Text
            style={{
              flex: 1,
              fontSize: 16,
              fontWeight: "700",
              color: "#1E293B",
            }}
            numberOfLines={1}
          >
            {title}
          </Text>
        </View>

        <TouchableOpacity
          onPress={onClose}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={{
            padding: 4,
            marginLeft: 8,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "#64748B",
            }}
          >
            ✕
          </Text>
        </TouchableOpacity>
      </View>

      <Text
        style={{
          marginTop: 10,
          fontSize: 14,
          lineHeight: 20,
          color: "#475569",
        }}
      >
        {body}
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 14,
          paddingTop: 10,
          borderTopWidth: 1,
          borderTopColor: "#F1F5F9",
        }}
      >
        <Text style={{ fontSize: 12, color: "#94A3B8" }}>
         Notification
        </Text>

        <TouchableOpacity
          onPress={onClose}
          style={{
            backgroundColor: "#2563EB",
            paddingHorizontal: 16,
            paddingVertical: 6,
            borderRadius: 8,
          }}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 13,
              fontWeight: "600",
            }}
          >
            Dismiss
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}