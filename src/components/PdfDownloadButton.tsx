import { Asset } from "expo-asset";
import { Directory, File } from "expo-file-system";
import { useState } from "react";
import { Alert, Button, Text, View } from "react-native";

type Props = {
  fileName: string;
  source: number;
};

export default function DownloadPDF({ fileName, source }: Props) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);

  const downloadPDF = async () => {
    try {
         setIsDownloading(true);
      setProgress(0);

      const asset = Asset.fromModule(source);


      await asset.downloadAsync();

      if (!asset.localUri) {
        throw new Error("PDF file not found");
      }


      const pdfFile = new File(asset.localUri);

    
      const folder = await Directory.pickDirectoryAsync();

      const newFile = folder.createFile(
        fileName,
        "application/pdf"
      );


      const pdfBytes = await pdfFile.bytes();
      newFile.write(pdfBytes);

      Alert.alert(
        "Success",
        `${fileName} downloaded successfully!`
      );
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Error",
        "Could not download PDF"
      );
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <View
      style={{
        padding: 30,
        marginTop: 50,

      }}
    >
      <Button
        title={isDownloading ? "Downloading..." : "Download PDF"}
        onPress={downloadPDF}
        disabled={isDownloading}
        
      />

      {isDownloading && (
        
      <Text
        style={{
          fontSize: 18,
        }}
      >
        Progress: {progress}%
      </Text>
    
      )}
    </View>
  );
}