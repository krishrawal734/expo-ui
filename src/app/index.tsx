import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { StatusBar } from "expo-status-bar";

import Header from "../components/subscription/Header";
import TrialCard from "../components/subscription/TrialCard";
import PlanCard from "../components/subscription/PlanCard";
import BillingItem from "../components/subscription/BillingItem";
import { Colors } from "../constants/colors";

export default function indexScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Status Bar */}
      <StatusBar
        style="dark"
        backgroundColor={Colors.background}
      />

      <View style={styles.container}>

        {/* Header */}
        <Header />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >

          {/* Free Trial */}
          <TrialCard />

          {/* Plans */}
          <View style={styles.planSection}>
            <Text style={styles.sectionTitle}>
              Choose Plan
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.planScroll}
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
                title="Ultra Premium    "
                price="9999"
              />
            </ScrollView>
          </View>

          {/* Billing History */}
          <View style={styles.billingSection}>
            <Text style={styles.sectionTitle}>
              Billing History
            </Text>

            <View style={styles.billingCard}>

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

          {/* Bottom Space */}
          <View style={styles.bottomSpace} />

        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
flex: 1,
    backgroundColor: Colors.background,

  },

  container: {
    flex: 1,
    backgroundColor: Colors.background,

    
  },

  scrollContent: {
    paddingBottom: 20,
  },

  planSection: {
    marginTop: 15,
  },

  sectionTitle: {
    marginLeft: 8,
    marginBottom: 10,
    fontSize: 15,
    fontWeight: "500",
    color: Colors.text,
  },

  planScroll: {
    paddingLeft: 8,
    paddingRight: 8,
  },

  billingSection: {
    marginTop: 20,
    marginHorizontal: 8,
  },

  billingCard: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    overflow: "hidden",
  },

  bottomSpace: {
    height: 30,
  },
});