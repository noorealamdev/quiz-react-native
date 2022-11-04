import React, { useState, useEffect, useContext } from "react";
import {
  NativeBaseProvider,
  Box,
  HStack,
  VStack,
  Flex,
  Text,
  Pressable,
  Image,
  Button,
  Icon,
  Heading,
  Center,
} from "native-base";

import { SafeAreaView } from "react-native";

import { Ionicons, FontAwesome } from "@expo/vector-icons";

import { getTokenValueFor } from "./Helpers";

import { AuthContext } from "./AuthProvider";

import * as SecureStore from "expo-secure-store";

const Test = () => {
  const { user, setUser, login, logout } = useContext(AuthContext);

  useEffect(() => {
    // check if the user is logged in or not
    SecureStore.getItemAsync("userToken")
      .then((userString) => {
        if (userString) {
          // decode it
          // login();
          userObject = JSON.parse(userString);
          setUser(userObject);
        }
        //setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //SecureStore.deleteItemAsync('userToken')
  //console.log(user)

  return (
    <SafeAreaView>
      <Box bg="primary.500" p="3">
        <HStack space={10}>
          <Heading textAlign="center" size="md" py={1} color="white">
            Token Key: {user ? user.token : ""}
          </Heading>
        </HStack>
        <Text>User Email: {user ? user.userObj.email : ""}</Text>
        <Text>User ID: {user ? user.userObj.id : ""}</Text>
      </Box>
    </SafeAreaView>
  );
};

export default Test;
