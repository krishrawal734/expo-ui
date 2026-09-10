import { useFonts } from "expo-font";
import { Redirect } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import "../../global.css";

import { useAuth } from "../context/AuthContext";

import PdfDownloadButton from "../components/PdfDownloadButton";
import BillingItem from "../components/subscription/BillingItem";
import Header from "../components/subscription/Header";
import PlanCard from "../components/subscription/PlanCard";
import TrialCard from "../components/subscription/TrialCard";

export default function IndexScreen() {
  /*
   * ----------------------------------------------------
   * FIREBASE AUTHENTICATION
   * ----------------------------------------------------
   */

  const { user, loading } = useAuth();

  /*
   * ----------------------------------------------------
   * CUSTOM FONTS
   * ----------------------------------------------------
   */

  const [fontsLoaded] = useFonts({
    "BetaniaPatmos-Regular": require("../../assets/fonts/BetaniaPatmos-Regular.ttf"),

    "CaacupeOne-Regular": require("../../assets/fonts/CaacupeOne-Regular.ttf"),

    CarterOne: require("../../assets/fonts/CarterOne-Regular.ttf"),

    FasterOne: require("../../assets/fonts/FasterOne-Regular.ttf"),
  });

  /*
   * ----------------------------------------------------
   * AUTH LOADING
   *
   * Firebase is checking whether the user is already
   * logged in.
   * ----------------------------------------------------
   */

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-slate-50">
        <StatusBar style="dark" />

        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#2563EB" />

          <Text className="mt-4 text-base text-slate-600">
            Checking authentication...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  /*
   * ----------------------------------------------------
   * USER NOT LOGGED IN
   *
   * Send the user to the Firebase login screen.
   * ----------------------------------------------------
   */

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  /*
   * ----------------------------------------------------
   * FONT LOADING
   *
   * Only show the main UI after fonts are loaded.
   * ----------------------------------------------------
   */

  if (!fontsLoaded) {
    return (
      <SafeAreaView className="flex-1 bg-slate-50">
        <StatusBar style="dark" />

        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#2563EB" />

          <Text className="mt-4 text-base text-slate-600">Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  /*
   * ----------------------------------------------------
   * AUTHENTICATED USER
   *
   * Your original subscription UI is displayed here.
   * ----------------------------------------------------
   */

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <StatusBar style="dark" />

      <View className="flex-1 bg-slate-50">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 20,
          }}
        >
          {/* Free Trial */}
          <TrialCard />

          {/* PDF Download */}
          <PdfDownloadButton
            fileName="KRISHRAWAL-CV.pdf"
            source={require("../../assets/documents/KRISHRAWAL-CV.pdf")}
          />

          {/* Choose Plan */}
          <View className="mx-2 mt-5">
            <Text className="mb-2.5 font-logo text-[30px] font-medium text-slate-900">
              Choose Plan
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingRight: 8,
              }}
            >
              <PlanCard title="Monthly" price="499" />

              <PlanCard title="Yearly" price="4999" />

              <PlanCard title="Premium" price="7999" />

              <PlanCard title="Ultra Premium" price="9999" />
            </ScrollView>
          </View>

          {/* Billing History */}
          <View className="mx-2 mt-5">
            <Text className="mb-2.5 font-body text-[30px] text-slate-900">
              Billing History
            </Text>

            <View className="overflow-hidden rounded-lg border border-slate-200 bg-white">
              <BillingItem date="Oct 12, 2023" status="Paid" />

              <BillingItem date="Sep 12, 2023" status="Paid" />

              <BillingItem date="Aug 12, 2023" status="Failed" />

              <BillingItem date="July 12, 2023" status="Paid" />

              <BillingItem date="June 12, 2023" status="Failed" />

              <BillingItem date="May 12, 2023" status="Failed" />

              <BillingItem date="April 12, 2023" status="Paid" />

              <BillingItem date="March 12, 2023" status="Paid" />

              <BillingItem date="February 12, 2023" status="Failed" />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
