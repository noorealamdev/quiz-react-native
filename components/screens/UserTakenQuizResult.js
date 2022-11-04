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
  Badge,
  Icon,
} from "native-base";
import { Alert, ImageBackground, Pressable } from "react-native";

import { Ionicons, FontAwesome } from "@expo/vector-icons";

import Spinner from "react-native-loading-spinner-overlay";
import * as SecureStore from "expo-secure-store";

import { BASE_URL } from "@env";
import { AuthContext } from "../AuthProvider";

export default function UserTakenQuizResult({ route, navigation }) {
  const { user, setUser } = useContext(AuthContext);

  /* Get the route param */
  const { quizID, score } = route.params;

  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [quizInfo, setQuizInfo] = useState({});

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
    axios
      .get(
        `${BASE_URL}/api/user-taken-quiz-result/${quizID}?user_id=${user.userObj.id}`
      )
      .then((response) => {
        //console.log(response.data.questions);
        setQuestions(response.data.questions);
        setQuizInfo(response.data.quiz_info);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Could not get result from this quiz", quizID);
      });
  }, []);

  if (loading) {
    return (
      <Spinner
        //visibility of Overlay Loading Spinner
        visible={loading}
        textContent="Getting result"
      />
    );
  }

  return (
    <>
      <Box>
        <HStack safeArea px={5} bg="white" height="90px">
          <Pressable
            onPress={() => {
              navigation.navigate("UserTakenQuiz");
            }}
          >
            <Icon as={Ionicons} name="arrow-back-outline" size="30" mt={3} />
          </Pressable>
          <Box mt={2}>
            <Heading fontSize="lg" ml={10}>
              You scored {score} out of {questions.length}
            </Heading>
            {score < quizInfo.passing_score ? (
              <Heading
                fontSize="lg"
                color="red.500"
                ml={8}
                letterSpacing={3}
                textAlign={"center"}
              >
                FAILED
              </Heading>
            ) : (
              <Heading
                fontSize="lg"
                color="green.500"
                letterSpacing={3}
                ml={8}
                textAlign={"center"}
              >
                PASSED
              </Heading>
            )}
          </Box>
        </HStack>

        {questions.length ? (
          <FlatList
            data={questions}
            renderItem={({ item, index }) => (
              <Box my="3" px={4}>
                <HStack space={3} justifyContent="space-between">
                  <VStack key={index}>
                    <Text color="coolGray.800" bold fontSize="md">
                      {index + 1}. {item.question}
                    </Text>
                    <Badge width="220" colorScheme="success" rounded="md">
                      <Text fontSize="md">
                        {item.correct}

                        {"   "}
                        {item.selected_options.length
                          ? item.selected_options[
                              item.selected_options.length - 1
                            ].selected_option === item.correct && (
                              <Icon
                                as={Ionicons}
                                name="finger-print-outline"
                                size="5"
                              />
                            )
                          : ""}
                      </Text>
                    </Badge>
                    <Badge width="220" colorScheme="danger" rounded="md">
                      <Text fontSize="md">
                        {item.wrong1}
                        {"   "}
                        {item.selected_options.length
                          ? item.selected_options[
                              item.selected_options.length - 1
                            ].selected_option === item.wrong1 && (
                              <Icon
                                as={Ionicons}
                                name="finger-print-outline"
                                size="5"
                              />
                            )
                          : ""}
                      </Text>
                    </Badge>
                    <Badge width="220" colorScheme="danger" rounded="md">
                      <Text fontSize="md">
                        {item.wrong2}
                        {"   "}
                        {item.selected_options.length
                          ? item.selected_options[
                              item.selected_options.length - 1
                            ].selected_option === item.wrong2 && (
                              <Icon
                                as={Ionicons}
                                name="finger-print-outline"
                                size="5"
                              />
                            )
                          : ""}
                      </Text>
                    </Badge>
                    <Badge width="220" colorScheme="danger" rounded="md">
                      <Text fontSize="md">
                        {item.wrong3}
                        {"   "}
                        {item.selected_options.length
                          ? item.selected_options[
                              item.selected_options.length - 1
                            ].selected_option === item.wrong3 && (
                              <Icon
                                as={Ionicons}
                                name="finger-print-outline"
                                size="5"
                              />
                            )
                          : ""}
                      </Text>
                    </Badge>
                  </VStack>
                  <Spacer />
                </HStack>
              </Box>
            )}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <Heading p={10} textAlign="center">
            No question available
          </Heading>
        )}
      </Box>
    </>
  );
}
