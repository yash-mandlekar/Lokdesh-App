import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Video } from "expo-av";

const HomeAds = ({ AdsVideo, AdsPhoto, title, sponsored }) => {
  return (
    <View style={styles.child}>
      {sponsored && (
        <View style={styles.sponsoredText}>
          <Text style={styles.sponsoredTextText}>Sponsored</Text>
        </View>
      )}
      {AdsVideo ? (
        <View style={styles.video}>
          <Video
            source={{ uri: AdsVideo }}
            rate={1.0}
            volume={1.0}
            isMuted={true}
            resizeMode="cover"
            shouldPlay
            isLooping
            style={styles.video}
          />
        </View>
      ) : (
        <Image source={{ uri: AdsPhoto }} style={styles.adsImage} />
      )}
    </View>
  );
};
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  child: {
    width: width,
    justifyContent: "center",
    height: "100%",
  },
  adsImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  video: {
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  sponsoredText: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 100,
    height: 30,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  sponsoredTextText: {
    fontSize: 12,
    color: "white",
    fontWeight: "bold",
  },
});
export default HomeAds;
