import { TextInput, TextInputProps } from "react-native";

export default function AuthInput(props: TextInputProps) {
  return (
    <TextInput
      className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-base text-slate-900"
      placeholderTextColor="#6B7280"
      {...props}
    />
  );
}
