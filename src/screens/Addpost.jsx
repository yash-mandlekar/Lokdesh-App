import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import TopNavBar from "../components/TopNavBar";
import BottomNavBar from "../components/BottomNavBar";
import Axios from "../components/Axios";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

const Addpost = ({ refToken, accessToken, User, setUser }) => {
  const navigation = useNavigation();
  const [load, setload] = useState(false);
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const getUser = async () => {
    setload(true);
    const config = {
      headers: {
        token: accessToken,
      },
    };
    try {
      const res = await Axios.post("/user/refreshtoken", {
        token: refToken,
      });
      setload(false);
      setUser(res.data.user);
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = async () => {
    const config = {
      headers: {
        token: accessToken,
        "Content-Type": "multipart/form-data",
      },
    };
    if (!image) return alert("Please select an image");
    const filename = image.split("/").pop();
    const match = /\.(\w+)$/.exec(filename);
    const ext = match?.[1];
    const type = match ? `image/${match[1]}` : `image`;
    const formData = new FormData();
    formData.append("file", {
      image,
      name: `image.${ext}`,
      type,
    });
    formData.append("caption", caption);
    formData.append("location", location);
    try {
      const { data } = await Axios.post("/user/post", formData, config);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result) return;
    setImage(result.uri);
  };
  const handleBack = () => {
    navigation.navigate("Profile");
  };
  useEffect(() => {
    getUser();
  }, [image]);
  return (
    <View style={styles.container}>
      <TopNavBar />
      {load ? (
        <Image
          style={styles.loader}
          source={{
            uri: "https://flevix.com/wp-content/uploads/2019/07/Curve-Loading.gif",
          }}
        />
      ) : (
        <View style={styles.androidHeader}>
          <View>
            {/* ------------------------------PROFILE + INFO---------------------- */}
            <TouchableOpacity
              onPress={pickImage}
              transparent
              style={{
                marginTop: 20,
                backgroundColor: !image && "#c9c9c9",
                borderRadius: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {image ? (
                  <Image source={{ uri: image }} style={styles.image} />
                ) : (
                  <View style={[styles.image, { height: 100 }]}>
                    <Text
                      style={{
                        textAlign: "center",
                        color: "black",
                        fontWeight: "bold",
                        fontSize: 95,
                      }}
                    >
                      +
                    </Text>
                  </View>
                )}
              </View>
              <View>
                <Text
                  style={{
                    textAlign: "center",
                    color: "blue",
                    fontWeight: "bold",
                    fontSize: 15,
                  }}
                >
                  Upload a Post
                </Text>
              </View>
            </TouchableOpacity>
            {/* ------------------------------ EDIT PROFILE ---------------------- */}
            <View
              style={{
                flexDirection: "row",
                marginVertical: 10,
                paddingHorizontal: 20,
              }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "flex-start",
                  justifyContent: "center",
                }}
              >
                <Text style={styles.label}>Caption</Text>
                <TextInput
                  style={styles.input}
                  value={caption}
                  onChangeText={(text) => setCaption(text)}
                />
                <Text style={styles.label}>Location</Text>
                <TextInput
                  style={styles.input}
                  value={location}
                  onChangeText={(text) => setLocation(text)}
                />
                <TouchableOpacity
                  style={{
                    backgroundColor: "skyblue",
                    width: "100%",
                    padding: 10,
                    alignItems: "center",
                    borderRadius: 5,
                    marginTop: 10,
                  }}
                  onPress={() => {
                    handleSubmit();
                  }}
                >
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    Upload Post
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: "tomato",
                    width: "100%",
                    padding: 10,
                    alignItems: "center",
                    borderRadius: 5,
                    marginTop: 10,
                  }}
                  onPress={() => {
                    handleBack();
                  }}
                >
                  <Text style={{ color: "black", fontWeight: "bold" }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )}
      <BottomNavBar />
    </View>
  );
};

export default Addpost;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#fff",
    // alignItems: 'center',
    justifyContent: "flex-start",
    paddingTop: 20,
  },
  web: {
    flex: 0.912,
    // height: "80%",
  },
  loader: {
    flex: 0.512,
    // height: "80%",
  },
  androidHeader: {
    backgroundColor: "white",
    flex: 1,
  },
  label: {
    fontSize: 12,
    fontWeight: "bold",
    color: "grey",
  },
  input: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    fontSize: 18,
    marginBottom: 10,
  },
  image: {
    height: 330,
    width: 330,
    marginHorizontal: 10,
  },
});
