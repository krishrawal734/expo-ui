import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { Colors } from "../../constants/colors";

export default function Header() {
  return (
    <View style={styles.container}>
     

      <Text style={styles.title}>
        Subscription
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 12,

    backgroundColor: Colors.white,
  },

  title: {
    marginLeft: 10,
    marginTop: 30,

    fontSize:  20,
    fontWeight: "bold",
    fontFamily: "Poppins",

    color: Colors.darkOrange,
  },
});