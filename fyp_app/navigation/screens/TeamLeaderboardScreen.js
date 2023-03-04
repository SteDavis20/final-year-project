import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import Leaderboard from "react-native-leaderboard";

const data = [
  { userName: "Team1", highScore: 15 },
  { userName: "Team2", highScore: 12 },
  { userName: "Team3", highScore: 8 },
]; //can also be an object of objects!: data: {a:{}, b:{}};

let myBackgroundColour = "#F1FBFF";

/*
 *   To get team score, get emissions from current user, and current user's teammates
 *   To do this, pass uid (userID) in as a prop to TeamLeaderboardScreen
 *   Then get userIDs of teammates by
 *     get collection/teams.userIDs where collection/teams.userIDs contains uid     -   for POC this works because users do not have power to create their own teams,
 *   so only 1 team document exists for each user
 *
 *    Now with the current user and his/her teammates IDs, get all the emission logs matching these ids using:
 *  get collection/emission_logs.score where collection/emission_logs.userID = uid || teammates ids (saved in array)
 */

/*
 *   Is there only 1 team leaderboard being displayed - YES
 *   App logic for proof of concept or mvp is that teams are preconfigured where individuals are placed in teams of 2, and they cannot
 *   join another team or leave their current team
 */

export default function TeamLeaderboardScreen() {
  return (
    <View style={{ marginTop: 35 }}>
      <Text style={styles.heading}>Team Leaderboard</Text>
      <Leaderboard
        data={data}
        sortBy="highScore"
        labelBy="userName"
        containerStyle={{ backgroundColor: "green" }}
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
