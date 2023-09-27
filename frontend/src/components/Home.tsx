import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { Box, Button, Flex, Image } from "@chakra-ui/react";
import api from "api";
import { Footer, NftCard } from "components";
import { NextSeo } from "components";
import Header from "components/common/Header";
import { motion as m } from "framer-motion";
import { isProduction } from "lib";
import { INftCard } from "lib/types";
import { SyncLoader } from "react-spinners";
import { useUserInfoStore } from "store/userInfoStore";

import Campign from "./common/Campign";
import CarouselScroll from "./result/CarouselScroll";

const Home = () => {
  const id = useUserInfoStore((state) => state.id);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    console.log("process.env.NEXT_PUBLIC_API_DOMAIN", process.env);
  }, []);
  const [nftList, setNftList] = useState<INftCard[]>([]);
  const getCollections = async () => {
    try {
      setLoading(true);
      const res: any = await api.get(`/api/user/collection`, {
        params: {
          pageSize: 100,
          pageNumber: 0,
          user_id: isProduction
            ? "d4927088-2807-49c4-94ae-87a4f024a8fc"
            : "972a9a1d-1d67-4357-b276-34c9a72999e8",
          status: 1,
        },
      });
      if (res && res.list && res.list.length > 0) {
        setNftList(res.list);
        setLoading(false);
      } else {
        setNftList([]);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCollections();
  }, []);

  return (
    <div>
      <NextSeo title="Home | Knexus" />
      <div className="flex flex-col h-full bg-[#fff] text-[#000] font-eurostile">
        <div className="fixed z-20 w-full flex flex-col">
          <Campign />
          <Box
            backdropFilter="blur(100px)"
            w="calc(100% - 80px)"
            m="10px auto"
            borderRadius="full"
            overflow="hidden"
            background="rgba(255, 255, 255, 0.20)"
            boxShadow="0px 0px 10px 0px rgba(0, 0, 0, 0.20)"
          >
            <Header />
          </Box>
        </div>
        <div className="flex-1 overflow-auto">
          <div className="w-full">
            <div className="bg-[url('/images/home/home-bg.jpg')] h-[780px] bg-no-repeat bg-[length:2400px_780px] font-inter font-bold flex items-center relative">
              <div className="flex items-center justify-between gap-20 w-[80%] m-auto">
                <div className="-translate-y-6">
                  <p className="text-[2.6rem]" style={{ lineHeight: 1.2 }}>
                    Web3 & AI
                  </p>
                  <p className="text-[2.6rem]" style={{ lineHeight: 1.2 }}>
                    Prompt Marketplace
                  </p>
                  <p
                    className="text-[2.6rem]"
                    style={{ lineHeight: 1.2 }}
                  >{`Prompt to Earn >>>`}</p>
                  <p className="text-[1rem] mt-6">
                    Discover, create, buy & sell Prompt on KNexus
                  </p>
                  <div className="flex gap-4 mt-6">
                    <Button
                      onClick={() => router.push("/marketplace")}
                      w="160px"
                      size="lg"
                      bg="#000"
                      boxShadow="0px 0px 16px 0px rgba(0, 0, 0, 0.25)"
                      borderRadius="full"
                      _hover={{ background: "rgba(0,0,0,0.5)" }}
                    >
                      Explore
                    </Button>
                    <Button
                      onClick={() => router.push("/create")}
                      w="160px"
                      size="lg"
                      bg="#fff"
                      boxShadow="0px 0px 16px 0px rgba(0, 0, 0, 0.25)"
                      border="1px solid #000"
                      borderRadius="full"
                      color="#000"
                      _hover={{ background: "rgba(0,0,0,0.2)" }}
                    >
                      Sell
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col justify-between items-center w-[30%]">
                  <Image src="/images/home/token-pure.gif" alt="" />
                  <Image src="/images/home/token-buttom.png" alt="" />
                </div>
              </div>
              <div className="absolute bottom-[100px] left-[10%]">
                <div
                  className="inline-flex mobile:gap-4 m-auto tablet:gap-6"
                  style={{ margin: "0 auto" }}
                >
                  <Image
                    src="/images/social/icon1.svg"
                    onClick={() =>
                      window.open("https://twitter.com/KNexus_KNN3")
                    }
                    className="mobile:!w-[30px] tablet:!w-[40px] laptop:!w-[40px] cursor-pointer hover:opacity-80"
                    alt=""
                  />
                  <Image
                    src="/images/social/icon5.svg"
                    onClick={() =>
                      window.open("https://t.me/+PK-CjWDgtDw2N2Zl")
                    }
                    className="mobile:!w-[30px] tablet:!w-[40px] laptop:!w-[40px] cursor-pointer hover:opacity-80"
                    alt=""
                  />
                  <Image
                    src="/images/social/icon2.svg"
                    onClick={() =>
                      window.open("https://discord.com/invite/BabRGjHHWm")
                    }
                    className="mobile:!w-[30px] tablet:!w-[40px] laptop:!w-[40px] cursor-pointer hover:opacity-80"
                    alt=""
                  />
                  <Image
                    src="/images/social/icon4.svg"
                    onClick={() => window.open("https://mirror.xyz/knexus.eth")}
                    className="mobile:!w-[30px] tablet:!w-[40px] laptop:!w-[40px] cursor-pointer hover:opacity-80"
                    alt=""
                  />
                  <Image
                    src="/images/social/icon3.svg"
                    onClick={() =>
                      window.open(
                        "https://www.youtube.com/@KNexus-PromptIgnitesInte",
                      )
                    }
                    className="mobile:!w-[30px] tablet:!w-[40px] laptop:!w-[40px] cursor-pointer hover:opacity-80"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="relative w-full overflow-hidden mb-4">
              <div className="w-full z-20">
                <div className="mb-1">
                  <div className="flex justify-between text-[26px] font-[600] w-[80%] mx-[auto] py-1">
                    <div>Marketplace</div>
                    <div
                      className="cursor-pointer hover:text-[#056DE8]"
                      onClick={() => router.push("/marketplace")}
                    >
                      View More {`${">"}`}
                    </div>
                  </div>
                </div>
                {/* {!loading ? (
                  <div className="w-[80%] mx-auto relative">
                    <CarouselScroll
                      userId="d4927088-2807-49c4-94ae-87a4f024a8fc"
                      type="Prompt"
                      prePositionLeft={-30}
                      prePositionRight={-30}
                      isShowCollectionsCard={false}
                    />
                  </div>
                ) : (
                  <div className="h-[calc(100vh-540px)] w-full flex items-center justify-center">
                    <SyncLoader color="#000" size={20} />
                  </div>
                )} */}
                {!loading ? (
                  <div className="card-grid-column-home w-[80%] mx-[auto]">
                    {nftList.slice(0, 10).map((nft: any, i: number) => (
                      <div>
                        <NftCard key={i} {...nft} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-[calc(100vh-540px)] w-full flex items-center justify-center">
                    <SyncLoader color="#000" size={20} />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className='bg-[url("/images/home/home-bg.jpg")] bg-no-repeat bg-cover'>
            <m.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, transition: { duration: 1 } }}
              className="flex justify-center items-center w-full h-full "
            >
              <div className="laptop:flex laptop:flex-row-reverse laptop:justify-between mobile:block items-center laptop:p-20 mobile:p-8 laptop:text-left mobile:text-center">
                <div className="mr-4 laptop:w-[480px] laptop:mx-20 mobile:w-full mobile:mb-10 laptop:mb-0 self-stretch flex flex-col justify-end">
                  <div className="flex flex-col">
                    <div>
                      <h3 className="text-[36px] font-bold mb-[36px] font-eurostile leading-8">
                        Prompt 2 Earn
                        <br />
                        What is Prompt Point (PP)?
                      </h3>
                      <p className="text-[#000] laptop:text-xl mobile:text-[16px] leading-5">
                        Prompt Points (PP) is a distinctive point system on
                        KNexus, serving as both a digital incentive for
                        creativity and art and a cost associated with using
                        KNexus for content creation, all to recognize and
                        encourage your contributions in creation, sharing, and
                        interaction
                      </p>
                    </div>
                    <Button
                      bg="#D5F95F"
                      color="#000"
                      width="240px"
                      height="52px"
                      fontSize="28px"
                      fontFamily="eurostile"
                      borderRadius="52px"
                      variant="primary"
                      onClick={() =>
                        window.open(
                          "https://mirror.xyz/knexus.eth/GLxSfyUsfPbyNWY-ZLUYxdHoRWnTvJM4SxXdzcI-Vws",
                        )
                      }
                      className="desktop:!inline-flex mobile:!hidden self-end mt-[100px]"
                    >
                      Prompt Point
                    </Button>
                  </div>
                </div>
                <Image
                  className="bg-red laptop:w-[45%] mobile:w-full"
                  src="/images/promtpoint-bottom.png"
                  alt=""
                />
              </div>
            </m.div>
            <m.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, transition: { duration: 1 } }}
              className="flex justify-center items-center w-full h-full "
            >
              <div className="laptop:flex laptop:justify-between mobile:block items-center laptop:p-20 mobile:p-8 laptop:text-left mobile:text-center">
                <div className="mr-4 laptop:w-[480px] laptop:mx-20 mobile:w-full mobile:mb-10 laptop:mb-0 self-stretch flex flex-col justify-end">
                  <div className="flex flex-col">
                    <div>
                      <h3 className="text-[36px] font-bold mb-[36px] font-eurostile leading-7">
                        Generative NFT
                      </h3>
                      <p className="text-[#000] laptop:text-xl mobile:text-[16px] leading-5">
                        KNexus package your Prompt and Content into a Generative
                        NFT, utilizing PromptLock to establish ownership and IP
                        protection of your creative ideas.
                      </p>
                    </div>
                    <Button
                      bg="#D5F95F"
                      color="#000"
                      width="180px"
                      height="52px"
                      fontSize="28px"
                      fontFamily="eurostile"
                      borderRadius="52px"
                      variant="primary"
                      onClick={() => router.push("/create")}
                      className="desktop:!inline-flex mobile:!hidden self-end mt-[100px]"
                    >
                      Create
                    </Button>
                  </div>
                </div>
                <Image
                  className="bg-red laptop:w-[45%] mobile:w-full"
                  src="/images/model1.png"
                  alt=""
                />
              </div>
            </m.div>
            <m.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, transition: { duration: 1 } }}
              className="flex justify-center items-center w-full h-full "
            >
              <div className="laptop:flex laptop:flex-row-reverse laptop:justify-around mobile:block items-center laptop:p-20 mobile:p-8 laptop:text-left mobile:text-center">
                <div className="laptop:mr-4 laptop:w-[480px] laptop:mt-[40px] mobile:mr-0 mobile:w-full mobile:ml-0 mobile:mt-0 mobile:mb-10 laptop:mb-0 self-stretch flex flex-col justify-end">
                  <div className="flex flex-col">
                    <div>
                      <h3 className="laptop:text-[36px] mobile:text-[32px] font-bold text-[#000] mb-[36px] font-eurostile leading-7">
                        Mint your memory
                      </h3>
                      <p className="text-[#000] laptop:text-xl mobile:text-[16px] leading-5">
                        The prompt is actually the crystallization of your
                        skills, experiences, and creativity. Preserve memories
                        with Prompt Point, secure work with PromptLock, and add
                        imagination for future generations - built on your
                        memory!
                      </p>
                    </div>
                    <Button
                      _hover={{ bg: "#D5F95F" }}
                      cursor="default"
                      bg="#D5F95F"
                      color="#000"
                      width="180px"
                      height="52px"
                      fontSize="28px"
                      fontFamily="eurostile"
                      className="desktop:!inline-flex mobile:!hidden self-end mt-[40px]"
                    >
                      Mint
                    </Button>
                  </div>
                </div>
                <Image
                  className="laptop:w-[45%] mobile:w-full laptop:mb-0 p-4"
                  src="/images/model2.png"
                  alt=""
                />
              </div>
            </m.div>
            <m.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, transition: { duration: 1 } }}
              className="flex justify-center items-center w-full h-full "
            >
              <div className="laptop:flex laptop:justify-between mobile:block items-center laptop:p-20 mobile:p-8 laptop:text-left mobile:text-center">
                <div className="laptop:mr-4 laptop:w-[480px] laptop:mx-20 laptop:mb-0 mobile:mr-0 mobile:w-full mobile:mx-0 mobile:mb-10 self-stretch flex flex-col justify-end">
                  <div className="flex flex-col">
                    <div>
                      <h3 className="text-[36px] font-bold text-[#000] mb-[36px] font-eurostile leading-7">
                        Decentralized Distribution
                      </h3>
                      <p className="text-[#000] laptop:text-xl mobile:text-[16px] leading-5">
                        Publish works once and circulate on multiple platforms
                        without account management. This increases the reach,
                        circulation, and popularity of their works while
                        maximizing revenue channels overcoming language and
                        limitations.
                      </p>
                    </div>
                    <Button
                      _hover={{ bg: "#D5F95F" }}
                      cursor="default"
                      bg="#D5F95F"
                      color="#000"
                      width="180px"
                      height="52px"
                      fontSize="28px"
                      fontFamily="eurostile"
                      className="desktop:!inline-flex mobile:!hidden self-end mt-[100px]"
                    >
                      Diffusivity
                    </Button>
                  </div>
                </div>
                <Image
                  className="laptop:w-[55%] mobile:w-full p-4"
                  src="/images/model3.png"
                  alt=""
                />
              </div>
            </m.div>
            <m.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, transition: { duration: 1 } }}
              className="flex justify-center items-center w-full h-full "
            >
              <div className="laptop:flex laptop:flex-row-reverse laptop:justify-center mobile:block items-center laptop:p-20 mobile:p-8 laptop:text-left mobile:text-center">
                <div className="laptop:mr-4 laptop:w-[480px] laptop:ml-[80px] mobile:w-full mobile:mr-0 mobile:ml-0 mobile:mb-10 laptop:mb-0 self-stretch flex flex-col justify-end">
                  <div className="flex flex-col">
                    <div>
                      <h3 className="text-[36px] font-bold text-[#000] mb-[36px] font-eurostile leading-8">
                        Buy and Sell extraordinary <br />
                        Generative NFT
                      </h3>
                      <p className="text-[#000] laptop:text-xl mobile:text-[16px] leading-5">
                        Marketplace facilitates smooth interactions, allowing
                        users to exchange and explore innovative ideas.
                        Furthermore, users can complete posted tasks to earn
                        rewards while leveraging their creative capabilities.
                      </p>
                    </div>
                    <Button
                      bg="#D5F95F"
                      color="#000"
                      width="180px"
                      height="52px"
                      fontSize="28px"
                      borderRadius="52px"
                      variant="primary"
                      fontFamily="eurostile"
                      onClick={() => router.push("/marketplace")}
                      className="desktop:!inline-flex mobile:!hidden self-end mt-[40px]"
                    >
                      Marketplace
                    </Button>
                  </div>
                </div>
                <Image
                  className="laptop:w-[45%] mobile:w-full"
                  src="/images/model4.png"
                  alt=""
                />
              </div>
            </m.div>
          </div>
        </div>
      </div>
      <div className="mt-[60px]">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
