import { getAuth, signInWithPhoneNumber } from "@react-native-firebase/auth";
import { router } from "expo-router";
import { useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const normalizePhoneNumber = (rawPhone: string) => {
  const cleaned = rawPhone.trim().replace(/[\s()-]/g, "");
  if (!cleaned) return "";
  return cleaned.startsWith("+") ? cleaned : `+${cleaned.replace(/^0+/, "")}`;
};

type PhoneLoginProps = {
  disabled?: boolean;
  onBack: () => void;
  onLoadingChange?: (loading: boolean) => void;
};

export default function PhoneLogin({
  disabled = false,
  onBack,
  onLoadingChange,
}: PhoneLoginProps) {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const setBusy = (value: boolean) => {
    setLoading(value);
    onLoadingChange?.(value);
  };

  const handleSendOTP = async () => {
    const normalizedPhone = normalizePhoneNumber(phone);
    if (!normalizedPhone) {
      Alert.alert("Error", "Please enter your phone number.");
      return;
    }
    if (!/^\+?[1-9]\d{7,14}$/.test(normalizedPhone)) {
      Alert.alert(
        "Invalid Number",
        "Use a valid phone number, for example +919876543210.",
      );
      return;
    }

    try {
      setBusy(true);
      setConfirmation(await signInWithPhoneNumber(getAuth(), normalizedPhone));
      Alert.alert(
        "OTP Sent",
        "A verification code has been sent to your phone.",
      );
    } catch (error: any) {
      Alert.alert(
        "Phone Login Failed",
        error?.message || "Unable to send OTP.",
      );
    } finally {
      setBusy(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp.trim() || !confirmation) {
      Alert.alert(
        "Error",
        !otp.trim() ? "Please enter the OTP." : "Please request an OTP first.",
      );
      return;
    }

    try {
      setBusy(true);
      await confirmation.confirm(otp.trim());
      router.replace("/");
    } catch (error: any) {
      Alert.alert("Verification Failed", error?.message || "Invalid OTP.");
    } finally {
      setBusy(false);
    }
  };

  const isDisabled = disabled || loading;

  return (
    <View>
      {!confirmation ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="+919876543210"
            value={phone}
            onChangeText={(value) => setPhone(value.replace(/[^\d+]/g, ""))}
            keyboardType="phone-pad"
            editable={!isDisabled}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleSendOTP}
            disabled={isDisabled}
          >
            <Text style={styles.buttonText}>
              {loading ? "Sending OTP..." : "Send OTP"}
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter 6 digit OTP"
            value={otp}
            onChangeText={setOtp}
            keyboardType="number-pad"
            maxLength={6}
            editable={!isDisabled}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleVerifyOTP}
            disabled={isDisabled}
          >
            <Text style={styles.buttonText}>
              {loading ? "Verifying..." : "Verify OTP"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => {
              setConfirmation(null);
              setOtp("");
            }}
            disabled={isDisabled}
          >
            <Text style={styles.link}>Change Phone Number</Text>
          </TouchableOpacity>
        </>
      )}
      <TouchableOpacity
        style={styles.linkButton}
        onPress={onBack}
        disabled={isDisabled}
      >
        <Text style={styles.link}>Back to Email Login</Text>
      </TouchableOpacity>
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
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  linkButton: { alignItems: "center", marginTop: 15 },
  link: { color: "#2563EB", fontSize: 15, fontWeight: "600" },
});
