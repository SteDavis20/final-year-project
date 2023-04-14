import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Alert,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";

import { PieChart } from "react-native-gifted-charts";

import EmissionLogButton from "../../Components/Buttons/EmissionLogButton";

import { useIsFocused } from "@react-navigation/native";

import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  addDoc,
} from "firebase/firestore";

import database from "../../firebase-config";

let myBackgroundColour = "#F1FBFF";

export default function HomeScreen({ route, navigation }) {
  const [todaysDate, setTodaysDate] = useState("");
  const [emissionLogs, setEmissionLogs] = useState([]);
  const [foodLogs, setFoodLogs] = useState([]);
  const [transportLogs, setTransportLogs] = useState([]);
  const [yesterdaysDate, setYesterdaysDate] = useState("");
  const [userName, setUserName] = useState("");
  const [foodLogTotalCo2e, setFoodLogTotalCo2e] = useState(0);
  const [transportLogTotalCo2e, setTransportLogTotalCo2e] = useState(0);

  const isFocused = useIsFocused();

  const sideMargin = 20;

  const { userID } = route.params;

  /* When a new day, need to set emissionLogs back to empty */
  /* useEffect takes a callback function as parameter, cannot put await before this function so immediately invoke nested async function as below */
  useEffect(() => {
    async function getLogs() {
      setDate();
      setEmissionLogs(await getEmissionLogsFromDatabase());
    }
    getLogs();
    async function getUserName() {
      const docRef = doc(database, "users", userID);
      const userDocument = await getDoc(docRef);
      setUserName(userDocument.data().name);
    }
    if (userName == "") {
      getUserName();
    }
  }, [todaysDate, isFocused]);

  /* Firebase date saved as string in the form: 7/3/2023 */
  function setDate() {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    setTodaysDate(date + "/" + month + "/" + year);
  }

  function setYesterdaysDateHelper() {
    var date = new Date().getDate() - 1;
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    setYesterdaysDate(date + "/" + month + "/" + year);
  }

  async function getEmissionLogsFromDatabase() {
    let databaseEmissionLogs = [];
    let tempFoodLogs = [];
    let tempTransportLogs = [];
    let tempTotalFoodCo2e = 0;
    let tempTotalTransportCo2e = 0;
    const q = query(
      collection(database, "emission_logs"),
      where("userID", "==", userID),
      where("date", "==", todaysDate)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((document) => {
      if (document.data().category == "food") {
        tempFoodLogs.push(document.data());
        tempTotalFoodCo2e += document.data().co2e;
      } else if (document.data().category == "transport") {
        tempTransportLogs.push(document.data());
        tempTotalTransportCo2e += document.data().co2e;
      }
      databaseEmissionLogs.push(document.data());
    });
    setFoodLogs(tempFoodLogs);
    setTransportLogs(tempTransportLogs);
    setFoodLogTotalCo2e(tempTotalFoodCo2e);
    setTransportLogTotalCo2e(tempTotalTransportCo2e);
    return databaseEmissionLogs;
  }

  /*
   * When page first renders, check if scores exist, if scores exist, do nothing, if scores do not exist, generate the scores and push to firebase
   */
  useEffect(() => {
    async function generateScores() {
      setYesterdaysDateHelper();
      await checkScoresExist();
    }
    generateScores();
  }, [isFocused, yesterdaysDate]);

  /* Fetch documents from scores collection, if size <= 0 for yesterdays date, then generate scores for each user and push to firebase
   * if size of querySnapshot > 0, this means scores have already been generated, so do nothing, i.e., return
   */
  async function checkScoresExist() {
    /* Get score documents */
    const q = query(
      collection(database, "scores"),
      where("date", "==", yesterdaysDate)
    );
    const scoreDocuments = (await getDocs(q)).docs;
    if (scoreDocuments.length <= 0) {
      console.log(
        "No score documents for yesterday's date of ",
        yesterdaysDate
      );
      await generateUserScores();
    }
    return;
  }

  /* Creates and pushes score document for each user for the previous day to firebase */
  async function generateUserScores() {
    const q = query(
      collection(database, "emission_logs"),
      where("date", "==", yesterdaysDate)
    );
    const emissionLogDocuments = (await getDocs(q)).docs;
    let data = [];
    emissionLogDocuments.map((emissionLogDocument) => {
      let co2e = emissionLogDocument.data().co2e;
      let userID = emissionLogDocument.data().userID;
      const key = "userID";
      let index = data.findIndex((obj) => {
        return obj.hasOwnProperty(key) && obj[key] == userID;
      });
      /* user exists, add co2e to user's score */
      if (index != -1) {
        let prevScore = data[index].score;
        data[index] = { userID: userID, score: prevScore + co2e };
      } else {
        /* user does not exist, add userID and co2e as score to the data */
        data.push({ userID: userID, score: co2e });
      }
    });
    /* After iterating through all emmision log documents, create a score document
     * with yesterdaysDate, the userID and the user's score for the day */
    await Promise.all(
      data.map(async (userScore) => {
        /* Add a new document with auto generated id. */
        let score = getScoreFromCo2(userScore.score);
        await addDoc(collection(database, "scores"), {
          date: yesterdaysDate,
          userID: userScore.userID,
          value: score,
        });
      })
    );
  }

  function getScoreFromCo2(co2e) {
    let scoreMap = [
      { co2e: 10, score: 12 },
      { co2e: 11, score: 11 },
      { co2e: 12, score: 10 },
      { co2e: 13, score: 9 },
      { co2e: 14, score: 8 },
      { co2e: 15, score: 7 },
      { co2e: 16, score: 6 },
      { co2e: 17, score: 5 },
      { co2e: 18, score: 4 },
      { co2e: 19, score: 3 },
    ];
    for (let i = 0; i < scoreMap.length; i++) {
      if (co2e <= scoreMap[i].co2e) {
        return scoreMap[i].score;
      }
    }
    return 3;
  }

  const renderLegend = (text, color) => {
    return (
      <View style={{ flexDirection: "row", marginBottom: 12 }}>
        <View
          style={{
            height: 18,
            width: 18,
            marginRight: 10,
            borderRadius: 4,
            backgroundColor: color || "white",
          }}
        />
        <Text style={{ color: "black", fontSize: 16 }}>{text || ""}</Text>
      </View>
    );
  };

  return (
    <View style={{ marginTop: 35 }}>
      <ScrollView style={{ backgroundColor: myBackgroundColour }}>
        <Text style={styles.heading}>Home</Text>
        <View
          style={{
            marginVertical: 10,
            marginHorizontal: sideMargin,
            borderRadius: 10,
            paddingVertical: 10,
            backgroundColor: "white", // #414141
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "black",
            shadowOffset: {
              width: 5,
              height: 5,
            },
            shadowRadius: 5,
            shadowOpacity: 0.4,
          }}
        >
          {/*********************    Custom Header component      ********************/}
          <Text
            style={{
              color: "black",
              fontSize: 25,
              fontWeight: "bold",
              marginBottom: 12,
            }}
          >
            {userName}'s breakdown
          </Text>
          {/****************************************************************************/}
          <PieChart
            strokeColor="white"
            strokeWidth={4}
            donut
            /* Data here needs to be replaced with total food co2e emissions and total transport co2e emissions */
            data={[
              {
                value: Math.round(foodLogTotalCo2e * 100) / 100,
                color: "rgb(84,219,234)",
                shiftTextX: -10,
              },
              {
                value: Math.round(transportLogTotalCo2e * 100) / 100,
                color: "lightgreen",
                shiftTextX: -10,
              },
            ]}
            innerCircleColor="#414141"
            innerCircleBorderWidth={4}
            innerCircleBorderColor={"white"}
            showValuesAsLabels={true}
            showText
            textSize={12}
            textColor="black"
            textBackgroundRadius={25}
            shiftInnerCenterX={5}
            showTextBackground={true}
            centerLabelComponent={() => {
              return (
                <View>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 18,
                      alignSelf: "center",
                      textAlign: "center",
                      width: "100%",
                    }}
                  >
                    {Math.round(
                      (foodLogTotalCo2e + transportLogTotalCo2e) * 100
                    ) / 100}
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 18,
                      alignSelf: "center",
                      textAlign: "center",
                      width: "100%",
                    }}
                  >
                    Total
                  </Text>
                </View>
              );
            }}
          />

          {/*********************    Custom Legend component      ********************/}
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginTop: 5,
            }}
          >
            {renderLegend("Transport", "lightgreen")}
            {renderLegend("Food", "rgb(84,219,234)")}
          </View>
          {/****************************************************************************/}
        </View>
        <StatusBar style="auto" />
        {/****************************************************************************/}
        {/* Food Log Entries */}
        <View>
          <ScrollView>
            <Text style={styles.heading}>Food</Text>
            <View>
              {foodLogs.length > 0 &&
                foodLogs.map((food) => {
                  return (
                    <View>
                      <EmissionLogButton
                        emissionName={food.name}
                        co2eValue={food.co2e}
                        unit={"kgCo2e"}
                        colour={"white"}
                        fontSize={20}
                        iconName={"cutlery"}
                      />
                    </View>
                  );
                })}
            </View>
            {/****************************************************************************/}
            {/* Transport Log Entries */}
            <Text style={styles.heading}>Transport</Text>
            <View>
              {transportLogs.length > 0 &&
                transportLogs.map((transport) => {
                  return (
                    <View>
                      <EmissionLogButton
                        emissionName={transport.name}
                        unit={"kgCo2e"}
                        co2eValue={transport.co2e}
                        colour={"white"}
                        fontSize={20}
                        iconName={"car"}
                      />
                    </View>
                  );
                })}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
      <View
        style={{
          bottom: 100,
          alignItems: "flex-end",
        }}
      >
        <Pressable
          onPress={() => {
            Alert.alert("Log Emission Type", "", [
              {
                text: "Food",
                onPress: () => {
                  navigation.navigate("Log Food", { userID: userID });
                },
              },
              {
                text: "Transport",
                onPress: () => {
                  navigation.navigate("Log Transport", { userID: userID });
                },
              },
              {
                text: "Cancel",
              },
            ]);
          }}
        >
          <View
            style={{
              backgroundColor: "green",
              width: 70,
              height: 70,
              alignItems: "center",
              borderRadius: 90,
              justifyContent: "center",
              marginHorizontal: 10,
            }}
          >
            <Text
              style={[
                {
                  fontSize: 60,
                  color: "white",
                  fontWeight: "bold",
                  textAlign: "center",
                },
              ]}
            >
              +
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    padding: 20,
    paddingBottom: 10,
    alignSelf: "center",
  },
});
