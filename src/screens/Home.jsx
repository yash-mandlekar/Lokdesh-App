import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import TopNavBar from "../components/TopNavBar";
import HomeNewsVideo from "../components/HomeNewsVideo";
import HomeNewsPhoto from "../components/HomeNewsPhoto";
import BottomNavBar from "../components/BottomNavBar";
import SwiperFlatList from "react-native-swiper-flatlist";
import HomeAds from "../components/HomeAds";
import Ionic from "react-native-vector-icons/Ionicons";
import Axios from "../components/Axios";
import AsyncStore from "@react-native-async-storage/async-storage";

const Home = ({ refToken, setSingleNews }) => {
  const [load, setLoad] = useState(true);
  const [AdsData, setAdsData] = useState([
    {
      sponsored: true,
      Video:
        "https://player.vimeo.com/external/546230348.sd.mp4?s=4d647b0709384deba5fd01685fbd9b796c9adc9f&profile_id=165&oauth2_token_id=57447761",
      Photo:
        "https://images.pexels.com/photos/8105037/pexels-photo-8105037.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      title: "Abhay",
    },
    {
      sponsored: true,
      Video: null,
      Photo:
        "https://images.unsplash.com/photo-1657664049364-01bdba8ec858?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwyMXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
      title: "Yash",
    },
    {
      sponsored: true,
      Video:
        "https://player.vimeo.com/progressive_redirect/playback/734295186/rendition/540p/file.mp4?loc=external&oauth2_token_id=57447761&signature=45a04e910ce3596ff5c17ec65fe32b0d8589678365330b08900a03a33f5b4e0f",
      Photo: null,
      title: "Ram_Charan",
    },
  ]);
  const [showAds, setshowAds] = useState(true);
  const [NewsData, setNewsData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleChangeIndexValue = ({ index }) => {
    setCurrentIndex(index);
  };
  const showAndRemoveAds = () => {
    setshowAds(false);
  };
  const handleSetAds = (i) => {
    setshowAds(true);
    setAdsData([NewsData[i]]);
  };
  const getCategories = async () => {
    const lang2 = await AsyncStore.getItem("language");
    const res = await Axios.get("/news-category");
    const cpy = [];
    res.data.map((category) => {
      Axios.post("/user/translate", {
        text: category.hindiName,
        target: JSON.parse(lang2).code,
      }).then((res2) => {
        cpy.push({
          ...category,
          hindiName: res2.data.translation,
        });
        setCategories(cpy);
      });
    });
  };
  const getNews = async () => {
    const lang2 = await AsyncStore.getItem("language");
    setLoad(true);
    const res = await Axios.get("/all/news");
    // Translate
    const cpy = [];
    for (var i = 0; i < res.data.length; i++) {
      const res2 = await Axios.post("/user/translate", {
        text: res.data[i].metaTitle,
        text2: res.data[i].metaDescription,
        text3: res.data[i].shortDescription,
        text4: res.data[i].location,
        text5: "शेयर",
        target: JSON.parse(lang2).code,
      });
      cpy.push({
        ...res.data[i],
        metaTitle: res2.data.translation,
        metaDescription: res2.data.translation2,
        shortDescription: res2.data.translation3,
        location: res2.data.translation4,
        share: res2.data.translation5,
      });
    }
    setNewsData(cpy);
    setLoad(false);
  };
  const filterNews = async (category) => {
    setLoad(true);
    const res = await Axios.get(`/news/categoryName/${category}`);
    setNewsData(res.data);
    setLoad(false);
  };
  useEffect(() => {
    getNews();
    getCategories();
  }, []);
  return (
    <View style={styles.container}>
      <TopNavBar />
      <SafeAreaView style={styles.safeview}>
        <ScrollView
          horizontal={true}
          contentContainerStyle={styles.newsFilters}
        >
          {categories
            .sort((a, b) => a.sortOrder - b.sortOrder)
            .map((category, i) => (
              <TouchableOpacity
                onPress={() => filterNews(category.categoryUrl)}
                key={i}
                style={styles.newsFilter}
              >
                <Image
                  source={{ uri: `data:image/png;base64,${category.icon}` }}
                  style={styles.icon}
                />
                <Text style={styles.newsFilterText}>{category.hindiName}</Text>
              </TouchableOpacity>
            ))}
        </ScrollView>
      </SafeAreaView>
      {showAds && (
        <View style={styles.adsContainer}>
          {/* Sposponsored Text */}
          {/* close button */}
          <TouchableOpacity
            style={styles.AdsCloseButton}
            onPress={showAndRemoveAds}
          >
            <Ionic name="close-outline" size={16} color="#fff" />
          </TouchableOpacity>
          <SwiperFlatList
            autoplay
            autoplayDelay={5}
            autoplayLoop
            index={currentIndex}
            showPagination
            data={AdsData}
            handleChangeIndex={handleChangeIndexValue}
            paginationStyleItem={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: "white",
            }}
            renderItem={({ item, index }) => (
              <HomeAds
                AdsVideo={item.Video}
                sponsored={item.sponsored}
                index={index}
                AdsPhoto={item.Photo}
                title={item.title}
              />
            )}
          />
        </View>
      )}
      {load ? (
        <ActivityIndicator size="large" />
      ) : (
        <ScrollView contentContainerStyle={styles.posts}>
          {NewsData.length > 0 ? (
            NewsData.map((item, index) =>
              false ? (
                <HomeNewsVideo
                  key={index}
                  index={index}
                  handleSetAds={handleSetAds}
                  NewsVideo={item.Video}
                  Likes={item.Likes}
                  Heading={item.Heading}
                  SubHeading={item.SubHeading}
                  Type={item.Type}
                />
              ) : (
                <HomeNewsPhoto
                  setSingleNews={setSingleNews}
                  key={index}
                  index={index}
                  item={item}
                />
              )
            )
          ) : (
            <Text style={{ textAlign: "center", fontSize: 20, marginTop: 20 }}>
              No News Found
            </Text>
          )}
        </ScrollView>
      )}
      <BottomNavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#fff",
    // alignItems: 'center',
    justifyContent: "flex-start",
  },
  headerLogo: {
    width: "81vw",
    aspectRatio: 135 / 76,
    display: "flex",
    alignItems: "stretch",
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  posts: {
    width: "100%",
    display: "flex",
    alignSelf: "center",
    justifyContent: "space-between",
    marginTop: 10,
    zIndex: -1,
    paddingBottom: 100,
  },
  adsContainer: {
    width: "100%",
    height: "20%",
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "center",
    alignSelf: "center",
    zIndex: -1,
    marginBottom: 10,
  },
  safeview: {
    // flex: 0.07,
    height: "6%",
    width: "100%",
    zIndex: -1,
    marginBottom: 10,
  },
  newsFilters: {
    height: 150,
    display: "flex",
    flexDirection: "row",
  },
  newsFilter: {
    marginHorizontal: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  newsFilterText: {
    fontSize: 13,
    color: "black",
    fontWeight: "bold",
  },
  AdsCloseButton: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    // backgroundColor: 'rgba(0,0,0,0.2)',
  },
  icon: {
    width: 30,
    height: 30,
    borderRadius: 10,
  },
});

export default Home;
