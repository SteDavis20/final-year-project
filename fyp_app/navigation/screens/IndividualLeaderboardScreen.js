import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { useIsFocused } from "@react-navigation/native";

import Leaderboard from "react-native-leaderboard";

export default function IndividualLeaderboardScreen({ route, navigation }) {
  // const [data, setData] = useState([]);

  const data = [
    { userName: "Aaron", highScore: 7 },
    { userName: "Peadar", highScore: 5 },
    { userName: "Tim", highScore: 4 },
    { userName: "Mark", highScore: 2 },
  ];

  const { score } = route.params;
  console.log("Score parameter: " + score);
  data.push({ userName: "Me", highScore: score });
  // setData(newData);
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
