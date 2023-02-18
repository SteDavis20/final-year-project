import {
  Button,
  Alert,
  StyleSheet,
  Text,
  ScrollView,
  View,
} from "react-native";

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
];

export default function LogFoodScreen() {
  return (
    <ScrollView>
      <Text>Hello World</Text>
      <Text>Of course need to style buttons and layout at later stage</Text>
      <Text>Food Type</Text>
      {foodData.map((food) => {
        return (
          <View>
            {/* Pressable & View & Text */}
            <Button
              onPress={() => {
                Alert.alert("Alert Title", food.name + " Selected", [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                  { text: "Save", onPress: () => console.log("Save Pressed") },
                ]);
              }}
              title={food.name}
              color="#841584"
              accessibilityLabel="Select Food"
            />
          </View>
        );
      })}
      <Text>Portion Size</Text>
      <Text>To-Do: Add user input bar here</Text>
      {portionSizesData.map((portionSize) => {
        return (
          <View>
            <Button
              onPress={() => {
                Alert.alert("Alert Title", portionSize.name + " Selected", [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                  { text: "Save", onPress: () => console.log("Save Pressed") },
                ]);
              }}
              title={portionSize.name}
              color="#841584"
              accessibilityLabel="Select Food"
            />
          </View>
        );
      })}
      <Text>Final Buttons</Text>
      <Button
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
        title="Cancel"
        color="#FF0000" // red
        accessibilityLabel="Cancel Button"
      />
      <Button
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
        title="Save"
        color="#00FF00" // green
        accessibilityLabel="Cancel Button"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

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
});
