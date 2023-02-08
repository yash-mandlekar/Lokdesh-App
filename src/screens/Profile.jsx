import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import TopNavBar from "../components/TopNavBar";
import BottomNavBar from "../components/BottomNavBar";
import Axios from "../components/Axios";
import { useNavigation, useRoute } from "@react-navigation/native";

const Profile = ({ refToken, accessToken, User, setUser }) => {
  var groundcolor = "black";
  const params = useRoute();
  const navigation = useNavigation();
  const [load, setload] = useState(false);
  const [posts, setposts] = useState([]); 
  const handleNavigation = (val) => {
    navigation.navigate(val);
  };
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
      const { data } = await Axios.get("/user/post", config);
      setposts(data.user.posts);
    } catch (err) {
      console.log(err);
    }
  };
  const handleSinglePost = (val) => {
    // setSinglepost(val);
    navigation.navigate("Singlepost", { id: val });
  };
  useEffect(() => {
    getUser();
  }, [params]);
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
                  justifyContent: "space-evenly",
                }}
              >
                <View style={{ flex: 4, justifyContent: "center" }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: "bold",
                          alignSelf: "center",
                          color: groundcolor,
                        }}
                      >
                        {User.posts.length}
                      </Text>
                      <Text
                        style={{
                          fontSize: 15,
                          color: "#99AAAB",
                          alignSelf: "center",
                        }}
                      >
                        Posts
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: "bold",
                          alignSelf: "center",
                          color: groundcolor,
                        }}
                      >
                        {User.followers.length}
                      </Text>
                      <Text style={{ fontSize: 15, color: "#99AAAB" }}>
                        Followers
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: "bold",
                          alignSelf: "center",
                          color: groundcolor,
                        }}
                      >
                        {User.following.length}
                      </Text>
                      <Text style={{ fontSize: 15, color: "#99AAAB" }}>
                        Following
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{ marginRight: 20, flex: 2 }}>
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
                </View>
              </View>
            </View>
            {/* ----------------------------------NAME AND BIO------------------------ */}
            <View transparent>
              <View style={{ marginHorizontal: 20 }}>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 15,
                    color: groundcolor,
                  }}
                >
                  {User.name}
                </Text>
                <Text style={{ color: groundcolor }}>{User.bio}</Text>
              </View>
            </View>
            {/* ----------------------------------EDIT PROFILE----------------------------- */}
            <View>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderRadius: 6,
                  borderColor: "#99AAAB",
                  justifyContent: "center",
                  marginHorizontal: 15,
                  marginTop: 20,
                  paddingVertical: 5,
                }}
                onPress={() => handleNavigation("EditProfile")}
              >
                <Text
                  style={{
                    alignSelf: "center",
                    color: "black",
                    fontWeight: "bold",
                    color: groundcolor,
                  }}
                >
                  Edit Profile
                </Text>
              </TouchableOpacity>
            </View>
            {/* ----------------------------------GRID VIEW----------------------------- */}
            <TouchableOpacity
              style={styles.plus}
              onPress={() => navigation.navigate("Addpost")}
            >
              <Text>+ Add Post</Text>
            </TouchableOpacity>
            <View style={{ marginTop: 20, paddingLeft: 3 }}>
              <FlatList
                numColumns={3}
                data={posts.reverse()}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleSinglePost(item._id)}>
                    <Image
                      source={{
                        uri: `data:image/png;base64,${item.file}`,
                      }}
                      style={{
                        width: 116,
                        height: 116,
                        margin: 1,
                        borderColor: "lightgrey",
                      }}
                    />
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </View>
      )}
      <BottomNavBar />
    </View>
  );
};

export default Profile;

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
  plus: {
    height: 30,
    width: 100,
    borderRadius: 15,
    backgroundColor: "#e7f1ff",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginLeft: 10,
  },
});
