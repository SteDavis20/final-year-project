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
import React, { useState } from "react";

import LogFoodScreen from "./LogFoodScreen";

import { PieChart } from "react-native-gifted-charts";

import { foodDummyData, transportDummyData } from "../../dummyData";

export default function HomeScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);

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
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
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
        <Text style={styles.setFontSizeOne}>Home Screen!</Text>
        <StatusBar style="auto" />
        {/****************************************************************************/}
        {/* Food Log Entires */}
        {/* Maybe make these buttons at a later stage, to allow user to edit/delete entry */}
        <View style={styles1.container}>
          <ScrollView>
            <Text style={styles.setFontSizeOne}>Food</Text>
            <View>
              {foodDummyData.map((food) => {
                return (
                  <View>
                    <Text style={styles1.item}>
                      {food.name}
                      {/* Need to replace tabs with aligning co2e to the very right of the screen */}
                      {"\t"}
                      {"\t"}
                      {"\t"}
                      {food.co2e} gCo2e/kg
                    </Text>
                  </View>
                );
              })}
            </View>
            {/****************************************************************************/}
            {/* Transport Log Entires */}
            <Text style={styles.setFontSizeOne}>Transport</Text>
            <View>
              {transportDummyData.map((transport) => {
                return (
                  <View>
                    <Pressable
                      // onPress={() => {
                      //   Alert.alert("Alert Title", "Log Food Pressed", [
                      //     {
                      //       text: "Cancel",
                      //       onPress: () => console.log("Cancel Pressed"),
                      //       style: "cancel",
                      //     },
                      //     {
                      //       text: "Save",
                      //       onPress: () => console.log("Save Pressed"),
                      //     },
                      //   ]);
                      // }}

                      onPress={() => {
                        setButtonPressed(buttonPressed);
                      }}
                    >
                      {buttonPressed ? (
                        <View
                          style={{
                            flexDirection: "row",
                            width: "100%",
                            backgroundColor: "pink",
                            justifyContent: "space-between",
                            borderRadius: 20,
                          }}
                        >
                          <Text style={{ padding: 20 }}>{transport.name}</Text>
                          <Text style={{ padding: 20 }}>
                            {transport.co2e} gCo2e/km
                          </Text>
                        </View>
                      ) : (
                        <View
                          style={{
                            flexDirection: "row",
                            width: "100%",
                            backgroundColor: "tomato",
                            justifyContent: "space-between",
                            borderRadius: 20,
                          }}
                        >
                          <Text style={{ padding: 20 }}>{transport.name}</Text>
                          <Text style={{ padding: 20 }}>
                            {transport.co2e} gCo2e/km
                          </Text>
                        </View>
                      )}
                    </Pressable>

                    <Text
                      style={{
                        padding: 20,
                        backgroundColor: "blue",
                        borderRadius: 30,
                      }}
                    >
                      {transport.name}
                    </Text>

                    {/*  borderRadius: 20,
    backgroundColor: "lightgreen", */}
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>
        {/* Log Food button */}
        {/* Need to navigate to LogFoodScreen */}
        <Button
          // onPress={() => navigation.navigate("LogFoodScreen")}
          title="Log Food"
          color="#841584"
          accessibilityLabel="Log food entry"
          onPress={() => {
            Alert.alert("Alert Title", "Log Food Pressed", [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              { text: "Save", onPress: () => console.log("Save Pressed") },
            ]);
          }}
        />

        {/* <Modal
          animationType="slide"
          // transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        > */}
        {/* <View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={[styles.textStyle, { padding: 30 }]}>
                Hide Modal
              </Text>
            </Pressable>
            <LogFoodScreen />
          </View> */}
        {/* <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            {transportDummyData.map((transport) => {
              return (
                <View>
                  <Pressable
                    onPress={() => {
                      Alert.alert("Alert Title", "Log Food Pressed", [
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
                    <View
                      style={{
                        flexDirection: "row",
                        width: "100%",
                        backgroundColor: "pink",
                        justifyContent: "space-between",
                        borderRadius: 20,
                      }}
                    >
                      <Text style={{ padding: 20 }}>{transport.name}</Text>
                      <Text style={{ padding: 20 }}>
                        {transport.co2e} gCo2e/km
                      </Text>
                    </View>
                  </Pressable>

                  <Text
                    style={{
                      padding: 20,
                      backgroundColor: "blue",
                      borderRadius: 30,
                    }}
                  >
                    {transport.name}
                  </Text>

                  {/*  borderRadius: 20,
    backgroundColor: "lightgreen", */}
        {/* </View>
              );
            })}

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View> */}
        {/* </Modal> */}
      </ScrollView>
      <View style={{ bottom: 100, flexDirection: "row-reverse" }}>
        {/* <Pressable onPress={() => setModalVisible(true)}> */}
        <Pressable onPress={() => navigation.navigate("Log Food")}>
          <View
            style={{
              paddingHorizontal: 10,
              backgroundColor: "green",
              width: 70,
              height: 70,
              alignItems: "center",
              borderRadius: 90,
              justifyContent: "center",
              marginHorizontal: 10,
            }}
          >
            <Text style={[{ fontSize: 40, color: "white" }]}>+</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

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

const styles = StyleSheet.create({
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
