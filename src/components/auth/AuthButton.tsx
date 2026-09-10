import { Pressable, Text } from "react-native";

type AuthButtonProps = {
  title: string;
  onPress?: () => void;
};

export default function AuthButton({ title, onPress }: AuthButtonProps) {
  return (
    <Pressable
      className="items-center rounded-lg bg-orange-500 px-4 py-3"
      onPress={onPress}
    >
      <Text className="font-semibold text-white">{title}</Text>
    </Pressable>
  );
}
