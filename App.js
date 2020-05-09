import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MyCounter from "./components/MyCounter";

export default function App() {
  return (
    <View style={styles.container}>
      <MyCounter />
    </View>
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
