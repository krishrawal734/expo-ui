import { FontAwesome } from "@expo/vector-icons";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithCredential,
} from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { router } from "expo-router";
import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";
import "../../services/googleAuth";

type GoogleLoginProps = {
  disabled?: boolean;
  onLoadingChange?: (loading: boolean) => void;
};

export default function GoogleLogin({
  disabled = false,
  onLoadingChange,
}: GoogleLoginProps) {
  const handleGoogleLogin = async () => {
    try {
      onLoadingChange?.(true);
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const response = await GoogleSignin.signIn();
      const idToken = response.data?.idToken;
      if (!idToken) throw new Error("Google ID token was not received.");
      await signInWithCredential(
        getAuth(),
        GoogleAuthProvider.credential(idToken),
      );
      router.replace("/");
    } catch (error: any) {
      if (error?.code !== "SIGN_IN_CANCELLED") {
        Alert.alert(
          "Google Login Failed",
          error?.message || "Unable to login with Google.",
        );
      }
    } finally {
      onLoadingChange?.(false);
    }
  };

  return (
    <TouchableOpacity
      onPress={handleGoogleLogin}
      disabled={disabled}
      style={styles.button}
    >
      <FontAwesome
        name="google"
        size={20}
        color="#4285F4"
        style={styles.icon}
      />
      <Text style={styles.text}>Continue with Google</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 52,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    marginTop: 15,
  },
  icon: { marginRight: 10 },
  text: { fontSize: 16, fontWeight: "600", color: "#1F2937" },
});
