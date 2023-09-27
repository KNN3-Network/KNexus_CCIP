import { extendTheme } from "@chakra-ui/react";

import { colors } from "./colors";
import * as components from "./components";
import { config } from "./config";
import { fonts } from "./fonts";

const customTheme = extendTheme({
  fonts,
  colors,
  config,
  components: {
    ...components,
  },
  breakpoints: {
    sm: "320px",
    md: "768px",
    lg: "960px",
    xl: "1200px",
  },
  styles: {
    global: (props: { colorMode: string }) => ({
      // body: {
      // 	bg: props.colorMode === "light" ? "none" : "none",
      // },
    }),
  },
});

export default customTheme;
