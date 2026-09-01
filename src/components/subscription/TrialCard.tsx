import { View, Text, StyleSheet } from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function TrialCard() {
  return (
    <View style={styles.container}>
      {/* Text */}
      <View>
        <Text style={styles.title}>Free Trial</Text>

        <Text style={styles.subtitle}>12 days left</Text>
      </View>

      {/* Icon */}
      <Ionicons name="stopwatch" size={19} color="brown" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,

    marginTop: 15,
    marginHorizontal: 8,

    paddingHorizontal: 12,

    backgroundColor: "#FFA066",

    borderRadius: 6,

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
