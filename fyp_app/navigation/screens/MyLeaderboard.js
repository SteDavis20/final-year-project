import React from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";

function MyLeaderboard({ data, sortByProp, centerProp, rhsProp }) {
  /* Sort by descending values */
  const sortData = (data) => {
    const sortedData = [...data].sort(
      (item1, item2) => item2[sortByProp] - item1[sortByProp]
    );
    return sortedData;
  };

  const renderItem = ({ item, index, icon }) => (
    <View
      style={[styles.row, item.isCurrentUser && { backgroundColor: "green" }]}
    >
      <View style={styles.left}>
        <Text
          style={[
            styles.rank,
            index < 9 ? styles.singleDidget : styles.doubleDidget,
          ]}
        >
          {parseInt(index) + 1}
        </Text>
        {icon && <Image source={{ uri: item.icon }} style={styles.avatar} />}
        <Text style={[styles.label]} numberOfLines={1}>
          {item[centerProp]}
        </Text>
        <Text style={styles.score}>{item[rhsProp]}</Text>
      </View>
    </View>
  );

  data = sortData(data);
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  row: {
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: "#d6d7da",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  rank: {
    fontSize: 17,
    fontWeight: "bold",
    marginRight: 5,
  },
  singleDidget: {
    paddingLeft: 16,
    paddingRight: 6,
  },
  doubleDidget: {
    paddingLeft: 10,
    paddingRight: 2,
  },
  label: {
    fontSize: 17,
    flex: 1,
    paddingRight: 80,
  },
  score: {
    fontSize: 20,
    fontWeight: "bold",
    position: "absolute",
    right: 15,
    paddingLeft: 15,
  },
  avatar: {
    height: 30,
    width: 30,
    borderRadius: 30 / 2,
    marginRight: 10,
  },
});

export default MyLeaderboard;
