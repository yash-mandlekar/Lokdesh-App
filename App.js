import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Screen1 from "./src/screens/Screen1";
import Screen2 from "./src/screens/Screen2";
import Screen3 from "./src/screens/Screen3";
import Screen4 from "./src/screens/Screen4";
import Home from "./src/screens/Home";
import Epaper from "./src/screens/Epaper";
import GoLive from "./src/screens/GoLive";
import Videos from "./src/screens/Videos";
import { MenuProvider } from "react-native-popup-menu";
import { useEffect, useState } from "react";
import AsyncStore from "@react-native-async-storage/async-storage";
import Profile from "./src/screens/Profile";
import SingleNews from "./src/screens/SingleNews";
import SingleEPaper from "./src/screens/SingleEpaper";
import Language from "./src/screens/Language";
import EditProfile from "./src/screens/EditProfile";
import Feed from "./src/screens/Feed";
import Singlepost from "./src/screens/Singlepost";
import SingleUser from "./src/screens/SingleUser";
import Addpost from "./src/screens/Addpost";

export default function App() {
  const Stack = createNativeStackNavigator();
  const [refToken, setRefToken] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [singleNews, setSingleNews] = useState({});
  const [User, setUser] = useState({
    name: "",
    email: "",
    profileImage: "/images/avtar.jpg",
    posts: [],
    followers: [],
    following: [],
  });
  const [userValidation, setuserValidation] = useState({
    phone: "",
  });
  const getToken = async () => {
    const refreshToken = await AsyncStore.getItem("refreshToken");
    const accessToken = await AsyncStore.getItem("accessToken");
    setRefToken(refreshToken);
    setAccessToken(accessToken);
  };
  useEffect(() => {
    getToken();
  }, []);
  return (
    <MenuProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Screen2">
          {/* Splash Screen 4 */}
          <Stack.Screen name="Screen4" options={{ headerShown: false }}>
            {(props) => (
              <Screen4
                refToken={refToken}
                userValidation={userValidation}
                setuserValidation={setuserValidation}
                setRefToken={setRefToken}
                setAccessToken={setAccessToken}
              />
            )}
          </Stack.Screen>
          {!refToken ? (
            <>
              {/* Splash Screen 1 */}
              <Stack.Screen name="Screen1" options={{ headerShown: false }}>
                {(props) => <Screen1 />}
              </Stack.Screen>
              {/* Splash Screen 2 */}
              <Stack.Screen name="Screen2" options={{ headerShown: false }}>
                {(props) => <Screen2 refToken={refToken} />}
              </Stack.Screen>
              {/* Splash Screen 3 */}
              <Stack.Screen name="Screen3" options={{ headerShown: false }}>
                {(props) => <Screen3 refToken={refToken} />}
              </Stack.Screen>
            </>
          ) : (
            <>
              {/* Home Screen */}
              <Stack.Screen
                name="Home"
                options={{
                  headerShown: false,
                }}
              >
                {(props) => (
                  <Home
                    setSingleNews={setSingleNews}
                    refToken={refToken}
                    heading={"Home"}
                  />
                )}
              </Stack.Screen>
              {/* Single News Screen */}
              <Stack.Screen
                name="SingleNews"
                options={{
                  headerShown: false,
                }}
              >
                {(props) => (
                  <SingleNews
                    singleNews={singleNews}
                    refToken={refToken}
                    heading={"SingleNews"}
                  />
                )}
              </Stack.Screen>
              {/* GoLive Screen */}
              <Stack.Screen
                name="GoLive"
                options={{
                  headerShown: false,
                }}
              >
                {(props) => <GoLive />}
              </Stack.Screen>
              {/* Epaper Screen */}
              <Stack.Screen
                name="Epaper"
                options={{
                  headerShown: false,
                }}
              >
                {(props) => <Epaper setSingleNews={setSingleNews} />}
              </Stack.Screen>
              {/* Single Epaper Screen */}
              <Stack.Screen
                name="SingleEpaper"
                options={{
                  headerShown: false,
                }}
              >
                {(props) => <SingleEPaper singleNews={singleNews} />}
              </Stack.Screen>
              {/* Videos Screen */}
              <Stack.Screen
                name="Videos"
                options={{
                  headerShown: false,
                }}
              >
                {(props) => (
                  <Videos refToken={refToken} accessToken={accessToken} />
                )}
              </Stack.Screen>
              {/* Profile Screen */}
              <Stack.Screen
                name="Profile"
                options={{
                  headerShown: false,
                }}
              >
                {(props) => (
                  <Profile
                    User={User}
                    setUser={setUser}
                    refToken={refToken}
                    accessToken={accessToken}
                  />
                )}
              </Stack.Screen>
              {/* EditProfile Screen */}
              <Stack.Screen
                name="EditProfile"
                options={{
                  headerShown: false,
                }}
              >
                {(props) => (
                  <EditProfile
                    User={User}
                    setUser={setUser}
                    refToken={refToken}
                    accessToken={accessToken}
                  />
                )}
              </Stack.Screen>
              {/* Language Screen */}
              <Stack.Screen
                name="Language"
                options={{
                  headerShown: false,
                }}
              >
                {(props) => <Language />}
              </Stack.Screen>
              {/* Feed Screen */}
              <Stack.Screen
                name="Feed"
                options={{
                  headerShown: false,
                }}
              >
                {(props) => (
                  <Feed
                    User={User}
                    setUser={setUser}
                    accessToken={accessToken}
                    refToken={refToken}
                  />
                )}
              </Stack.Screen>
              {/* Single Post Screen */}
              <Stack.Screen
                name="Singlepost"
                options={{
                  headerShown: false,
                }}
              >
                {(props) => (
                  <Singlepost
                    User={User}
                    setUser={setUser}
                    accessToken={accessToken}
                    refToken={refToken}
                  />
                )}
              </Stack.Screen>
              {/* Single User Screen */}
              <Stack.Screen
                name="SingleUser"
                options={{
                  headerShown: false,
                }}
              >
                {(props) => (
                  <SingleUser
                    User={User}
                    setUser={setUser}
                    accessToken={accessToken}
                    refToken={refToken}
                  />
                )}
              </Stack.Screen>
              {/* Single User Screen */}
              <Stack.Screen
                name="Addpost"
                options={{
                  headerShown: false,
                }}
              >
                {(props) => (
                  <Addpost
                    User={User}
                    setUser={setUser}
                    accessToken={accessToken}
                    refToken={refToken}
                  />
                )}
              </Stack.Screen>
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
}

const styles = StyleSheet.create({});
