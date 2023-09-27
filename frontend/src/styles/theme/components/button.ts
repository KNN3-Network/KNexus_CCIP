import type { ComponentStyleConfig } from "@chakra-ui/react";

export const Button: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: "full",
    color: "white",
    fontSize: "14px",
  },
  variants: {
    primary: {
      bg: "bg.main",
      color: "bg.black",
      borderColor: "bg.black",
      border: "2px",
      borderRadius: "4px",
      fontWeight: "600",
      _hover: {
        opacity: 0.7,
        bg: "bg.main",
      },
      _disabled: {
        bg: "bg.main",
        opacity: 0.3,
        color: "main.600",
        _hover: {
          opacity: 0.3,
          bg: "bg.main!",
        },
      },
      _active: {
        bg: "bg.main",
      },
    },
    blackPrimary: {
      bg: "bg.black",
      color: "bg.main",
      borderRadius: "4px",
      fontWeight: "400",
      _hover: {
        opacity: 0.8,
        bg: "bg.black",
      },
      _disabled: {
        bg: "bg.black",
        opacity: 0.4,
        color: "whiteAlpha.600",
        _hover: {
          opacity: 0.5,
          bg: "bg.black!",
        },
      },
      _active: {
        bg: "bg.black",
      },
    },
    blackBorderPrimary: {
      bg: "none",
      color: "bg.black",
      borderRadius: "4px",
      borderWidth: "2px",
      borderColor: "bg.black",
      fontWeight: "400",
      _hover: {
        opacity: 0.6,
        bg: "bg.white",
      },
      _disabled: {
        bg: "bg.white",
        opacity: 0.4,
        color: "whiteAlpha.600",
        _hover: {
          opacity: 0.5,
          bg: "bg.white!",
        },
      },
      _active: {
        bg: "bg.white",
      },
    },
    whitePrimary: {
      bg: "bg.white",
      color: "bg.black",
      borderRadius: "4px",
      fontWeight: "400",
      _hover: {
        opacity: 0.8,
        bg: "bg.white",
      },
      _disabled: {
        bg: "bg.white",
        opacity: 0.4,
        color: "whiteAlpha.600",
        _hover: {
          opacity: 0.5,
          bg: "bg.white!",
        },
      },
      _active: {
        bg: "bg.white",
      },
    },
  },
};
