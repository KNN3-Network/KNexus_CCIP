import React, { useCallback, useEffect, useState } from "react";

import { useRouter } from "next/router";

import { Box, Image } from "@chakra-ui/react";
import api from "api";
import { Header, NextSeo } from "components";
import { CampignList } from "components/common";
import Campign from "components/common/Campign";
import { useEarlyUserStore } from "store/earlyUserStore";

export default function Create() {
  const router = useRouter();

  const { showNotion } = useEarlyUserStore();

  const [list, setList] = useState<any>([]);

  useEffect(() => {
    getCampain();
  }, []);

  const getCampain = async () => {
    try {
      const res: any = await api.get(`/api/campaign`);
      if (res) {
        setList(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const toPage = (t: any) => {
  //   if (t.name == "Sparkle x KNexus") {
  //     router.push(`/sparkle/?campaignid=${t.id}&campaign=Sparkle x KNexus`);
  //   }
  //   if (t.name == "MBTI - Campaign") {
  //     router.push(`/mbti/?campaignid=${t.id}&campaign=MBTI - Campaign`);
  //   }
  // };

  return (
    <>
      <NextSeo title="Create | KNexus" />
      <div className="flex flex-col h-screen bg-[url('/images/bg.png')] bg-cover font-eurostile">
        <div className="w-full flex flex-col" style={{ zIndex: 11 }}>
          <Campign />
          <Box
            backdropFilter="blur(100px)"
            w="calc(100% - 80px)"
            m="0 auto"
            mt="10px"
            borderRadius="full"
            overflow="hidden"
            background="rgba(255, 255, 255, 0.20)"
            boxShadow="0px 0px 10px 0px rgba(0, 0, 0, 0.20)"
          >
            <Header />
          </Box>
        </div>
        <div
          className={`${
            showNotion ? "h-[calc(100vh-110px)]" : "h-[calc(100vh-70px)]"
          } overflow-auto`}
        >
          <div className="w-[90%] max-w-[1440px] mx-auto">
            <div className="mt-5 flex relative">
              <div
                onClick={() => router.push("/texttoimage")}
                className="group mr-5 w-[calc(100%-320px)] h-full relative cursor-pointer overflow-hidden rounded-[20px]"
              >
                <Image
                  className="w-full group-hover:scale-110 transition-all"
                  src="/images/create/basicormaster.png"
                />
                <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-center text-[#fff] text-[24px]">
                  <p>Create</p>
                  <p>Text to Image</p>
                </div>
              </div>
              <div
                onClick={() => router.push("/memo")}
                className="bg-[#D5F95F] h-full w-[300px] absolute right-0 rounded-[20px]"
              >
                <div className="w-full absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-center text-[#000] text-[24px] cursor-pointer">
                  <Image
                    className="mx-auto h-[60px] mb-5"
                    src="/images/create/upload.png"
                  />
                  <p>Prompt Memo</p>
                </div>
              </div>
            </div>
            <h1 className=" text-[#000] text-[24px] my-3">Campaign</h1>
            <div className="flex mb-10">
              <CampignList
                campainChange={(e: any) => {
                  if (e.name == "Sparkle x KNexus") {
                    router.push(
                      `/sparkle/?campaignid=${e.id}&campaign=Sparkle x KNexus`,
                    );
                  }
                  if (e.name == "MBTI - Campaign") {
                    router.push(
                      `/mbti/?campaignid=${e.id}&campaign=MBTI - Campaign`,
                    );
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
