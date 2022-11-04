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
} from "native-base";
import { ImageBackground, Pressable, SafeAreaView } from "react-native";

import Moment from "moment";

import { BASE_URL } from "@env";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { AuthContext } from "../AuthProvider";

export default function UserTakenQuiz({ navigation }) {
  const { user, setUser } = useContext(AuthContext);

  const [userTakenquizes, setUserTakenquizes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
    axios
      .get(`${BASE_URL}/api/user-taken-quiz/${user.userObj.id}`)
      .then((response) => {
        setUserTakenquizes(response.data.quizzes);
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
      <Box>
        {userTakenquizes.length ? (
          <FlatList
            data={userTakenquizes}
            renderItem={({ item }) => (
              <Box
                borderBottomWidth="1"
                _dark={{
                  borderColor: "gray.600",
                }}
                borderColor="coolGray.200"
                pl="4"
                pr="5"
                py="4"
              >
                <Pressable
                  onPress={() => {
                    navigation.navigate("UserTakenQuizResult", {
                      quizID: item.id,
                      score: item.score,
                    });
                  }}
                >
                  <HStack space={3} justifyContent="space-between">
                    <VStack>
                      <Text color="coolGray.800" bold fontSize={15}>
                        {item.name}
                      </Text>
                      <Text color="coolGray.800" bold fontSize={13}>
                        Score: {item.score} out of {item.total_question}{" "}
                        {item.score < item.passing_score ? (
                          <Text fontSize="13" color="red.500" letterSpacing={3}>
                            FAILED
                          </Text>
                        ) : (
                          <Text
                            fontSize="13"
                            color="green.500"
                            letterSpacing={3}
                          >
                            PASSED
                          </Text>
                        )}
                      </Text>
                    </VStack>
                    <Spacer />
                    <Text
                      fontSize="15"
                      _dark={{
                        color: "warmGray.50",
                      }}
                      color="coolGray.800"
                      alignSelf="flex-start"
                    >
                      {Moment(item.quiz_taken_time).format("DD-MM-YYYY")}
                    </Text>
                  </HStack>
                </Pressable>
              </Box>
            )}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <Heading p={10} textAlign="center">
            No quiz available
          </Heading>
        )}
      </Box>
    </>
  );
}
