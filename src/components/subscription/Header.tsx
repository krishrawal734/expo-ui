import { View, Text, StyleSheet } from "react-native";

import { Colors } from "../../constants/colors";

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subscription</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,

    justifyContent: "center",

    paddingHorizontal: 12,

    backgroundColor: Colors.white,
  },

  title: {
    fontSize: 20,

    fontWeight: "bold",

    color: Colors.darkOrange,
  },
});
