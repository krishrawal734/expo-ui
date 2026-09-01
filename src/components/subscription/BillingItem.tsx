import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface BillingItemProps {
  date: string;
  status: "Paid" | "Failed";
}

export default function BillingItem({
  date,
  status,
}: BillingItemProps) {
  const [loading, setLoading] = useState(false);

  const download = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <View className="flex-row items-center justify-between border-b border-gray-200 p-[15px]">
      {/* Date and price */}
      <View>
        <Text className="text-sm font-bold text-black">
          {date}
        </Text>

        <Text className="mt-[5px] text-xs text-gray-500">
          ₹499 • Monthly
        </Text>
      </View>

      {/* Status and download */}
      <View className="flex-row items-center gap-[15px]">
        <Text
          className={`rounded-[10px] px-[10px] py-[5px] text-[10px] ${
            status === "Paid"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {status}
        </Text>

        <Pressable
          onPress={download}
          className="items-center justify-center"
        >
          {loading ? (
            <ActivityIndicator
              size="small"
              color="black"
            />
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

