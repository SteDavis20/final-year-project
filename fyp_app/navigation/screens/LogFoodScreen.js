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

import { useState } from "react";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import SelectDropdown from "react-native-select-dropdown";

const foodData = [
  {
    key: 1,
    name: "Beef",
  },
  {
    key: 2,
    name: "Chicken",
  },
  {
    key: 3,
    name: "Turkey",
  },
  {
    key: 4,
    name: "Milk",
  },
  {
    key: 5,
    name: "Eggs",
  },
  {
    key: 6,
    name: "Cheese",
  },
  {
    key: 7,
    name: "Tuna",
  },
  {
    key: 8,
    name: "Mackerel",
  },
  {
    key: 9,
    name: "Salmon",
  },
  {
    key: 10,
    name: "Pork",
  },
];

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

export default function LogFoodScreen() {
  const [text, onChangeText] = useState("Useless Text");
  const [number, onChangeNumber] = useState("");

  return (
    <ScrollView style={{ backgroundColor: "#1cb871" }}>
      <Text style={styles.heading}>Please log food below</Text>
      <Text style={styles.heading}>Food type:</Text>
      {/* <SelectDropdown
        data={foodData}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
          console.log(selectedItem.name, index);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem.name;
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item.name;
        }}
        buttonStyle={styles.dropdown1ButtonStyle}
      /> */}
      <SelectDropdown
        data={foodData}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
        }}
        defaultButtonText={"Select food type"}
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
      <Text style={styles.heading}>Portion Size:</Text>
      <SafeAreaView>
        <TextInput
          style={styles.dropdown1ButtonStyle}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="useless placeholder"
          keyboardType="numeric"
        />
      </SafeAreaView>
      <View style={{ padding: 10 }}></View>
      <SelectDropdown
        data={portionSizesData}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
        }}
        defaultButtonText={"Select portion size"}
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
            Alert.alert("Alert Title", "Cancel Selected", [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              {
                text: "Continue",
                onPress: () => console.log("Continue Pressed"),
              },
            ]);
          }}
          style={styles.button}
          // style={{ color: "FF0000" }} // red
        >
          <View>
            <Text style={{ color: "red", fontWeight: "bold" }}>Cancel</Text>
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
                onPress: () => console.log("Continue Pressed"),
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

// Tim styling
// style={{
//   flexDirection: "row",
//   width: "100%",
//   backgroundColor: "pink",
//   justifyContent: "space-between",
//   borderRadius: 20,
// }}
