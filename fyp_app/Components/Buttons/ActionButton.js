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

export default function ActionButton({
  title,
  onPress,
  backgroundColour,
  textColour,
  fontSize,
}) {
  return (
    <View
      style={[
        styles.button,
        {
          // flexDirection: "row",
          //   shadowColor: "black",
          //   shadowOffset: {
          //     width: 5,
          //     height: 5,
          //   },
          //   shadowRadius: 5,
          //   shadowOpacity: 0.4,
          backgroundColor: backgroundColour,
        },
      ]}
    >
      <Pressable onPress={onPress}>
        <View>
          {/* <Icon name={iconName} size={30} color="#5F5F5F" /> */}
          <Text
            style={{
              fontSize: fontSize,
              color: textColour,
              fontWeight: "bold",
            }}
          >
            {title}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    borderWidth: 5,
    margin: 20,
    elevation: 2,
    borderColor: "black",
    width: 130,
    height: 65,
    justifyContent: "center",
    alignItems: "center",
  },
});
