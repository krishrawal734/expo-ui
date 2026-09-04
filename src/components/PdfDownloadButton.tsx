import React from "react";
import { Alert, Text, TouchableOpacity } from "react-native";
import { Asset } from "expo-asset";
import { Directory, File, Paths } from "expo-file-system";

export default function PdfDownload() {
  const downloadPDF = async () => {
    try {
      // Get the PDF from assets
      const asset = Asset.fromModule(
        require("../../assets/documents/KRISHRAWAL-CV.pdf")
      );

      await asset.downloadAsync();

      if (!asset.localUri) {
        throw new Error("PDF could not be loaded.");
      }

      // Create PDF directory
      const pdfDirectory = new Directory(Paths.cache, "documents");

      if (!pdfDirectory.exists) {
        pdfDirectory.create();
      }

      // Destination file
      const destination = new File(
        pdfDirectory,
        "KRISHRAWAL-CV.pdf"
      );

      // Source file
      const source = new File(asset.localUri);

      // Copy PDF
      source.copy(destination);

      console.log("PDF location:", destination.uri);

      Alert.alert(
        "Success",
        "PDF has been downloaded successfully."
      );
    } catch (error) {
      console.error("PDF Error:", error);

      Alert.alert(
        "Error",
        "Unable to download PDF."
      );
    }
  };

  return (
    <TouchableOpacity
      onPress={downloadPDF}
      activeOpacity={0.8}
      className="mx-4 mt-4 items-center rounded-xl bg-blue-600 px-6 py-4"
    >
      <Text className="text-base font-bold text-white">
        Download PDF
      </Text>
    </TouchableOpacity>
  );
}