import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

// import Leaderboard from "react-native-leaderboard";
import MyLeaderboard from "./MyLeaderboard";
import EmptyHistoryScreen from "./EmptyHistoryScreen";

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

import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import database from "../../firebase-config";

/*
 *   Need to save dates as 09/03/2023 instead of 9/3/2023, because then 10/3/2023 is considered < 9/3/2023 since 1 (in 10) is < 9 as string
 */
export default function IndividualHistoryScreen({ route, navigation }) {
  const [scores, setScores] = useState([]);
  const isFocused = useIsFocused();
  const sideMargin = 20;
  const { userID } = route.params;
  // let userID = "Ky0lVuXZJbTZhp9kAj5vkTZOa8T2";
  const screenWidth = Dimensions.get("window").width;

  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    color: (opacity = 1) => `rgba(0, 150, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 1,
    useShadowColorFromDataset: false,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowRadius: 5,
    shadowOpacity: 0.4,
  };

  function convertScoresDataToChartFormat(scoresData) {
    let dates = [];
    let scores = [];
    console.log("HERE: ", scoresData);
    console.log(typeof scoresData);
    try {
      scoresData.map((scoreData) => {
        dates.push(scoreData.date);
        scores.push(scoreData.value);
      });
      dates.sort();
      scores.sort();
      /* after 6 or 7 labels, there is no more room to label the axis, only display 5 most recent labels? */
      let myData = {
        labels: dates,
        datasets: [
          {
            data: scores,
            color: (opacity = 1) => `rgba(0, 244, 0, ${opacity})`,
            strokeWidth: 2,
          },
        ],
        legend: ["KgCo2e"],
      };
      return myData;
    } catch (error) {
      console.log(error);
    }
    return {
      labels: ["n/a"],
      datasets: [
        {
          data: [0],
          color: (opacity = 1) => `rgba(0, 244, 0, ${opacity})`,
          strokeWidth: 2,
        },
      ],
      legend: ["KgCo2e"],
    };
  }

  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(0, 244, 0, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ["KgCo2e"],
  };

  useEffect(() => {
    async function getScores() {
      setScores(await getIndividualScores());
    }
    getScores();
  }, [isFocused]);

  async function getIndividualScores() {
    let databaseScores = [];
    const q = query(
      collection(database, "scores"),
      where("userID", "==", userID)
    );
    const querySnapshot = await getDocs(q);
    const individualScores = querySnapshot.docs;
    individualScores.map((scoreDocument) => {
      databaseScores.push(scoreDocument.data());
    });
    return databaseScores;
  }

  return (
    <View style={{ marginTop: 35 }}>
      <Text style={styles.heading}>My Scores</Text>
      {/* {scores.length == 0 && <EmptyHistoryScreen />} */}
      {scores.length > 0 && (
        <View>
          <StatusBar style="auto" />
          {console.log(convertScoresDataToChartFormat(scores))}
          <LineChart
            // data={data}
            data={convertScoresDataToChartFormat(scores)}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
          />
          <View style={{ margin: 10 }}></View>
          {/* sortBy is what is displayed on RHS, need to sort by date, but display score on RHS, not date */}
          {/* <Leaderboard data={leaderboardData} sortBy="score" labelBy="date" /> */}
          {/* <Leaderboard data={scores} sortBy="value" labelBy="date" /> */}
          <MyLeaderboard
            data={scores}
            sortByProp="date"
            centerProp="date"
            rhsProp="value"
          />
        </View>
      )}
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
