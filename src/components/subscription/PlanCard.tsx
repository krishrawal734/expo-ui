import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";

interface PlanCardProps {
  title: string;
  price: string;
}

export default function PlanCard({
  title,
  price,
}: PlanCardProps) {
  return (
    <View style={styles.card}>

      <Text style={styles.title}>
        {title}
      </Text>

      <Text style={styles.price}>
        ₹{price}
      </Text>

      <View style={styles.features}>

        <Feature text="Unlimited Trips" />

        <Feature text="Priority Support" />

        <Feature text="Advanced Analytics" />

        <Feature text="Tax Reports" />

      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>
          Choose Plan
        </Text>
      </TouchableOpacity>

    </View>
  );
}

function Feature({ text }: { text: string }) {
  return (
    <View style={styles.feature}>

      <Ionicons
        name="checkmark-circle-outline"
        size={13}
        color={Colors.orange}
      />

      <Text style={styles.featureText}>
        {text}
      </Text>

    </View>
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