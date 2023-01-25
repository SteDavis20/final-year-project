import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import Leaderboard from "react-native-leaderboard";

const data = [
  { userName: "Sean", highScore: 10 },
  { userName: "Aaron", highScore: 7 },
  { userName: "Peadar", highScore: 5 },
  { userName: "Tim", highScore: 4 },
  { userName: "Mark", highScore: 2 },
]; //can also be an object of objects!: data: {a:{}, b:{}}

export default function IndividualLeaderboardScreen() {
  return <Leaderboard data={data} sortBy="highScore" labelBy="userName" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
