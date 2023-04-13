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

import { transportData } from "../../co2Emissions";

import ActionButton from "../../Components/Buttons/ActionButton";

import database from "../../firebase-config";
import { collection, addDoc } from "firebase/firestore";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import SelectDropdown from "react-native-select-dropdown";

const transportTypeData = [
  {
    key: 1,
    name: "Car",
  },
  {
    key: 2,
    name: "Bus",
  },
  {
    key: 3,
    name: "Luas",
  },
  {
    key: 4,
    name: "Dart",
  },
  {
    key: 5,
    name: "Train",
  },
];

const carSizesData = [
  {
    key: 1,
    name: "Small",
  },
  {
    key: 2,
    name: "Medium",
  },
  {
    key: 3,
    name: "Large",
  },
  {
    key: 4,
    name: "Average",
  },
];

const carFuelTypeData = [
  {
    key: 1,
    name: "Petrol",
  },
  {
    key: 2,
    name: "Diesel",
  },
  {
    key: 3,
    name: "Hybrid",
  },
  {
    key: 4,
    name: "Electric",
  },
];

const unitsOfDistanceData = [
  {
    key: 1,
    name: "Km",
  },
  {
    key: 2,
    name: "Miles",
  },
];

export default function LogTransportScreen({ route, navigation }) {
  const [modeOfTransportSelected, setModeOfTransportSelected] = useState("");
  const [carSizeSelected, setCarSizeSelected] = useState("");
  const [fuelTypeSelected, setFuelTypeSelected] = useState("");
  const [distanceEntered, setDistanceEntered] = useState("");
  const [numberOfPassengers, setNumberOfPassengers] = useState("");
  const [unitsOfDistanceSelected, setUnitsOfDistanceSelected] = useState("");
  const [mapIdentifier, setMapIdentifier] = useState("");
  const [refreshPage, setRefreshPage] = useState(false); // used to automatically refresh page

  const sideMargin = 20;

  const { userID } = route.params;

  useEffect(() => {
    if (mapIdentifier != "") {
      addLogToDatabase();
    }
  }, [mapIdentifier]);

  function calculateTotalEmissions() {
    let conversionFactor = 8 / 5;
    let distance = distanceEntered;
    if (unitsOfDistanceSelected == "Miles") {
      distance *= conversionFactor;
    }
    /* Parse json data to get co2e depending on car, luas, fuel type, car size etc., */
    let kgCo2ePerKm = 0;
    for (let i = 0; i < transportData.length; i++) {
      if (mapIdentifier == transportData[i].name) {
        kgCo2ePerKm = transportData[i].kgCo2ePerKm;
        break;
      }
    }
    let totalEmissions = kgCo2ePerKm * distance;
    if (modeOfTransportSelected == "Car") {
      if (numberOfPassengers > 0) {
        totalEmissions /= numberOfPassengers;
      }
    }
    totalEmissions = Math.round(totalEmissions * 100) / 100;
    return totalEmissions;
  }

  async function addLogToDatabase() {
    const docData = {
      category: "transport",
      co2e: calculateTotalEmissions(),
      date: getTodaysDate(),
      name: modeOfTransportSelected.toLowerCase(),
      distanceTravelled: distanceEntered,
      unitOfDistance: unitsOfDistanceSelected,
      userID: userID,
    };
    /* Add a new document where firebase auto-generates unique id */
    await addDoc(collection(database, "emission_logs"), docData);
  }

  function getTodaysDate() {
    let date = new Date().getDate(); //To get the Current Date
    let month = new Date().getMonth() + 1; //To get the Current Month
    let year = new Date().getFullYear(); //To get the Current Year
    return date + "/" + month + "/" + year;
  }

  function resetData() {
    setModeOfTransportSelected("");
    setCarSizeSelected("");
    setFuelTypeSelected("");
    setDistanceEntered(0);
    setNumberOfPassengers("");
    setUnitsOfDistanceSelected("");
    setMapIdentifier("");
  }

  return (
    <ScrollView
      style={{
        backgroundColor: "#BEFFDC",
      }}
    >
      <View style={{ marginHorizontal: sideMargin }}>
        <Text style={styles.heading}>Mode of Transport</Text>
        <SelectDropdown
          data={transportTypeData}
          onSelect={(selectedItem, index) => {
            setModeOfTransportSelected(selectedItem.name);
          }}
          defaultButtonText={"Select transport type"}
          buttonTextAfterSelection={(selectedItem, index) => {
            return modeOfTransportSelected;
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
        {/* ==================================================================================================== */}
        {modeOfTransportSelected == "Car" && (
          <View>
            <Text style={styles.heading}>Car Size</Text>
            <SelectDropdown
              data={carSizesData}
              onSelect={(selectedItem, index) => {
                setCarSizeSelected(selectedItem.name);
              }}
              defaultButtonText={"Select car size"}
              buttonTextAfterSelection={(selectedItem, index) => {
                return carSizeSelected;
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
            {/* ==================================================================================================== */}
            <Text style={styles.heading}>Fuel Type</Text>
            <SelectDropdown
              data={carFuelTypeData}
              onSelect={(selectedItem, index) => {
                setFuelTypeSelected(selectedItem.name);
              }}
              defaultButtonText={"Select fuel type"}
              buttonTextAfterSelection={(selectedItem, index) => {
                return fuelTypeSelected;
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
          </View>
        )}
        {/* ==================================================================================================== */}
        <Text style={styles.heading}>Distance</Text>
        <SafeAreaView>
          <TextInput
            style={styles.dropdown1ButtonStyle}
            onChangeText={setDistanceEntered}
            value={distanceEntered}
            placeholder="e.g. 20"
            keyboardType="numeric"
            textAlign="center"
          />
        </SafeAreaView>
        {/* ==================================================================================================== */}
        <View style={{ margin: 20 }}></View>
        <SelectDropdown
          data={unitsOfDistanceData}
          onSelect={(selectedItem, index) => {
            setUnitsOfDistanceSelected(selectedItem.name);
          }}
          defaultButtonText={"Select unit of distance"}
          buttonTextAfterSelection={(selectedItem, index) => {
            return unitsOfDistanceSelected;
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
        {/* ==================================================================================================== */}
        {modeOfTransportSelected == "Car" && (
          <>
            <Text style={styles.heading}>Number of Passengers</Text>
            <SafeAreaView>
              <TextInput
                style={styles.dropdown1ButtonStyle}
                onChangeText={setNumberOfPassengers}
                value={numberOfPassengers}
                placeholder="Enter number of passengers"
                keyboardType="numeric"
                textAlign="center"
              />
            </SafeAreaView>
          </>
        )}
        {/* =================================================================================================== */}
        <View style={{ padding: 10 }}></View>
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
                      if (modeOfTransportSelected == "Car") {
                        let carSizeDecapitalised =
                          carSizeSelected.toLowerCase();
                        setMapIdentifier(
                          carSizeDecapitalised +
                            fuelTypeSelected +
                            modeOfTransportSelected
                        );
                      } else {
                        let modeOfTransportDecapitalised =
                          modeOfTransportSelected.toLowerCase();
                        setMapIdentifier(modeOfTransportDecapitalised);
                      }
                      navigation.pop();
                    },
                  },
                ]
              );
            }}
          />
        </View>
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
  },
  dropdown1ButtonTxtStyle: { color: "#444", textAlign: "left" },
  dropdown1DropdownStyle: { backgroundColor: "#EFEFEF" },
  dropdown1RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },
  dropdown1RowTxtStyle: { color: "#444", textAlign: "left" },
});
