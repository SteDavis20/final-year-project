import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import Leaderboard from "react-native-leaderboard";

const data = [
  { userName: "Team1", highScore: 15 },
  { userName: "Team2", highScore: 12 },
  { userName: "Team3", highScore: 8 },
]; //can also be an object of objects!: data: {a:{}, b:{}};

export default function TeamLeaderboardScreen() {
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
