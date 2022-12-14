import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import TopNavBar from "../components/TopNavBar";
import BottomNavBar from "../components/BottomNavBar";

const GoLive = () => {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState();
  const [recording, setrecording] = useState(false);
  const [cameratype, setcameratype] = useState(CameraType.back);
  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const Microphone = await Camera.requestMicrophonePermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMicrophonePermission(Microphone.status === "granted");
    })();
  }, []);
  const startVideo = async () => {
    setrecording(true);
    // start streaming
    // let video = await cameraRef.current.recordAsync();
    // console.log("video", video);
  };
  const stopVideo = async () => {
    setrecording(false);
    await cameraRef.current.stopRecording();
  };

  const switchCamera = () => {
    if (cameratype === "front") {
      setcameratype(CameraType.back);
    }
    if (cameratype === "back") {
      setcameratype(CameraType.front);
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <TopNavBar />
      </View>
      {/* live Streams */}
      <Camera
        style={styles.camera}
        ref={cameraRef}
        type={cameratype}
        ratio="16:9"
      >
        <View style={styles.buttonContainer}>
          <View style={styles.topButtons}>
            {/* Live Button */}
            <Image
              style={styles.liveButtonImage}
              source={{
                uri:
                  recording &&
                  "https://media2.giphy.com/media/cHFFF4Ry7366n8kPuv/200w.gif?cid=82a1493bi5koxp7k9d0l2xoe5hab06pyoe2gn8o5w5zym5x8&rid=200w.gif&ct=s",
              }}
            />
          </View>
          <View style={styles.bottomButtons}>
            <TouchableOpacity></TouchableOpacity>
            <TouchableOpacity
              style={styles.switchCamera}
              title="Take Pic"
              onPress={switchCamera}
            >
              <Image
                source={{
                  uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Eo_circle_grey_arrow-rotate.svg/2048px-Eo_circle_grey_arrow-rotate.svg.png",
                }}
                style={styles.HeadRightImage}
              />
            </TouchableOpacity>
            {recording ? (
              <TouchableOpacity
                style={styles.stopbutton}
                title="Take Pic"
                onPress={stopVideo}
              >
                <View style={styles.box}></View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.startbutton}
                title="Take Pic"
                onPress={startVideo}
              />
            )}
          </View>
        </View>
      </Camera>
      <BottomNavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "flex-start",
  },
  liveButton: {
    height: "100%",
    width: "100%",
  },
  topButtons: {
    height: "12%",
    width: "105%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    // backgroundColor: "red",
  },
  liveButtonImage: {
    height: 120,
    width: 120,
    alignSelf: "flex-end",
  },
  liveStreams: {
    height: "100%",
    width: "100%",
  },
  liveStream: {
    height: 100,
    width: 100,
  },
  liveStreamImage: {
    height: 100,
    width: 100,
  },
  buttonContainer: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    // alignItems: "center",
    paddingBottom: 70,
  },
  preview: {
    alignSelf: "stretch",
    flex: 1,
  },
  bottomButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    // backgroundColor: "red",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  startbutton: {
    padding: 15,
    borderColor: "white",
    borderWidth: 21,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
  },
  stopbutton: {
    padding: 22,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width: 25,
    height: 25,
    backgroundColor: "red",
    borderRadius: 3,
  },
  liveStreams: {
    height: "90%",
    width: "90%",
  },
  camera: {
    flex: 1,
    width: Dimensions.get("window").width,
  },
  discardButton: {
    position: "absolute",
    top: 0,
    right: 5,
    padding: 12,
    borderRadius: 5,
  },
  discardButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  switchCamera: {
    height: 45,
    width: 45,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 100,
  },
  HeadRightImage: {
    width: 45,
    height: 45,
    color: "white",
  },
  HeadRightImagegif: {
    width: 19,
    height: 19,
  },
});

export default GoLive;
