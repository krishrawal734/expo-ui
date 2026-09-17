import {
    createUserWithEmailAndPassword,
    signOut as firebaseSignOut,
    getAuth,
    GithubAuthProvider,
    GoogleAuthProvider,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithCredential,
    signInWithEmailAndPassword,
    signInWithPhoneNumber,
    type User,
} from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import type { AuthStateListener, AuthUser, PhoneConfirmation } from "./auth";

const nativeAuth = getAuth();

GoogleSignin.configure({
  webClientId:
    "312280399965-ap72t0svaeq4r61lo82r9u9gq9b9ehsj.apps.googleusercontent.com",
});

const toAuthUser = (user: User | null): AuthUser | null =>
  user ? { uid: user.uid, email: user.email } : null;

export const subscribeToAuthState = (listener: AuthStateListener) =>
  onAuthStateChanged(nativeAuth, (user) => listener(toAuthUser(user)));

export const signInWithEmail = (email: string, password: string) =>
  signInWithEmailAndPassword(nativeAuth, email, password);

export const signUpWithEmail = (email: string, password: string) =>
  createUserWithEmailAndPassword(nativeAuth, email, password);

export const sendPasswordReset = (email: string) =>
  sendPasswordResetEmail(nativeAuth, email);

export const signOut = () => firebaseSignOut(nativeAuth);

export const signInWithGoogle = async () => {
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  const response = await GoogleSignin.signIn();
  const idToken = response.data?.idToken;
  if (!idToken) throw new Error("Google ID token was not received.");
  return signInWithCredential(
    nativeAuth,
    GoogleAuthProvider.credential(idToken),
  );
};

export const signInWithGithubToken = (accessToken: string) =>
  signInWithCredential(nativeAuth, GithubAuthProvider.credential(accessToken));

export const sendPhoneCode = async (
  phoneNumber: string,
): Promise<PhoneConfirmation> => {
  const confirmation = await signInWithPhoneNumber(nativeAuth, phoneNumber);
  return { confirm: async (code) => void (await confirmation.confirm(code)) };
};
