import {
  SafeAreaView,
  TextInput,
  Alert,
  StyleSheet,
  Text,
  ScrollView,
  View,
} from "react-native";

import { useEffect, useState } from "react";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import SelectDropdown from "react-native-select-dropdown";

import { collection, addDoc } from "firebase/firestore";

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

  function calculateTotalEmissions() {
    let kgCo2ePerKg = 0;
    for (let i = 0; i < foodData.length; i++) {
      if (foodSelected == foodData[i].name) {
        kgCo2ePerKg = foodData[i].kgCo2ePerKg;
        break;
      }
    }
    let totalEmissions = kgCo2ePerKg * (portionSize / 1000); // Divide by 1000 to get grams entered
    totalEmissions = Math.round(totalEmissions * 100) / 100;
    return totalEmissions;
  }

  async function addLogToDatabase(log) {
    const docData = {
      category: "food",
      co2e: calculateTotalEmissions(),
      date: getTodaysDate(),
      name: foodSelected,
      portionSize: portionSize,
      portionUnit: portionUnitSelected,
      userID: userID,
    };
    /* Add a new document where firebase auto-generates unique id */
    await addDoc(collection(database, "emission_logs"), docData);
  }

  function getTodaysDate() {
    let date = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
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
          return foodSelected;
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
          placeholder="e.g. 100"
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
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
});
