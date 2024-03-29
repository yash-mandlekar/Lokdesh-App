import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
} from "react-native";
import CheckBox from "expo-checkbox";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import citiesjson from "../cities.json";
import Axios from "../components/Axios";
import AsyncStore from "@react-native-async-storage/async-storage";

const Screen3 = ({ refToken }) => {
  const navigation = useNavigation();
  const [slide, setslide] = useState(1);
  const [load, setLoad] = useState(true);
  const [inp, setInp] = useState("");
  const [selected, setSelected] = useState(1);
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
  const [options, setOptions] = useState([]);
  const [cities, setCities] = useState([]);
  const [checkBox, setCheckBox] = useState([
    { id: 0, city: "Bhopal", selected: true },
    { id: 1, city: "Indore", selected: true },
    { id: 2, city: "Jabalpur", selected: false },
    { id: 3, city: "Gwalior", selected: false },
  ]);
  const handleSlide = () => {
    slide > 3 ? navigation.navigate("Screen4") : setslide(slide + 1);
  };
  const handleCheckBox = (i) => {
    const cpy = [...checkBox];
    cpy[i].selected = !checkBox[i].selected;
    if (checkBox.indexOf(cpy) === -1) {
      setCheckBox(cpy);
    }
  };
  const handleSetCheckBox = (i) => {
    const cpy = citiesjson.filter(function (data) {
      if (data.id === i) return data;
    });
    cpy[0].selected = true;
    const length = checkBox.filter(function (data) {
      if (data.id === i) return data;
    });
    if (length.length < 1) {
      setCheckBox((prev) => [...prev, cpy[0]]);
    }
    setInp("");
  };
  const handleSelectOptions = (i) => {
    const cpy = [...options];
    cpy[i].selected = !options[i].selected;
    setOptions(cpy);
  };
  const getOptions = async (lang) => {
    setLoad(true);
    const res = await Axios.get("/news-category");
    if (lang) {
      var cpy = [];
      for (var i = 0; i < res.data.length; i++) {
        const res2 = await Axios.post("/user/translate", {
          text: res.data[i].hindiName,
          target: lang.code,
        });
        cpy.push({
          ...res.data[i],
          hindiName: res2.data.translation,
        });
      }
      setOptions(cpy);
    } else {
      setOptions(res.data);
    }
    setLoad(false);
  };
  const handleLanguage = async (lang, i) => {
    await AsyncStore.setItem("language", JSON.stringify(lang));
    setSelected(i);
    getOptions(lang);
  };
  useEffect(() => {
    getOptions();
  }, []);
  useEffect(() => {
    if (refToken) {
      navigation.navigate("Home");
    }
  });
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setslide(slide - 1)}
        style={styles.topNav}
      >
        <Text style={[styles.topText, slide > 1 && { fontSize: 20 }]}>
          {slide === 1 ? "भाषा का चयन करें" : "अपना पसंदीदा विषय चुनें"}
        </Text>
      </TouchableOpacity>
      <View
        style={[
          styles.mainContainer,
          { minHeight: slide > 2 ? "100%" : "70%" },
        ]}
      >
        {slide == 3 && (
          <LinearGradient
            colors={["grey", "white"]}
            style={styles.gradientBox}
          />
        )}
        {slide == 1 && (
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
          </View>
        )}
        {slide == 2 && (
          <View style={styles.boxContainer}>
            {load ? (
              <ActivityIndicator size="large" color="red" />
            ) : (
              <>
                {options.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.optionbtn}
                    onPress={() => handleSelectOptions(index)}
                  >
                    <View style={styles.optionCircle}>
                      <Image
                        source={{
                          uri: `data:image/jpeg;base64,${option.icon}`,
                        }}
                        style={[
                          styles.optionIcon,
                          option.selected && styles.optionSelected,
                        ]}
                        resizeMode="contain"
                      />
                    </View>
                    <Text
                      style={[
                        styles.options,
                        option.selected && { color: "blue" },
                      ]}
                    >
                      {option.hindiName}
                    </Text>
                  </TouchableOpacity>
                ))}
              </>
            )}
          </View>
        )}
        {slide === 3 && (
          <View style={styles.boxContainer}>
            <Text style={[styles.slide3Text, { marginTop: "50%" }]}>
              अपने स्थानीय क्षेत्र की खबर देखना चाहते है? हमें आपकी लोकेशन पता
              करने दे|
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Screen4")}
              style={styles.btn1}
            >
              <Text style={styles.btn1text}>ठीक है</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setslide(4)} style={styles.btn1}>
              <Text style={styles.btn1text}>क्षेत्र का चयन खुद करे</Text>
            </TouchableOpacity>
          </View>
        )}
        {slide === 4 && (
          <View style={[styles.boxContainer, { paddingTop: "10%" }]}>
            <TextInput
              style={styles.input}
              onChangeText={(e) => {
                setInp(e);
                setCities(
                  citiesjson.filter(function (data) {
                    return data.city.toLowerCase().includes(inp.toLowerCase());
                  })
                );
              }}
              defaultValue={inp}
              placeholder="स्थान खोजें"
            />
            {inp.length > 0 && (
              <View style={styles.searchBox}>
                {cities
                  .map((city, i) => (
                    <TouchableOpacity
                      key={i}
                      onPress={() => handleSetCheckBox(city.id)}
                      style={styles.searchBtn}
                    >
                      <Text style={styles.searchText}>{city.city}</Text>
                    </TouchableOpacity>
                  ))
                  .splice(0, 15)}
              </View>
            )}
            <View style={styles.cities}>
              <View style={styles.selectedCities}>
                {checkBox.map(
                  (citydata, index) =>
                    citydata.selected && (
                      <View key={citydata.id} style={styles.city}>
                        <CheckBox
                          value={citydata.selected}
                          onValueChange={() => handleCheckBox(index)}
                          style={styles.checkbox}
                        />
                        <Text style={styles.cityText}>{citydata.city}</Text>
                      </View>
                    )
                )}
              </View>
              <View style={styles.line}></View>
              <View style={styles.selectedCities}>
                {checkBox.map(
                  (citydata, index) =>
                    !citydata.selected && (
                      <View key={citydata.id} style={styles.city}>
                        <CheckBox
                          value={citydata.value}
                          onValueChange={() => handleCheckBox(index)}
                          style={styles.checkbox}
                        />
                        <Text style={styles.cityText}>{citydata.city}</Text>
                      </View>
                    )
                )}
              </View>
            </View>
            <TouchableOpacity onPress={handleSlide} style={styles.btn1}>
              <Text style={styles.btn1text}>ठीक है</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {slide < 3 && (
        <TouchableOpacity onPress={handleSlide} style={styles.BottomNav}>
          <Text style={styles.BottomText}>अगला</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  topNav: {
    height: 88,
    backgroundColor: "rgb(152 ,0, 0)",
    alignItems: "center",
    justifyContent: "center",
  },
  BottomNav: {
    width: "100%",
    height: 62,
    marginTop: -25,
    backgroundColor: "rgb(152 ,0, 0)",
    alignItems: "center",
    justifyContent: "center",
  },
  BottomText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  topText: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
  },
  mainContainer: {
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  boxContainer: {
    height: "50%",
    flexDirection: "row",
    flex: 1,
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-around",
  },
  box: {
    width: 142,
    height: 65,
    borderWidth: 1,
    borderColor: "#FF0000",
    margin: 8,
    color: "#FF0000",
    alignItems: "center",
    justifyContent: "center",
  },
  boxText: {
    color: "#FF0000",
    fontWeight: "bold",
    margin: 4,
  },
  optionbtn: {
    height: 100,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  optionCircle: {
    height: 59,
    width: 59,
    backgroundColor: "red",
    borderRadius: 50,
  },
  optionIcon: {
    height: 59,
    width: 59,
    alignItems: "center",
    justifyContent: "center",
  },
  optionSelected: {
    borderColor: "blue",
    borderWidth: 2,
    borderRadius: 50,
  },
  options: {
    fontSize: 16,
    color: "#707070",
    padding: 4,
    paddingHorizontal: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
  gradientBox: {
    position: "absolute",
    height: "90%",
    top: 0,
    width: 416,
    zIndex: -1,
  },
  slide3Text: {
    width: 300,
    fontSize: 22,
    color: "black",
    textAlign: "center",
  },
  btn1: {
    width: "100%",
    height: 48,
    marginTop: 20,
    backgroundColor: "rgb(152 ,0, 0)",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  btn1text: {
    color: "white",
    fontSize: 24,
  },
  input: {
    width: "100%",
    height: 45,
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 14,
    borderColor: "#707070",
    color: "#707070",
    fontSize: 18,
    selected: "white",
    fontWeight: "semibold",
  },
  searchBox: {
    position: "absolute",
    minHeight: 0,
    maxHeight: 300,
    width: "100%",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#707070",
    borderRadius: 10,
    top: 45,
    zIndex: 2,
  },
  searchBtn: {
    width: "100%",
    height: 30,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#707070",
  },
  searchText: {
    marginHorizontal: 10,
    fontSize: 18,
    color: "#707070",
  },
  cities: {
    width: "100%",
    height: 300,
    marginTop: 25,
    padding: 2,
  },
  city: {
    height: 24,
    minWidth: 90,
    borderWidth: 1,
    borderColor: "#707070",
    borderRadius: 3,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 3,
    marginHorizontal: 3,
    marginBottom: 4,
  },
  checkbox: {
    marginLeft: 3,
    transform: [{ scale: 0.8 }],
  },
  cityText: {
    fontSize: 14,
    color: "#707070",
    marginLeft: 5,
  },
  line: {
    width: 376,
    height: 1,
    backgroundColor: "#707070",
    marginVertical: 10,
  },
  selectedCities: {
    flexDirection: "row",
    flexWrap: "wrap",
    overflow: "scroll",
  },
});

export default Screen3;
