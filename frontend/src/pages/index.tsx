import React, { useCallback, useEffect, useState } from "react";

import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { Box, Image } from "@chakra-ui/react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import api from "api";
import { Header, NextSeo } from "components";
import Navbar from "components/Navbar";
import Campign from "components/common/Campign";
import { siteName } from "config/base";
import { AnimatePresence, motion as m } from "framer-motion";
import useWeb3Context from "hooks/useWeb3Context";
import { isPhone } from "lib/tool";
import { ButtonClickTrace } from "lib/trace";
import lodash from "lodash";
import { Section, SectionsContainer } from "react-fullpage";
import { useUserInfoStore } from "store/userInfoStore";
import { useWalletStore } from "store/walletStore";

const Producthunt = "/images/home/producthunt.svg";
const SocialIcon1 = "/images/social/icon1.svg";
const SocialIcon2 = "/images/social/icon2.svg";
const SocialIcon3 = "/images/social/icon3.svg";
const SocialIcon4 = "/images/social/icon4.svg";
const SocialIcon5 = "/images/social/icon5.svg";

const MotionModalContent = m(ModalContent);

let clientY = 0;

let options = {
  sectionClassName: "section",
  anchors: ["one", "two", "three", "four", "five", "six"],
  scrollBar: false,
  navigation: true,
  verticalAlign: false,
  arrowNavigation: true,
};

const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
  `/: Just secured my spot as an early-bird user for this awesome Generative NFT Bazaar @KNexus_KNN3 🔗${siteName}

/: KNexus——Prompt Ignites Intelligence

#KNexus #AIGC #GenerativeNFT #Bazaar #Pandoranft`,
)}&url=${encodeURIComponent(`${siteName}`)}`;

export default function home() {
  const [herf, setHerf] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setJwt } = useWalletStore();
  const router = useRouter();
  const finalRef = React.useRef(null);
  const {
    earlyBird,
    connectWallet,
    coupon,
    couponed,
    getUserInfo,
    setCouponed,
    setCoupon,
  } = useWeb3Context();
  const [isMobile, setIsMobile] = useState(false);
  const { setUserStoreInfo, clearUserInfo } = useUserInfoStore();

  useEffect(() => {
    if (isPhone()) {
      setIsMobile(isPhone());
      return;
    }
  }, []);

  const connectClick = async () => {
    ButtonClickTrace("early-bird");
    const res = await connectWallet();
    try {
      if (res) {
        await earlyBird(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setHerf(router.asPath);
  }, [router]);

  const debouncedWhell = useCallback(
    lodash.throttle((value: string) => {
      let routerArr = router.asPath.split("");
      let index = routerArr[routerArr.length - 1];
      if (value === "up") {
        if (index === "/") {
          setHerf("/#2");
          router.push("/#2");
        } else if (index !== "7") {
          setHerf(`/#${Number(index) + 1}`);
          router.push(`/#${Number(index) + 1}`);
        }
      } else {
        if (index === "/" || index === "1") {
          return;
        } else {
          router.push(`/#${Number(index) - 1}`);
          setHerf(`/#${Number(index) - 1}`);
        }
      }
    }, 500),
    [router],
  );

  const handleWhell = (event: any) => {
    // 获取滚轮滚动的距离
    const delta = event.deltaY;
    if (delta < 0) {
      // 向下滑动
      debouncedWhell("down");
    } else {
      // 向上滑动
      debouncedWhell("up");
    }
  };

  const fingerstart = (e: any) => {
    clientY = e.changedTouches[0].clientY;
  };

  const fingerend = (e: any) => {
    const subY = e.changedTouches[0].clientY - clientY;
    if (subY > 0) {
      // 向下滑动
      debouncedWhell("down");
    } else if (subY < 0) {
      // 向上滑动
      debouncedWhell("up");
    }
    clientY = 0;
  };

  useEffect(() => {
    if (router && router.query && router.query.j) {
      const jwtCode: any = router.query.j;
      const res = JSON.parse(atob(jwtCode));
      console.log("res", res);
      if (res && res.data.accessToken) {
        setJwt(res.accessToken);
        api.defaults.headers.authorization = `Bearer ${res.data.accessToken}`;
        getEarlyInfo();
      }
    }
  }, [router]);

  const getEarlyInfo = async () => {
    const res1: any = await api.get(`/api/user`);
    if (res1 && res1.id) {
      onOpen();
      // setUserStoreInfo({ ...res1 })
      if (res1.is_first == 1) {
        setCouponed(true);
        coupon;
      }
      if (res1.coupon) setCoupon(res1.coupon);
    }
  };

  return (
    <>
      <NextSeo title="KNexus | Prompt Marketplace" />
      <div className="text-[#000]">
        <div className="laptop:hidden">
          <Navbar showModal={() => onOpen()} />
        </div>
        <div className="fixed z-20 w-full hidden flex-col laptop:flex">
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
        <Modal
          closeOnOverlayClick={false}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
          isCentered
          size="2xl"
        >
          <ModalOverlay />
          <MotionModalContent
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: "circOut" }}
          >
            <div className="border-[2px] border-[#D5F95F] rounded-[10px]">
              <ModalCloseButton
                top="16px"
                right="16px"
                border="2px solid #D5F95F"
                width="40px"
                height="40px"
                fontSize="24px"
                color="#D5F95F"
                _hover={{ color: "#000", bg: "#D5F95F" }}
              />
              <ModalBody m="auto" mb="60px" mt="100px" textAlign="center">
                {isMobile ? (
                  <>
                    <h3 className="text-[30px] text-[#D5F95F] font-eurostile text-center">
                      Sign up for exclusive early-bird access
                    </h3>
                    <p className="text-[24px] text-[#D5F95F] text-center">
                      Please register in the built-in browser of your mobile
                      wallet or desktop device for the early bird access!
                    </p>
                    <Link href={twitterShareUrl}>
                      <Image
                        src={SocialIcon1}
                        alt=""
                        className="my-[50px] m-auto w-[50px] cursor-pointer"
                      />
                    </Link>
                  </>
                ) : (
                  <>
                    <h3 className="text-[30px] text-[#D5F95F] font-eurostile text-center">
                      Sign up for exclusive early-bird access
                    </h3>
                    <p className="text-[16px] text-[#D5F95F] text-center">
                      Connect Wallet & Sign in, You will move up 200 scrolls
                    </p>

                    <div className="flex gap-[50px] justify-center my-5">
                      <Link href={"https://www.producthunt.com/posts/knexus"}>
                        <Image
                          src={Producthunt}
                          alt=""
                          className="w-[50px] cursor-pointer"
                        />
                      </Link>
                      <Link href={twitterShareUrl}>
                        <Image
                          src={SocialIcon1}
                          alt=""
                          className="w-[50px] cursor-pointer"
                        />
                      </Link>
                    </div>
                    <div className="my-5 text-[16px]">
                      Give KNexus a positive review👀
                    </div>
                    <div className="flex justify-center items-center">
                      <div>
                        <Button
                          onClick={() => {
                            router.push("/login?from=early");
                            ButtonClickTrace(`early-bird`);
                          }}
                          width="280px"
                          height="60px"
                          fontFamily="eurostile"
                          border="2px solid #D5F95F"
                          bg="#000"
                          fontSize="18px"
                          color="#D5F95F"
                          _hover={{ color: "#000", bg: "#D5F95F" }}
                        >
                          Sign up
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </ModalBody>
            </div>
          </MotionModalContent>
        </Modal>
        <SectionsContainer {...options}>
          <Section className="custom-section">
            <m.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, transition: { duration: 1 } }}
              className="flex items-center w-full h-full"
            >
              <div className="bg-[url('/images/home/home-bg.jpg')] h-full bg-no-repeat bg-[length:2400px_780px] font-inter font-bold flex items-center relative w-full">
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
                  <div className="inline-flex mobile:gap-4 m-auto tablet:gap-6">
                    <SocialLinkComponents />
                  </div>
                </div>
              </div>
            </m.div>
          </Section>
          <Section className="custom-section">
            <m.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, transition: { duration: 1 } }}
              className='flex justify-center items-center w-full h-full bg-[url("/images/home/home-bg.jpg")] bg-no-repeat bg-[length:2400px_780px]'
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
                        router.push(
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
          </Section>
          <Section className="custom-section">
            <m.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, transition: { duration: 1 } }}
              className='flex justify-center items-center w-full h-full bg-[url("/images/home/home-bg.jpg")] bg-no-repeat bg-[length:2400px_780px]'
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
          </Section>
          <Section>
            <m.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, transition: { duration: 1 } }}
              className='flex justify-center items-center w-full h-full bg-[url("/images/home/home-bg.jpg")] bg-no-repeat bg-[length:2400px_780px]'
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
          </Section>
          <Section>
            <m.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, transition: { duration: 1 } }}
              className='flex justify-center items-center w-full h-full bg-[url("/images/home/home-bg.jpg")] bg-no-repeat bg-[length:2400px_780px]'
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
          </Section>
          <Section>
            <m.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, transition: { duration: 1 } }}
              className='flex justify-center items-center w-full h-full bg-[url("/images/home/home-bg.jpg")] bg-no-repeat bg-[length:2400px_780px]'
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
          </Section>
        </SectionsContainer>
      </div>
    </>
  );
}

const SocialLinkComponents = () => {
  return (
    <>
      <Link href={"https://twitter.com/KNexus_KNN3"}>
        <Image
          src={SocialIcon1}
          className="mobile:!w-[30px] tablet:!w-[40px] laptop:!w-[40px] cursor-pointer"
          alt=""
        />
      </Link>
      <Link href={"https://discord.com/invite/BabRGjHHWm"}>
        <Image
          src={SocialIcon2}
          className="mobile:!w-[30px] tablet:!w-[40px] laptop:!w-[40px] cursor-pointer"
          alt=""
        />
      </Link>
      <Link href={"https://t.me/+PK-CjWDgtDw2N2Zl"}>
        <Image
          src={SocialIcon5}
          className="mobile:!w-[30px] tablet:!w-[40px] laptop:!w-[40px] cursor-pointer"
          alt=""
        />
      </Link>
      <Link href={"https://www.youtube.com/@KNexus-PromptIgnitesInte"}>
        <Image
          src={SocialIcon3}
          className="mobile:!w-[30px] tablet:!w-[40px] laptop:!w-[40px] cursor-pointer"
          alt=""
        />
      </Link>
      <Link href={"https://mirror.xyz/knexus.eth"}>
        <Image
          src={SocialIcon4}
          className="mobile:!w-[30px] tablet:!w-[40px] laptop:!w-[40px] cursor-pointer"
          alt=""
        />
      </Link>
    </>
  );
};
