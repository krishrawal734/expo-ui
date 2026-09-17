import {
    createUserWithEmailAndPassword,
    signOut as firebaseSignOut,
    GithubAuthProvider,
    GoogleAuthProvider,
    onAuthStateChanged,
    RecaptchaVerifier,
    sendPasswordResetEmail,
    signInWithCredential,
    signInWithEmailAndPassword,
    signInWithPhoneNumber,
    signInWithPopup,
    type ConfirmationResult,
    type User,
} from "firebase/auth";
import { auth } from "../config/firebase";

export type AuthUser = Pick<User, "uid" | "email">;
export type AuthStateListener = (user: AuthUser | null) => void;
export type PhoneConfirmation = { confirm: (code: string) => Promise<void> };

const toAuthUser = (user: User | null): AuthUser | null =>
  user ? { uid: user.uid, email: user.email } : null;

export const subscribeToAuthState = (listener: AuthStateListener) =>
  onAuthStateChanged(auth, (user) => listener(toAuthUser(user)));

export const signInWithEmail = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

export const signUpWithEmail = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password);

export const sendPasswordReset = (email: string) =>
  sendPasswordResetEmail(auth, email);

export const signOut = () => firebaseSignOut(auth);

export const signInWithGoogle = () =>
  signInWithPopup(auth, new GoogleAuthProvider());

export const signInWithGithubToken = (accessToken: string) =>
  signInWithCredential(auth, GithubAuthProvider.credential(accessToken));

let phoneVerifier: RecaptchaVerifier | null = null;

const getPhoneVerifier = () => {
  phoneVerifier ??= new RecaptchaVerifier(auth, "recaptcha-container", {
    size: "invisible",
  });
  return phoneVerifier;
};

export const sendPhoneCode = async (
  phoneNumber: string,
): Promise<PhoneConfirmation> => {
  const confirmation: ConfirmationResult = await signInWithPhoneNumber(
    auth,
    phoneNumber,
    getPhoneVerifier(),
  );
  return { confirm: async (code) => void (await confirmation.confirm(code)) };
};
