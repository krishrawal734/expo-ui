import { SafeAreaView, ScrollView, Text, View } from "react-native";
import "../../global.css";

import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";

import BillingItem from "../components/subscription/BillingItem";
import Header from "../components/subscription/Header";
import PlanCard from "../components/subscription/PlanCard";
import TrialCard from "../components/subscription/TrialCard";

export default function IndexScreen() {
  const [fontsLoaded] = useFonts({
    "BetaniaPatmos-Regular": require("../../assets/fonts/BetaniaPatmos-Regular.ttf"),
    "CaacupeOne-Regular": require("../../assets/fonts/CaacupeOne-Regular.ttf"),
    "CarterOne": require("../../assets/fonts/CarterOne-Regular.ttf"),
    "FasterOne": require("../../assets/fonts/FasterOne-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return ( 
    <SafeAreaView className="flex-1 bg-slate-50">
      <StatusBar style="dark" />

      <View className="flex-1 bg-slate-50">
        {/* Header */}
        <Header />

        {/* Main scroll */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {/* Free Trial */}
          <TrialCard />

          {/* Choose Plan */}
          <View className="mt-5 mx-2">
            <Text className="mb-2.5 text-[30px] font-medium text-slate-900 font-logo">
              Choose Plan
            </Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <PlanCard title="Monthly" price="499" />

              <PlanCard title="Yearly" price="4999" />

              <PlanCard title="Premium" price="7999" />

              <PlanCard title="Ultra Premium" price="9999" />
            </ScrollView>
          </View>

          {/* Billing History */}
          <View className="mt-5 mx-2">
            <Text className="mb-2.5 text-[30px] font-body text-slate-900">
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
