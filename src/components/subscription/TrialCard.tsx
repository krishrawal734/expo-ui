import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";

export default function TrialCard() {
  return (
    <View style={styles.container}>

      <View>
        <Text style={styles.title}>
          Free Trial
        </Text>

        <Text style={styles.subtitle}>
          12 days left
        </Text>
      </View>

      <Ionicons
        name="stopwatch"
        size={19}
        color="brown"
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    marginTop: 8,

    height: 60,

    paddingHorizontal: 12,

    borderRadius: 6,

    backgroundColor: "#FFA066",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    elevation: 2,
  },

  title: {
    fontSize: 15,
    fontWeight: "500",

    color: "#542400",
  },

  subtitle: {
    marginTop: 3,

    fontSize: 12,

    color: "brown",
  },
});