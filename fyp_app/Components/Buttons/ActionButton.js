import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

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
          backgroundColor: backgroundColour,
        },
      ]}
    >
      <Pressable onPress={onPress}>
        <View>
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
