 import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import EmailLogin from "../../components/auth/EmailLogin";
import GithubLogin from "../../components/auth/GithubLogin";
import GoogleLogin from "../../components/auth/GoogleLogin";
import PhoneLogin from "../../components/auth/PhoneLogin";

export default function LoginScreen() {
  const [phoneLogin, setPhoneLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {phoneLogin ? "Phone Login" : "Welcome Back"}
      </Text>
      <Text style={styles.subtitle}>
        {phoneLogin ? "Login using your phone number" : "Login to your account"}
      </Text>

      {phoneLogin ? (
        <PhoneLogin
          disabled={loading}
          onLoadingChange={setLoading}
          onBack={() => setPhoneLogin(false)}
        />
      ) : (
        <>
          <EmailLogin disabled={loading} onLoadingChange={setLoading} />
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.divider} />
          </View>
          <TouchableOpacity
            style={styles.phoneButton}
            onPress={() => setPhoneLogin(true)}
            disabled={loading}
          >
            <FontAwesome
              name="phone"
              size={20}
              color="#2563EB"
              style={styles.icon}
            />
            <Text style={styles.phoneButtonText}>Continue with Phone</Text>
          </TouchableOpacity>
          <GoogleLogin disabled={loading} onLoadingChange={setLoading} />
          <GithubLogin disabled={loading} onLoadingChange={setLoading} />
        </>
      )}

      {!phoneLogin && (
        <View style={styles.signupContainer}>
          <Text>Don&apos;t have an account? </Text>
          <Link href="/(auth)/signup" style={styles.link}>
            Sign Up
          </Link>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  title: { fontSize: 32, fontWeight: "700", marginBottom: 8 },
  subtitle: { fontSize: 16, color: "#666", marginBottom: 30 },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  divider: { flex: 1, height: 1, backgroundColor: "#E5E7EB" },
  dividerText: {
    marginHorizontal: 12,
    color: "#6B7280",
    fontSize: 13,
    fontWeight: "600",
  },
  phoneButton: {
    height: 52,
    borderWidth: 1,
    borderColor: "#2563EB",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  icon: { marginRight: 10 },
  phoneButtonText: { fontSize: 16, fontWeight: "600", color: "#2563EB" },
  link: { color: "#2563EB", fontWeight: "600", textAlign: "center" },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
});
