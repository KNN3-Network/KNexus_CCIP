export const Alert = {
  parts: ["container"],
  baseStyle: (props: any) => {},
  variants: {
    subtle: (props: any) => {
      // only applies to `subtle` variant
      const { colorScheme: c } = props;
      console.log("c", c);
      if (c == "blue" || c == "green") {
        return {
          container: {
            bg: `#D5F95F`, // or literal color, e.g. "#0984ff"
          },
        };
      }
    },
  },
};
