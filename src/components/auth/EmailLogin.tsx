import { Link, router } from "expo-router";
import { useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { signInWithEmail } from "../../services/auth";

type EmailLoginProps = {
  disabled?: boolean;
  onLoadingChange?: (loading: boolean) => void;
};

export default function EmailLogin({
  disabled = false,
  onLoadingChange,
}: EmailLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert("Error", "Please enter email and password.");
      return;
    }

    try {
      setLoading(true);
      onLoadingChange?.(true);
      await signInWithEmail(email.trim(), password);
      router.replace("/");
    } catch (error: any) {
      Alert.alert("Login failed", error?.message || "Something went wrong.");
    } finally {
      setLoading(false);
      onLoadingChange?.(false);
    }
  };

  const isDisabled = disabled || loading;

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        editable={!isDisabled}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!isDisabled}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={isDisabled}
      >
        <Text style={styles.buttonText}>
          {loading ? "Logging in..." : "Login"}
        </Text>
      </TouchableOpacity>
      <Link href="/(auth)/forgot-password" style={styles.textLink}>
        Forgot Password?
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
