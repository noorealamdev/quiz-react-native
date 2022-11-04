import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import {
  Button,
  Image,
  VStack,
  Text,
  Box,
  HStack,
  Center,
  Spacer,
  StatusBar,
  IconButton,
  Avatar,
  Heading,
} from "native-base";
import { ImageBackground, Pressable, SafeAreaView } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { AuthContext } from "../AuthProvider";

import * as SecureStore from "expo-secure-store";
import Spinner from "react-native-loading-spinner-overlay/lib";

import { BASE_URL } from "@env";
import Quiz from "./QuizAll";
import UserProfile from "./UserProfile";

export default function UserDashboard({ navigation }) {
  const { user, setUser, logout } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [studentId, setStudentId] = useState("");

  useEffect(() => {
    //console.log(user);
    axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
    axios
      .get(`${BASE_URL}/api/current-user`)
      .then((response) => {
        //console.log(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
        setStudentId(response.data.student_id);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  if (loading) {
    return (
      <Spinner
        //visibility of Overlay Loading Spinner
        visible={loading}
      />
    );
  }

  return (
    <Box safeArea>
      <HStack
        //bg="primary.500"
        px="5"
        justifyContent="space-between"
        alignItems="center"
      >
        <HStack space="4" alignItems="center">
          <Image
            source={{
              uri: "https://i.imgur.com/jALn1ZQ.png",
            }}
            alt="logo"
            size="100px"
            style={{ resizeMode: "contain" }}
          />
        </HStack>

        <HStack space="4" alignItems="center">
          <Pressable
            onPress={() => {
              //setUser(null);
              navigation.navigate("UserProfile");
            }}
          >
            <Avatar
              bg="primary.600"
              alignSelf="center"
              width="40px"
              height="40px"
            >
              {name.charAt(0)}
            </Avatar>
          </Pressable>
        </HStack>
      </HStack>
      <Center>
        <VStack space={4} mt="10">
          <Pressable
            onPress={() => {
              navigation.navigate("UserTakenQuiz");
            }}
          >
            <Box
              bg="blueGray.700"
              p="5"
              width="250"
              rounded="xl"
              _text={{
                fontSize: "lg",
                fontWeight: "medium",
                color: "warmGray.50",
                textAlign: "center",
              }}
            >
              My quiz attempts
            </Box>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate("UserProfile");
            }}
          >
            <Box
              bg="blueGray.700"
              p="5"
              width="250"
              rounded="xl"
              _text={{
                fontSize: "lg",
                fontWeight: "medium",
                color: "warmGray.50",
                textAlign: "center",
              }}
            >
              Profile
            </Box>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate("QuizStack", {
                screen: "Quiz",
                initial: false,
              });
            }}
          >
            <Box
              bg="blueGray.700"
              p="5"
              width="250"
              rounded="xl"
              _text={{
                fontSize: "lg",
                fontWeight: "medium",
                color: "warmGray.50",
                textAlign: "center",
              }}
            >
              Quiz Test
            </Box>
          </Pressable>
          <Pressable
            onPress={() => {
              setUser(null);
              logout();
            }}
          >
            <Box
              bg="blueGray.700"
              p="5"
              width="250"
              rounded="xl"
              _text={{
                fontSize: "lg",
                fontWeight: "medium",
                color: "warmGray.50",
                textAlign: "center",
              }}
            >
              Logout
            </Box>
          </Pressable>
        </VStack>
        <Box>
          <Heading mt="10" color="coolGray.600" fontWeight="medium" size="xl">
            User Dashboard
          </Heading>
          <Heading mt="1" fontWeight="medium" size="md">
            Name: {name}
          </Heading>
          <Heading mt="1" fontWeight="medium" size="md">
            Email: {email}
          </Heading>
          <Heading mt="1" fontWeight="medium" size="md">
            Student ID: {studentId}
          </Heading>
        </Box>
      </Center>
    </Box>
  );
}
