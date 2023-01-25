import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function IndividualHistoryScreen() {
  return (
    <View style={styles.container}>
      <Text>Individual History Screen!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
