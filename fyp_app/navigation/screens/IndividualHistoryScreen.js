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

export default function IndividualHistoryScreen() {
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
      <Text>Need to add spacing here...</Text>
      {/* sortBy is what is displayed on RHS, need to sort by date, but display score on RHS, not date */}
      <Leaderboard data={leaderboardData} sortBy="score" labelBy="date" />
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
