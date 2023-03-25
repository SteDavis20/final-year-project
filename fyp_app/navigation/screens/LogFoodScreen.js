import {
  SafeAreaView,
  TextInput,
  Pressable,
  Button,
  Alert,
  StyleSheet,
  Text,
  ScrollView,
  View,
} from "react-native";

import { useEffect, useState } from "react";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import SelectDropdown from "react-native-select-dropdown";
import Icon from "react-native-vector-icons/FontAwesome";
import { NavigationContainer } from "@react-navigation/native";
import { foodDummyData, transportDummyData } from "../../dummyData";

import { collection, addDoc, doc, setDoc, Timestamp } from "firebase/firestore";

import { foodData } from "../../co2Emissions";
import database from "../../firebase-config";

import ActionButton from "../../Components/Buttons/ActionButton";

let myBackgroundColour = "#F1FBFF";

const portionSizesData = [
  {
    key: 1,
    name: "grams",
  },
  {
    key: 2,
    name: "lbs",
  },
  {
    key: 3,
    name: "oz",
  },
  {
    key: 4,
    name: "ml",
  },
];

export default function LogFoodScreen({ route, navigation }) {
  const [foodSelected, setFoodSelected] = useState("");
  const [portionSize, setPortionSize] = useState(0);
  const [portionUnitSelected, setPortionUnitSelected] = useState("");

  const [refreshPage, setRefreshPage] = useState(false); // used to automatically refresh page

  const { userID } = route.params;

  useEffect(() => {}, [refreshPage]);

  /* TO-DO: Add conversions from pounds and ounces to grams and kilograms etc., */
  function calculateTotalEmissions() {
    console.log("Beginning calculation");
    console.log("Food selected: " + foodSelected);
    console.log("Portion size: " + portionSize);
    // let conversionFactor = 8 / 5;
    // if (unitsOfDistanceSelected == "Miles") {
    // distanceEntered *= conversionFactor;
    // }

    let kgCo2ePerKg = 0;
    console.log("Food data: \n" + JSON.stringify(foodData));
    for (let i = 0; i < foodData.length; i++) {
      if (foodSelected == foodData[i].name) {
        kgCo2ePerKg = foodData[i].kgCo2ePerKg;
        break;
      }
    }
    let totalEmissions = kgCo2ePerKg * (portionSize / 1000); // /1000 to get grams entered
    /* round emissions to 2 decimal places and save as number, not a string! */
    totalEmissions = Math.round(totalEmissions * 100) / 100;
    return totalEmissions;
  }

  async function addLogToDatabase(log) {
    const docData = {
      category: "food",
      /* make sure co2e is of type number, not string! */
      co2e: calculateTotalEmissions(),
      date: getTodaysDate(),
      name: foodSelected,
      portionSize: portionSize,
      portionUnit: portionUnitSelected,
      userID: userID,
    };

    // Add a new document where firebase auto-generate unique id.
    const docRef = await addDoc(collection(database, "emission_logs"), docData);
    console.log("Document written with ID: ", docRef.id);
    // foodDummyData.push(log);
  }

  function getTodaysDate() {
    let date = new Date().getDate(); //To get the Current Date
    let month = new Date().getMonth() + 1; //To get the Current Month
    let year = new Date().getFullYear(); //To get the Current Year
    return date + "/" + month + "/" + year;
  }

  function resetData() {
    setFoodSelected("");
    setPortionSize("");
    setPortionUnitSelected("");
  }

  // Update food selected with new value to pass to addLogToDatabase()
  useEffect(() => {});

  return (
    <ScrollView style={{ backgroundColor: myBackgroundColour }}>
      <Text style={[styles.heading, { marginTop: 20 }]}>
        Please log food below
      </Text>
      <Text style={styles.heading}>Food type:</Text>
      <SelectDropdown
        data={foodData}
        onSelect={(selectedItem, index) => {
          setFoodSelected(selectedItem.name);
        }}
        defaultButtonText={"Select food type"}
        buttonTextAfterSelection={(selectedItem, index) => {
          return foodSelected; // resets to "" after cancel selected
        }}
        rowTextForSelection={(item, index) => {
          return item.name;
        }}
        buttonStyle={styles.dropdown1ButtonStyle}
        buttonTextStyle={styles.dropdown1ButtonTxtStyle}
        renderDropdownIcon={(isOpened) => {
          return (
            <FontAwesome
              name={isOpened ? "chevron-up" : "chevron-down"}
              color={"#444"}
              size={18}
            />
          );
        }}
        dropdownIconPosition={"right"}
        dropdownStyle={styles.dropdown1DropdownStyle}
        rowStyle={styles.dropdown1RowStyle}
        rowTextStyle={styles.dropdown1RowTxtStyle}
      />
      <Text style={styles.heading}>Portion Size:</Text>
      <SafeAreaView>
        <TextInput
          style={styles.dropdown1ButtonStyle}
          onChangeText={setPortionSize}
          value={portionSize}
          placeholder="useless placeholder" // need to move this text into center
          keyboardType="numeric"
          textAlign="center"
        />
      </SafeAreaView>
      <View style={{ padding: 10, marginTop: 15 }}></View>
      <SelectDropdown
        data={portionSizesData}
        onSelect={(selectedItem, index) => {
          console.log("Selected portion size: " + selectedItem);
          setPortionUnitSelected(selectedItem.name);
        }}
        defaultButtonText={"Select unit"}
        buttonTextAfterSelection={(selectedItem, index) => {
          return portionUnitSelected;
        }}
        rowTextForSelection={(item, index) => {
          return item.name;
        }}
        buttonStyle={styles.dropdown1ButtonStyle}
        buttonTextStyle={styles.dropdown1ButtonTxtStyle}
        renderDropdownIcon={(isOpened) => {
          return (
            <FontAwesome
              name={isOpened ? "chevron-up" : "chevron-down"}
              color={"#444"}
              size={18}
            />
          );
        }}
        dropdownIconPosition={"right"}
        dropdownStyle={styles.dropdown1DropdownStyle}
        rowStyle={styles.dropdown1RowStyle}
        rowTextStyle={styles.dropdown1RowTxtStyle}
      />
      {/* Display buttons for pounds, grams, ounces, ml... */}
      {/* <View>
        {portionSizesData.map((portionSize) => {
          return (
            <View style={styles.item}>
              <Pressable
                onPress={() => {
                  Alert.alert("Alert Title", portionSize.name + " Selected", [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel",
                    },
                    {
                      text: "Save",
                      onPress: () => console.log("Save Pressed"),
                    },
                  ]);
                }}
              >
                <View>
                  <Text>{portionSize.name}</Text>
                </View>
              </Pressable>
            </View>
          );
        })}
      </View> */}
      <View style={{ padding: 10, marginTop: 30 }}></View>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <ActionButton
          title="Reset"
          backgroundColour="red"
          textColour="white"
          fontSize={20}
          onPress={() => {
            Alert.alert(
              "Are you sure?",
              "Selecting reset will lose your current progress.",
              [
                {
                  text: "Cancel",
                  onPress: () => {
                    // do nothing
                  },
                  style: "cancel",
                },
                {
                  text: "Reset",
                  onPress: () => {
                    resetData();
                    setRefreshPage(!refreshPage);
                  },
                },
              ]
            );
          }}
        />
        <ActionButton
          title="Save"
          backgroundColour="green"
          textColour="white"
          fontSize={20}
          onPress={() => {
            Alert.alert(
              "Are you sure",
              "Double check you've entered everything correctly.",
              [
                {
                  text: "Cancel",
                  onPress: () => {
                    // do nothing
                  },
                  style: "cancel",
                },
                {
                  text: "Continue",
                  onPress: () => {
                    addLogToDatabase();
                    navigation.pop();
                  },
                },
              ]
            );
          }}
        />
        {/* <Pressable
          onPress={() => {
            Alert.alert(
              "Alert Title",
              "Selecting reset will lose your current progress",
              [
                {
                  text: "Cancel",
                  onPress: () => {
                    // do nothing
                  },
                  style: "cancel",
                },
                {
                  text: "Reset",
                  onPress: () => {
                    resetData();
                    setRefreshPage(!refreshPage);
                  },
                },
              ]
            );
          }}
          style={styles.button}
          // style={{ color: "FF0000" }} // red
        >
          <View>
            <Text style={{ color: "red", fontWeight: "bold" }}>Reset</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            Alert.alert("Please Confirm", "Save Selected", [
              {
                text: "Cancel",
                onPress: () => {
                  // do nothing
                },
                style: "cancel",
              },
              {
                text: "Continue",
                onPress: () => {
                  addLogToDatabase();
                  navigation.pop();
                },
              },
            ]);
          }}
          style={styles.button}
          // style={{ backgroundColor: "00FF00" }} // green
        >
          <View>
            <Text style={{ color: "green", fontWeight: "bold" }}>Save</Text>
          </View>
        </Pressable> */}
      </View>
    </ScrollView>
  );
}

// styling for different unit sizes for portion size of food entry
const styles = StyleSheet.create({
  container: {
    padding: 50,
    flex: 1,
  },
  item: {
    padding: 20,
    fontSize: 15,
    marginTop: 5,
    flexDirection: "row",
    width: "30%",
    backgroundColor: "pink",
    justifyContent: "space-between",
    borderRadius: 20,
    textAlign: "center",
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
    backgroundColor: "black",
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
    padding: 20,
  },
  dropdown1ButtonStyle: {
    width: "60%",
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#444",
    alignSelf: "flex-end",
    marginRight: 20,
    marginLeft: 20,
  },
  dropdown1ButtonTxtStyle: { color: "#444", textAlign: "left" },
  dropdown1DropdownStyle: { backgroundColor: "#EFEFEF" },
  dropdown1RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },
  dropdown1RowTxtStyle: { color: "#444", textAlign: "left" },

  dropdown2ButtonStyle: {
    width: "80%",
    height: 50,
    backgroundColor: "#444",
    borderRadius: 8,
  },
  dropdown2ButtonTxtStyle: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
  },
  dropdown2DropdownStyle: {
    backgroundColor: "#444",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  dropdown2RowStyle: { backgroundColor: "#444", borderBottomColor: "#C5C5C5" },
  dropdown2RowTxtStyle: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
  },

  dropdown3ButtonStyle: {
    width: "80%",
    height: 50,
    backgroundColor: "#FFF",
    paddingHorizontal: 0,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#444",
  },
  dropdown3ButtonChildStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 18,
  },
  dropdown3ButtonImage: { width: 45, height: 45, resizeMode: "cover" },
  dropdown3ButtonTxt: {
    color: "#444",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,
    marginHorizontal: 12,
  },
  dropdown3DropdownStyle: { backgroundColor: "slategray" },
  dropdown3RowStyle: {
    backgroundColor: "slategray",
    borderBottomColor: "#444",
    height: 50,
  },
  dropdown3RowChildStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 18,
  },
  dropdownRowImage: { width: 45, height: 45, resizeMode: "cover" },
  dropdown3RowTxt: {
    color: "#F1F1F1",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,
    marginHorizontal: 12,
  },

  dropdown4ButtonStyle: {
    width: "50%",
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#444",
  },
  dropdown4ButtonTxtStyle: { color: "#444", textAlign: "left" },
  dropdown4DropdownStyle: { backgroundColor: "#EFEFEF" },
  dropdown4RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },
  dropdown4RowTxtStyle: { color: "#444", textAlign: "left" },
});
