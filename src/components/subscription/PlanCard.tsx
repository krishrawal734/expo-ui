import React, { useRef } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Animated,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";

interface PlanCardProps {
  title: string;
  price: string;
}

export default function PlanCard({ title, price }: PlanCardProps) {
  // Animated value drives the press/hover-like effect.
  const progress = useRef(new Animated.Value(0)).current;

  const onPressIn = () => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
n  const onPressOut = () => {
    Animated.timing(progress, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  // Interpolations for subtle scale and the sliding accent bar
  const scale = progress.interpolate({ inputRange: [0, 1], outputRange: [1, 1.01] });
  const accentTranslateX = progress.interpolate({ inputRange: [0, 1], outputRange: [12, 0] });
  const accentOpacity = progress.interpolate({ inputRange: [0, 1], outputRange: [0, 1] });
  const shadowOpacity = progress.interpolate({ inputRange: [0, 1], outputRange: [0, 0.25] });

  return (
    <Pressable onPressIn={onPressIn} onPressOut={onPressOut} style={{ borderRadius: 9 }}>
      <Animated.View
        style={[
          styles.card,
          {
            transform: [{ scale }],
            shadowOpacity: shadowOpacity as any,
          },
        ]}
      >
        {/* Animated right accent bar (slides in on touch) */}
        <Animated.View
          pointerEvents="none"
          style={[
            styles.accent,
            {
              opacity: accentOpacity,
              transform: [{ translateX: accentTranslateX }],
            },
          ]}
        />
n        <Text style={styles.title}>{title}</Text>
n        <Text style={styles.price}>₹{price}</Text>

        <View style={styles.features}>
          <Feature text="Unlimited Trips" />
          <Feature text="Priority Support" />
          <Feature text="Advanced Analytics" />
          <Feature text="Tax Reports" />
        </View>
n        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Choose Plan</Text>
        </Pressable>
      </Animated.View>
    </Pressable>
  );
}

function Feature({ text }: { text: string }) {
  return (
    <View style={styles.feature}>
      <Ionicons name="checkmark-circle-outline" size={13} color={Colors.orange} />
      <Text style={styles.featureText}>{text}</Text>
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

    // elevation / shadow for iOS/Android — shadowOpacity will be controlled by animation
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 3,
  },
n  // Right-side accent bar that appears on touch
  accent: {
    position: "absolute",
    right: 6,
    top: 12,
    bottom: 12,
    width: 10,
    borderRadius: 8,
    backgroundColor: Colors.darkOrange,
    // small inner glow effect (semi-transparent) to mimic highlight
    shadowColor: Colors.darkOrange,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
n  title: {
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
n  features: {
    marginTop: 13,
    gap: 8,
  },
n  feature: {
    flexDirection: "row",
    alignItems: "center",
  },

  featureText: {
    marginLeft: 6,
    fontSize: 12,
    color: Colors.gray,
  },
n  button: {
    height: 40,
    marginTop: "auto",
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    backgroundColor: Colors.button,
    justifyContent: "center",
    alignItems: "center",
  },
n  buttonText: {
    fontSize: 13,
    color: Colors.text,
  },
});