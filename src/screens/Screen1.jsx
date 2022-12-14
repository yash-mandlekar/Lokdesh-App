import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Screen1 = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Screen2")}
      style={styles.container}
    >
      <Image
        resizeMode="contain"
        style={styles.headerLogo}
        source={require("../../assets/favicon.png")}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingHorizontal: 20,
    backgroundColor: "rgba(102 ,0, 0 , 0.59)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerLogo: {
    height: 300,
    width: "100%",
    aspectRatio: 1,
    display: "flex",
    alignItems: "stretch",
    marginTop: 10,
    marginBottom: 10,
  },
});

export default Screen1;
