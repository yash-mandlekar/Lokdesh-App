import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { TouchableOpacity, View, StyleSheet, Text, Image } from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from "react-native-popup-menu";
import AsyncStore from "@react-native-async-storage/async-storage";
import Ionic from "react-native-vector-icons/Ionicons";

const TopNavBar = () => {
  const navigation = useNavigation();
  const [menuToggle, setMenuToggle] = useState(false);
  const handleNavigation = (val) => {
    if (val === "Logout") {
      AsyncStore.removeItem("refreshToken");
      AsyncStore.removeItem("accessToken");
      navigation.navigate("Screen4");
    } else {
      navigation.navigate(val);
    }
  };
  const { ContextMenu, SlideInMenu } = renderers;
  return (
    <View style={styles.menuContainer}>
      <TouchableOpacity onPress={() => handleNavigation("Home")}>
        <Image
          resizeMode="contain"
          style={styles.logoStytle}
          source={require("../../assets/favicon.png")}
        />
      </TouchableOpacity>
      <Menu
        onSelect={(value) => handleNavigation(value)}
        style={styles.menuStyle}
        renderer={SlideInMenu}
        rendererProps={{ preferredPlacement: "bottom" }}
        onOpen={() => setMenuToggle(true)}
        onClose={() => setMenuToggle(false)}
      >
        <MenuTrigger>
          {menuToggle ? (
            <Ionic name="close" size={30} color="black" />
          ) : (
            <Image
              resizeMode="contain"
              style={styles.iconStytle}
              source={{
                uri: "https://img.icons8.com/ios-filled/50/000000/menu-2.png",
              }}
            />
          )}
        </MenuTrigger>
        <MenuOptions
          optionsContainerStyle={styles.menuOptionsStyle}
          customStyles={{
            optionText: styles.optionTextStyle,
          }}
        >
          <View style={styles.menuopts}>
            <MenuOption style={styles.menuopt} value="Profile">
              <Ionic name="person" size={40} color="black" />
              <Text style={styles.dropDownText}>Profile</Text>
            </MenuOption>
            <MenuOption style={styles.menuopt} value="Epaper">
              <Ionic name="newspaper" size={40} color="black" />
              <Text style={styles.dropDownText}>Epaper</Text>
            </MenuOption>
          </View>
          <View style={styles.menuopts}>
            <MenuOption style={styles.menuopt} value="Videos">
              <Ionic name="videocam" size={40} color="black" />
              <Text style={styles.dropDownText}>Videos</Text>
            </MenuOption>
            <MenuOption style={styles.menuopt} value="Language">
              <Ionic name="language" size={40} color="black" />
              <Text style={styles.dropDownText}>Select Language</Text>
            </MenuOption>
          </View>

          <MenuOption
            style={[styles.menuopt, { width: "100%", flexDirection: "row" }]}
            value="Logout"
          >
            <Ionic name="log-out" size={30} color="black" />
            <Text style={styles.dropDownText}>Logout</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    marginTop: 35,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    // backgroundColor: "rgba(102 ,0, 0 , 0.59)",
  },
  logoStytle: {
    width: 100,
    height: 50,
  },
  iconStytle: {
    width: "100%",
    height: 30,
    aspectRatio: 0.7,
  },
  dropDownText: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
    marginLeft: 5,
  },
  menuOptionsStyle: {
    backgroundColor: "#dadada",
    // marginLeft: -20,
    width: "100%",
    height: "45%",
    borderRadius: 15,
    padding: 15,
  },
  menuopts: {
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "center",
    width: "100%",
    height: "40%",
    marginVertical: 4,
  },
  menuopt: {
    width: "49%",
    backgroundColor: "white",
    // flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "black",
  },
  optionTextStyle: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
});

export default TopNavBar;
