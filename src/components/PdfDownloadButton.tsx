import React, { useRef, useState } from "react";
import { Alert, Button, Text, View } from "react-native";
import { File, Paths } from "expo-file-system";

export default function DownloadPDF() {
  const [progress, setProgress] = useState(0);

  // Store the download task
  const task = useRef<any>(null);

  // DOWNLOAD PDF
  const downloadPDF = async () => {
    try {
      const url =
        "https://drive.google.com/uc?export=download&id=1v0FLQIPm7LUetaAerX6wiwf94WF1Gebm";

      // Temporary location
      const file = new File(Paths.cache, "my.pdf");

      if (file.exists) {
        file.delete();
      }

      // Create download task
      task.current = File.createDownloadTask(
        url,
        file,
        {
          onProgress: ({ bytesWritten, totalBytes }) => {
            if (totalBytes > 0) {
              const percent =
                (bytesWritten / totalBytes) * 100;

              setProgress(Math.round(percent));
            }
          },
        }
      );

      // Start download
      const result = await task.current.downloadAsync();

      if (result) {
        setProgress(100);

        Alert.alert(
          "Success",
          "PDF downloaded successfully!"
        );

        console.log("Downloaded file:", result.uri);
      }
    } catch (error) {
      console.log("Download error:", error);

      Alert.alert(
        "Error",
        "PDF download failed"
      );
    }
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 30,
        paddingTop: 60,
        gap: 15,
      }}
    >
      <Button
        title="Download PDF"
        onPress={downloadPDF}
      />

      <Text
        style={{
          fontSize: 18,
        }}
      >
        Progress: {progress}%
      </Text>
    </View>
  );
}