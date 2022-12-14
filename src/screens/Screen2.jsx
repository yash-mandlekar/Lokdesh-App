import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
const Screen2 = ({ refToken }) => {
  const [slide, setslide] = useState(1);
  const navigation = useNavigation();
  const handleSkipButton = () => {
    navigation.navigate("Screen3");
  };
  const handlePrevButton = () => {
    setslide(slide - 1);
  };
  const handleNextButton = () => {
    slide < 3 ? setslide(slide + 1) : navigation.navigate("Screen3");
  };
  useEffect(() => {
    if (refToken) {
      navigation.navigate("Home");
    }
  });
  return (
    <View style={styles.container}>
      {/* status bar */}
      <View style={styles.nav}>
        <TouchableOpacity onPress={handleSkipButton} style={styles.skipButton}>
          <Text style={styles.skipText}>SKIP</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.mainContent}>
        {slide === 1 && (
          <Text style={styles.mainText}>
            ट्रेंडिंग अपडेट तेजी से प्राप्त करें 1
          </Text>
        )}
        {slide === 2 && (
          <Text style={styles.mainText}>
            ट्रेंडिंग अपडेट तेजी से प्राप्त करें 2 ट्रेंडिंग अपडेट तेजी से
            प्राप्त करें 2
          </Text>
        )}
        {slide === 3 && (
          <Text style={styles.mainText}>
            ट्रेंडिंग अपडेट तेजी से प्राप्त करें 3
          </Text>
        )}
      </View>
      <View style={styles.circleWrapper}>
        <View style={styles.circleContainer}>
          <View
            style={[
              styles.circle,
              slide === 1 && { backgroundColor: "#707070" },
            ]}
          ></View>
          <View
            style={[
              styles.circle,
              slide === 2 && { backgroundColor: "#707070" },
            ]}
          ></View>
          <View
            style={[
              styles.circle,
              slide === 3 && { backgroundColor: "#707070" },
            ]}
          ></View>
        </View>
      </View>
      <View style={styles.bottomNav}>
        {slide > 1 && (
          <TouchableOpacity
            onPress={handlePrevButton}
            style={styles.prevButton}
          >
            <Text style={styles.prevText}>PREV</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={handleNextButton} style={styles.nextButton}>
          <Text style={styles.prevText}>NEXT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "rgba(102 ,0, 0 , 0.59)",
  },
  nav: {
    height: "5%",
    width: "100%",
    marginTop: 26,
    paddingRight: 23,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  skipButton: {
    width: 62,
    height: 30,
    marginTop: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "white",
    borderRadius: 10,
  },
  skipText: {
    letterSpacing: 2,
    color: "white",
    fontWeight: "bold",
  },
  mainContent: {
    height: 512,
    marginTop: 20,
    marginBottom: 57,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(102 ,0, 0 , 0.39)",
  },
  mainText: {
    flexDirection: "row",
    fontSize: 25,
    color: "white",
    alignSelf: "center",
    textAlign: "center",
  },
  circleWrapper: {
    width: "100%",
    alignItems: "center",
  },
  circleContainer: {
    width: 90,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 27,
  },
  circle: {
    height: 16,
    width: 16,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#707070",
    backgroundColor: "white",
  },
  bottomNav: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
    position: "relative",
  },
  prevButton: {
    position: "absolute",
    left: 38,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "white",
    borderRadius: 10,
    width: 69,
    height: 30,
  },
  nextButton: {
    position: "absolute",
    right: 38,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "white",
    borderRadius: 10,
    width: 69,
    height: 30,
  },
  prevText: {
    letterSpacing: 2,
    color: "white",
    fontWeight: "bold",
  },
});

export default Screen2;
