import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

interface BillingItemProps {
  date: string;
  status: "Paid" | "Failed";
}

export default function BillingItem({ date, status }: BillingItemProps) {

  const [loading, setLoading] = useState(false);

  const download = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <View style={styles.container}>

      {/* Date and price */}
      <View>
        <Text style={styles.date}>{date}</Text>

        <Text style={styles.details}>
          ₹499 • Monthly
        </Text>
      </View>


      {/* Status and download */}
      <View style={styles.right}>

        <Text style={styles.status}>
          {status}
        </Text>


        <Pressable onPress={download}>

          {loading ? (
            <ActivityIndicator size="small" color="black" />
          ) : (
            <Ionicons
              name="download-outline"
              size={20}
              color="black"
            />
          )}

        </Pressable>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    padding: 15,

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    borderBottomWidth: 1,

    borderBottomColor: "#ddd",
  },

  date: {
    fontSize: 14,

    fontWeight: "bold",
  },

  details: {
    marginTop: 5,

    fontSize: 12,

    color: "gray",
  },
  
  right: {
    flexDirection: "row",

    alignItems: "center",

    gap: 15,
  },

  status: {
    backgroundColor: "#FFA066",

    color: "BLACK",

    paddingHorizontal: 10,

    paddingVertical: 5,

    borderRadius: 10,

    fontSize: 10,
  },

});

