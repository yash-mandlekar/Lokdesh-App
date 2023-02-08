import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  Share,
  StyleSheet,
} from "react-native";
import { Video } from "expo-av";
import Ionic from "react-native-vector-icons/Ionicons";
import Axios from "./Axios";
const SingleReel = ({
  item,
  index,
  currentIndex,
  refToken,
  accessToken,
  getShorts,
  mute,
  setMute,
}) => {
  const videoRef = useRef(null);
  const PlaybuttonRef = useRef(null);
  const [status, setStatus] = useState({});
  const [Likes, setLikes] = useState(item.likes);
  const [Like, setLike] = useState();
  const [count, setcount] = useState(0);
  const [User, setUser] = useState({});

  useEffect(() => {
    if (index === currentIndex) {
      videoRef.current.playAsync();
    } else {
      videoRef.current.pauseAsync();
    }
    PlaybuttonRef.current.setNativeProps({
      style: {
        padding: 0,
        height: 0,
      },
    });
  }, [currentIndex]);

  useEffect(() => {
    getUser();
  }, []);
  const onBuffer = (buffer) => {
    console.log("buffring", buffer);
  };
  const getUser = async () => {
    try {
      const res = await Axios.post("/user/refreshtoken", {
        token: refToken,
      });
      setUser(res.data.user);
      setLike(Likes?.includes(res.data.user?._id));
    } catch (err) {
      console.log(err);
    }
  };
  const onError = (error) => {
    console.log("error", error);
  };
  const handlePlay = () => {
    status.isPlaying
      ? videoRef.current.pauseAsync()
      : videoRef.current.playAsync();

    // on double click like feature
    if (count === 1) {
      setLike(!like);
    }
    setcount(count + 1);
    setTimeout(() => {
      setcount(0);
    }, 300);

    if (status.isPlaying) {
      PlaybuttonRef.current.setNativeProps({
        style: {
          padding: 15,
          height: 55,
        },
      });
    } else {
      PlaybuttonRef.current.setNativeProps({
        style: {
          padding: 0,
          height: 0,
        },
      });
    }
  };
  const handleShare = async () => {
    try {
      await Share.share({
        message: "http://lokdeshtv.com/singleVideo/" + item._id,
      });
    } catch (error) {
      alert(error.message);
    }
  };
  const handleLike = async () => {
    try {
      const config = {
        headers: {
          token: accessToken,
        },
      };
      const res = await Axios.get(`/user/shorts/like/${item._id}`, config);
      setLikes(res.data.short.likes);
      setLike(!Like);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={handlePlay}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
        }}
      >
        <Video
          ref={videoRef}
          onBuffer={onBuffer}
          onError={onError}
          repeat={true}
          resizeMode="cover"
          source={{
            // uri: item.file,
            uri: `data:video/mp3;base64,${item.file}`,
          }}
          isMuted={mute}
          style={{
            width: "100%",
            minHeight: "10%",
            height: "100%",
            position: "absolute",
          }}
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
      </TouchableOpacity>
      {/* Play Pause Button */}
      <TouchableOpacity
        ref={PlaybuttonRef}
        onPress={handlePlay}
        style={{
          padding: 15,
          height: 55,
          backgroundColor: "rgba(0,0,0,0.3)",
          borderRadius: 50,
        }}
      >
        <Ionic
          name={status.isPlaying ? "pause" : "play"}
          style={styles.btnIcon}
        />
      </TouchableOpacity>
      {/* bottom buttons */}
      <View
        style={{
          position: "absolute",
          // width: windowWidth,
          flexDirection: "column",
          right: 0,
          bottom: 40,
          zIndex: 1,
          alignItems: "flex-end",
          padding: 10,
          paddingTop: 0,
          // backgroundColor: 'rgba(52,52,52,0.6)',
        }}
      >
        {/* Like ,Comment and Share Button */}
        {/* Like */}
        <TouchableOpacity onPress={handleLike} style={styles.btn}>
          <Ionic
            name="heart"
            // style={[styles.btnIcon, { color: like ? "red" : "white" }]}
            style={[styles.btnIcon, { color: Like ? "red" : "white" }]}
          />
          <Text style={styles.btnText}>{Likes.length}</Text>
        </TouchableOpacity>
        {/* comment */}
        <TouchableOpacity onPress={() => alert("comment")} style={styles.btn}>
          <Ionic name="chatbubble-ellipses-outline" style={styles.btnIcon} />
          <Text style={styles.btnText}>{item.comments.length}</Text>
        </TouchableOpacity>
        {/* share button */}
        <TouchableOpacity style={styles.btn} onPress={handleShare}>
          <Ionic name="share-social-outline" style={styles.btnIcon} />
        </TouchableOpacity>
      </View>
      {/* User Profile */}
      <TouchableOpacity
        style={{
          position: "absolute",
          width: windowWidth,
          zIndex: 1,
          bottom: 0, //edited
          padding: 10,
          height: 50,
          backgroundColor: "rgba(0,0,0,0.3)",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        {/* user profile */}
        <Image
          source={{
            uri: "https://images.pexels.com/photos/8105037/pexels-photo-8105037.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          }}
          style={{
            width: 33,
            height: 33,
            borderRadius: 20,
          }}
        />
        <Text
          style={{
            fontSize: 14,
            marginHorizontal: 10,
            paddingRight: 10,
            color: "#fff",
          }}
        >
          {item.title}
        </Text>
        {/* Sound Button */}
        <TouchableOpacity
          onPress={() => setMute(!mute)}
          style={{
            position: "absolute",
            width: windowWidth,
            top: 0,
            right: 0,
          }}
        >
          <Ionic
            name={mute ? "volume-mute" : "volume-high"}
            style={{
              color: "white",
              fontSize: 20,
              position: "absolute",
              right: 15,
              padding: 10,
              // backgroundColor: "red",
            }}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export default SingleReel;
const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    padding: 10,
    alignItems: "center",
  },
  btnIcon: {
    color: "white",
    fontSize: 25,
  },
  btnText: {
    color: "white",
  },
});
