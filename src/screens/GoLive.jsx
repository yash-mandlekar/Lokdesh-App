import { Camera, CameraType, getPermissionsAsync } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import BottomNavBar from "../components/BottomNavBar";
import TopNavBar from "../components/TopNavBar";
import Ionic from "react-native-vector-icons/Ionicons";
// import { LiveStreamView } from "@api.video/react-native-livestream";

const GoLive = () => {
  const ref = useRef(null);
  const [live, setLive] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [type, setType] = useState(CameraType.back);  
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const handleLive = () => {
    Alert.alert(
      "Request for Go Live",
      "Your request has been sent to the admin. You will be notified once your request is approved.",
      [
        {
          text: "OK",
          onPress: () => console.log("OK Pressed"),
        },
      ]
    );
    setTimeout(() => {
      setLive(true);
    }, 6000);
  };
  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }
  useEffect(() => {
    // (async () => {
    //   const { status } = await getPermissionsAsync();
    //   if (status !== "granted") {
    //     const { status } = await requestPermission();
    //     if (status !== "granted") {
    //       Alert.alert("Permission to access camera is required!");
    //     }
    //   }
    // })();
  }, []);
  return (
    <View style={styles.container}>
      <TopNavBar />
      {!live && (
        <View style={styles.mainContainer}>
          <Text
            style={{
              textAlign: "center",
              marginTop: 16,
              paddingHorizontal: 15,
            }}
          >
            You can go live once your request is approved by the admin.
          </Text>
          <TouchableOpacity onPress={handleLive} style={styles.btn1}>
            <Text style={styles.btn1text}>Request for Go Live</Text>
          </TouchableOpacity>
          {/* live streaming */}
          <View style={{ flex: 1, alignItems: "center" }}>
            {/* <LiveStreamView
            style={{ flex: 1, backgroundColor: "black", alignSelf: "stretch" }}
            ref={ref}
            video={{
              fps: 30,
              resolution: "720p",
              camera: "front",
              orientation: "portrait",
            }}
            liveStreamKey="your-livestrem-key"
            onConnectionSuccess={() => {
              //do what you want
            }}
            onConnectionFailed={(e) => {
              //do what you want
            }}
            onDisconnect={() => {
              //do what you want
            }}
          /> */}
            <View style={{ position: "absolute", bottom: 40 }}>
              <TouchableOpacity
                style={{
                  borderRadius: 50,
                  backgroundColor: streaming ? "red" : "white",
                  width: 50,
                  height: 50,
                }}
                onPress={() => {
                  if (streaming) {
                    ref.current?.stopStreaming();
                    setStreaming(false);
                  } else {
                    ref.current?.startStreaming();
                    setStreaming(true);
                  }
                }}
              />
            </View>
          </View>
        </View>
      )}
      {live && (
        <View
          style={{
            height: 506,
          }}
        >
          <View style={styles.container}>
            <Camera style={styles.camera} type={type}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={toggleCameraType}
                >
                  <Ionic name="sync" size={34} color="white" />
                  {/* <Text style={styles.text}>Flip Camera</Text> */}
                </TouchableOpacity>
              </View>
            </Camera>
          </View>
        </View>
      )}
      <BottomNavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  mainContainer: {
    height: 506,
  },
  btn1: {
    width: "90%",
    height: 48,
    backgroundColor: "red",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    alignSelf: "center",
  },
  btn1text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    alignSelf: "flex-end",
    alignItems: "flex-end",
    justifyContent: "center",
    width: "100%",
    padding: 10,
    backgroundColor: "#00000047",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});

export default GoLive;
