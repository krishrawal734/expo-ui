import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";

interface BillingItemProps {
  date: string;
  status: "Paid" | "Failed";
}

export default function BillingItem({ date, status }: BillingItemProps) {
  const isPaid = status === "Paid";
  const [loading, setLoading] = useState(false);

  function onDownload() {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.date}>{date}</Text>

        <Text style={styles.details}>₹499 • Monthly</Text>
      </View>

      <View style={styles.right}>
        <View
          style={[
            styles.status,
            {
              backgroundColor: isPaid
                ? Colors.paidBackground
                : Colors.failedBackground,
            },
          ]}
        >
          <Text
            style={[
              styles.statusText,
              {
                color: isPaid ? Colors.paidText : Colors.failedText,
              },
            ]}
          >
            {status}
          </Text>
        </View>

        <Pressable onPress={onDownload}>
          {loading ? (
            <ActivityIndicator size="small" color="#374151" style={styles.download} />
          ) : (
            <Ionicons
              name="download-outline"
              size={18}
              color="#374151"
              style={styles.download}
            />
          )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 62,

    paddingHorizontal: 12,

    borderBottomWidth: 1,
    borderBottomColor: Colors.border,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  date: {
    fontSize: 13,
    fontWeight: "bold",

    color: Colors.text,
  },

  details: {
    marginTop: 4,

    fontSize: 11,

    color: Colors.gray,
  },

  right: {
    flexDirection: "row",
    alignItems: "center",
  },

  status: {
    paddingHorizontal: 8,
    paddingVertical: 4,

    borderRadius: 10,
  },

  statusText: {
    fontSize: 10,
    fontWeight: "bold",
  },

  download: {
    marginLeft: 14,
  },
});
