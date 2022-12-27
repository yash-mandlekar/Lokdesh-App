import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import BottomNavBar from "../components/BottomNavBar";
import TopNavBar from "../components/TopNavBar";

const GoLive = () => {
  const handleLive = () => {
    Alert.alert(
      "Request for Go Live",
      "Your request has been sent to the admin. You will be notified once your request is approved.",
      [
        {
          text: "OK",
          onPress: () => console.log("OK Pressed"),
        },
      ]
    );
  };
  return (
    <View style={styles.container}>
      <TopNavBar />
      <View style={styles.mainContainer}>
        <Text
          style={{ textAlign: "center", marginTop: 16, paddingHorizontal: 15 }}
        >
          You can go live once your request is approved by the admin.
        </Text>
        <TouchableOpacity onPress={handleLive} style={styles.btn1}>
          <Text style={styles.btn1text}>Request for Go Live</Text>
        </TouchableOpacity>
      </View>
      <BottomNavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  mainContainer: {
    height: 506,
  },
  btn1: {
    width: "90%",
    height: 48,
    backgroundColor: "red",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    alignSelf: "center",
  },
  btn1text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default GoLive;
