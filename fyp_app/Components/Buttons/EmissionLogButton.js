import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

import Icon from "react-native-vector-icons/FontAwesome";

export default function EmissionLogButton({
  emissionName,
  co2eValue,
  unit,
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
});
