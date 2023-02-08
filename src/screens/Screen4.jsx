import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  BackHandler,
  Alert,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStore from "@react-native-async-storage/async-storage";
import Axios from "../components/Axios";

const Screen4 = ({
  userValidation,
  setuserValidation,
  setRefToken,
  setAccessToken,
  refToken,
}) => {
  const { phone } = userValidation;
  const otpRef = useRef(null);
  const navigation = useNavigation();
  const [show, setshow] = useState(true);
  const [verified, setverified] = useState(false);
  const [otpSection, setotpSection] = useState(false);
  const [otp, setOtp] = useState([]);
  const [otpVal, setOtpVal] = useState("");
  const onChangeNumber = (text) => {
    setuserValidation({
      ...userValidation,
      phone: text.replace(/[^0-9]/g, ""),
    });
  };
  const getLink = async () => {
    if (phone.length > 9) {
      setverified(true);
      setotpSection(true);
      try {
        const res = await Axios.post("/user/login", {
          phone: phone,
        });
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handleotp = () => {
    otpRef.current.focus();
  };
  const handleLogin = async () => {
    if (otpVal.length < 4) {
      alert("Please enter valid OTP");
      return;
    }
    try {
      const res = await Axios.post("/user/signup", {
        phone: phone,
        otp: otpVal.join(""),
      });
      if (res.data.status === "success") {
        setRefToken(res.data.user.refreshToken);
        setAccessToken(res.data.token);
        await AsyncStore.setItem("refreshToken", res.data.user.refreshToken);
        await AsyncStore.setItem("accessToken", res.data.token);
        navigation.navigate("Home");
        setuserValidation({
          phone: "",
        });
        setOtpVal("");
        setOtp([]);
        setshow(true);
        setverified(false);
        setotpSection(false);
      } else {
        alert("Invalid OTP");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (refToken) {
      navigation.navigate("Home");
    }
  }, []);
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to exit?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLogin} style={styles.topNav}>
        <Text style={styles.topText}>लॉग इन करें</Text>
      </TouchableOpacity>
      <View style={styles.mainContainer}>
        {!otpSection ? (
          <View>
            <Text style={styles.mainText}>
              अपना 10 अंकों का मोबाइल नंबर दर्ज करें|
            </Text>
            <View>
              <Image
                resizeMode="contain"
                style={styles.mobileLogo}
                source={require("../../assets/images/mobile.png")}
              />
              <TextInput
                style={styles.input}
                onChangeText={(text) => onChangeNumber(text)}
                value={phone}
                placeholder="अपना नंबर दर्ज करें"
                keyboardType="numeric"
                returnKeyType="next"
              />
            </View>
            {!verified && (
              <TouchableOpacity
                onPress={getLink}
                style={[
                  styles.btn1,
                  verified && { backgroundColor: "#707070" },
                  phone.length < 10 && { backgroundColor: "#c2c2c2" },
                ]}
              >
                <Text style={styles.btn1text}>ओटीपी प्राप्त करें</Text>
              </TouchableOpacity>
            )}

            <Text style={styles.text2}>के माध्यम से लॉगिन करें|</Text>
            <TouchableOpacity
              style={styles.bottomButton}
              onPress={() => setshow(false)}
            >
              {show && (
                <Text style={styles.text3}>
                  कोई खाता नहीं है तो रजिस्टर करें|
                </Text>
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Text style={styles.otptext}>
              हमने आपके द्वारा दर्ज किए गए नंबर पर 4 अंकों का ओटीपी भेजा है|
            </Text>
            <View style={styles.otpContainer}>
              <TextInput
                ref={otpRef}
                onChangeText={(value) => {
                  if (isNaN(value)) {
                    return;
                  }
                  if (value.length > 4) {
                    return;
                  }
                  let val = value + "------".substr(0, 4 - value.length);
                  let a = [...val];
                  setOtpVal(a);
                  setOtp(value);
                }}
                style={{ opacity: 0 }}
                keyboardType="numeric"
              />
              <View style={styles.otpBoxesContainer}>
                {[0, 1, 2, 3].map((item, index) => (
                  <Text onPress={handleotp} style={styles.otpBox} key={index}>
                    {otp[item]}
                  </Text>
                ))}
              </View>
            </View>
            <TouchableOpacity
              style={styles.otptextContainer}
              onPress={() => {
                setotpSection(false);
                setverified(false);
              }}
            >
              <Text style={styles.otptext2}>ओटीपी प्राप्त नहीं हुआ </Text>
              <Text style={[styles.otptext2, { color: "black" }]}>
                ओटीपी पुनः भेजें
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {otpSection && (
          <TouchableOpacity onPress={handleLogin} style={styles.BottomNav}>
            <Text style={styles.BottomText}>लॉग इन</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#fff",
  },
  topNav: {
    // marginTop: 50,
    height: 88,
    backgroundColor: "rgb(152 ,0, 0)",
    alignItems: "center",
    justifyContent: "center",
  },
  topText: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
  },
  mainContainer: {
    height: 506,
  },
  mainText: {
    marginLeft: 27,
    marginTop: 167,
    fontWeight: "bold",
  },
  input: {
    width: "90%",
    height: 48,
    paddingLeft: 45,
    borderRadius: 13,
    fontSize: 24,
    fontWeight: "bold",
    selected: "white",
    borderWidth: 2,
    borderColor: "#3b3b3b",
    marginTop: 24,
    alignSelf: "center",
  },
  mobileLogo: {
    position: "absolute",
    top: "42.2%",
    width: 40,
    height: 36,
    left: 25,
  },
  btn1: {
    width: "90%",
    height: 48,
    backgroundColor: "rgb(152 ,0, 0)",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    alignSelf: "center",
  },
  btn1text: {
    color: "white",
    fontSize: 24,
  },
  logoContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  logobtn: {
    marginHorizontal: 27.5,
    alignItems: "center",
    justifyContent: "center",
  },
  googleLogo: {
    height: 76,
    width: 76,
  },
  logobtntext: {
    width: 76,
    height: 30,
    fontSize: 15,
    color: "#4267B2",
    textAlign: "center",
    fontWeight: "bold",
  },
  text2: {
    marginTop: 23.5,
    textAlign: "center",
    color: "#666666",
    fontWeight: "bold",
    fontSize: 16,
  },
  text3: {
    textAlign: "center",
    color: "#666666",
    fontWeight: "bold",
    fontSize: 16,
  },
  bottomButton: {
    marginTop: 44,
  },
  otptext: {
    marginTop: 23.5,
    color: "#666666",
    fontWeight: "bold",
    fontSize: 16,
    marginHorizontal: 28,
  },
  otpContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  otpBoxesContainer: {
    flexDirection: "row",
  },
  otpBox: {
    padding: 5,
    marginRight: 14,
    borderBottomWidth: 1,
    borderColor: "lightGrey",
    height: 35,
    width: 35,
    textAlign: "center",
    fontSize: 20,
  },
  otptext2: {
    color: "#666666",
    fontWeight: "bold",
    fontSize: 16,
  },
  otptextContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  BottomNav: {
    position: "absolute",
    bottom: 0,
    height: 58,
    backgroundColor: "#E2E4F4",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  BottomText: {
    fontSize: 20,
    color: "#000004",
    fontWeight: "bold",
  },
});

export default Screen4;
