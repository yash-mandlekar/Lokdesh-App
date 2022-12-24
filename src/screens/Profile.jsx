import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import TopNavBar from "../components/TopNavBar";
import BottomNavBar from "../components/BottomNavBar";
import Axios from "../components/Axios";

const Profile = ({ refToken }) => {
  var groundcolor = "black";
  const [load, setload] = useState(false);
  const [User, setUser] = useState({
    name: "",
    email: "",
    profileImage: "/images/avtar.jpg",
    posts: [],
    followers: [],
    following: [],
  });
  const getUser = async () => {
    setload(true);
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
  useEffect(() => {
    getUser();
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
                    source={{
                      uri: "http://52.66.186.55/" + User.profileImage,
                    }}
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
                <Text style={{ color: groundcolor }}>{User.refreshToken}</Text>
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
  },
});
