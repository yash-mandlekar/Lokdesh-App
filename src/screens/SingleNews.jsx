import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import Ionic from "react-native-vector-icons/Ionicons";
import TopNavBar from "../components/TopNavBar";
import BottomNavBar from "../components/BottomNavBar";
import { useNavigation } from "@react-navigation/native";
import { WebView } from "react-native-webview";
import * as Speech from "expo-speech";
const SingleNews = ({ singleNews }) => {
  const navigation = useNavigation();
  const [speech, setSpeech] = useState(false);

  const speak = async (e) => {
    setSpeech(true);
    // normal rate is 0.8
    Speech.speak(e, { rate: 0.8 });
  };
  const stopSpeak = async (e) => {
    setSpeech(false);
    Speech.stop();
  };
  return (
    <>
      <TopNavBar />
      <TouchableOpacity
        style={styles.singleNewsBack}
        onPress={() => navigation.goBack()}
      >
        <Ionic name="arrow-back-outline" size={30} color="black" />
        <Text
          style={{
            color: "black",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          BACK
        </Text>
      </TouchableOpacity>
      <ScrollView style={styles.singleNews}>
        <View style={styles.singleNewsContainer}>
          <Text style={styles.singleNewsTitle}>{singleNews.metaTitle}</Text>
          <Image
            style={styles.singleNewsImage}
            source={{ uri: `data:image/jpeg;base64,${singleNews.file}` }}
          />
          <Text style={styles.singleNewsContent}>
            {singleNews.metaDescription}
          </Text>
          {/* <WebView
            style={styles.webView}
            originWhitelist={["*"]}
            source={{ html: singleNews.description }}
          /> */}
          <Text style={styles.singleNewsContent}>
            {singleNews.shortDescription}
          </Text>
          {speech ? (
            <TouchableOpacity style={styles.SpeakBtn} onPress={stopSpeak}>
              <Ionic name="volume-high-outline" size={30} color="blue" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.SpeakBtn}
              onPress={() =>
                speak(
                  singleNews.metaTitle +
                    singleNews.metaDescription +
                    singleNews.shortDescription
                )
              }
            >
              <Ionic name="volume-high-outline" size={30} color="black" />
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
      <BottomNavBar />
    </>
  );
};

export default SingleNews;

const styles = StyleSheet.create({
  singleNews: {
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 5,
    marginHorizontal: 5,
    marginBottom: 70,
  },
  // singleNewsContainer: {
  //   backgroundColor: "white",
  //   borderRadius: 5,
  //   marginHorizontal: 5,
  //   marginBottom: 70,
  // },
  singleNewsBack: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  singleNewsImage: {
    width: "100%",
    height: 220,
    resizeMode: "contain",
  },
  singleNewsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 10,
    textAlign: "justify",
  },
  singleNewsContent: {
    fontSize: 15,
    marginHorizontal: 10,
    marginVertical: 10,
    textAlign: "justify",
  },
  webView: {
    height: 100,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 5,
    zoom: 0.5,
  },
  SpeakBtn: {
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 50,
    padding: 10,
    alignSelf: "flex-end",
    marginHorizontal: 10,
  },
});
