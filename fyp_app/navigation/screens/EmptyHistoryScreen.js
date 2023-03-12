import { StyleSheet, Text, View, Alert, Button } from "react-native";

export default function EmptyHistoryScreen() {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 40 }}>Empty History Screen</Text>
      <Button
        title="Click me"
        onPress={() => {
          console.log("button pressed");
        }}
      />
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
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
    padding: 20,
    alignSelf: "center",
  },
});
