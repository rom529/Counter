import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import { AntDesign } from "@expo/vector-icons";

const MyCounter = (props) => {
  const [counter, setCounter] = useState(0);
  const [fetching, setFetching] = useState(false);

  const fetchMyAPI = async (grow) => {
    setFetching(true);
    const response1 = await fetch(
      "https://counter-dc491.firebaseio.com/Counter/-M6kGIyj09Bep7wKK1xw.json",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const resData1 = await response1.json();
    if (resData1) {
      const response2 = await fetch(
        "https://counter-dc491.firebaseio.com/Counter/-M6kGIyj09Bep7wKK1xw.json",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            counter: resData1.counter + grow,
          }),
        }
      );
      const resData2 = await response2.json();
      if (resData2) {
        setFetching(false);
      }
    }
  };

  useEffect(() => {
    if (!fetching) {
      let _interval = setInterval(async () => {
        const response1 = await fetch(
          "https://counter-dc491.firebaseio.com/Counter/-M6kGIyj09Bep7wKK1xw.json",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const resData1 = await response1.json();
        setCounter(resData1.counter);
      }, 2000);
      return () => clearInterval(_interval);
    }
  });

  const onChange = async (value) => {
    setFetching(true);
    const requireAudio = require("../assets/button-29.mp3");
    const soundObject = new Audio.Sound();
    if (counter !== 0 && value === "minus") {
      await soundObject.loadAsync(requireAudio);
      setCounter(counter - 1);
      fetchMyAPI(-1);
      await soundObject.playAsync();
    } else if (value === "plus") {
      await soundObject.loadAsync(requireAudio);
      fetchMyAPI(1);
      setCounter(counter + 1);
      soundObject.playAsync();
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: counter > 249 ? "#FF4136" : "white",
          fontSize: 100,
          marginVertical: "20%",
          alignSelf: "center",
        }}
      >
        {counter}
      </Text>
      <View
        style={{
          width: "100%",
          alignSelf: "center",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <TouchableOpacity disabled={fetching} onPress={() => onChange("plus")}>
          <AntDesign name="plussquareo" size={100} color="#2ECC40" />
        </TouchableOpacity>
        <TouchableOpacity disabled={fetching} onPress={() => onChange("minus")}>
          <AntDesign name="minussquareo" size={100} color="#FF4136" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
  },
});

export default MyCounter;
