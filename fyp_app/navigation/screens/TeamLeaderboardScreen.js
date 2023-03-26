import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";

import MyLeaderboard from "./MyLeaderboard";

import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";

import database from "../../firebase-config";

const data = [
  { userName: "Team1", highScore: 15 },
  { userName: "Team2", highScore: 12 },
  { userName: "Team3", highScore: 8 },
]; //can also be an object of objects!: data: {a:{}, b:{}};

let myBackgroundColour = "#F1FBFF";

export default function TeamLeaderboardScreen({ route, navigation }) {
  const [leaderboardScores, setLeaderboardScores] = useState([]);
  const [yesterdaysDate, setYesterdaysDate] = useState("");

  const { loggedInUserID } = route.params;

  useEffect(() => {
    async function getScores() {
      setDate();
      await getTeamScores();
    }
    getScores();
  }, [yesterdaysDate]);

  function setDate() {
    var date = new Date().getDate() - 1;
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    setYesterdaysDate(date + "/" + month + "/" + year);
  }

  async function getTeamDocuments() {
    const q = query(collection(database, "teams"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs;
  }

  /* For each team document, use the userIDs in the userID array to fetch the score for each user in the scores document,
   * and sum these user scores together to get the overall team score.
   * Then push new object to teamScores array, containing the name of the team and the combined team score.
   * userScoresDoc Can have length = 0 if the user never logged anything for the day, in this case give a score of 0
   */
  async function getTeamScores() {
    let teamScores = [];
    let teamDocuments = await getTeamDocuments();
    await Promise.all(
      teamDocuments.map(async (teamDocument) => {
        let userIDs = teamDocument.data().userIDs;
        let teamScore = 0;
        let isCurrentUser = false;
        try {
          await Promise.all(
            userIDs.map(async (userID) => {
              const q = query(
                collection(database, "scores"),
                where("userID", "==", userID),
                where("date", "==", yesterdaysDate)
              );
              const querySnapshot = await getDocs(q);
              let userScoresDocs = querySnapshot.docs;
              let userScore = 0;
              if (userScoresDocs.length > 0) {
                let userScoreDoc = userScoresDocs[0];
                userScore = userScoreDoc.data().value;
              }
              teamScore += userScore;
              if (userID == loggedInUserID) {
                isCurrentUser = true;
              }
            })
          );
          teamScores.push({
            name: teamDocument.data().name,
            score: teamScore,
            isCurrentUser: isCurrentUser,
          });
        } catch (error) {
          console.log("Error", error);
        }
      })
    );
    setLeaderboardScores(teamScores);
    return;
  }

  return (
    <View style={{ marginTop: 35 }}>
      <Text style={styles.heading}>Yesterday's Scores</Text>
      <Text style={styles.heading}>Team Leaderboard</Text>
      <MyLeaderboard
        data={leaderboardScores}
        sortByProp="score"
        centerProp="name"
        rhsProp="score"
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
