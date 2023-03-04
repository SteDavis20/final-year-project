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
import Ionicons from "react-native-vector-icons/Ionicons";
import SelectDropdown from "react-native-select-dropdown";
import { NavigationContainer } from "@react-navigation/native";
import { foodDummyData, transportDummyData } from "../../dummyData";

import { foodData } from "../../co2Emissions";

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

export default function LogFoodScreen({ navigation }) {
  const [foodSelected, setFoodSelected] = useState("");
  const [portionSize, setPortionSize] = useState("");
  const [portionUnitSelected, setPortionUnitSelected] = useState("");

  const [refreshPage, setRefreshPage] = useState(false); // used to automatically refresh page

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
      console.log(
        "Food name: " +
          foodSelected +
          "\nFood name in data: " +
          foodData[i].name
      );
      if (foodSelected == foodData[i].name) {
        console.log("Match found in food data!");
        kgCo2ePerKg = foodData[i].kgCo2ePerKg;
        break;
      }
    }
    let totalEmissions = kgCo2ePerKg * (portionSize / 1000); // /1000 to get grams entered
    return totalEmissions;
  }

  function addLogToHomepage(log) {
    foodDummyData.push(log);
  }

  function resetData() {
    setFoodSelected("");
    setPortionSize("");
    setPortionUnitSelected("");
  }

  // Update food selected with new value to pass to addLogToHomepage()
  useEffect(() => {});

  return (
    <ScrollView style={{ backgroundColor: myBackgroundColour }}>
      <Text style={styles.heading}>Please log food below</Text>
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
          placeholder="useless placeholder"
          keyboardType="numeric"
        />
      </SafeAreaView>
      <View style={{ padding: 10 }}></View>
      <SelectDropdown
        data={portionSizesData}
        onSelect={(selectedItem, index) => {
          console.log("Selected portion size: " + selectedItem);
          setPortionUnitSelected(selectedItem.name);
        }}
        defaultButtonText={"Select portion size"}
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
      <View style={{ padding: 10 }}></View>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <Pressable
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
                  let log = {
                    id: foodDummyData.length + 1,
                    name: foodSelected,
                    co2e: calculateTotalEmissions(),
                  };
                  addLogToHomepage(log);
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
        </Pressable>
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
    fontSize: 30,
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
