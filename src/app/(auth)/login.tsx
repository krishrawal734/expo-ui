import { useState } from "react";

import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Link, router } from "expo-router";

import { FontAwesome } from "@expo/vector-icons";

import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { GoogleSignin } from "@react-native-google-signin/google-signin";

import * as WebBrowser from "expo-web-browser";

import { auth } from "../../config/firebase";

// Google configuration
import "../../services/googleAuth";

// GitHub functions
import {
  githubLogin,
  getGithubAccessToken,
} from "../../services/githubAuth";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  // --------------------------------
  // EMAIL / PASSWORD LOGIN
  // --------------------------------

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      router.replace("/(app)/home");
    } catch (error: any) {
      Alert.alert(
        "Login failed",
        error?.message || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------
  // GOOGLE LOGIN
  // --------------------------------

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      // Check Google Play Services
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      // Open Google login
      const response = await GoogleSignin.signIn();

      // Get Google ID token
      const idToken = response.data?.idToken;

      if (!idToken) {
        throw new Error(
          "Google ID token was not received."
        );
      }

      // Create Firebase Google credential
      const credential =
        GoogleAuthProvider.credential(idToken);

      // Login to Firebase
      await signInWithCredential(auth, credential);

      // Go to home
      router.replace("/(app)/home");
    } catch (error: any) {
      console.log("Google Login Error:", error);

      // User cancelled Google login
      if (error?.code === "SIGN_IN_CANCELLED") {
        return;
      }

      Alert.alert(
        "Google Login Failed",
        error?.message ||
          "Unable to login with Google."
      );
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------
  // GITHUB LOGIN
  // --------------------------------

  const handleGithubLogin = async () => {
    try {
      setLoading(true);

      // Start GitHub Device Flow
      const {
        deviceCode,
        userCode,
        verificationUri,
        interval,
        expiresIn,
      } = await githubLogin();

      // Show GitHub verification code
      Alert.alert(
        "GitHub Login",
        `Open GitHub and enter this code:\n\n${userCode}`,
        [
          {
            text: "Open GitHub",
            onPress: async () => {
              try {
                // Open GitHub verification page
                await WebBrowser.openBrowserAsync(
                  verificationUri
                );

                // Wait for GitHub authorization
                const accessToken =
                  await getGithubAccessToken(
                    deviceCode,
                    interval,
                    expiresIn
                  );

                // Create Firebase GitHub credential
                const credential =
                  GithubAuthProvider.credential(
                    accessToken
                  );

                // Login to Firebase
                await signInWithCredential(
                  auth,
                  credential
                );

                // Go to home
                router.replace("/(app)/home");
              } catch (error: any) {
                console.log(
                  "GitHub Login Error:",
                  error
                );

                Alert.alert(
                  "GitHub Login Failed",
                  error?.message ||
                    "Unable to login with GitHub."
                );
              } finally {
                setLoading(false);
              }
            },
          },
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => {
              setLoading(false);
            },
          },
        ]
      );
    } catch (error: any) {
      console.log(
        "GitHub Login Start Error:",
        error
      );

      Alert.alert(
        "GitHub Login Failed",
        error?.message ||
          "Unable to start GitHub login."
      );

      setLoading(false);
    }
  };

  // --------------------------------
  // UI
  // --------------------------------

  return (
    <View style={styles.container}>
      {/* TITLE */}

      <Text style={styles.title}>
        Welcome Back
      </Text>

      <Text style={styles.subtitle}>
        Login to your account
      </Text>

      {/* EMAIL */}

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        editable={!loading}
      />

      {/* PASSWORD */}

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!loading}
      />

      {/* EMAIL LOGIN BUTTON */}

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Logging in..." : "Login"}
        </Text>
      </TouchableOpacity>

      {/* FORGOT PASSWORD */}

      <Link
        href="/(auth)/forgot-password"
        style={styles.textLink}
      >
        Forgot Password?
      </Link>

      {/* DIVIDER */}

      <View style={styles.dividerContainer}>
        <View style={styles.divider} />

        <Text style={styles.dividerText}>
          OR
        </Text>

        <View style={styles.divider} />
      </View>

      {/* GOOGLE LOGIN */}

      <TouchableOpacity
        style={styles.googleButton}
        onPress={handleGoogleLogin}
        disabled={loading}
      >
        <FontAwesome
          name="google"
          size={20}
          color="#4285F4"
          style={styles.googleIcon}
        />

        <Text style={styles.googleButtonText}>
          Continue with Google
        </Text>
      </TouchableOpacity>

      {/* GITHUB LOGIN */}

      <TouchableOpacity
        style={styles.githubButton}
        onPress={handleGithubLogin}
        disabled={loading}
      >
        <FontAwesome
          name="github"
          size={20}
          color="#FFFFFF"
          style={styles.githubIcon}
        />

        <Text style={styles.githubButtonText}>
          Continue with GitHub
        </Text>
      </TouchableOpacity>

      {/* SIGN UP */}

      <View style={styles.signupContainer}>
        <Text>
          Don&apos;t have an account?{" "}
        </Text>

        <Link
          href="/(auth)/signup"
          style={styles.link}
        >
          Sign Up
        </Link>
      </View>
    </View>
  );
}

// --------------------------------
// STYLES
// --------------------------------

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 15,
  },

  button: {
    height: 52,
    backgroundColor: "#2563EB",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  textLink: {
    color: "#2563EB",
    fontWeight: "600",
    textAlign: "center",
    marginTop: 10,
  },

  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },

  dividerText: {
    marginHorizontal: 12,
    color: "#6B7280",
    fontSize: 13,
    fontWeight: "600",
  },

  googleButton: {
    height: 52,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },

  googleIcon: {
    marginRight: 10,
  },

  googleButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
  },

  githubButton: {
    height: 52,
    backgroundColor: "#24292F",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },

  githubIcon: {
    marginRight: 10,
  },

  githubButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },

  link: {
    color: "#2563EB",
    fontWeight: "600",
    textAlign: "center",
  },

  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
});