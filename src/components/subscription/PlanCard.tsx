import React, { useState } from "react";

import {
  View,
  Text,
  Pressable,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

const FEATURES = [
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
        className={`mr-[9px] h-[254px] w-[217px] rounded-[9px] border bg-white p-[14px] shadow-md ${
          active
            ? "border-orange-500"
            : "border-gray-200"
        }`}
      >
        {/* Plan name */}
        <Text className="text-[19px] font-semibold text-slate-900">
          {title}
        </Text>

        {/* Price */}
        <Text className="mt-[2px] text-[27px] font-bold text-orange-600">
          ₹{price}
        </Text>

        {/* Features */}
        <View className="mt-[13px] gap-2">
          {FEATURES.map((feature) => (
            <View
              className="flex-row items-center"
              key={feature}
            >
              <Ionicons
                name="checkmark-circle-outline"
                size={13}
                color="#F97316"
              />

              <Text className="ml-[6px] text-xs text-gray-500">
                {feature}
              </Text>
            </View>
          ))}
        </View>

        {/* Choose button */}
        <Pressable className="mt-auto h-10 items-center justify-center rounded-lg border border-gray-200 bg-orange-50">
          <Text className="text-[13px] text-slate-900">
            Choose Plan
          </Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

