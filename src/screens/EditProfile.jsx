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
const EditProfile = ({ refToken, accessToken, User, setUser }) => {
  const navigation = useNavigation();
  const [load, setload] = useState(false);
  const [image, setImage] = useState(null);
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
    setload(true);
    try {
      const res = await Axios.put(
        "/user/profile",
        {
          name: User.name,
          userName: User.userName,
          email: User.email,
          bio: User.bio,
          phone: User.phone,
        },
        {
          headers: {
            token: accessToken,
          },
        }
      );
      if (res.data.status === "success") {
        setUser(res.data.user);
        navigation.navigate("Profile");
      } else {
        alert(res.data.message);
      }
      setload(false);
    } catch (err) {
      console.log(err);
    }
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const config = {
      headers: {
        token: accessToken,
        "Content-Type": "multipart/form-data",
      },
    };
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result) return;
    const uri = result.uri;
    const filename = uri.split("/").pop();
    const match = /\.(\w+)$/.exec(filename);
    const ext = match?.[1];
    const type = match ? `image/${match[1]}` : `image`;
    const formData = new FormData();
    formData.append("profileImage", {
      uri,
      name: `image.${ext}`,
      type,
    });
    setImage(result.uri);
    try {
      const res = await Axios.post("/user/profile/pic", formData, config);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
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
            <View transparent style={{ marginTop: 20 }}>
              <View
                style={{
                  flexDirection: "row",
                  marginLeft: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {image ? (
                  <Image
                    source={{ uri: image }}
                    style={{
                      height: 90,
                      width: 90,
                      borderRadius: 50,
                      marginHorizontal: 10,
                    }}
                  />
                ) : (
                  <Image
                    source={
                      User?.profileImage?.includes("/avtar")
                        ? {
                            uri: User?.profileImage,
                          }
                        : {
                            uri: `data:image/png;base64,${User?.profileImage}`,
                          }
                    }
                    style={{
                      height: 90,
                      width: 90,
                      borderRadius: 50,
                      marginHorizontal: 10,
                    }}
                  />
                )}
              </View>
              <TouchableOpacity onPress={pickImage}>
                <Text
                  style={{
                    textAlign: "center",
                    color: "blue",
                    fontWeight: "bold",
                    fontSize: 15,
                  }}
                >
                  Change profile Photo
                </Text>
              </TouchableOpacity>
            </View>
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
                <Text style={styles.label}>Name</Text>
                <TextInput
                  style={styles.input}
                  value={User.name}
                  onChangeText={(text) => setUser({ ...User, name: text })}
                />
                <Text style={styles.label}>Username</Text>
                <TextInput
                  style={styles.input}
                  value={User.userName}
                  onChangeText={(text) => setUser({ ...User, userName: text })}
                />
                <Text style={styles.label}>email</Text>
                <TextInput
                  style={styles.input}
                  value={User.email}
                  onChangeText={(text) => setUser({ ...User, email: text })}
                />
                <Text style={styles.label}>bio</Text>
                <TextInput
                  style={styles.input}
                  value={User.bio}
                  onChangeText={(text) => setUser({ ...User, bio: text })}
                />
                <Text style={styles.label}>phone</Text>
                <TextInput
                  style={styles.input}
                  value={User.phone}
                  onChangeText={(text) => setUser({ ...User, phone: text })}
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
                    Save
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

export default EditProfile;

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
});
