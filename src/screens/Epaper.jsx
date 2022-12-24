import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import React from "react";
import TopNavBar from "../components/TopNavBar";
import BottomNavBar from "../components/BottomNavBar";
import { useNavigation } from "@react-navigation/native";

const EPaper = ({ setSingleNews }) => {
  const navigation = useNavigation();
  const SingleEPaper = (city) => {
    navigation.navigate("SingleEpaper");
    setSingleNews(city);
  };
  return (
    <View style={styles.container}>
      <TopNavBar />
      <ScrollView style={styles.EpaperCnt}>
        <Text style={styles.EpaperTitle}>प्रिय पाठक,</Text>
        <Text style={styles.EpaperSubTitle}>
          हर हाल में साथ देने के लिए लोकदेश समूह आपका आभारी है।
        </Text>
        <Text style={styles.EpaperSubTitle}>
          आप सभी को बहुत-बहुत धन्यवाद। तथ्यात्मक और विश्वसनीय ख़बरें आपके लिए
          बेहद जरूरी हैं।
        </Text>
        <Text style={styles.EpaperSubTitle}>
          लोकदेश से अपने रिश्ते को और मजबूत करें! आपके अनुभवों को और बेहतर बनाने
          के लिए हम लाए हैं लोकदेश ई-पेपर योजना।
        </Text>
        <TouchableOpacity
          onPress={() => SingleEPaper("Bhopal")}
          style={styles.Epaper}
        >
          <Image
            style={styles.EpapersImg}
            source={{
              uri: "https://www.lokdesh.com/images/epaper/b66b21b71d23d39790694a700cdeb306.jpg",
            }}
          />
          <Text style={[styles.EpaperSubTitle, { fontWeight: "bold" }]}>
            Bhopal
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => SingleEPaper("Gwalior")}
          style={styles.Epaper}
        >
          <Image
            style={styles.EpapersImg}
            source={{
              uri: "https://www.lokdesh.com/images/epaper/b66b21b71d23d39790694a700cdeb306.jpg",
            }}
          />
          <Text
            style={[
              styles.EpaperSubTitle,
              { fontWeight: "bold", marginBottom: 30 },
            ]}
          >
            Gwalior
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => SingleEPaper("Raipur")}
          style={styles.Epaper}
        >
          <Image
            style={styles.EpapersImg}
            source={{
              uri: "https://www.lokdesh.com/images/epaper/b66b21b71d23d39790694a700cdeb306.jpg",
            }}
          />
          <Text
            style={[
              styles.EpaperSubTitle,
              { fontWeight: "bold", marginBottom: 30 },
            ]}
          >
            Raipur
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <BottomNavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#fff",
    justifyContent: "flex-start",
  },
  EpaperCnt: {
    padding: 6,
    backgroundColor: "#f2f2f2",
  },
  EpaperTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 8,
  },
  EpaperSubTitle: {
    fontSize: 15,
    color: "#000",
    textAlign: "center",
    marginBottom: 5,
  },
  Epaper: {
    marginTop: 20,
    marginBottom: 20,
  },
  EpapersImg: {
    height: 400,
    width: "100%",
    resizeMode: "contain",
    borderRadius: 10,
  },
});

export default EPaper;
