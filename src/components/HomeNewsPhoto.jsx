import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Share,
} from "react-native";
import Ionic from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const HomeNewsPhoto = ({ item, setSingleNews, index }) => {
  const { metaTitle, metaDescription, file, location } = item;
  const navigation = useNavigation();
  const shareBtn = () => {
    Share.share({
      message: "http://localhost:3000/news/" + item._id,
    });
  };
  const handleSingleNews = () => {
    setSingleNews(item);
    navigation.navigate("SingleNews");
  };
  return (
    <TouchableOpacity
      onPress={handleSingleNews}
      style={[
        styles.post,
        { backgroundColor: index % 2 === 0 ? "#f1f1f1" : "white" },
      ]}
    >
      <View style={styles.contentContainer}>
        <View style={styles.titles}>
          <Text style={styles.title}>
            {metaTitle.length > 50
              ? metaTitle.substring(0, 50) + "..."
              : metaTitle}
          </Text>
          <Text style={[styles.title, { color: "gray" }]}>
            {metaDescription.length > 50
              ? metaDescription.substring(0, 90).trim() + "..."
              : metaDescription}
          </Text>
        </View>
        <Image
          style={styles.image}
          source={{ uri: `data:image;base64,${file}` }}
        />
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.type}>
          <Text style={styles.typeText}>
            {location.charAt(0).toUpperCase()}
            {location.slice(1, 19)}
          </Text>
        </View>
        {/* <TouchableOpacity style={styles.like}>
          <Ionic name="heart" size={14} color="white" />
          <Text style={styles.Share}>{Likes.length}</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.button} onPress={shareBtn}>
          <Ionic name="share-social-outline" size={16} />
          <Text style={styles.Share}>Share</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  post: {
    width: "100%",
    marginBottom: 5,
    paddingHorizontal: 5,
    // borderRadius: 5,
    borderColor: "rgba(0,0,0,0.1)",
    borderBottomColor: "rgba(102 ,0, 0 , 0.59)",
    // borderBottomWidth: 2,
  },
  contentContainer: {
    width: "100%",
    height: 120,
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "center",
    padding: 3,
  },
  titles: {
    width: "58%",
    height: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 15,
    color: "black",
    fontWeight: "bold",
    textAlign: "justify",
    marginTop: 5,
  },
  image: {
    width: 120,
    height: 120,
    flexDirection: "column",
    justifyContent: "space-between",
    // marginTop: 22,
    alignItems: "center",
    borderRadius: 5,
  },
  bottomContainer: {
    width: "100%",
    height: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  type: {
    paddingHorizontal: 5,
  },
  typeText: {
    fontSize: 14,
    color: "black",
    fontWeight: "bold",
  },
  button: {
    width: "20%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  like: {
    width: "8%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  Share: {
    fontSize: 14,
    color: "black",
    fontWeight: "bold",
  },
  playIcon: {
    height: "25%",
    width: "6%",
    position: "absolute",
    top: "37%",
    right: "16%",
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 10,
    padding: 4,
  },
});
export default HomeNewsPhoto;
