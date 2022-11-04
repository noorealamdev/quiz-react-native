import React, { useState, useEffect, useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Login from "./screens/Login";
import UserRegistration from "./screens/UserRegistration";
import DoctorRegistration from "./screens/DoctorRegistration";

// Navigation
const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} /> */}
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserRegistration"
        component={UserRegistration}
        options={{ title: "Registration" }}
      />
    </Stack.Navigator>
  );
}
