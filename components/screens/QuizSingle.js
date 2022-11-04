import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";

import {
  VStack,
  Text,
  Box,
  HStack,
  Center,
  Heading,
  Button,
} from "native-base";
import { Pressable, StyleSheet } from "react-native";

import Spinner from "react-native-loading-spinner-overlay";
import { Countdown } from "react-native-element-timer";

import { BASE_URL } from "@env";
import Result from "./Result";
import { AuthContext } from "../AuthProvider";
import ShowResultComp from "./ShowResultComp";

export default function QuizSingle({ route, navigation }) {
  const { user, setUser, login, logout } = useContext(AuthContext);

  /* Get the route param */
  const { quizID } = route.params;

  const countdownRef = useRef(null);
  const [timeEnd, setTimeEnd] = useState(false);
  const [quizStartBtn, setQuizStartBtn] = useState(false);

  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizInfo, setQuizInfo] = useState(null);
  const [bgColor, setBgColor] = useState("darkBlue.700");

  useEffect(() => {
    setQuizStartBtn(true);
    axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
    axios
      .get(`${BASE_URL}/api/quiz/${quizID}/edit`)
      // .get("https://opentdb.com/api.php?amount=3&type=multiple")
      .then((response) => {
        //console.log(response.data);
        setQuestions(response.data.questions);
        setQuizInfo(response.data.quiz_info);
        setLoading(false);
        countdownRef.current.start();
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  const handleAnswerOptionClick = (option, questionID) => {
    // Run the countsown
    countdownRef.current.start();

    if (option) {
      if (option === questions[currentQuestion].correct) {
        //console.log("correct answer");
        //setBgColor("green.700");
        setScore(score + 1);
      }

      axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
      axios
        .put(`${BASE_URL}/api/quiz-option-selected/${questionID}`, {
          user_id: user.userObj.id,
          quiz_id: quizID,
          selected_option: option,
        })
        .then((response) => {
          console.log("updated selected option");
        })
        .catch((err) => {
          //alert(err.response);
          console.log("could not update selected option");
        });
    }

    let nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setTimeEnd(true);
    } else {
      setShowResult(true);
      setTimeEnd(false);
    }
  };

  useEffect(() => {
    //setUser(null);
    if (timeEnd) {
      countdownRef.current.start();
    }
    return function cleanup() {
      //countdownRef.current.stop();
      //setTimeEnd(false);
    };
  });

  if (loading) {
    return (
      <Spinner
        //visibility of Overlay Loading Spinner
        visible={loading}
      />
    );
  }

  // Start quiz button
  if (quizStartBtn) {
    return (
      <Box safeArea p={4} style={{ flex: 1, backgroundColor: "#fff" }}>
        <VStack space={4}>
          <Heading fontSize="xl" pt="10" textAlign={"center"}>
            {quizInfo.quiz_name}
          </Heading>
          <Heading fontSize="xl" textAlign={"center"}>
            Total Question: {questions.length}
          </Heading>
          <Heading fontSize="xl" textAlign={"center"}>
            Passing Score: {quizInfo.passing_score}
          </Heading>
          <Button
            style={{ borderRadius: 50 }}
            _text={{ fontSize: "xl" }}
            my={5}
            onPress={() => {
              setQuizStartBtn(false);
              setTimeEnd(true);
            }}
          >
            Start Quiz
          </Button>
        </VStack>
      </Box>
    );
  }

  // Showing result after quiz
  if (showResult) {
    return (
      <ShowResultComp navigation={navigation} quizID={quizID} score={score} />
    );
  }

  if (!questions.length) {
    return (
      <>
        <Center>
          <Center
            bg="secondary.500"
            _text={{
              color: "white",
              fontWeight: "bold",
              fontSize: "20",
            }}
            height="100%"
            width="100%"
          >
            No question available for this quiz
          </Center>
        </Center>
      </>
    );
  }

  return (
    <>
      <Box safeArea py={5} px={4}>
        <HStack justifyContent="space-between">
          <HStack
            alignItems="center"
            justifyContent="center"
            bg="darkBlue.700"
            w="20"
            ml="4"
            rounded="full"
          >
            <Center
              _text={{
                color: "warmGray.50",
                fontWeight: "bold",
                fontSize: "20",
              }}
            >
              {currentQuestion + 1}
            </Center>
            <Center
              _text={{
                color: "warmGray.50",
                fontWeight: "bold",
                fontSize: "15",
              }}
              p="1"
            >
              /
            </Center>
            <Center
              _text={{
                color: "warmGray.50",
                fontWeight: "bold",
                fontSize: "20",
              }}
            >
              {questions.length}
            </Center>
          </HStack>

          <HStack
            alignItems="center"
            justifyContent="center"
            bg="darkBlue.700"
            w="20"
            rounded="full"
          >
            <Center
              _text={{
                color: "warmGray.50",
                fontWeight: "bold",
                fontSize: "20",
              }}
            >
              <Countdown
                ref={countdownRef}
                style={styles.timer}
                textStyle={styles.timerText}
                initialSeconds={quizInfo.question_time}
                onTimes={(e) => {}}
                onPause={(e) => {}}
                onEnd={(e) => {
                  setTimeEnd(true);
                  let nextQuestion = currentQuestion + 1;
                  if (nextQuestion < questions.length) {
                    setTimeEnd(true);
                    setCurrentQuestion(nextQuestion);
                  } else {
                    setTimeEnd(false);
                    setShowResult(true);
                  }
                }}
              />
            </Center>
          </HStack>
          <HStack
            alignItems="center"
            justifyContent="center"
            mr="4"
            bg="darkBlue.700"
            rounded="full"
            w="20"
          >
            <Center
              _text={{
                color: "warmGray.50",
                fontWeight: "bold",
                fontSize: "15",
              }}
            >
              Score {score}
            </Center>
          </HStack>
        </HStack>

        <Heading fontSize="xl" p="2" pt="10" textAlign={"center"}>
          {questions[currentQuestion].question}
        </Heading>
        <VStack space={5} pt={10} alignItems="center">
          {questions[currentQuestion].options
            .sort(() => Math.random() - 0.5)
            .map((option, i) => (
              <Box key={i} width="90%">
                <Pressable
                  onPress={() =>
                    handleAnswerOptionClick(
                      option,
                      questions[currentQuestion].id
                    )
                  }
                >
                  <Text
                    p="3"
                    fontWeight="bold"
                    letterSpacing="md"
                    textAlign="center"
                    fontSize="md"
                    color="warmGray.50"
                    bg="darkBlue.700"
                    rounded="md"
                    shadow="3"
                    bg={bgColor}
                    //style={styles.bgButtonColor}
                  >
                    {option}
                  </Text>
                </Pressable>
              </Box>
            ))}
        </VStack>
      </Box>
    </>
  );
}

const styles = StyleSheet.create({
  timer: {
    marginVertical: 10,
  },
  timerText: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
  },
});
