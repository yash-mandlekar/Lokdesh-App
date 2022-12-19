import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Text,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import TopNavBar from "../components/TopNavBar";
import BottomNavBar from "../components/BottomNavBar";
import Axios from "../components/Axios";
const SingleEPaper = ({ singleNews }) => {
  const [Epapers, setEpapers] = useState([]);
  const [Loader, setLoader] = useState(true);
  const getEpapers = async () => {
    setLoader(true);
    const res = await Axios.get("/ePaper/city/" + singleNews);
    setEpapers(res.data);
    setLoader(false);
  };
  useEffect(() => {
    getEpapers();
  }, []);
  return (
    <View style={styles.container}>
      <TopNavBar />
      <ScrollView style={styles.EpaperCnt}>
        <Text style={styles.EpaperTitle}>{singleNews}</Text>
        {Loader ? (
          <ActivityIndicator size="large" color="#000" />
        ) : (
          Epapers.map((item, i) => (
            <View style={styles.Epaper} key={i}>
              {/* pinch to Zoom Image */}
              <Image
                style={styles.EpapersImg}
                source={{
                  uri: `data:image/jpeg;base64,${item.image}`,
                }}
              />
              <Text style={[styles.EpaperSubTitle, { fontWeight: "bold" }]}>
                Page No. {item?.pageNo}
              </Text>
            </View>
          ))
        )}
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
    padding: 15,
    marginBottom: 60,
    backgroundColor: "#f2f2f2",
  },
  EpaperTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 10,
  },
  EpaperSubTitle: {
    fontSize: 18,
    color: "#000",
    textAlign: "center",
    marginBottom: 5,
  },
  Epaper: {
    marginTop: 20,
    marginBottom: 20,
  },
  EpapersImg: {
    height: 550,
    resizeMode: "contain",
    borderRadius: 10,
  },
});

export default SingleEPaper;
