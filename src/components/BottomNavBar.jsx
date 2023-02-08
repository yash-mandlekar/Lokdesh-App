import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionic from "react-native-vector-icons/Ionicons";

const BottomNavBar = () => {
  const route = useRoute();
  var groundcolor = "black";
  const navigation = useNavigation();
  const handleNavigation = (val) => {
    navigation.navigate(val);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, route.name === "Home" && styles.activebtn]}
        onPress={() => handleNavigation("Home")}
      >
        <Ionic
          name="home"
          size={30}
          color={route.name === "Home" ? "red" : groundcolor}
        />
        <Text
          style={[styles.navText, route.name === "Home" && styles.activetext]}
        >
          Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, route.name === "GoLive" && styles.activebtn]}
        onPress={() => handleNavigation("GoLive")}
      >
        <Ionic
          name="videocam"
          size={30}
          color={route.name === "GoLive" ? "red" : groundcolor}
        />
        <Text
          style={[styles.navText, route.name === "GoLive" && styles.activetext]}
        >
          Go Live
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, route.name === "Epaper" && styles.activebtn]}
        onPress={() => handleNavigation("Epaper")}
      >
        <Ionic
          name="newspaper"
          size={30}
          color={route.name === "Epaper" ? "red" : groundcolor}
        />
        <Text
          style={[styles.navText, route.name === "Epaper" && styles.activetext]}
        >
          Epaper
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, route.name === "Videos" && styles.activebtn]}
        onPress={() => handleNavigation("Videos")}
      >
        <Ionic
          name="videocam"
          size={30}
          color={route.name === "Videos" ? "red" : groundcolor}
        />
        <Text
          style={[styles.navText, route.name === "Videos" && styles.activetext]}
        >
          Videos
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    paddingVertical: 10,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#e5e5e5",
    zIndex: 99,
    paddingHorizontal: 10,
    bottom: 0,
  },
  button: {
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  activebtn: {
    borderColor: "white",
  },
  activetext: {
    color: "red",
  },
  navText: {
    fontSize: 10,
    fontWeight: "bold",
  },
});

export default BottomNavBar;
