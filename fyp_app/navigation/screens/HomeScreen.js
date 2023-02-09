import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Button,
  Alert,
} from "react-native";

import { PieChart } from "react-native-gifted-charts";

import { foodDummyData, transportDummyData } from "../../dummyData";

export default function HomeScreen() {
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
    <ScrollView>
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
                  <Text style={styles1.item}>
                    {transport.name} {"\t"}
                    {/* Need to replace tabs with aligning co2e to the very right of the screen */}
                    {"\t"}
                    {"\t"}
                    {transport.co2e} gCo2e/km
                  </Text>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </ScrollView>
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
