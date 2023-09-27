import React, { useEffect, useRef, useState } from "react";

import { useRouter } from "next/router";

import { Button, Image } from "@chakra-ui/react";
import api from "api";
import { BaseModal, HasWaterPic } from "components/common";
import { baseURL, siteName } from "config/base";
import useKnexusContract from "contract/useKnexusContract";
import html2Canvas from "html2canvas";
import { copyToClipboard, shortenAddr } from "lib/tool";
import { ButtonClickTrace } from "lib/trace";
import { INftCard } from "lib/types";
import QRCode from "qrcode.react";
import { useEarlyUserStore } from "store/earlyUserStore";

export const ShareModal: React.FC<any> = (props: {
  isOpen: boolean;
  onClose: any;
  nft: INftCard;
}) => {
  const knexusContract = useKnexusContract();

  const { shareTwNum, setShareTwNum } = useEarlyUserStore();

  const router = useRouter();

  const { isOpen, onClose, nft } = props;

  const [loading, setLoading] = useState<boolean>(false);

  const myRef = useRef(null);

  const download = () => {
    const node: any = myRef.current;
    html2Canvas(node, {
      useCORS: true,
      allowTaint: true,
    }).then((canvas: any) => {
      console.log(2333, node, canvas);
      let dataURL = canvas.toDataURL("image/png");
      if (dataURL !== "") {
        var aLink = document.createElement("a");
        aLink.download = "knexus.png";
        aLink.href = dataURL;
        aLink.click();
      }
    });
  };

  const shareTwitter = async () => {
    ButtonClickTrace(`twitter-share`);
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `:/ Discover the magic of AI Art at @KNexus_KNN3! Their Web3 AI Prompt Marketplace simplifies the creation of artistic masterpieces. Check out my prompts and get inspired!

#KNexus #AIGC #promptengineering
#PromptMarketplace`,
    )}&url=${encodeURIComponent(`${window.location.href}`)}`;
    window.open(shareUrl, "_blank");

    if (shareTwNum <= 4) {
      let num = shareTwNum;
      setShareTwNum(num + 1);
    }

    try {
      const res: any = await api.post(`/api/user/twitter/share`);
      // TODO: 加上提示以及要更新站内信列表
    } catch (error) {}
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Share your work"
      size="lg"
      maxW="600px"
    >
      <div className="relative" ref={myRef}>
        <HasWaterPic nft={nft} />
      </div>
      <div className="flex items-center justify-around mt-5 w-3/4 m-auto">
        {/* <Button
          _hover={{ background: "rgba(0,0,0,0.7)" }}
          loadingText={"Download"}
          isLoading={loading}
          borderRadius="full"
          bg="#000"
          h="52px"
          color="#D5F95F"
          fontSize="24px"
          paddingX="30px"
          className="flex items-center"
          boxShadow="0px 0px 16px 0px rgba(0, 0, 0, 0.25)"
          onClick={(e) => {
            e.stopPropagation();
            download();
          }}
        >
          <>
            <Image
              className="mr-[6px] w-[20px]"
              src="/images/common/download.svg"
            />
            Download
          </>
        </Button> */}
        <Image
          src="/images/common/twitter.svg"
          onClick={() => shareTwitter()}
          alt="copy"
          className="cursor-pointer hover:opacity-70"
        />
        <Image
          src="/images/common/copy.svg"
          onClick={() => copyToClipboard(window.location.href)}
          alt="copy"
          className="cursor-pointer hover:opacity-70"
        />
      </div>
    </BaseModal>
  );
};
