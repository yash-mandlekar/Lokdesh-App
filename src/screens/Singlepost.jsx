import {
  Image,
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Share,
  TextInput,
} from "react-native";
import BottomNavBar from "../components/BottomNavBar";
import TopNavBar from "../components/TopNavBar";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useEffect, useRef, useState } from "react";
import Axios from "../components/Axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
const Singlepost = ({ User, accessToken, refToken, setUser }) => {
  const inputRef = useRef(null);
  const navigation = useNavigation();
  const { params } = useRoute();
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  useEffect(() => {
    getPost();
    getUser();
  }, [params.id]);
  const likePost = async (id) => {
    try {
      const res = await Axios.get(`/user/post/likes/${id}`, {
        headers: { token: accessToken },
      });
      setLikes(res.data.post.likes);
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
  const getPost = async () => {
    try {
      const res = await Axios.get(`/user/post/${params.id}`, {
        headers: { token: accessToken },
      });
      setPost(res.data.post);
      setComments(res.data.post.comments);
      setLikes(res.data.post.likes);
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
  const handleDelete = async (id) => {
    try {
      const res = await Axios.delete(`/user/post/${id}`, {
        headers: { token: accessToken },
      });
      navigation.navigate("Profile");
    } catch (err) {
      console.log(err);
    }
  };
  const handleSingleUser = (id) => {
    navigation.navigate("SingleUser", { id: id });
  };
  const handleComment = async (id) => {
    try {
      const res = await Axios.post(
        `/user/post/comment`,
        { postId: id, comment: comment },
        {
          headers: { token: accessToken },
        }
      );
      console.log(res.data.comments);
      setComments(res.data.comments.comments);
      setComment("");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={styles.container}>
      <TopNavBar />
      <TouchableOpacity
        style={styles.backbtn}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={30} color="#000" />
        <Text style={styles.backbtntext}>Back</Text>
      </TouchableOpacity>
      <ScrollView style={styles.mainContainer}>
        <View style={styles.posts}>
          {post && (
            <View style={styles.post}>
              <View style={styles.postnav}>
                <TouchableOpacity
                  onPress={() => handleSingleUser(post.author._id)}
                  style={styles.postnavleft}
                >
                  <Image
                    style={styles.postnavleftimg}
                    source={{
                      uri: `data:image/jpg;base64,${post.author.profileImage}`,
                    }}
                  />
                  <Text style={styles.postnavlefttext}>
                    {post.author.userName}
                  </Text>
                </TouchableOpacity>
                {post.author._id === User._id && (
                  <TouchableOpacity
                    onPress={() => handleDelete(post._id)}
                    style={styles.postnavright}
                  >
                    <Text style={styles.postnavrighttext}>
                      <MaterialCommunityIcons
                        name="delete-outline"
                        size={20}
                        color="#000"
                      />
                    </Text>
                  </TouchableOpacity>
                )}
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
                    {likes.includes(User._id) ? (
                      <FontAwesome name="heart" size={20} color="red" />
                    ) : (
                      <FontAwesome name="heart-o" size={20} color="#000" />
                    )}
                    <Text style={styles.postfooterlefttext}>
                      {likes.length}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => inputRef?.current?.focus()}
                    style={styles.postfooterlefticon}
                  >
                    <FontAwesome name="comment-o" size={20} color="#000" />
                    <Text style={styles.postfooterlefttext}>
                      {comments?.length}
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
              {/* Add Comment */}
              <View style={styles.postaddcomment}>
                <View style={styles.postaddcommentleft}>
                  <Image
                    style={styles.postaddcommentleftimg}
                    source={{
                      uri: `data:image/jpg;base64,${User.profileImage}`,
                    }}
                  />
                </View>
                <View style={styles.postaddcommentright}>
                  <TextInput
                    ref={inputRef}
                    style={styles.postaddcommentrightinput}
                    placeholder="Add a comment..."
                    value={comment}
                    onChangeText={(text) => setComment(text)}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => handleComment(post._id)}
                  style={styles.postaddcommentrightbtn}
                >
                  <Text style={styles.postaddcommentrightbtntext}>Post</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.postcaption}>
                <Text style={styles.postcaptiontext}>
                  <Text style={styles.postcaptiontextbold}>Caption:&nbsp;</Text>
                  {post.caption}
                </Text>
              </View>
              <Text style={styles.postcommentstext}>View all comments</Text>
              <View style={styles.postcomments}>
                {comments?.map((comment) => (
                  <View style={styles.postcomment} key={comment._id}>
                    <Text style={styles.postcommenttext}>
                      <Text style={styles.postcommenttextbold}>
                        {comment?.user?.userName}
                      </Text>
                      {comment?.comment}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
      <BottomNavBar />
    </View>
  );
};
export default Singlepost;

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
  backbtn: {
    marginLeft: 20,
    zIndex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  backbtntext: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
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
  postaddcomment: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#e6e6e6",
  },
  postaddcommentleft: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  postaddcommentleftimg: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  postaddcommentright: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "80%",
  },
  postaddcommentrightinput: {
    width: "100%",
    height: 40,
    fontSize: 16,
    paddingLeft: 10,
  },
  postaddcommentrightbtn: {
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  postaddcommentrightbtntext: {
    fontSize: 16,
    fontWeight: "bold",
  },
  postcaption: {
    padding: 10,
  },
  postcaptiontext: {
    fontSize: 16,
  },
  postcaptiontextbold: {
    fontWeight: "bold",
  },
  postcommentstext: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
    marginBottom: 10,
  },
  postcomments: {
    padding: 10,
  },
  postcomment: {
    marginBottom: 10,
  },
  postcommenttext: {
    fontSize: 16,
  },
  postcommenttextbold: {
    fontWeight: "bold",
  },
});
