import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Icon from "react-native-vector-icons/FontAwesome";

// Screens
import HomeScreen from "./screens/HomeScreen";
import IndividualHistoryScreen from "./screens/IndividualHistoryScreen";
import IndividualLeaderboardScreen from "./screens/IndividualLeaderboardScreen";
import TeamLeaderboardScreen from "./screens/TeamLeaderboardScreen";

// Screen Names
const homeName = "Home";
const IndividualLeaderboardName = "Leaderboard";
const TeamLeaderboardName = "Team Leaderboard";
const IndividualHistoryName = "My Scores";

// create navigator
const Tab = createBottomTabNavigator();

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
          } else if (route.name === IndividualLeaderboardName) {
            iconName = "user";
          } else if (route.name === TeamLeaderboardName) {
            iconName = "users";
          } else if (route.name === IndividualHistoryName) {
            iconName = "bar-chart";
          }
          const tabBarActiveTintColor = "green";
          const tabBarInactiveTintColor = "gray";
          if (focused) {
            color = tabBarActiveTintColor;
          } else {
            color = tabBarInactiveTintColor;
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
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
        initialParams={{ userID: userID }}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={TeamLeaderboardName}
        component={TeamLeaderboardScreen}
        initialParams={{ loggedInUserID: userID }}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={IndividualHistoryName}
        component={IndividualHistoryScreen}
        initialParams={{ userID: userID }}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default NavBar;
