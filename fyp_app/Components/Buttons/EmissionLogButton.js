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

import Icon from "react-native-vector-icons/FontAwesome";

let myBackgroundColour = "#F1FBFF";

export default function EmissionLogButton({
  icon,
  emissionName,
  co2eValue,
  unit,
  onPress,
  colour,
  fontSize,
  iconName,
}) {
  return (
    <View>
      <Pressable>
        <View
          style={[
            styles.logEntry,
            {
              flexDirection: "row",
              shadowColor: "black",
              shadowOffset: {
                width: 5,
                height: 5,
              },
              shadowRadius: 5,
              shadowOpacity: 0.4,
            },
          ]}
        >
          <Icon name={iconName} size={30} color="#5F5F5F" />
          {/* Add icon here*/}
          <Text style={[styles.foodName, { fontSize: fontSize }]}>
            {emissionName}
          </Text>
          <Text style={[styles.co2e, { fontSize: fontSize }]}>
            {co2eValue} {unit}
          </Text>
        </View>
      </Pressable>
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

  logEntry: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 20,
    margin: 5,
    elevation: 3,
    backgroundColor: "white",
    width: "90%",
    alignSelf: "center",
  },
  foodName: {
    alignItems: "left",
    width: "50%",
    paddingLeft: 20,
  },
  co2e: { textAlign: "right", width: "50%", paddingRight: 20 },

  // styling for log entries on homepage
  icon: {},
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  // button: {
  //   alignItems: "center",
  //   justifyContent: "center",
  //   paddingVertical: 12,
  //   paddingHorizontal: 32,
  //   borderRadius: 4,
  //   elevation: 3,
  //   backgroundColor: "cyan",
  // },
});
