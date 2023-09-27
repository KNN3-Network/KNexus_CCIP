import React, { useCallback, useEffect, useState } from "react";

import { Image } from "@chakra-ui/react";
import { createStandaloneToast } from "@chakra-ui/react";
import api from "api";

export const SocialButton = () => {
  return (
    <div className="fixed right-5 bottom-[72px] z-20">
      <Image
        src="/images/social/icon1.svg"
        onClick={() => window.open("https://twitter.com/KNexus_KNN3")}
        className="w-10 cursor-pointer mb-[32px] hover:opacity-70"
        alt=""
      />
      <Image
        src="/images/social/icon5.svg"
        onClick={() => window.open("https://t.me/+PK-CjWDgtDw2N2Zl")}
        className="w-10 cursor-pointer hover:opacity-70"
        alt=""
      />
    </div>
  );
};
