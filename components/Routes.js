import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "./AuthProvider";

import * as SecureStore from "expo-secure-store";

import AppStack from "./AppStack";
import AuthStack from "./AuthStack";

import { BASE_URL } from "@env";

export default function Routes() {
  const { user, setUser, login, logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //SecureStore.deleteItemAsync("userToken");
    console.log("base url from Routes.js", BASE_URL);
    // check if the user is logged in or not
    SecureStore.getItemAsync("userToken")
      .then((userString) => {
        if (userString) {
          // decode it
          // login();
          userObject = JSON.parse(userString);
          setUser(userObject);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
