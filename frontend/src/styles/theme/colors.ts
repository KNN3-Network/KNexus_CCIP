import type { DeepPartial, Theme } from "@chakra-ui/react";

/** extend additional color here */
const extendedColors = {
  bg: {
    main: "#D5F95F",
    white: "#ffffff",
    green: "#78C3B2",
    blue: "#6959EA",
    black: "#000",
    lightGray: "#C7C9D8",
    lightGreen: "rgba(120, 195, 178, 0.3)",
  },
  text: {
    black: "#000000",
    gray: "#959595",
    blue: "#6959EA",
    green: "#D5F95F",
  },
};

/** override chakra colors here */
const overridenChakraColors: DeepPartial<Theme["colors"]> = {};

export const colors = {
  ...overridenChakraColors,
  ...extendedColors,
};
