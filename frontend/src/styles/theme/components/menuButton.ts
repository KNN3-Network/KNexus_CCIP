import type { ComponentStyleConfig } from "@chakra-ui/react";

export const MenuButton: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: "full",
    color: "white",
  },
  variants: {
    bluePrimary: {
      bg: "bg.blue",
      color: "bg.white",
      borderRadius: "sm",
      fontWeight: "400",
      _hover: {
        opacity: 0.8,
        bg: "bg.blue",
      },
      _disabled: {
        bg: "bg.blue",
        opacity: 0.8,
        color: "whiteAlpha.600",
        _hover: {
          opacity: 0.7,
          bg: "bg.blue!",
        },
      },
      _active: {
        bg: "bg.blue",
      },
    },
  },
};
