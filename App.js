import React from "react";
import {
  extendTheme,
  Container,
  NativeBaseProvider,
  Wrap,
  Center,
  Box,
} from "native-base";

import { AuthProvider } from "./components/AuthProvider";
import Routes from "./components/Routes";

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "white",
};

// extend the theme
export const theme = extendTheme({
  config,
  colors: {
    // Add new color
    primary: {
      50: "#f5f3ff",
      100: "#ede9fe",
      200: "#ddd6fe",
      300: "#c4b5fd",
      400: "#a78bfa",
      500: "#8b5cf6",
      600: "#7c3aed",
      700: "#6d28d9",
      800: "#5b21b6",
      900: "#4c1d95",
    },
    secondary: {
      50: "#fff7ed",
      100: "#ffedd5",
      200: "#fed7aa",
      300: "#fdba74",
      400: "#fb923c",
      500: "#f97316",
      600: "#ea580c",
      700: "#c2410c",
      800: "#9a3412",
      900: "#7c2d12",
    },
  },
});

export default function App({}) {
  return (
    <NativeBaseProvider theme={theme}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NativeBaseProvider>
  );
}
