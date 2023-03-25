import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Alert, Button } from "react-native";

import { useIsFocused } from "@react-navigation/native";

// import Leaderboard from "react-native-leaderboard";
import MyLeaderboard from "./MyLeaderboard";

/*
 *   Is there only 1 individual leaderboard - YES
 */

import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";

import database from "../../firebase-config";

export default function IndividualLeaderboardScreen({ route, navigation }) {
  const [leaderboardScores, setLeaderboardScores] = useState([]);
  const [yesterdaysDate, setYesterdaysDate] = useState("");

  const isFocused = useIsFocused();

  const { userID } = route.params;

  /*
   *   If today is 1st of month, e.g., 01/05/23, will this return 30/04/23, or 31/05/23?
   */
  function setDate() {
    var date = new Date().getDate() - 1;
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    setYesterdaysDate(date + "/" + month + "/" + year);
  }

  /* useEffect takes a callback function as parameter, cannot put await before this function so immediately invoke nested async function as below */
  useEffect(() => {
    async function getScores() {
      setDate();
      await getLeaderboardScores(); // getLeaderboardScores returns [] instead of [...]
    }
    getScores();
  }, [yesterdaysDate]);

  async function getScoreDocuments() {
    /* Gets user scores, but not user's name, only user's ID */
    const q = query(
      collection(database, "scores"),
      where("date", "==", yesterdaysDate)
    );
    /* Get score value and userID */
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs; // .docs is the array
  }

  async function getUserDocument(scoreDocScore, scoreDocUserID) {
    /* Get user document where the uid of the user document == user id stored in score document */
    const docRef = doc(database, "users", scoreDocUserID);
    const userDocument = await getDoc(docRef);

    if (userDocument.exists()) {
      // console.log("uid? ", scoreDocUserID);
      let newEntry = "";
      newEntry = {
        name: userDocument.data().name,
        score: scoreDocScore,
        isCurrentUser: scoreDocUserID == userID,
      };
      return newEntry;
    } else {
      return;
    }
  }

  /* UserID for user is now found by the document ID, there is not userID field in the user document anymore. */
  async function getLeaderboardScores() {
    /*
     * Get score documents where date = yesterdaysDate
     */
    let scoreDocuments = await getScoreDocuments();
    // const data = [...leaderboardScores];
    let data = [];

    /*
     *   Get user documents where scoreDoc.id = userDoc.id
     */
    await Promise.all(
      scoreDocuments.map(async (scoreDocument) => {
        let tempData = await getUserDocument(
          scoreDocument.data().value,
          scoreDocument.data().userID
        );
        data.push(tempData);
      })
    );
    setLeaderboardScores(data);
  }

  return (
    <View style={{ marginTop: 35 }}>
      <Text style={styles.heading}>Yesterday's Scores</Text>
      <Text style={styles.heading}>Individual Leaderboard</Text>
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
