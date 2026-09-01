import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";

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
      <View style={[styles.card, active && styles.activeCard]}>
        {/* Plan name */}
        <Text style={styles.title}>{title}</Text>

        {/* Price */}
        <Text style={styles.price}>₹{price}</Text>

        {/* Features */}
        <View style={styles.features}>
          {FEATURES.map((feature) => (
            <View style={styles.feature} key={feature}>
              <Ionicons
                name="checkmark-circle-outline"
                size={13}
                color={Colors.orange}
              />

              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        {/* Choose button */}
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Choose Plan</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 217,
    height: 254,

    marginRight: 9,

    padding: 14,

    borderWidth: 1,
    borderColor: Colors.border,

    borderRadius: 9,

    backgroundColor: Colors.white,

    elevation: 4,
  },

  activeCard: {
    borderColor: Colors.orange,
  },

  title: {
    fontSize: 19,

    fontWeight: "600",

    color: Colors.text,
  },

  price: {
    marginTop: 2,

    fontSize: 27,

    fontWeight: "700",

    color: Colors.darkOrange,
  },

  features: {
    marginTop: 13,

    gap: 8,
  },

  feature: {
    flexDirection: "row",

    alignItems: "center",
  },

  featureText: {
    marginLeft: 6,

    fontSize: 12,

    color: Colors.gray,
  },

  button: {
    height: 40,

    marginTop: "auto",

    borderWidth: 1,

    borderColor: Colors.border,

    borderRadius: 8,

    backgroundColor: Colors.button,

    justifyContent: "center",

    alignItems: "center",
  },

  buttonText: {
    fontSize: 13,

    color: Colors.text,
  },
});
