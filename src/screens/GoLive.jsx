import { Image, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import TopNavBar from "../components/TopNavBar";
import BottomNavBar from "../components/BottomNavBar";
import { WebView } from "react-native-webview";
import { Camera, CameraType } from "expo-camera";

const Epaper = () => {
  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const Microphone = await Camera.requestMicrophonePermissionsAsync();
      // setHasCameraPermission(cameraPermission.status === "granted");
      // setHasMicrophonePermission(Microphone.status === "granted");
    })();
  }, []);
  setTimeout(() => {
    setload(false);
  }, 40000);
  const [load, setload] = useState(true);

  return (
    <View style={styles.container}>
      {/* <Text>Epaper</Text> */}
      {/* Main Head For News */}
      {/* <View style={styles.mainHead}>
        <Text style={styles.mainHeadText}>E-Paper</Text>
      </View> */}
      {/* Main Body  For News */}
      <View style={styles.mainBody}>
        <TopNavBar />
        {load ? (
          <Image
            style={styles.loader}
            source={{
              uri: "https://flevix.com/wp-content/uploads/2019/07/Curve-Loading.gif",
            }}
          />
        ) : (
          <WebView
            style={styles.web}
            source={{ uri: "https://livestreammm.herokuapp.com/" }}
          />
        )}
        <BottomNavBar />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#fff",
    justifyContent: "flex-start",
  },
  mainHead: {
    height: "10%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mainHeadText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  mainBody: {
    height: "100%",
    backgroundColor: "#fff",
    textAlign: "justify",
  },
  mainBodyText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  web: {
    flex: 0.912,
  },
  loader: {
    flex: 1,
  },
});

export default Epaper;
