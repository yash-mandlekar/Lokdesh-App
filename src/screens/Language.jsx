import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import TopNavBar from "../components/TopNavBar";
import BottomNavBar from "../components/BottomNavBar";
import AsyncStore from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

var boxTextColor = "#FF0000";

const Language = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(0);
  const [Languages, setLanguages] = useState([
    { lang1: "हिन्दी", lang2: "HINDI", code: "hi" },
    { lang1: "ENGLISH", code: "en" },
    { lang1: "मराठी", lang2: "MARATHI", code: "mr" },
    { lang1: "தமிழ்", lang2: "TAMIL", code: "ta" },
    { lang1: "ગુજરાતી", lang2: "GUJRATI", code: "gu" },
    { lang1: "తెలుగు", lang2: "TELUGU", code: "te" },
    { lang1: "भोजपुरी", lang2: "BHOJPURI", code: "bh" },
    { lang1: "ଓଡିଆ", lang2: "ODIA", code: "or" },
    { lang1: "اردو", lang2: "URDU", code: "ur" },
    { lang1: "ਪੰਜਾਬੀ", lang2: "PUNJABI", code: "pa" },
  ]);
  const handleLanguage = async (lang, i) => {
    await AsyncStore.setItem("language", JSON.stringify(lang));
    setSelected(i);
  };
  const handleNavigation = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
  };
  const getLanguage = async () => {
    const lang = await AsyncStore.getItem("language");
    if (lang) {
      const langObj = JSON.parse(lang);
      const index = Languages.findIndex((item) => item.code === langObj.code);
      setSelected(index);
    }
  };
  useEffect(() => {
    getLanguage();
  }, []);
  return (
    <View style={styles.container}>
      <TopNavBar />
      <View style={styles.mainContainer}>
        <Text style={styles.langText}>भाषा का चयन करें </Text>
        <View style={styles.boxContainer}>
          {Languages.map((language, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleLanguage(language, index)}
              style={[
                styles.box,
                index === selected && {
                  backgroundColor: "rgb(152 ,0, 0)",
                },
              ]}
            >
              {language.lang1 && (
                <Text
                  style={[
                    styles.boxText,
                    index === selected && { color: "white" },
                  ]}
                >
                  {language.lang1}
                </Text>
              )}
              {language.lang2 && (
                <Text
                  style={[
                    styles.boxText,
                    index === selected && { color: "white" },
                  ]}
                >
                  {language.lang2}
                </Text>
              )}
            </TouchableOpacity>
          ))}
          {/* Save Changes Button */}
          <TouchableOpacity style={styles.saveBtn} onPress={handleNavigation}>
            <Text style={styles.saveBtnText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </View>
      <BottomNavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  mainContainer: {
    marginTop: 3,
    minHeight: "65%",
    paddingHorizontal: 20,
  },
  boxContainer: {
    height: "70%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-around",
  },
  box: {
    width: 142,
    height: 65,
    borderWidth: 1,
    borderColor: boxTextColor,
    margin: 8,
    color: boxTextColor,
    alignItems: "center",
    justifyContent: "center",
  },
  boxText: {
    color: boxTextColor,
    fontWeight: "bold",
    margin: 4,
  },
  saveBtn: {
    width: "96%",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    margin: 8,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    backgroundColor: "#dadada",
  },
  saveBtnText: {
    fontWeight: "bold",
    margin: 4,
  },
  langText: {
    fontSize: 30,
    fontWeight: "bold",
    margin: 4,
    textAlign: "center",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
});

export default Language;
