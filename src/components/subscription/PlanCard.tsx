import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const features = [
  "Unlimited Trips",
  "Priority Support",
  "Advanced Analytics",
  "Tax Reports",
];

export default function PlanCard({
  title,
  price,
}: {
  title: string;
  price: string;
}) {
  const [active, setActive] = useState(false);

  return (
    <Pressable
      onPressIn={() => setActive(true)}
      onPressOut={() => setActive(false)}
    >
      <View
        className={`w-[217px] h-[254px] p-4 mr-2 rounded-lg bg-white border ${
          active ? "border-orange-500" : "border-gray-200"
        }`}
      >
        {/* Plan name */}
        <Text className="text-lg font-bold text-slate-900">
          {title}
        </Text>

        {/* Price */}
        <Text className="text-2xl font-bold text-orange-600">
          ₹{price}
        </Text>

        {/* Features */}
        <View className="mt-4">
          {features.map((feature) => (
            <View key={feature} className="flex-row items-center mb-2">
              <Ionicons
                name="checkmark-circle-outline"
                size={14}
                color="orange"
              />

              <Text className="ml-2 text-gray-500">
                {feature}
              </Text>
            </View>
          ))}
        </View>

        {/* Button */}
        <Pressable className="mt-auto h-10 items-center justify-center rounded-lg bg-orange-50 border border-gray-200">
          <Text className="text-slate-900 font-display">
            Choose Plan
          </Text>
        </Pressable>
      </View>
    </Pressable>
  );
}