import React, { useContext, useState } from "react";
import axios from "axios";

import {
  Box,
  Text,
  Image,
  Input,
  Stack,
  VStack,
  Button,
  FormControl,
} from "native-base";

import { Alert } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { Toast } from "native-base";
import { AuthContext } from "../AuthProvider";
import { BASE_URL } from "@env";

//console.log(BASEURL)

export default function UserRegistration({ navigation }) {
  // Context API
  const { login, error } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [validator, setValidator] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // form states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const data = {
    name,
    phone,
    password,
    device_name: "mobile",
  };

  const onRegisterButtonClicked = () => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/api/user-register`, data)
      .then((response) => {
        //console.log(response.data.success)
        if (response.data.success === false) {
          const validateMessage = response.data.validator;
          //console.log(validateMessage)
          setValidator(validateMessage);
          console.log("got validation erros", validateMessage);
          setLoading(false);
        } else {
          //console.log('PASSED',response.data.message)
          setValidator({});
          Toast.show({
            title: response.data.message,
            placement: "bottom",
            backgroundColor: "green.700",
          });
          setLoading(false);
          console.log(response.data.phone, response.data.password);
          login(response.data.phone, response.data.password);
          //navigation.navigate("Login");
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.response.data.message);
        Alert.alert("Registration Failed", error.response.data.message);
      });
  };

  return (
    <Box flex={1} bg="#fff">
      <Box alignItems="center">
        <Image
          source={{
            uri: "https://i.imgur.com/jALn1ZQ.png",
          }}
          alt="logo"
          size="xl"
          style={{ resizeMode: "contain" }}
        />
      </Box>
      <VStack space="2.5" mt="2">
        <Stack
          space={3}
          ml={10}
          w={{
            base: "80%",
            md: "25%",
          }}
        >
          <Text fontSize="lg" mb={2}>
            New User Registration
          </Text>
          {validator.name ? (
            <FormControl isInvalid>
              <Input
                onChangeText={setName}
                value={name}
                size="sm"
                placeholder="Full Name"
              />
              <FormControl.ErrorMessage>
                {validator.name}
              </FormControl.ErrorMessage>
            </FormControl>
          ) : (
            <Input
              onChangeText={setName}
              value={name}
              size="sm"
              placeholder="Full Name"
            />
          )}

          {validator.phone ? (
            <FormControl isInvalid>
              <Input
                onChangeText={setPhone}
                value={phone}
                size="sm"
                placeholder="Phone"
              />
              <FormControl.ErrorMessage>
                {validator.phone}
              </FormControl.ErrorMessage>
            </FormControl>
          ) : (
            <Input
              onChangeText={setPhone}
              value={phone}
              size="sm"
              placeholder="Phone"
            />
          )}

          {validator.password ? (
            <FormControl isInvalid>
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
              <FormControl.ErrorMessage>
                {validator.password}
              </FormControl.ErrorMessage>
            </FormControl>
          ) : (
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
          )}

          <Button
            style={{ borderRadius: 50 }}
            _text={{ fontSize: "xl" }}
            my={5}
            onPress={onRegisterButtonClicked}
          >
            SIGN UP
          </Button>
          {loading && (
            <Spinner
              //visibility of Overlay Loading Spinner
              visible={loading}
            />
          )}
        </Stack>
      </VStack>
    </Box>
  );
}
