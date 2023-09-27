import React from "react";

import { Box, Image } from "@chakra-ui/react";
import { useEarlyUserStore } from "store/earlyUserStore";

export default function Campign() {
  const { showNotion, setShowNotion } = useEarlyUserStore();

  const campaignLink = () => {
    window.open(
      "https://tall-wildcat-cdb.notion.site/KNexus-x-TypoGraphy-AI-MBTI-Avatar-Marvel-Unlock-Your-Avatar-and-Win-Big-cb358b980a874687a23fc10de5026092?pvs=4",
      "_blank",
    );
  };

  if (!showNotion) return null;
  return (
    <Box
      className="h-6 w-full flex justify-between font-eurostile items-center px-10 cursor-pointer"
      boxShadow="0px 0px 10px 0px rgba(0, 0, 0, 0.20)"
      backdrop-filter="blur(100px)"
      onClick={() => campaignLink()}
    >
      <div>Campaign</div>
      <div>
        <span className="mr-3">🔥𝐖𝐡𝐚𝐭 𝐢𝐬 𝐲𝐨𝐮𝐫 𝐌𝐁𝐓𝐈 𝐀𝐈 𝐀𝐯𝐚𝐭𝐚𝐫?</span>
        <span
          className="cursor-pointer underline"
          onClick={() => campaignLink()}
        >
          Create Now
        </span>
      </div>
      <div>
        <Image
          onClick={() => setShowNotion(false)}
          className="cursor-pointer"
          src="/images/common/head-del.svg"
          height={"16px"}
        />
      </div>
    </Box>
  );
}
