import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

// Screens
import HomeScreen from "./screens/HomeScreen";
import IndividualHistoryScreen from "./screens/IndividualHistoryScreen";
import IndividualLeaderboardScreen from "./screens/IndividualLeaderboardScreen";
import TeamLeaderboardScreen from "./screens/TeamLeaderboardScreen";

// Screen Names
const homeName = "Home";
const IndividualLeaderboardName = "Individual Leaderboard";
const TeamLeaderboardName = "Team Leaderboard";
const IndividualHistoryName = "Individual History";

// create navigator
const Tab = createBottomTabNavigator();

// icons to use:
// home
// user
// users
// areachart
// see: https://oblador.github.io/react-native-vector-icons/

function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName={homeName}>
        {/* screenOptions goes here to highlight selected screen */}

        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen
          name={IndividualLeaderboardName}
          component={IndividualLeaderboardScreen}
        />
        <Tab.Screen
          name={TeamLeaderboardName}
          component={TeamLeaderboardScreen}
        />
        <Tab.Screen
          name={IndividualHistoryName}
          component={IndividualHistoryScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
