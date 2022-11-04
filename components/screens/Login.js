import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

import {
  Box,
  Text,
  Center,
  Heading,
  Container,
  Input,
  Stack,
  Icon,
  VStack,
  HStack,
  Select,
  CheckIcon,
  Button,
  ScrollView,
  FormControl,
  useToast,
  Image,
} from "native-base";

import { ActivityIndicator, ImageBackground } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

import { AuthContext } from "../AuthProvider";

export default function Login({ navigation }) {
  // Context API
  const { login, error } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);

  // form states
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <ImageBackground
        source={{
          uri: "https://i.imgur.com/j2dRZDY.png",
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <Box alignItems="center">
          <Image
            source={{
              uri: "https://i.imgur.com/jALn1ZQ.png",
            }}
            alt="logo"
            size="xl"
            style={{ resizeMode: "contain" }}
          />

          <Heading size="xl" fontWeight="600" color="primary.800">
            Welcome back!
          </Heading>
          <Heading
            mt="1"
            w="70%"
            style={{ textAlign: "center" }}
            color="coolGray.600"
            fontWeight="medium"
            size="xs"
          >
            Sign in to your account with your phone number!
          </Heading>
        </Box>

        <Center py={10}>
          <Stack
            space={5}
            w={{
              base: "85%",
              md: "25%",
            }}
          >
            <Input
              onChangeText={setPhone}
              value={phone}
              size="sm"
              placeholder="Phone Number"
              //autoCapitalize="none"
            />

            <Input
              onChangeText={setPassword}
              value={password}
              type={showPassword ? "text" : "password"}
              size="sm"
              InputRightElement={
                <Button
                  size="sm"
                  rounded="none"
                  w="1/6"
                  h="full"
                  onPress={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </Button>
              }
              placeholder="Password"
            />

            <Button
              style={{ borderRadius: 50 }}
              _text={{ fontSize: "xl" }}
              my={5}
              onPress={() => login(phone, password)}
            >
              Login
            </Button>
            <Center>
              <HStack space={3}>
                <Text bold fontSize="lg">
                  New at Uttor?
                </Text>
                <Text
                  bold
                  fontSize="lg"
                  underline
                  style={{ color: "blue" }}
                  onPress={() => navigation.navigate("UserRegistration")}
                >
                  Register
                </Text>
              </HStack>
            </Center>
          </Stack>
        </Center>
      </ImageBackground>
    </>
  );
}
