import { View, Text, ScrollView, SafeAreaView } from "react-native";
import "../../global.css";

import { StatusBar } from "expo-status-bar";

import Header from "../components/subscription/Header";
import TrialCard from "../components/subscription/TrialCard";
import PlanCard from "../components/subscription/PlanCard";
import BillingItem from "../components/subscription/BillingItem";

export default function IndexScreen() {
  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <StatusBar style="dark" backgroundColor="#F8FAFC" />

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
            <Text className="mb-2.5 text-ellipsis text-[15px] font-medium text-slate-900">
              Choose Plan
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              <PlanCard
                title="Monthly"
                price="499"
              />

              <PlanCard
                title="Yearly"
                price="4999"
              />

              <PlanCard
                title="Premium"
                price="7999"
              />

              <PlanCard
                title="Ultra Premium"
                price="9999"
              />
            </ScrollView>
          </View>

          {/* Billing History */}
          <View className="mt-5 mx-2">
            <Text className="mb-2.5 text-[15px] font-medium text-slate-900">
              Billing History
            </Text>

            <View className="overflow-hidden rounded-lg border border-slate-200 bg-white">
              <BillingItem
                date="Oct 12, 2023"
                status="Paid"
              />

              <BillingItem
                date="Sep 12, 2023"
                status="Paid"
              />

              <BillingItem
                date="Aug 12, 2023"
                status="Failed"
              />

              <BillingItem
                date="July 12, 2023"
                status="Paid"
              />

              <BillingItem
                date="June 12, 2023"
                status="Failed"
              />

              <BillingItem
                date="May 12, 2023"
                status="Failed"
              />

              <BillingItem
                date="April 12, 2023"
                status="Paid"
              />

              <BillingItem
                date="March 12, 2023"
                status="Paid"
              />

              <BillingItem
                date="February 12, 2023"
                status="Failed"
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

