import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import Leaderboard from "react-native-leaderboard";

import {
  LineChart,
  // BarChart,
  // PieChart,
  // ProgressChart,
  // ContributionGraph,
  // StackedBarChart,
} from "react-native-chart-kit";

// To make chart responsive with different screen widths
import { Dimensions } from "react-native";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";

import { collection, query, where, getDocs } from "firebase/firestore";
import database from "../../firebase-config";

/*
 *   Need to save dates as 09/03/2023 instead of 9/3/2023, because then 10/3/2023 is considered < 9/3/2023 since 1 (in 10) is < 9 as string
 *
 */
export default function IndividualHistoryScreen({ route, navigation }) {
  const [scores, setScores] = useState([]);
  const isFocused = useIsFocused();

  // let userID = "";
  let userID = "096TYzjfrxQmmilDooSNe69Ng4g2";
  const screenWidth = Dimensions.get("window").width;

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ["Rainy Days"], // optional
  };

  const leaderboardData = [
    { date: "Monday 01/01/23", score: 2 },
    { date: "Tuesday 02/01/23", score: 7 },
    { date: "Wednesday 03/01/23", score: 5 },
    { date: "Thursday 04/01/23", score: 4 },
    { date: "Friday 05/01/23", score: 6 },
  ]; //can also be an object of objects!: data: {a:{}, b:{}}

  async function getIndividualScores() {
    return new Promise(async (resolve, reject) => {
      let databaseScores = [];
      const q = query(
        collection(database, "scores"),
        where("userID", "==", userID)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((document) => {
        databaseScores.push(document.data());
      });
      resolve(databaseScores);
    });
  }

  // try {
  //   userID = route.params.userID;
  // } catch (error) {
  //   // no userID passed
  // }

  /* Load when first time going to screen so when scores.length == 0, but need to update new score(s) after completing a new day so this won't work */
  useEffect(() => {
    // load scores
    async function getScores() {
      // if (emissionLogs.length == 0) {
      setScores(await getIndividualScores());
      // }
    }
    getScores();
  }, [isFocused]);

  return (
    <View style={{ marginTop: 35 }}>
      <Text style={styles.heading}>Individual History</Text>
      <StatusBar style="auto" />
      <LineChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
      />
      <View style={{ margin: 10 }}></View>
      {/* sortBy is what is displayed on RHS, need to sort by date, but display score on RHS, not date */}
      {/* <Leaderboard data={leaderboardData} sortBy="score" labelBy="date" /> */}
      <Leaderboard data={scores} sortBy="value" labelBy="date" />
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
