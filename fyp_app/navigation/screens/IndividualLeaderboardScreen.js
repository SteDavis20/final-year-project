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

export default function IndividualLeaderboardScreen({ route, navigation }) {
  // const [data, setData] = useState([]);

  const [leaderboardScores, setLeaderboardScores] = useState([]);
  const [yesterdaysDate, setYesterdaysDate] = useState("");

  const isFocused = useIsFocused();

  /*
   * Get scores of everyone else
   * Should leaderboard show accumulated score over time, or just the score for today?
   */
  // const data = [
  //   { userName: "Aaron", highScore: 7 },
  //   { userName: "Peadar", highScore: 5 },
  //   { userName: "Tim", highScore: 4 },
  //   { userName: "Mark", highScore: 2 },
  // ];

  // let score = 11;
  // try {
  // score = route.params.score;
  // Alert.alert(
  //   "Score param exists: ",
  //   score[
  //     {
  //       text: "OK",
  //     }
  //   ]
  // );
  // } catch (error) {
  // Alert.alert(
  //   "No score param!",
  //   ""[
  //     {
  //       text: "OK",
  //     }
  //   ]
  // );
  // }

  /*
   *   If today is 1st of month, e.g., 01/05/23, will this return 30/04/23, or 31/05/23?
   */
  function setDate() {
    var date = new Date().getDate() - 1; //To get the Current Date
    var month = new Date().getMonth() + 1; //To get the Current Month
    var year = new Date().getFullYear(); //To get the Current Year
    // var hours = new Date().getHours(); //To get the Current Hours
    // var min = new Date().getMinutes(); //To get the Current Minutes
    // var sec = new Date().getSeconds(); //To get the Current Seconds

    setYesterdaysDate(
      // date + "/" + month + "/" + year + " " + hours + ":" + min + ":" + sec
      date + "/" + month + "/" + year
    );
  }

  /* When a new day, need to set emissionLogs back to empty */
  /* useEffect takes a callback function as parameter, cannot put await before this function so immediately invoke nested async function as below */
  useEffect(() => {
    /* Only call this fetch when user 1st opens the app */
    async function getScores() {
      // console.log(
      //  "\n\n\n========================================================Page Loaded========================================================"
      // ); // if (emissionLogs.length == 0) {
      setDate();
      await getLeaderboardScores(); // getLeaderboardScores returns [] instead of [...]
      // ""// console.log("Leaderboard scores after refreshing: " + leaderboardScores);
      // }
    }
    getScores();
  }, []);

  /* When a new day, need to set emissionLogs back to empty */
  /* useEffect takes a callback function as parameter, cannot put await before this function so immediately invoke nested async function as below */
  // useEffect(() => {
  //   /* Only call this fetch when user 1st opens the app */
  //   async function getScores() {
  //     // if (emissionLogs.length == 0) {
  //     setDate();
  //     setLeaderboardScores(await getLeaderboardScores());
  //     ""// console.log(
  //       "Leaderboard scores after refreshing: " +
  //         JSON.stringify(leaderboardScores)
  //     );
  //     // }
  //   }
  //   getScores();
  // }, [isFocused]);

  // data = [], = [1,5,7]

  useEffect(() => {
    // console.log(
    //  "\n\n\n========================================================Leaderboard Change========================================================"
    //);
    // console.log("Leaderboard change: ", leaderboardScores);
  }, [leaderboardScores]);

  /*
   * Works
   */
  async function getScoresWithoutNames() {
    return new Promise(async (resolve, reject) => {
      // let scoreData = [];
      // console.log(
      //  "\n\n\n========================================================Fetching leaderboard scores========================================================"
      //);
      /* Gets user scores, but not user's name, only user's ID */
      const q = query(
        collection(database, "scores"),
        where("date", "==", yesterdaysDate)
      );
      /* Get score value and userID */
      const querySnapshot = await getDocs(q);
      // console.log("1:About to start for loop");
      // querySnapshot.forEach((scoreDocument) => {
      //   scoreData.push({
      //     userID: scoreDocument.data().userID,
      //     value: scoreDocument.data().value,
      //   });
      //   ""// console.log("2:In for loop");
      // });
      // ""// console.log("3:Outside for loop");
      // resolve(scoreData);
      resolve(querySnapshot);
    });
  }

  async function combineNameAndScore(value, userID) {
    // return new Promise(async (resolve, reject) => {
    let leaderboardData = [];
    const q = query(
      collection(database, "users"),
      where("userID", "==", userID)
    );
    const querySnapshot = await getDocs(q);
    // console.log(
    //  "Should now print one leaderboard object containing name and score!"
    //);
    // ""// console.log("DONT BE EMPTY: " + JSON.stringify(querySnapshot));
    querySnapshot.forEach((userDocument) => {
      /* Will only ever be 1 document iteration here */
      // console.log(
      //  "Leaderboard data: \nName: " +
      //    userDocument.data().name +
      //    "\nScore: " +
      //    value
      //);
      leaderboardData.push({
        name: userDocument.data().name,
        score: value,
      });
    });
    // resolve(leaderboardData); // is this resolving before the for loop finishes?
    // });
  }

  /*
   * Scores displayed are for previous day
   */
  async function getLeaderboardScores() {
    let leaderboardData = [];

    console.log(
      "\n\n\n========================================================Fetching leaderboard scores========================================================"
    );
    /* Gets user scores, but not user's name, only user's ID */
    const q = query(
      collection(database, "scores"),
      where("date", "==", yesterdaysDate)
    );
    /* Get score value and userID */
    const querySnapshot = await getDocs(q);

    console.log(
      "2) Finished fetching score docs of size: ",
      querySnapshot.size
    );

    // let scoresWithoutNamesDocuments = await getScoresWithoutNames();
    // ""// console.log(
    // "Scores documents: " + JSON.stringify(scoresWithoutNamesDocuments)
    // );

    // for await (const scoreDocument of scoresWithoutNamesDocuments) {
    //   let leaderboardObject = await combineNameAndScore(
    //     scoreDocument.data().userID,
    //     scoreDocument.data().value
    //   );
    //   leaderboardData.push(leaderboardObject);
    // }

    // scoresWithoutNamesDocuments.forEach((scoreDocument) => {
    //   async function callCombineFunction() {
    //     let leaderboardObject = await combineNameAndScore(
    //       scoreDocument.data().userID,
    //       scoreDocument.data().value
    //     );
    //     leaderboardData.push(leaderboardObject);
    //   }
    //   callCombineFunction();
    // });
    // ""// console.log(
    //   "Leaderboard data before resolving: " + JSON.stringify(leaderboardData)
    // );
    // resolve(leaderboardData);

    // resolve(leaderboardScores);

    // ""// console.log("1:About to start for loop");
    // querySnapshot.forEach((scoreDocument) => {
    //   scoreData.push({
    //     userID: scoreDocument.data().userID,
    //     value: scoreDocument.data().value,
    //   });
    //   ""// console.log("2:In for loop");
    // });
    // ""// console.log("3:Outside for loop");
    // resolve(scoreData);
    // resolve(querySnapshot);

    // for(let i=0; i<querySnapshot.size; i++) {
    //   const querySnapshot = await getDocs(q);
    // }

    querySnapshot.forEach((scoreDocument) => {
      // console.log("Document ID: " + document.data().userID + ""); // should print out 2 scores which it does
      console.log("3: For loop inside score documents");

      async function getNames() {
        console.log(
          "\nCalling getNames() with following user: " +
            scoreDocument.data().userID
        );
        /* Get user document matching userID stored in score document */
        /* Get document in users, where uniqueID matches uniqueID of document.data().userID */
        /* userID is not the uniqueID of the user document! */
        try {
          const q = query(
            collection(database, "users"),
            where("userID", "==", scoreDocument.data().userID)
          );
          const querySnapshot = await getDocs(q);
          // console.log(
          //  "Should now print one leaderboard object containing name and score!"
          //);
          console.log("4) fetched user docs of size: ", querySnapshot.size);
          querySnapshot.forEach((userDocument) => {
            console.log("5) For loop for user docs");
            /* Will only ever be 1 document iteration here */
            // console.log(
            //  "Leaderboard data: \nName: " +
            //    doc.data().name +
            //    "\nScore: " +
            //    document.data().value
            // );
            leaderboardData.push({
              userName: userDocument.data().name,
              highScore: scoreDocument.data().value,
            });
            setLeaderboardScores(leaderboardData); // []
          });
        } catch (error) {
          // console.log("User is not found for this score...");
          // console.log("Error message: " + error);
        }
        // resolve(leaderboardData);
      }
      getNames();
    });
    console.log("What I am resolving with!!!", leaderboardData);

    console.log("6, resolving and return leaderboard data!");

    /* Make this the last line to execute */
    // resolve(leaderboardData); // should be below, but is []
    // data = [
    // { userName: "Me", highScore: 10 },
    // { userName: "Aaron", highScore: 2 }
    // ]
  }

  // ""// console.log("Score parameter: " + score);
  // data.push({ userName: "Me", highScore: score });
  // setData(newData);
  return (
    <View style={{ marginTop: 35 }}>
      <Text style={styles.heading}>Individual Leaderboard</Text>
      <Leaderboard
        data={leaderboardScores}
        sortBy="highScore"
        labelBy="userName"
        // oddRowColor="green"
        // evenRowColor="cyan"
      />
      <Button
        title="title"
        onPress={() => {
          // console.log("\nWhat I actually see: ", leaderboardScores);
          // [object Object], [object, Object]
          //
        }}
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
