import {
  Image,
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Share,
} from "react-native";
import BottomNavBar from "../components/BottomNavBar";
import TopNavBar from "../components/TopNavBar";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useEffect, useState } from "react";
import Axios from "../components/Axios";
const Feed = ({ User, accessToken, refToken, setUser }) => {
  const [feed, setFeed] = useState([]);
  const [likes, setLikes] = useState([]);
  useEffect(() => {
    getFeed();
    getUser();
  }, []);
  const getFeed = async () => {
    try {
      const res = await Axios.get("/user/feed", {
        headers: {
          token: accessToken,
        },
      });
      setFeed(res.data.post);
      res.data.post.map((post) => {
        setLikes((likes) => [...likes, ...post.likes]);
        console.log(post.likes, User._id);
      });
    } catch (err) {
      console.log(err);
    }
  };
  const likePost = async (id) => {
    try {
      const res = await Axios.get(`/user/post/likes/${id}`, {
        headers: { token: accessToken },
      });
      console.log(res.data);
      getFeed();
    } catch (err) {
      console.log(err);
    }
  };
  const getUser = async () => {
    try {
      const res = await Axios.post("/user/refreshtoken", {
        token: refToken,
      });
      setUser(res.data.user);
    } catch (err) {
      console.log(err);
    }
  };
  const handleShare = async (id) => {
    try {
      await Share.share({
        message: "http://lokdeshtv.com/singlePost/" + id,
      });
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <View style={styles.container}>
      <TopNavBar />
      {feed.length > 0 ? (
        <ScrollView style={styles.mainContainer}>
          <View style={styles.posts}>
            {feed?.map((post, i) => (
              <View key={i} style={styles.post}>
                <View style={styles.postnav}>
                  <View style={styles.postnavleft}>
                    <Image
                      style={styles.postnavleftimg}
                      source={{
                        uri: `data:image/jpg;base64,${post.author.profileImage}`,
                      }}
                    />
                    <Text style={styles.postnavlefttext}>
                      {post.author.userName}
                    </Text>
                  </View>
                  <View style={styles.postnavright}>
                    <Text style={styles.postnavrighttext}>...</Text>
                  </View>
                </View>
                <View style={styles.postimg}>
                  <Image
                    style={styles.postimgimg}
                    source={{
                      uri: `data:image/jpg;base64,${post.file}`,
                    }}
                  />
                </View>
                <View style={styles.postfooter}>
                  <View style={styles.postfooterleft}>
                    <TouchableOpacity
                      onPress={() => likePost(post._id)}
                      style={styles.postfooterlefticon}
                    >
                      {post.likes.includes(User._id) ? (
                        <FontAwesome name="heart" size={20} color="red" />
                      ) : (
                        <FontAwesome name="heart-o" size={20} color="#000" />
                      )}
                      <Text style={styles.postfooterlefttext}>
                        {post.likes.length}{" "}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.postfooterlefticon}>
                      <FontAwesome name="comment-o" size={20} color="#000" />
                      <Text style={styles.postfooterlefttext}>
                        {post.comments.length}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.postfooterright}>
                    <TouchableOpacity
                      onPress={() => handleShare(post._id)}
                      style={[styles.postfooterlefticon, { marginRight: 0 }]}
                    >
                      <FontAwesome name="share" size={20} color="#000" />
                      <Text style={styles.postfooterlefttext}>Share</Text>
                    </TouchableOpacity>
                    {/* <Text style={styles.postfooterrighttext}>Save</Text> */}
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 20 }}>Loading...</Text>
        </View>
      )}
      <BottomNavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    paddingTop: 20,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  posts: {
    justifyContent: "center",
    alignItems: "center",
    // height: "100%",
    paddingTop: 20,
    width: "100%",
    paddingBottom: 100,
  },
  post: {
    backgroundColor: "white",
    width: "90%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e6e6e6",
    // height: 500,
    marginBottom: 20,
    justifyContent: "space-between",
  },
  postnav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e6e6e6",
  },
  postnavleft: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  postnavleftimg: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  postnavlefttext: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  postnavright: {
    justifyContent: "center",
    alignItems: "center",
  },
  postnavrighttext: {
    fontSize: 20,
    fontWeight: "bold",
  },
  postimg: {
    justifyContent: "center",
    alignItems: "center",
    maxHeight: 400,
    width: "100%",
  },
  postimgimg: {
    width: "100%",
    height: "100%",
    // resizeMode: "contain",
  },
  postfooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#e6e6e6",
  },
  postfooterleft: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  postfooterlefticon: {
    marginRight: 20,
    height: 30,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  postfooterlefttext: {
    fontWeight: "bold",
  },
  postfooterright: {
    justifyContent: "center",
    alignItems: "center",
  },
  postfooterrighttext: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Feed;
