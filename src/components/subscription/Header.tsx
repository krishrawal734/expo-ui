import { Text, View } from "react-native";

export default function Header() {
  return (
    <View className="h-20 justify-center bg-white px-3">
      <Text className="mt-5 font-title text-4xl text-orange-600">
        Subscription
      </Text>
    </View>
  );
}
