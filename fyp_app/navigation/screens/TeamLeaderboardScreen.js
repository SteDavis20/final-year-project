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
  }, [yesterdaysDate]); // change in state of the date will rerender, which will display newly loaded leaderboard data

  /*
   *   If today is 1st of month, e.g., 01/05/23, will this return 30/04/23, or 31/05/23?
   */
  function setDate() {
    var date = new Date().getDate() - 1;
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    setYesterdaysDate(date + "/" + month + "/" + year);
  }

  /* Fetch all team documents from team collection in firebase */
  async function getTeamDocuments() {
    const q = query(collection(database, "teams"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs; // .docs is the array of team documents
  }

  async function getTeamScores() {
    let teamScores = [];
    /* Fetch all team documents from team collection in firebase */
    let teamDocuments = await getTeamDocuments();
    /* For each team document, use the userIDs in the userID array to fetch the score for each user in the scores document,
     * and sum these user scores together to get the overall team score.
     * Then push new object to teamScores array, containing the name of the team and the combined team score.
     */
    await Promise.all(
      teamDocuments.map(async (teamDocument) => {
        let userIDs = teamDocument.data().userIDs;
        /* Fetch score for each user in the team using userID */
        let teamScore = 0;
        let isCurrentUser = false;
        try {
          await Promise.all(
            /* Get score for yesterday for each user - if no score exists for user, give them score of 0 */
            userIDs.map(async (userID) => {
              const q = query(
                collection(database, "scores"),
                where("userID", "==", userID),
                where("date", "==", yesterdaysDate)
              );
              /* This will only ever return 1 document because user cannot have 2 scores for the 1 day! */
              /*Can return 0 scores if the user never logged anything for the day, in this case give a score of 0 */
              const querySnapshot = await getDocs(q);
              let userScoresDocs = querySnapshot.docs;
              // if userScoresDocs.length > 2 then the team of 2 people somehow have 2 scores for the day, if < 2 then not both people in
              // the team submitted a score.
              /* If no score, assign score of 0 to user */
              let userScore = 0;
              /* We have user score */
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
          /* Push new object with team name and score to the leaderboardData array */
          /* Need to push IDs of the team members to be able to highlight in green current logged in user's team */
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
    setLeaderboardScores(teamScores); // this does not change state of leaderboardScores so does not rerender automatically, but yesterdaysDate will suffice.
    return;
  }

  return (
    <View style={{ marginTop: 35 }}>
      <Text style={styles.heading}>Yesterday's Scores</Text>
      <Text style={styles.heading}>Team Leaderboard</Text>
      <MyLeaderboard data={leaderboardScores} />
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
