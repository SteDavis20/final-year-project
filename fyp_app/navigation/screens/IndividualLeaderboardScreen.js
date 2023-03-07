import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";

import { useIsFocused } from "@react-navigation/native";

import Leaderboard from "react-native-leaderboard";

/*
 *   Is there only 1 individual leaderboard - YES
 */

export default function IndividualLeaderboardScreen({ route, navigation }) {
  // const [data, setData] = useState([]);

  const data = [
    { userName: "Aaron", highScore: 7 },
    { userName: "Peadar", highScore: 5 },
    { userName: "Tim", highScore: 4 },
    { userName: "Mark", highScore: 2 },
  ];

  const score = 11;
  // if (route.name == "Home") {
  //   score = route.params;
  // } else {
  //   score = 10;
  // }

  // Alert.alert("Score parameter: ", score, [
  // {
  // text: "OK",
  // },
  // ]);

  console.log("Score parameter: " + score);
  data.push({ userName: "Me", highScore: score });
  // setData(newData);
  return (
    <View style={{ marginTop: 35 }}>
      <Text style={styles.heading}>Individual Leaderboard</Text>
      <Leaderboard
        data={data}
        sortBy="highScore"
        labelBy="userName"
        // oddRowColor="green"
        // evenRowColor="cyan"
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
