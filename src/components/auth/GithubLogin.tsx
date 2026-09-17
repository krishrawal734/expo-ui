import { FontAwesome } from "@expo/vector-icons";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";
import { signInWithGithubToken } from "../../services/auth";

WebBrowser.maybeCompleteAuthSession();

const GITHUB_CLIENT_ID = "Ov23li111tzL9JlMYC9P";
const GITHUB_DISCOVERY = {
  authorizationEndpoint: "https://github.com/login/oauth/authorize",
  tokenEndpoint: "https://github.com/login/oauth/access_token",
};

type GithubLoginProps = {
  disabled?: boolean;
  onLoadingChange?: (loading: boolean) => void;
};

export default function GithubLogin({
  disabled = false,
  onLoadingChange,
}: GithubLoginProps) {
  const redirectUri = makeRedirectUri({
    scheme: "expoui",
    path: "auth",
  });
  const [request, , promptAsync] = useAuthRequest(
    {
      clientId: GITHUB_CLIENT_ID,
      scopes: ["read:user", "user:email"],
      redirectUri,
      usePKCE: true,
    },
    GITHUB_DISCOVERY,
  );

  const handleGithubLogin = async () => {
    try {
      onLoadingChange?.(true);

      if (!request) {
        throw new Error("GitHub login is still loading. Please try again.");
      }

      const result = await promptAsync();

      if (result.type !== "success") {
        return;
      }

      const { code } = result.params;
      if (!code || !request.codeVerifier) {
        throw new Error("GitHub did not return a valid login response.");
      }

      const tokenResponse = await fetch(GITHUB_DISCOVERY.tokenEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: GITHUB_CLIENT_ID,
          code,
          redirect_uri: redirectUri,
          code_verifier: request.codeVerifier,
        }).toString(),
      });
      const tokenData = await tokenResponse.json();

      if (!tokenResponse.ok || !tokenData.access_token) {
        throw new Error(
          tokenData.error_description || "GitHub could not complete login.",
        );
      }

      await signInWithGithubToken(tokenData.access_token);
      router.replace("/");
    } catch (error: any) {
      Alert.alert(
        "GitHub Login Failed",
        error?.message || "Unable to start GitHub login.",
      );
    } finally {
      onLoadingChange?.(false);
    }
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={handleGithubLogin}
      disabled={disabled || !request}
    >
      <FontAwesome
        name="github"
        size={20}
        color="#FFFFFF"
        style={styles.icon}
      />
      <Text style={styles.text}>Continue with GitHub</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 52,
    backgroundColor: "#24292F",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  icon: { marginRight: 10 },
  text: { fontSize: 16, fontWeight: "600", color: "#FFFFFF" },
});
