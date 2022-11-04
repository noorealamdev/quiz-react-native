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
  Heading,
  FlatList,
  Avatar,
  Spacer,
  Divider,
  Icon,
} from "native-base";
import {
  ImageBackground,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { Ionicons, FontAwesome } from "@expo/vector-icons";

import Moment from "moment";

import { BASE_URL } from "@env";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { AuthContext } from "../AuthProvider";

export default function QuizAll({ navigation }) {
  const { user, setUser } = useContext(AuthContext);

  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  const data = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      fullName: "Aafreen Khan",
      timeStamp: "12:47 PM",
      recentText: "Good Day!",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      fullName: "Sujitha Mathur",
      timeStamp: "11:11 PM",
      recentText: "Cheer up, there!",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      fullName: "Anci Barroco",
      timeStamp: "6:22 PM",
      recentText: "Good Day!",
    },
  ];

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
    axios
      .get(`${BASE_URL}/api/quiz`)
      .then((response) => {
        //console.log(response.data.quizes);
        setQuizzes(response.data.quizzes);
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
    <>
      <Box p={1} style={{ flex: 1, backgroundColor: "#fff" }}>
        {quizzes.length ? (
          <>
            <FlatList
              data={quizzes}
              renderItem={({ item }) => (
                <Box style={styles.item}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("QuizSingle", {
                        quizID: item.id,
                      });
                    }}
                  >
                    <HStack space={3} justifyContent="space-between">
                      <VStack>
                        <Text fontSize={15}>{item.name}</Text>
                      </VStack>
                      <Spacer />
                      <Icon
                        as={Ionicons}
                        name="chevron-forward-outline"
                        size={5}
                        color="coolGray.600"
                      />
                    </HStack>
                  </TouchableOpacity>
                </Box>
              )}
              keyExtractor={(item) => item.id}
            />
          </>
        ) : (
          <Heading p={10} textAlign="center">
            No quiz available
          </Heading>
        )}
      </Box>
    </>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    shadowColor: "black",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
