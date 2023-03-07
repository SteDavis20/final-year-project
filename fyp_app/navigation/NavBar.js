import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Icon from "react-native-vector-icons/FontAwesome";

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

/*
 * Need to pass userID prop to Home page after logging in
 */
function NavBar({ route, navigation }) {
  const { userID } = route.params; // Received from Login page

  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === homeName) {
            iconName = "home";
          } else if (route.name === "Individual Leaderboard") {
            iconName = "user";
          } else if (route.name === "Team Leaderboard") {
            iconName = "users";
          } else if (route.name === "Individual History") {
            iconName = "bar-chart";
          }

          if (focused) {
            color = "green"; // black home
          } else {
            color = "grey";
          }
          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "green",
        tabBarInactiveTintColor: "gray",
      })}
    >
      {/* screenOptions goes here to highlight selected screen */}

      <Tab.Screen
        name={homeName}
        component={HomeScreen}
        initialParams={{ userID: userID }}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={IndividualLeaderboardName}
        component={IndividualLeaderboardScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={TeamLeaderboardName}
        component={TeamLeaderboardScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={IndividualHistoryName}
        component={IndividualHistoryScreen}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
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

export default NavBar;
