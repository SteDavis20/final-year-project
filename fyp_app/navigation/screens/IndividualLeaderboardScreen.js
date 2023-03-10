import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Alert, Button } from "react-native";

import { useIsFocused } from "@react-navigation/native";

import Leaderboard from "react-native-leaderboard";

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
import { resolve } from "q";

export default function IndividualLeaderboardScreen({ route, navigation }) {
  const [leaderboardScores, setLeaderboardScores] = useState([]);
  const [yesterdaysDate, setYesterdaysDate] = useState("");

  const isFocused = useIsFocused();

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

  /*
   * Works
   */
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

  /*
   *
   */
  async function getUserDocuments(scoreDocScore, scoreDocUserID) {
    /* Gets user scores, but not user's name, only user's ID */
    const q = query(
      collection(database, "users"),
      where("userID", "==", scoreDocUserID)
    );
    /* Get score value and userID */
    const userDocuments = (await getDocs(q)).docs;
    let newEntry = "";
    await Promise.all(
      userDocuments.map(async (userDocument) => {
        newEntry = {
          name: userDocument.data().name,
          score: scoreDocScore,
        };
      })
    );
    return newEntry;
  }

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
        let tempData = await getUserDocuments(
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
      {leaderboardScores.length > 0 && (
        <View>
          <Text style={styles.heading}>Individual Leaderboard</Text>
          <Leaderboard
            data={leaderboardScores}
            sortBy="score"
            labelBy="name"
            // oddRowColor="green"
            // evenRowColor="cyan"
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
