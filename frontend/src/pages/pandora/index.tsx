import React, { useEffect, useState } from "react";

import Head from "next/head";

import { Box } from "@chakra-ui/react";
import { NextSeo } from "components/layout/NextSeo";
import { isPhone } from "lib/tool";

import Web from "./Web";

export default function psyche() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (isPhone()) {
      setIsMobile(isPhone());
      return;
    }
  }, []);

  return (
    <>
      <NextSeo title="Pandora | KNexus" />
      <>
        <Box
          pos="fixed"
          w="100vw"
          h="100vh"
          bg={"#000"}
          className="overflow-scroll"
          bgRepeat="no-repeat"
        >
          <Web />
        </Box>
      </>
    </>
  );
}
