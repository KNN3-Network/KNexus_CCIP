import React, { useEffect, useState } from "react";

import Head from "next/head";
import Image from "next/image";
import NextLink from "next/link";
import Link from "next/link";
import { useRouter } from "next/router";

import { ChevronUpIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Collapse,
  Container,
  Divider,
  Flex,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  OrderedList,
  Text,
  VStack,
  useBoolean,
  useDisclosure,
} from "@chakra-ui/react";
import { Carousel } from "antd";
import NavbarClone from "components/NavbarClone";
import { siteName } from "config/base";
import { AnimatePresence, motion as m } from "framer-motion";
import { TfiPlus } from "react-icons/tfi";

import Logo from "../../../public/images/logo.svg";
import Benefit from "../../../public/images/pandora/benefit.svg";
import Carousel1 from "../../../public/images/pandora/carousel1.svg";
import Carousel2 from "../../../public/images/pandora/carousel2.svg";
import Carousel3 from "../../../public/images/pandora/carousel3.svg";
import ScreenMap1 from "../../../public/images/pandora/screen-map1.svg";
import ScreenMap2 from "../../../public/images/pandora/screen-map2.svg";
import ScreenMap3 from "../../../public/images/pandora/screen-map3.svg";
import ScreenMap4 from "../../../public/images/pandora/screen-map4.svg";
import ScreenMap5 from "../../../public/images/pandora/screen-map5.svg";
import Scroll1 from "../../../public/images/pandora/scroll1.svg";
import Scroll2 from "../../../public/images/pandora/scroll2.svg";
import SocalIcon1 from "../../../public/images/social/icon1.svg";
import SocalIcon2 from "../../../public/images/social/icon2.svg";
import SocalIcon3 from "../../../public/images/social/icon3.svg";
import SocalIcon4 from "../../../public/images/social/icon4.svg";
import SocalIcon5 from "../../../public/images/social/icon5.svg";

const MotionModalContent = m(ModalContent);

const carousels = [Carousel3, Carousel2, Carousel1];
const benefitsTexts = [
  `Automatically become an early adopter of 
KNexus and gain priority access to 
various new features of KNexus.`,

  "Privilege to create using KNexus Scroll.",
  `Early access to 
Prompt Engineer Education content.`,
];

const QaTexts = [
  "What is KNexus-Pandora?",
  "What chain is Pandora on?",
  "How does KNexus - Pandora Collection NFT use Web3 data as the Prompt basis?",
  "How can I get on the waitlist?",
  "How can I stay updated with information?",
];

const QaExplains = [
  "Pandora NFT is the first AIGC co-create generative NFT project on the BNB Chain.",
  "When you Mint a Psyche, you will receive a scroll. A Scroll is a carrier of spells (prompt), and every KNexus - Psyche soul needs to be summoned through a Prompt on a Scroll. There are three types of Scrolls: Coppery, Silver, and Gold. The length of the spells carried by each Scroll varies, with Coppery having the shortest length, Silver having a longer length, and Gold having the longest length.",
  "If you believe you are qualified to serve as a Psyche Ambassador, please submit your application through the Psyche Ambassador recruitment. \nThe relationship between Your 2022 wrapped on Lens NFT and KNexus - Psyche NFT is that Your 2022 wrapped on Lens NFT is the Genesis NFT in the KNN3 Network matrix. Every holder of Your 2022 wrapped on Lens NFT will receive a KNexus - Psyche NFT, which is the highest level Golden Scroll. \n\nHow to claim?",
  "",
  "Please join our waitlist first. We will work with different partners to distribute our whitelist, and we may also hold whitelist lottery events. Please stay tuned for updates from us.",
  "",
  "",
];

export default function Web() {
  const { isOpen, onClose, onOpen, onToggle } = useDisclosure();
  const [progressWidth, setProgressWidth] = useState<number>(0);
  const [hoverIndex, setHoverIndex] = useState<number>(0);
  const [clickIndex, setClickIndex] = useState<number>(0);
  const [isOnMouseHover, setIsOnMouseHover] = useBoolean(false);
  const [showTopBtn, setShowTopBtn] = useBoolean(false);
  const [clientHeight, setClientHeight] = useState(0);
  const [show, setShow] = useState(false);

  const router = useRouter();

  const setClick = (index: any) => {
    setClickIndex(index);
    setShow(!show);
  };

  const shareTwitter = () => {
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `/: Just secured my spot as an early-bird user for this awesome Generative NFT Bazaar @KNexus_KNN3 🔗${siteName}

  /: KNexus——Prompt Ignites Intelligence

  #KNexus #AIGC #GenerativeNFT #Bazaar #Pandoranft`,
    )}&url=${encodeURIComponent(`${siteName}`)}`;
    window.open(shareUrl, "_blank");
  };

  return (
    <>
      <NavbarClone showModal={() => onOpen()} />
      <Modal
        closeOnOverlayClick={false}
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
            <>
              <h3 className="text-[30px] text-[#D5F95F] font-eurostile text-center">
                Sign up for exclusive early-bird access
              </h3>
              <p className="text-[24px] text-[#D5F95F] text-center">
                Please register in the built-in browser of your mobile wallet or
                desktop device for the early bird access!
              </p>
              <Image
                // onClick={() => shareTwitter()}
                src={SocalIcon1}
                alt=""
                className="my-[50px] m-auto w-[50px] cursor-pointer"
              />
            </>
          </ModalBody>
        </MotionModalContent>
      </Modal>
      <Container
        maxW="full"
        minH="100vh"
        p="0"
        className="tablet:mt-[145px] mobile:mt-[100px]"
      >
        <div
          className="h-[100vh] -translate-y-20 laptop:flex laptop:flex-row laptop:items-center laptop:justify-center laptop:gap-14 laptop:px-20
					mobile:flex mobile:flex-col-reverse mobile:justify-center mobile:items-center"
        >
          <div className="flex flex-col justify-center gap-10 mobile:mb-10">
            <h1
              className="text-white desktop:text-[80px] laptop:text-[58px] mobile:text-[28px] laptop:leading-[4rem] laptop:font-swis721BT
							tablet:text-[40px]
							mobile:font-eurostile mobile:leading-[2.5rem]"
            >
              <span className="mobile:hidden laptop:inline">KNexus</span>
              <br />
              Pandora Collection
            </h1>
            <p className="mobile:text-center laptop:text-left">
              <button
                className="bg-[#D5F95F] tect-black desktop:text-[28px] font-swis721BT rounded-full desktop:w-[380px] desktop:h-[80px]
								laptop:text-[24px] laptop:w-[320px] laptop:h-[60px]
								tablet:text-[22px] tablet:w-[280px] tablet:h-[50px]
								mobile:text-[20px] mobile:w-[244px] mobile:h-[44px] mobile:font-eurostile laptop:mr-6
								"
                onClick={() =>
                  window.open("https://form.typeform.com/to/a5TZxeak")
                }
              >
                JOIN THE WAITLIST
              </button>
              <span className="text-[#fff] mt-4 text-[20px] font-eurostile mobile:hidden laptop:inline-block">
                In queue: 7000+
              </span>
            </p>
          </div>
          <div className="relative shrink-0">
            <Carousel
              effect="fade"
              className="desktop:w-[600px] desktop:h-[600px] laptop:w-[450px] laptop:h-[450px] tablet:w-[500px] tablet:h-[500px] mobile:w-[200px] mobile:h-[200px]"
              dots={false}
              autoplay
            >
              {carousels.map((item, index) => (
                <div className="border-solid border-[#D5F95F] border-4 laptop:p-4 mobile:p-[1px] rounded-2xl">
                  <Image src={item} alt="" />
                </div>
              ))}
            </Carousel>
            {/* <div className="text-white flex gap-1 justify-center items-center py-4">
              {carousels.map((item) => (
                <div className="w-[80px] h-[12px] bg-[#D5F95F] rounded-full cursor-pointer"></div>
              ))}
            </div> */}
          </div>
        </div>
        <div>
          <h2 className="text-[#D5F95F] font-bold text-6xl text-center font-stretchPro">
            <hr className="bg-[#D5F95F] h-[6px] mobile:hidden laptop:block" />
            <p className="bg-[#000] -translate-y-1/2 inline-block px-4 desktop:text-[52px] laptop:text-[44px] tablet:text-[36px] mobile:text-[32px]">
              About Pandora NFT
            </p>
          </h2>
          <div className="text-white font-swis721BT">
            <p className="text-center font-bold p-6 desktop:text-[23px] laptop:text-[23px] tablet:text-[23px] mobile:text-[12px] tablet:w-[70%] mobile:w-[90%] m-auto">
              We are tired of PFP projects that have no meaningful connection to
              our own creativity and fail to fully represent our personality.{" "}
              User-generated NFTs should be created by users themselves. The
              rapid development of AI has lowered the barriers to creativity,
              allowing us to create NFT artworks in our own unique style.
            </p>
            <p className="text-center font-bold p-6 desktop:text-[23px] laptop:text-[23px] tablet:text-[23px] mobile:text-[12px] tablet:w-[70%] mobile:w-[90%] m-auto">
              Pandora is a magical NFT project that fully inspires users'
              creative and aesthetic abilities. When you mint Pandora, you will
              receive a scroll. Don't rush, as it requires an incantation to
              unleash its power. To ensure the connection between your NFT and
              your personal identity, part of the incantation is composed of
              your on-chain footprint, while the other part is custom input on
              the KNexus website. Once these two elements merge into a complete
              prompt, the AI generation engine and Pandora model of KNexus will
              create a unique NFT that is exclusively yours.
            </p>
            <p className="text-center p-6 text-l laptop:text-[23px] tablet:text-[23px] mobile:text-[12px] mobile:text-[#D5F95F] tablet:text-white">
              🌟Join the Twitter Giveaway and Discord community events for a
              chance to win a Pandora NFT airdrop.
            </p>
            <div
              className="flex my-4
              mobile:justify-center mobile:gap-2
              tablet:gap-8"
            >
              <Image
                src={SocalIcon1}
                onClick={() => window.open("https://twitter.com/KNexus_KNN3")}
                className="mobile:!w-[30px] tablet:!w-[40px] laptop:!w-[40px] cursor-pointer"
                alt=""
              />
              <Image
                src={SocalIcon2}
                onClick={() =>
                  window.open("https://discord.com/invite/BabRGjHHWm")
                }
                className="mobile:!w-[30px] tablet:!w-[40px] laptop:!w-[40px] cursor-pointer"
                alt=""
              />
            </div>
          </div>
          <div className="text-[#D5F95F]">
            <h2 className="laptop:bg-[#D5F95F] mobile:text-[#D5F95F] laptop:text-black font-bold text-center py-2 font-stretchPro desktop:text-[52px] laptop:text-[44px] tablet:text-[36px] mobile:text-[32px]">
              How to casting with the Scroll
            </h2>
            <div className="mobile:w-[90%] mobile:h-[350px] m-auto tablet:w-[86%] tablet:h-[400px] laptop:w-[1000px] laptop:h-[560px] my-[150px]">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/nAMcnOWOI6g?rel=0"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
            <div className="pt-20 pr-20 laptop:block mobile:hidden">
              <Image src={Scroll2} className="translate-y-2" alt="" />
            </div>
            <div className="laptop:hidden mobile:block py-20">
              <ul className="flex flex-col mobile:w-[90%] tablet:w-[80%] m-auto">
                <li className="flex items-center mb-10">
                  <div className="w-[36px] h-[36px] border-4 border-solid rounded-full border-[#D5F95F] justify-center flex items-center font-[16px] font-eurostile shrink-0">
                    1
                  </div>
                  <Image src={ScreenMap1} className="mx-[24px]" alt="" />
                  <p className="font-eurostile mobile:text-[12px] tablet:text-[23px]">
                    Mint your Pandora Scroll.where you can write your unique
                    prompt.
                  </p>
                </li>
                <li className="flex items-center mb-10">
                  <div className="w-[36px] h-[36px] border-4 border-solid rounded-full border-[#D5F95F] justify-center flex items-center font-[16px] font-eurostile shrink-0">
                    2
                  </div>
                  <Image src={ScreenMap2} className="mx-[24px]" alt="" />
                  <p className="font-eurostile mobile:text-[12px] tablet:text-[23px]">
                    The core prompt is based on your on-chain footprints.
                  </p>
                </li>
                <li className="flex items-center mb-10">
                  <div className="w-[36px] h-[36px] border-4 border-solid rounded-full border-[#D5F95F] justify-center flex items-center font-[16px] font-eurostile shrink-0">
                    3
                  </div>
                  <Image src={ScreenMap3} className="mx-[24px]" alt="" />
                  <p className="font-eurostile mobile:text-[12px] tablet:text-[23px]">
                    Write your own half of text prompt on Pandora Scroll with
                    your aesthetic preference and personality traits.
                  </p>
                </li>
                <li className="flex items-center mb-10">
                  <div className="w-[36px] h-[36px] border-4 border-solid rounded-full border-[#D5F95F] justify-center flex items-center font-[16px] font-eurostile shrink-0">
                    4
                  </div>
                  <Image src={ScreenMap4} className="mx-[24px]" alt="" />
                  <p className="font-eurostile mobile:text-[12px] tablet:text-[23px]">
                    The Scroll unfolds, inscribed with the enchanting prompt,
                    here presents you 3 images with your co-creation and choose
                    one as your ultimate Pandora.
                  </p>
                </li>
                <li className="flex items-center mb-10">
                  <div className="w-[36px] h-[36px] border-4 border-solid rounded-full border-[#D5F95F] justify-center flex items-center font-[16px] font-eurostile shrink-0">
                    5
                  </div>
                  <Image src={ScreenMap5} className="mx-[24px]" alt="" />
                  <p className="font-eurostile mobile:text-[12px] tablet:text-[23px]">
                    Voila, the Scroll turns into your digital asset, KNexus -
                    Pandora.
                  </p>
                </li>
              </ul>
            </div>
            <p className="h-[40px] bg-[#D5F95F]"></p>
          </div>
        </div>
        <Box pos="relative" w="100vw">
          <h2 className="text-[#D5F95F] text-center text-[58px] font-stretchPro flex justify-center items-center mobile:my-[60px] laptop:my-[140px]">
            <div className="bg-[#D5F95F] h-[6px] flex-1 rounded-r-full" />
            <p className="bg-[#000] inline-block desktop:text-[52px] laptop:text-[44px] tablet:text-[36px] mobile:text-[32px] px-4">
              Roadmap
            </p>
            <div className="bg-[#D5F95F] h-[6px] flex-1 rounded-l-full"></div>
          </h2>
          <Center mt="20px" w="full">
            <VStack color="#fff">
              <HStack alignItems="flex-start" w="full">
                <div className="tablet:w-[200px] mobile:w-[140px] text-[26px] font-stretchPro font-semibold -mt-[2px] text-[#D5F95F]">
                  <span className="mobile:text-[16px] tablet:text-[26px]">
                    2023 Q2
                  </span>
                </div>
                <div className="font-swis721hv mobile:text-[14px] tablet:text-[23px]">
                  <Text>Pandora Pre-launch</Text>
                  <Text>Pandora MKT Events</Text>
                  <Text>KNexus Pre-launch</Text>
                </div>
              </HStack>
              <Box w="full">
                <Divider
                  orientation="vertical"
                  h="70px"
                  borderLeftWidth="1.5px"
                  opacity="0"
                  ml="80px"
                  mt="-15px"
                  mb="10px"
                />
              </Box>
              <HStack alignItems="flex-start" w="full">
                <div className="tablet:w-[200px] mobile:w-[140px] text-[26px] font-stretchPro font-semibold -mt-[2px] text-[#D5F95F]">
                  <span className="mobile:text-[16px] tablet:text-[26px]">
                    2023 Q3
                  </span>
                </div>
                <div className="font-swis721hv mobile:text-[14px] tablet:text-[23px]">
                  <Text>KNexus Official Launch</Text>
                  <Text>KNexus Create tools</Text>
                  <Text>KNexus Bazaar</Text>
                  <Text>KNeuxs Education</Text>
                </div>
              </HStack>
              <Box w="full">
                <Divider
                  orientation="vertical"
                  h="100px"
                  borderLeftWidth="1.5px"
                  opacity="0"
                  ml="80px"
                  mt="-80px"
                  mb="10px"
                />
              </Box>
              <HStack alignItems="flex-start" w="full">
                <Text className="tablet:w-[200px] mobile:w-[140px] text-[26px] font-stretchPro font-semibold -mt-[2px] text-[#D5F95F]">
                  <span className="mobile:text-[16px] tablet:text-[26px]">
                    2023 Q4
                  </span>
                </Text>
                <div className="font-swis721hv mobile:text-[14px] tablet:text-[23px]">
                  <Text>KNexus Bounty</Text>
                  <Text>KNexus Co-Create</Text>
                  <Text>KNexus Creator System</Text>
                </div>
              </HStack>
            </VStack>
          </Center>
        </Box>
        <Box pos="relative" w="100vw">
          <h2 className="text-[#D5F95F] text-center text-[58px] font-stretchPro flex justify-center items-center mobile:my-[60px] laptop:my-[140px]">
            <div className="bg-[#D5F95F] h-[6px] flex-1 rounded-r-full" />
            <p className="bg-[#000] inline-block px-4 desktop:text-[52px] laptop:text-[44px] tablet:text-[36px] mobile:text-[32px]">
              Benefits
            </p>
            <div className="bg-[#D5F95F] h-[6px] flex-1 rounded-r-full" />
          </h2>
          <div className="laptop:flex mobile:block mb-[120px] mt-[20px] m-auto laptop:w-[80%] mobile:w-[90%]">
            <div className="laptop:w-[55%] mobile:w-full">
              <OrderedList
                px="6%"
                fontWeight="semibold"
                lineHeight="28px"
                color="#fff"
                whiteSpace="pre-wrap"
              >
                {benefitsTexts.map((item, index) => {
                  return (
                    <Flex
                      display="flex"
                      key={index}
                      whiteSpace="pre-wrap"
                      w="full"
                    >
                      <Box
                        w="15px"
                        h="15px"
                        mr="10px"
                        bg="#D5F95F"
                        boxShadow="0px 4px 6px rgba(0, 0, 0, 0.2)"
                        backdropFilter="blur(4px)"
                        borderRadius="10px"
                        mt="4px"
                      >
                        <Center w="full" h="full">
                          <Box w="5px" h="5px" borderRadius="3px" bg="#000" />
                        </Center>
                      </Box>
                      <Box flex="1">
                        <div
                          className="mb-[26px] font-swis721BT desktop:text-[23px] laptop:text-[23px] 
													tablet:text-[23px] mobile:text-[12px] desktop:leading-7
													laptop:leading-7 tablet:leading-7 mobile:leading-5"
                        >
                          {item}
                        </div>
                      </Box>
                    </Flex>
                  );
                })}
              </OrderedList>
            </div>
            <Image
              className="mt-2 laptop:w-[45%] mobile:w-full shrink-0"
              src={Benefit}
              alt=""
            />
          </div>
        </Box>
        <Box pos="relative" w="100vw">
          <h2 className="text-[#D5F95F] text-center text-[58px] font-stretchPro flex items-center justify-center mobile:my-[60px] laptop:my-[140px]">
            <div className="bg-[#D5F95F] h-[6px] flex-1 rounded-r-full" />
            <p className="bg-[#000] inline-block px-4 desktop:text-[52px] laptop:text-[44px] tablet:text-[36px] mobile:text-[32px]">
              FAQ
            </p>
            <div className="bg-[#D5F95F] h-[6px] flex-1 rounded-l-full" />
          </h2>
          <Box w="100vw">
            <VStack
              color="#fff"
              h="full"
              justify="flex-start"
              mt="20px"
              mb="120px"
              spacing="0"
            >
              {QaTexts.map((item, index) => {
                return (
                  <Box
                    w="full"
                    key={index}
                    h={clickIndex === index && show ? "auto" : "80px"}
                    lineHeight="80px"
                    cursor="pointer"
                    color="#fff"
                    pos="relative"
                    onMouseMove={() => {
                      setIsOnMouseHover.on();
                      setHoverIndex(index);
                    }}
                    onMouseLeave={setIsOnMouseHover.off}
                  >
                    <Box
                      h="80px"
                      pos="absolute"
                      bg="#D5F95F"
                      w={
                        clickIndex === index && show ? "full!important" : "full"
                      }
                      zIndex="1"
                      className={
                        hoverIndex === index && isOnMouseHover
                          ? "enterColorAni"
                          : "leaveColorAni"
                      }
                    />
                    <HStack
                      pos="absolute"
                      w="90%"
                      h="80px"
                      align="flex-start"
                      justify="space-between"
                      zIndex="2"
                      borderBottomWidth="1.5px"
                      borderColor="#fff"
                      color={
                        clickIndex === index && show ? "#000!important" : "#fff"
                      }
                      className={
                        hoverIndex === index && isOnMouseHover
                          ? "enterTextColorAni"
                          : "leaveTextColorAni"
                      }
                    >
                      <div
                        className="mobile:pl-[40px]
                        tablet:pl-[80px] w-full font-semibold mobile:text-[16px] tablet:text-[23px] font-swis721hv marquee"
                        style={{ containerType: "inline-size" }}
                        onClick={() => setClick(index)}
                      >
                        <span>{item}</span>
                      </div>
                      <Box mt="20px">
                        <Icon
                          as={TfiPlus}
                          fontWeight="light"
                          boxSize={8}
                          onClick={() => setClick(index)}
                          transform={
                            clickIndex === index && show
                              ? "rotate(45deg)"
                              : "rotate(0deg)"
                          }
                          transitionDuration=".5s"
                        />
                      </Box>
                    </HStack>
                    <Collapse
                      in={clickIndex === index && show}
                      animateOpacity
                      style={{ marginTop: "80px" }}
                    >
                      <Box
                        w="90%"
                        fontSize="20px"
                        lineHeight="28px"
                        whiteSpace="pre-wrap"
                        fontFamily="Swiss721BT-Medium"
                      >
                        <div className="tablet:py-[50px] mobile:py-[30px] tablet:p-[80px] mobile:p-[40px]">
                          {index === 0 ? (
                            <Box w="full">
                              <div className="mobile:font-inter tablet:font-swis721BT mobile:text-[12px] tablet:text-[20px] tablet:leading-[25px] mobile:leading-4">
                                Pandora is an NFT project featuring AIGC
                                co-creation. Unlike general PFP projects,
                                Pandora NFTs are generated by owners with the
                                help of an AI generation engine and Pandora
                                model from KNexus. The prompts used in the AI
                                engine consists of two parts. One part is based
                                on users' on-chain footprint, and the other part
                                is where the users get to input on the KNexus
                                website. Together, a generative NFT image with
                                distinctive Pandora-themed characteristics is
                                created.
                              </div>
                            </Box>
                          ) : index === 1 ? (
                            <div className="mobile:font-inter tablet:font-swis721BT mobile:text-[12px] tablet:text-[20px] tablet:leading-[25px] mobile:leading-4">
                              Pandora NFT is the first AIGC co-create generative
                              NFT project on the BNB Chain.
                            </div>
                          ) : index === 2 ? (
                            <Box w="full">
                              <div className="mobile:font-inter tablet:font-swis721BT mobile:text-[12px] tablet:text-[20px] tablet:leading-[25px] mobile:leading-4">
                                The KNexus - Pandora Collection NFT is a project
                                that combines Web3 and AIGC features. Users can
                                participate in the creation of the NFTs by
                                co-creating a complete "Prompt" using Web3 data,
                                text, and images. This allows users to customize
                                their NFT images through AI co-creation and bind
                                product rights to the intrinsic value of
                                Non-Fungible Tokens.
                              </div>
                              <br />
                              <div className="mobile:font-inter tablet:font-swis721BT mobile:text-[12px] tablet:text-[20px] tablet:leading-[25px] mobile:leading-4">
                                KNN3's KNexus NFT has opened up a new paradigm
                                in the NFT field. Using the Web3 Data - Text -
                                Image image-making chain, KNN3's data graph
                                becomes the data support. Through the deep
                                analysis of users' various dimensions of
                                on-chain data, these insights from Web3 data are
                                encrypted into "Text Prompts", providing each
                                NFT with a unique value structure.
                              </div>
                              <br />
                              <div className="mobile:font-inter tablet:font-swis721BT mobile:text-[12px] tablet:text-[20px] tablet:leading-[25px] mobile:leading-4">
                                KNN3's data graph classifies Web3 data according
                                to its nature and features. In the rich data
                                graph, the user's six core dimensions of
                                on-chain footprints are combined into a
                                six-dimensional evaluation model: Possession,
                                Follow, Bond, Attendance, Governance, and Lens.
                                These insights from Web3 data are encrypted into
                                the first half of the complete "Text Prompt",
                                and users complete the other half of the
                                "Prompt" based on their personal aesthetic
                                preferences and personality through interaction
                                at the Typography product front-end, co-creating
                                an AI Avatar with the user.
                              </div>
                            </Box>
                          ) : index === 3 ? (
                            <Box w="full">
                              <div className="mobile:font-inter tablet:font-swis721BT mobile:text-[12px] tablet:text-[20px] tablet:leading-[25px] mobile:leading-4">
                                As the first AIGC co-create generative NFT
                                project, we aim for Pandora's holders to be
                                individuals interested in AI generation and
                                NFTs. If you would like to be whitelisted,
                                please join our community and participate in our
                                diverse AI generation activities on
                                <NextLink
                                  target="_blank"
                                  href="https://discord.gg/BabRGjHHWm"
                                  style={{
                                    color: "#74a5e7",
                                    borderBottom: "solid 1px #74a5e7",
                                    marginLeft: "5px",
                                  }}
                                >
                                  Discord
                                </NextLink>
                                .
                              </div>
                            </Box>
                          ) : (
                            <Box w="full">
                              <div className="mobile:font-inter tablet:font-swis721BT mobile:text-[12px] tablet:text-[20px] tablet:leading-[25px] mobile:leading-4">
                                Follow the official Twitter account{" "}
                                <NextLink
                                  target="_blank"
                                  href="https://twitter.com/KNexus_KNN3"
                                  style={{
                                    color: "#74a5e7",
                                    borderBottom: "solid 1px #74a5e7",
                                    marginLeft: "5px",
                                    marginRight: "5px",
                                  }}
                                >
                                  @KNexus_KNN3.
                                </NextLink>
                                All announcements will be posted there. We will
                                never suddenly go live on the chain. Beware of
                                impersonators and scammers, and always check if
                                you are on the official Twitter website.
                              </div>
                            </Box>
                          )}
                        </div>
                      </Box>
                    </Collapse>
                  </Box>
                );
              })}
            </VStack>
          </Box>
        </Box>
      </Container>
    </>
  );
}
