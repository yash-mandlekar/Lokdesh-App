import { useEffect, useRef, useState } from "react";
import BottomNavBar from "../components/BottomNavBar";
import SingleReel from "../components/SingleReel";
import { View, StyleSheet, ActivityIndicator, Dimensions } from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import Axios from "../components/Axios";

const Videos = ({ refToken, accessToken }) => {
  const [videoData, setVideoData] = useState([]);
  const [load, setLoad] = useState(true);
  const [mute, setMute] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleChangeIndexValue = ({ index }) => {
    setCurrentIndex(index);
  };
  useEffect(() => {
    getShorts();
  }, []);
  const getShorts = async () => {
    try {
      setLoad(true);
      const response = await Axios.get("/all/shorts");
      setVideoData(response.data);
    } catch (error) {
      console.log(error);
    }
    setLoad(false);
  };
  return (
    <View style={styles.container}>
      {load ? (
        <View
          style={{
            height: windowHeight,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator
            size="large"
            color="black"
            // style={{ position: "absolute", top: windowHeight / 2 }}
          />
        </View>
      ) : (
        <View
          style={{
            height: Dimensions.get("window").height,
          }}
        >
          <SwiperFlatList
            vertical={true}
            onChangeIndex={handleChangeIndexValue}
            data={videoData}
            renderItem={({ item, index }) => (
              <SingleReel
                item={item}
                index={index}
                currentIndex={currentIndex}
                refToken={refToken}
                accessToken={accessToken}
                getShorts={getShorts}
                mute={mute}
                setMute={setMute}
              />
            )}
            keyExtractor={(item, index) => index}
          />
        </View>
      )}
      <BottomNavBar />
    </View>
  );
};
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});

export default Videos;
