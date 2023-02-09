import {
  Button,
  Alert,
  StyleSheet,
  Text,
  ScrollView,
  View,
} from "react-native";

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

export default function LogTransportScreen() {
  return (
    <ScrollView>
      <Text>Hello World</Text>
      <Text>Of course need to style buttons and layout at later stage</Text>
      <Text>Mode of Transport</Text>
      {transportData.map((modeOfTransport) => {
        return (
          <View>
            <Button
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
              title={modeOfTransport.name}
              color="#841584"
              accessibilityLabel="Select Mode of Transport"
            />
          </View>
        );
      })}
      <Text>
        Only have this if car is selected as mode of transport! Could be bus or
        luas or dart
      </Text>
      <Text>Car Size - Add photo too</Text>
      {carSizesData.map((carSize) => {
        return (
          <View>
            <Button
              onPress={() => {
                Alert.alert("Alert Title", carSize.name + " Selected", [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                  { text: "Save", onPress: () => console.log("Save Pressed") },
                ]);
              }}
              title={carSize.name}
              color="#841584"
              accessibilityLabel="Select Car Size"
            />
          </View>
        );
      })}
      <Text>Distance</Text>
      <Text>Add input bar here</Text>
      {unitsOfDistanceData.map((unitsOfDistance) => {
        return (
          <View>
            <Button
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
              title={unitsOfDistance.name}
              color="#841584"
              accessibilityLabel="Select Unit of Distance"
            />
          </View>
        );
      })}
      <Text>Number of Passengers</Text>
      <Text>Maybe only display this for private car</Text>
      <Text>Add input bar here</Text>
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
