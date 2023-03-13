import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Button,
  Alert,
  Modal,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";

import LogFoodScreen from "./LogFoodScreen";

import { PieChart } from "react-native-gifted-charts";

import EmissionLogButton from "../../Components/Buttons/EmissionLogButton";

import { useIsFocused } from "@react-navigation/native";

import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  addDoc,
} from "firebase/firestore";

import database from "../../firebase-config";

/*
 *   This dummy data should be replaced with data fetched from database from collections/emission_logs, where userID == uid
 *   foodData where category == "food"
 *   transportData where category == "transport"
 *   uid received after user logs in, need to pass prop of user ID from login to homepage
 */
import { foodDummyData, transportDummyData } from "../../dummyData";

let myBackgroundColour = "#F1FBFF";

export default function HomeScreen({ route, navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);
  const [todaysDate, setTodaysDate] = useState("");
  const [emissionLogs, setEmissionLogs] = useState([]);
  const [checkedScoreGeneration, setCheckedScoreGeneration] = useState(false);
  const [yesterdaysDate, setYesterdaysDate] = useState("");

  const isFocused = useIsFocused();

  const { userID } = route.params;

  /* When a new day, need to set emissionLogs back to empty */
  /* useEffect takes a callback function as parameter, cannot put await before this function so immediately invoke nested async function as below */
  useEffect(() => {
    /* Only call this fetch when user 1st opens the app */
    async function getLogs() {
      // if (emissionLogs.length == 0) {
      setDate();
      setEmissionLogs(await getEmissionLogsFromDatabase());
      // }
    }
    getLogs();
  }, [todaysDate, isFocused]);

  /* Firebase date saved as string in the form: 7/3/2023 */
  function setDate() {
    var date = new Date().getDate(); //To get the Current Date
    var month = new Date().getMonth() + 1; //To get the Current Month
    var year = new Date().getFullYear(); //To get the Current Year

    setTodaysDate(
      // date + "/" + month + "/" + year + " " + hours + ":" + min + ":" + sec
      date + "/" + month + "/" + year
    );
  }

  /*
   *   If today is 1st of month, e.g., 01/05/23, will this return 30/04/23, or 31/05/23?
   */
  function setYesterdaysDateHelper() {
    var date = new Date().getDate() - 1;
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    setYesterdaysDate(date + "/" + month + "/" + year);
  }

  /*
   *   Should also be "where("date", "==", insert today's date here)"
   *   Currently this will fetch every emission ever logged by the user, e.g., Monday, Tuesday, Wednesday etc., will be displayed
   */
  async function getEmissionLogsFromDatabase() {
    return new Promise(async (resolve, reject) => {
      let databaseEmissionLogs = [];
      const q = query(
        collection(database, "emission_logs"),
        where("userID", "==", userID),
        where("date", "==", todaysDate)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((document) => {
        databaseEmissionLogs.push(document.data());
      });
      resolve(databaseEmissionLogs);
    });
  }

  function getScoreForTheDay() {
    let totalEmissions = 0;

    for (let i = 0; i < emissionLogs.length; i++) {
      totalEmissions += emissionLogs[i].co2e;
    }

    /* If separating into Food and Transport emissions */
    // for (let i = 0; i < foodDummyData.length; i++) {
    //   totalEmissions += foodDummyData[i].co2e;
    // }

    // for (let i = 0; i < transportDummyData.length; i++) {
    //   totalEmissions += transportDummyData[i].co2e;
    // }

    /* Need to come up with more accurate scores at later stage */
    let score = 0;
    if (totalEmissions <= 300) {
      score = 10;
    } else if (totalEmissions <= 400) {
      score = 8;
    } else if (totalEmissions <= 500) {
      score = 6;
    } else if (totalEmissions <= 600) {
      score = 4;
    } else {
      score = 2;
    }
    return score;
  }

  /*
   * When page first renders, check if scores exist, if scores exist, do nothing, if scores do not exist, generate the scores and push to firebase
   *
   */
  useEffect(() => {
    async function generateScores() {
      // if (checkedScoreGeneration == false) {
      setYesterdaysDateHelper();
      await checkScoresExist();
      // setCheckedScoreGeneration(true);
      // }
    }
    generateScores();
  }, [isFocused, yesterdaysDate]);

  /* fetch documents from scores collection, if size <= 0 for yesterdays date, then generate scores for each user and push to firebase
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
    /* Get emission logs from firebase where date == yesterdaysDate */
    /* Get emmision log documents */
    const q = query(
      collection(database, "emission_logs"),
      where("date", "==", yesterdaysDate)
    );
    const emissionLogDocuments = (await getDocs(q)).docs;
    /* Iterate through emission log documents, adding the emission value to that user's sum */
    let data = [];
    /* get co2e and the userID of the emission log */
    /* if array.contains userID, add co2e to total for that user, else add new object to the array with userID and co2e as the total score */
    emissionLogDocuments.map((emissionLogDocument) => {
      let co2e = emissionLogDocument.data().co2e;
      let userID = emissionLogDocument.data().userID;
      const key = "userID";
      let index = data.findIndex((obj) => {
        return obj.hasOwnProperty(key) && obj[key] == userID;
      });
      if (index != -1) {
        // user exists, add co2e to user's score
        let prevScore = data[index].score;
        data[index] = { userID: userID, score: prevScore + co2e };
      } else {
        // user does not exist, add userID and co2e as score to the data
        data.push({ userID: userID, score: co2e });
      }
    });
    /* After iterating through all emmision log documents, create a score document with yesterdaysDate, the userID and the user's score for the day */
    await Promise.all(
      data.map(async (userScore) => {
        // Add a new document with auto generated id.
        const docRef = await addDoc(collection(database, "scores"), {
          date: yesterdaysDate,
          userID: userScore.userID,
          value: userScore.score,
        });
      })
    );
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
        <Text style={{ color: "white", fontSize: 16 }}>{text || ""}</Text>
      </View>
    );
  };

  return (
    <View style={{ marginTop: 35 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: myBackgroundColour }}
      >
        <Text style={styles.heading}>Home</Text>
        <View
          style={{
            marginVertical: 10,
            marginHorizontal: 10,
            borderRadius: 10,
            paddingVertical: 10,
            backgroundColor: "#414141",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/*********************    Custom Header component      ********************/}
          <Text
            style={{
              color: "white",
              fontSize: 32,
              fontWeight: "bold",
              marginBottom: 12,
            }}
          >
            Co2e Emissions
          </Text>
          {/****************************************************************************/}

          <PieChart
            strokeColor="white"
            strokeWidth={4}
            donut
            /* Data here needs to be replaced with total food co2e emissions and total transport co2e emissions */
            data={[
              { value: 30, color: "rgb(84,219,234)" },
              { value: 40, color: "lightgreen" },
            ]}
            innerCircleColor="#414141"
            innerCircleBorderWidth={4}
            innerCircleBorderColor={"white"}
            showValuesAsLabels={true}
            showText
            textSize={18}
            showTextBackground={true}
            centerLabelComponent={() => {
              return (
                <View>
                  <Text style={{ color: "white", fontSize: 36 }}>70</Text>
                  <Text style={{ color: "white", fontSize: 18 }}>Total</Text>
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
        {/* Maybe make these buttons at a later stage, to allow user to edit/delete entry */}

        {/* Only display heading of Food or Transport, if the entries for the user are not empty? */}
        {/* If no entries, pie chart will also be empty so need to fill the screen for when no data entered? */}
        <View>
          <ScrollView>
            {/* <Text style={styles.heading}>Food</Text> */}
            <Text style={styles.heading}>Emissions</Text>
            <View>
              {/* {foodDummyData.map((food) => { */}

              {emissionLogs.map((food) => {
                return (
                  <View>
                    <EmissionLogButton
                      /* icon= */ emissionName={food.name}
                      co2eValue={food.co2e}
                      unit={"kgCo2e"}
                      /* onPress={} */ colour={"white"}
                      fontSize={20}
                      iconName={"cutlery"}
                    />
                  </View>
                );
              })}
            </View>
            {/****************************************************************************/}
            {/* Transport Log Entries */}
            {/* <Text style={styles.heading}>Transport</Text>
            <View>
              {transportDummyData.map((transport) => {
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
            </View> */}
          </ScrollView>
        </View>
      </ScrollView>
      <View
        style={{
          bottom: 500,
          alignItems: "flex-end" /*flexDirection: "row-reverse" */,
        }}
      >
        {/* <Pressable onPress={() => setModalVisible(true)}> */}
        {/* <Pressable onPress={() => navigation.navigate("Log Food")}> */}
        <Pressable
          onPress={() => {
            Alert.alert("Log Emission Type", "", [
              {
                text: "Food",
                onPress: () => {
                  navigation.navigate("Log Food", { userID: userID });
                },
                // style: "cancel",
              },
              {
                text: "Transport",
                onPress: () => {
                  navigation.navigate("Log Transport", { userID: userID });
                },
              },
              {
                text: "Cancel",
                onPress: () => {
                  // do nothing
                },
              },
            ]);
          }}
        >
          <View
            style={{
              paddingHorizontal: 10,
              backgroundColor: "green",
              width: 150,
              height: 70,
              alignItems: "center",
              borderRadius: 90,
              justifyContent: "center",
              marginHorizontal: 10,
            }}
          >
            <Text
              style={[{ fontSize: 30, color: "white", fontWeight: "bold" }]}
            >
              Log Emission +
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 20,
    fontSize: 15,
    marginTop: 5,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "pink",
    justifyContent: "space-between",
    borderRadius: 20,
    textAlign: "left",
    borderRadius: 20,
  },
  textInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "cyan",
  },
  logEntry: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    margin: 5,
    elevation: 3,
    backgroundColor: "cyan",
    width: "95%",
  },
  foodName: {
    alignItems: "left",
    width: "50%",
  },
  co2e: { textAlign: "right", width: "50%" },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    padding: 20,
    paddingBottom: 10,
    alignSelf: "center",
  },
});

// styling for log entries on homepage
const styles1 = StyleSheet.create({
  container: {
    padding: 50,
    flex: 1,
  },
  item: {
    padding: 20,
    fontSize: 15,
    marginTop: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    height: "30%",
    width: 200,
    backgroundColor: "blue",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  setFontSizeOne: {
    fontSize: 30, // Define font size here in Pixels
  },
});
