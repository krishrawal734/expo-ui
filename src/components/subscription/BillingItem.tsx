import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";

interface BillingItemProps {
  date: string;
  status: "Paid" | "Failed";
}

export default function BillingItem({ date, status }: BillingItemProps) {
  const isPaid = status === "Paid";

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

        <Ionicons
          name="download-outline"
          size={17}
          color="#374151"
          style={styles.download}
        />
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
