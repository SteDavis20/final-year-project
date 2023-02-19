import {
  SafeAreaView,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Text,
  ScrollView,
  View,
  Pressable,
} from "react-native";

import { useState } from "react";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import SelectDropdown from "react-native-select-dropdown";

const transportData = [
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

export default function LogTransportScreen({ navigation }) {
  const [text, onChangeText] = useState("Useless Text");
  const [distanceEntered, onChangeDistanceEntered] = useState("");
  const [numberOfPassemgers, onChangeNumberOfPassengers] = useState("");

  return (
    <ScrollView style={{ backgroundColor: "purple" }}>
      <Text style={styles.heading}>Mode of Transport</Text>
      <SelectDropdown
        data={transportData}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
        }}
        defaultButtonText={"Select transport type"}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem.name;
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
      {/* Have button for each option to select  */}
      {/* {transportData.map((modeOfTransport) => {
        return (
          <View>
            <Pressable
              onPress={() => {
                Alert.alert("Alert Title", modeOfTransport.name + " Selected", [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                  { text: "Save", onPress: () => console.log("Save Pressed") },
                ]);
              }}
            >
              <View>
                <Text>{modeOfTransport.name}</Text>
              </View>
            </Pressable>
          </View>
        );
      })} */}

      {/* ==================================================================================================== */}
      <Text>
        Only have this if car is selected as mode of transport! Could be bus or
        luas or dart
      </Text>
      <Text style={styles.heading}>Car Size - Add photo</Text>
      <SelectDropdown
        data={carSizesData}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
        }}
        defaultButtonText={"Select car size"}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem.name;
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
      {/* Have button for each car size type and user selects button  */}
      {/* {carSizesData.map((carSize) => {
        return (
          <View>
            <Pressable
              onPress={() => {
                Alert.alert("Alert Title", modeOfTransport.name + " Selected", [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                  { text: "Save", onPress: () => console.log("Save Pressed") },
                ]);
              }}
            >
              <View>
                <Text>{modeOfTransport.name}</Text>
              </View>
            </Pressable>
          </View>
        );
      })} */}

      {/* ==================================================================================================== */}
      <Text style={styles.heading}>Distance</Text>
      <SafeAreaView>
        <TextInput
          style={styles.dropdown1ButtonStyle}
          onChangeText={onChangeDistanceEntered}
          value={distanceEntered}
          placeholder="Enter distance travelled"
          keyboardType="numeric"
        />
      </SafeAreaView>

      {/* ==================================================================================================== */}
      <SelectDropdown
        data={unitsOfDistanceData}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
        }}
        defaultButtonText={"Select unit of distance"}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem.name;
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

      {/* Have button for each car size type and user selects button  */}
      {/* {unitsOfDistanceData.map((unitsOfDistance) => {
        return (
          <View>
            <Pressable
              onPress={() => {
                Alert.alert("Alert Title", unitsOfDistance.name + " Selected", [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                  { text: "Save", onPress: () => console.log("Save Pressed") },
                ]);
              }}
            >
              <View>
                <Text>{unitsOfDistance.name}</Text>
              </View>
            </Pressable>
          </View>
        );
      })} */}

      {/* ==================================================================================================== */}
      {/* Have button for each car size type and user selects button  */}
      <Text style={styles.heading}>Number of Passengers</Text>
      <SafeAreaView>
        <TextInput
          style={styles.dropdown1ButtonStyle}
          onChangeText={onChangeNumberOfPassengers}
          value={numberOfPassemgers}
          placeholder="Enter number of passengers"
          keyboardType="numeric"
        />
      </SafeAreaView>
      {/* =================================================================================================== */}

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
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
                {
                  text: "Reset",
                  onPress: () => console.log("Reset Pressed"),
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
            Alert.alert("Alert Title", "Save Selected", [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              {
                text: "Continue",
                onPress: () => {
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
    color: "white",
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
