import { View, Text } from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function TrialCard() {
  return (
    <View className="mx-2 mt-[15px] h-[60px] flex-row items-center justify-between rounded-[6px] bg-orange-300 px-3 shadow-sm">
      
      {/* Text */}
      <View>
        <Text className="text-[15px] font-medium text-[#542400]">
          Free Trial
        </Text>

        <Text className="mt-[3px] text-xs text-amber-900">
          12 days left
        </Text>
      </View>

      {/* Icon */}
      <Ionicons
        name="stopwatch"
        size={19}
        color="brown"
      />
    </View>
  );
}


