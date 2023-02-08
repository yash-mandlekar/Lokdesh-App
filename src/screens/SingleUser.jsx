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

const SingleUser = ({ refToken, accessToken, User, setUser }) => {
  var groundcolor = "black";
  const navigation = useNavigation();
  const { params } = useRoute();
  const [load, setload] = useState(false);
  const [posts, setposts] = useState([]);
  const [singleuser, setSingleUser] = useState(null);
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
  const handleSingleUser = async (val) => {
    const { data } = await Axios.get(`/user/profile/${params.id}`);
    setSingleUser(data.user);
  };
  const handleFollow = async (id) => {
    try {
      const res = await Axios.post(
        `/user/followUnfollow/${id}`,
        {},
        {
          headers: { token: accessToken },
        }
      );
      getUser();
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUser();
    handleSingleUser();
  }, []);
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
                        {singleuser?.posts.length}
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
                        {singleuser?.followers.length}
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
                        {singleuser?.following.length}
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
                  {singleuser?.name}
                </Text>
                <Text style={{ color: groundcolor }}>{singleuser?.bio}</Text>
              </View>
            </View>
            {/* ----------------------------------EDIT PROFILE----------------------------- */}
            <View>
              {User._id === params.id ? (
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
              ) : (
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
                  onPress={() => handleFollow(singleuser?._id)}
                >
                  <Text
                    style={{
                      alignSelf: "center",
                      color: "black",
                      fontWeight: "bold",
                      color: groundcolor,
                    }}
                  >
                    Follow
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            {/* ----------------------------------GRID VIEW----------------------------- */}
            <View style={{ marginTop: 20, paddingLeft: 5 }}>
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
                        width: 110,
                        height: 110,
                        margin: 3,
                        borderWidth: 2,
                        borderColor: "lightgrey",
                        backgroundColor: "yellow",
                      }}
                    />
                    <Text>{item.caption}</Text>
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

export default SingleUser;

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
});
