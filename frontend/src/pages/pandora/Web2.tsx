import React, { useEffect, useState } from "react";

import Head from "next/head";
import NextLink from "next/link";

import { ChevronUpIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Collapse,
  Container,
  Divider,
  Flex,
  HStack,
  Icon,
  Image,
  OrderedList,
  Text,
  VStack,
  useBoolean,
  useDisclosure,
} from "@chakra-ui/react";
import { TfiPlus } from "react-icons/tfi";

const BgFilter = ({
  size,
  left,
  top,
  right,
  bottom,
}: {
  size: number;
  left?: string;
  top?: string;
  right?: string;
  bottom?: string;
}) => {
  return (
    <Box
      pos="absolute"
      w={`${size}px`}
      h={`${size}px`}
      left={left}
      top={top}
      right={right}
      bottom={bottom}
      bg="rgba(240, 242, 244, 0.1)"
      boxShadow="0px 4px 6px rgba(0, 0, 0, 0.2)"
      backdropFilter="blur(4px)"
      borderRadius={`${size / 2}px`}
      zIndex={1}
    />
  );
};

const TitleBg = ({ title }: { title?: string }) => {
  return (
    <Box
      w="100vw"
      h="80px"
      bgImg="url(images/psyche/intro-title-bg.png)"
      bgSize="100% auto"
      backdropFilter="blur(4px)"
      position="absolute"
      top="0"
    >
      <Text
        textAlign="center"
        h="full"
        fontSize="34px"
        fontWeight="semibold"
        fontFamily="StretchPro"
        color="#fff"
        lineHeight="80px"
      >
        {title}
      </Text>
    </Box>
  );
};

export default function Web() {
  const { isOpen, onClose, onOpen, onToggle } = useDisclosure();
  const [progressWidth, setProgressWidth] = useState<number>(0);
  const [hoverIndex, setHoverIndex] = useState<number>(0);
  const [clickIndex, setClickIndex] = useState<number>(0);
  const [isOnMouseHover, setIsOnMouseHover] = useBoolean(false);
  const [showTopBtn, setShowTopBtn] = useBoolean(false);
  const [clientHeight, setClientHeight] = useState(0);

  const titles = ["Story", "Psyche", "Roadmap", "Benefits", "FAQ"];
  const storeLineTexts = [
    "K opened his sleepy eyes and furrowed his brow. \n \nStaring in confusion at the faint shimmer in his hands. \n \nSlowly, it unfurled, ushering in a new era of Web3.",
    "K wakes up from sleep. \n \nIn the prism's refracted brilliance, another alien figure sparkles. \n \nK reaches out to touch the prism, and a clear form is illuminated in the cold, shining object - K's soul.",
    "As the sole creator of the digital world, K created it with one hand. \n \nbut the centralized black hole limited K's creative power, sealing off K's creativity.",
    "K intends to return to the glory of creation, taking on the challenge of imitative games on an adventure. \n \n'A mirror makes the image, a lens reveals the truth.' \n \nK' is the soul of imitative games - Psyche.",
    "Looking at K waking up, \nK' is already sitting upright and exhales a sigh of relief. \n \nIt seems that the imitative games played by K during sleep have already achieved initial success.",
    "K' not only replicates K's digital DNA, but also acquires K's intelligence in imitative games. \n \nWith the accompany of K', K finally gains the weapon and power to fight against the black hole...",
  ];

  const benefitsTexts = [
    "Holders have the right to draw AI Avatars.",
    "Holders can replace their KNexus - Psyche NFTs with profile avatars from KNN3 products.",
    "Holders can obtain browsing rights for TopScore, a product of KNN3.",
    "Holders can obtain partial data rights for TopScore, a product of KNN3.",
    "Holders can obtain functional rights for the initial launch of new features on TopScore.",
    "Holders can obtain threshold community rights of KNN3.",
  ];

  const QaTexts = [
    "What is KNexus - Psyche?",
    "What is a Scroll?",
    "What is the relationship between 2022 TopScore NFT and KNexus - Psyche NFT?",
    "How does KNexus - Psyche Collection NFT use Web3 data as the Prompt basis?",
    "How can I get on the whitelist?",
    "What is the Psyche Ambassador recruitment?",
    "How can I stay updated with information?",
  ];

  const QaExplains = [
    "",
    "When you Mint a Psyche, you will receive a scroll. A Scroll is a carrier of spells (prompt), and every KNexus - Psyche soul needs to be summoned through a Prompt on a Scroll. There are three types of Scrolls: Coppery, Silver, and Gold. The length of the spells carried by each Scroll varies, with Coppery having the shortest length, Silver having a longer length, and Gold having the longest length.",
    "If you believe you are qualified to serve as a Psyche Ambassador, please submit your application through the Psyche Ambassador recruitment. \nThe relationship between Your 2022 wrapped on Lens NFT and KNexus - Psyche NFT is that Your 2022 wrapped on Lens NFT is the Genesis NFT in the KNN3 Network matrix. Every holder of Your 2022 wrapped on Lens NFT will receive a KNexus - Psyche NFT, which is the highest level Golden Scroll. \n\nHow to claim?",
    "",
    "Please join our waitlist first. We will work with different partners to distribute our whitelist, and we may also hold whitelist lottery events. Please stay tuned for updates from us.",
    "",
    "",
  ];

  const setClick = (index: any) => {
    setClickIndex(index);
    if (clickIndex === index) {
      onToggle();
    } else {
      onOpen();
    }
  };

  const scrollToScreen = (index: any) => {
    document.documentElement.scrollTo({
      top: index * clientHeight,
      behavior: "smooth",
    });
    if (index <= 1) {
      setShowTopBtn.off();
      setProgressWidth(0);
    } else {
      setShowTopBtn.on();
      setProgressWidth(100);
    }
  };

  // useEffect(() => {
  // 	(document as any).onmousewheel = (e: any) => {
  // 		console.log(e)
  // 		try {
  // 			const storeLine = document.getElementById("storeLine");
  // 			const storeLineImg = document.getElementById("storeLine-img");
  // 			const storeLineText = document.getElementById("storeLine-text");
  // 			const psycheScroll = document.getElementById('psyche-scroll');
  // 			if (storeLine && storeLineImg && storeLineText && psycheScroll) {
  // 				const scrollTop = psycheScroll.scrollTop;

  // 				storeLineImg.style.overflowX = "hidden";
  // 				storeLineText.style.overflowX = "hidden";

  // 				console.log('scrollTop', scrollTop)

  // 				console.log('clientHeight', clientHeight)
  // 				if (e.wheelDelta < 0) {
  // 					if (scrollTop >= clientHeight - 60 && progressWidth < 100) {
  // 						document.getElementById('psyche-scroll').scrollTop = clientHeight;
  // 						document.getElementById('psyche-scroll').style.overflow = "hidden";
  // 						setProgressWidth(progressWidth + 1);
  // 					} else {
  // 						document.getElementById('psyche-scroll').style.overflow = "scroll";
  // 					}
  // 				} else if (e.wheelDelta > 0) {
  // 					if (scrollTop <= clientHeight + 50 && progressWidth >= 1) {
  // 						document.getElementById('psyche-scroll').scrollTop = clientHeight;
  // 						document.getElementById('psyche-scroll').style.overflow = "hidden";
  // 						setProgressWidth(progressWidth - 1);
  // 					} else {
  // 						document.getElementById('psyche-scroll').style.overflow = "scroll";
  // 					}
  // 				}

  // 				scrollTop >= clientHeight + 200
  // 					? setShowTopBtn.on()
  // 					: setShowTopBtn.off();
  // 				const scrollWidth = (storeLineTexts.length - 1) * storeLine.clientWidth;
  // 				storeLineImg.scrollLeft = scrollWidth * 0.58 * (progressWidth / 100);
  // 				storeLineText.scrollLeft =
  // 					scrollWidth * 0.42 * 0.8 * (progressWidth / 100);
  // 			}

  // 		} catch (error) {

  // 		}
  // 	};
  // }, [progressWidth]);

  useEffect(() => {
    const storeLine: any = document.getElementById("storeLine");
    if (storeLine) {
      history.scrollRestoration = "manual";
      setClientHeight(storeLine.clientHeight);

      return () => {
        document.documentElement.style.overflow = "inherit";
      };
    }
  }, []);

  return (
    <Container maxW="full" minH="100vh" p="0">
      {showTopBtn && (
        <Box
          position="fixed"
          right="40px"
          bottom="35px"
          w="50px"
          h="50px"
          borderRadius="full"
          bg="rgba(240, 242, 244, 0.3)"
          _hover={{ bg: "rgba(240, 242, 244, 0.4)" }}
          zIndex="99"
          cursor="pointer"
          onClick={() => scrollToScreen(0)}
        >
          <Icon
            as={ChevronUpIcon}
            boxSize="50px"
            color="rgba(240, 242, 244, 1)"
            _hover={{ transform: "scale(1.1)" }}
          />
        </Box>
      )}

      <Box w="100vw" h="100vh" overflow="hidden">
        <Box className="recoverAni" pt="30px">
          <BgFilter size={220} left="-110px" top="-110px" />
          <BgFilter size={60} left="120px" top="200px" />
          <Image
            fit="contain"
            w="full"
            src="images/psyche/intro-title.gif"
            pos="absolute"
            zIndex="99"
          />
          <Box
            pos="absolute"
            right="0"
            h="full"
            w="full"
            minW="1100px"
            top="0"
            display="flex"
            justifyContent="space-between"
            overflow="hidden"
          >
            <Flex
              flex="1"
              h="full"
              pt="70px"
              pl="100px"
              minW="650px"
              justify="flex-start"
              alignItems="center"
            >
              <NextLink
                target="_blank"
                href="https://form.typeform.com/to/Zif2fhcw"
                passHref
              >
                <Image
                  fit="contain"
                  w="300px"
                  src="images/psyche/intro-btn1.png"
                  pos="absolute"
                  borderRadius="full"
                  cursor="pointer"
                  _hover={{
                    transform: "translateY(-2px)",
                    bg: "rgba(240, 242, 244, 0.1)",
                  }}
                />
              </NextLink>
              <NextLink
                target="_blank"
                href="https://form.typeform.com/to/GykaG2ki"
                passHref
              >
                <Image
                  ml="350px"
                  fit="contain"
                  w="300px"
                  src="images/psyche/intro-btn2.png"
                  pos="absolute"
                  borderRadius="full"
                  cursor="pointer"
                  _hover={{
                    transform: "translateY(-2px)",
                    bg: "rgba(240, 242, 244, 0.1)",
                  }}
                />
              </NextLink>
              <Text
                pos="absolute"
                color="#fff"
                mt="180px"
                fontSize="15px"
                fontWeight="semibold"
              >
                * Claim Airdrop for
              </Text>
              <Text
                pos="absolute"
                color="#fff"
                mt="225px"
                ml="13px"
                w="280px"
                lineHeight="20px"
                fontSize="15px"
                fontWeight="semibold"
              >
                TopScore: Your 2022 Wrapped on
              </Text>
              <Text
                pos="absolute"
                color="#fff"
                mt="270px"
                ml="13px"
                w="280px"
                lineHeight="20px"
                fontSize="15px"
                fontWeight="semibold"
              >
                Lens NFT holders
              </Text>
            </Flex>
            <Flex
              w="50%"
              h="full"
              minW="680px"
              pos="relative"
              justify="flex-end"
              alignItems="flex-end"
              backgroundImage="url(https://images.cdn.knn3.xyz/transformer/girl.webp)"
              backgroundSize="100%"
              backgroundPosition="right bottom"
              backgroundRepeat="no-repeat"
            />
          </Box>

          <Flex
            pos="absolute"
            w="full"
            h="60px"
            pl="60px"
            pr="150px"
            alignItems="center"
            justify="space-around"
            bottom="25px"
            bg="rgba(240, 242, 244, 0.1)"
            boxShadow="0px 4px 6px rgba(0, 0, 0, 0.2)"
            backdropFilter="blur(4px)"
            zIndex={1}
          >
            {titles.map((item, index) => {
              return (
                <>
                  <HStack
                    className="triangle-ani"
                    h="35px"
                    color="#fff"
                    spacing="0px"
                    cursor="pointer"
                    onClick={() => scrollToScreen(index + 1)}
                    key={index}
                    pos="relative"
                  >
                    <Image
                      pos="absolute"
                      src="images/psyche/logo-left.png"
                      top="-2px"
                      left="-12px"
                      boxSize="13px"
                      fit="contain"
                      display="none"
                    />
                    <Text
                      fontFamily="Swiss721BT-BoldExtended"
                      fontWeight="semibold"
                      fontSize="22px"
                      color="rgba(255, 255, 255, 0.9)"
                      _hover={{ color: "rgba(255, 255, 255, 1)" }}
                    >
                      {item}
                    </Text>
                    <Image
                      pos="absolute"
                      className="triangle-ani"
                      src="images/psyche/logo-right.png"
                      bottom="-2px!"
                      right="-12px"
                      boxSize="13px"
                      fit="contain"
                      display="none"
                    />
                  </HStack>
                  {item !== "FAQ" && (
                    <Box w="8px" h="8px" borderRadius="full" bg="#fff" />
                  )}
                </>
              );
            })}

            <Flex
              pos="absolute"
              right="15px"
              w="35px"
              h="35px"
              bg="#fff"
              borderRadius="6px"
              justify="center"
              alignItems="center"
            >
              <Image
                src="images/psyche/logo.png"
                boxSize="30px"
                fit="contain"
              />
            </Flex>
          </Flex>
        </Box>
      </Box>
      <Box pos="relative" w="100vw" h="100vh" overflow="hidden" id="storeLine">
        <TitleBg title="Story" />
        <Box
          w="100vw"
          h="calc(100% - 180px)"
          ml="-25px"
          mt="120px"
          mb="60px"
          id="progress"
          bg="rgba(240, 242, 244, 0.1)"
          boxShadow="0px 4px 6px rgba(0, 0, 0, 0.2)"
          borderRadius="0px 22px 22px 0px"
          backdropFilter="blur(4px)"
        >
          <HStack
            py="15px"
            w="100vw"
            h="full"
            justify="flex-start"
            alignItems="center"
          >
            <Box w="58%" h="full" overflowX="scroll" id="storeLine-img">
              <Flex h="full" flexWrap="nowrap" w="600%">
                {storeLineTexts.map((item, index) => {
                  return (
                    <Box
                      h="full"
                      w="100%"
                      key={index}
                      borderRadius="25px"
                      mr="20px"
                      pos="relative"
                      overflow="hidden"
                    >
                      {index === 0 && (
                        <NextLink
                          target="_blank"
                          href="https://opensea.io/collection/your-2022-wrapped-on-lens"
                          passHref
                        >
                          <Box
                            pos="absolute"
                            w="100px"
                            h="100px"
                            right="30px"
                            bottom="16px"
                            borderRadius="20px"
                          ></Box>
                        </NextLink>
                      )}

                      <Box></Box>
                      <Image
                        fit="contain"
                        w="full"
                        h="full"
                        src={`images/psyche/Frame-${index + 1}.webp`}
                      />
                    </Box>
                  );
                })}
              </Flex>
            </Box>
            <Center w="42%">
              <Box w="80%" h="full" overflowX="scroll" id="storeLine-text">
                <Flex h="full" flexWrap="nowrap" w="600%">
                  {storeLineTexts.map((item, index) => {
                    return (
                      <Center h="full" w="100%" key={index} overflow="hidden">
                        <Text
                          px="10%"
                          fontWeight="semibold"
                          fontSize="26px"
                          color="#fff"
                          lineHeight="28px"
                          whiteSpace="pre-wrap"
                          fontFamily="Swiss721BT-Heavy"
                        >
                          {item}
                        </Text>
                      </Center>
                    );
                  })}
                </Flex>
              </Box>
            </Center>
          </HStack>
        </Box>
        <Flex
          pos="absolute"
          bottom="60px"
          right="25px"
          w="40%"
          h="42px"
          bg="rgba(240, 242, 244, 0.1)"
          boxShadow="0px 4px 6px rgba(0, 0, 0, 0.2)"
          borderRadius="17px 0px 20px 0px"
          backdropFilter="blur(5px)"
          overflow="hidden"
        >
          <Image
            mt="3px"
            w={`${progressWidth}%`}
            h="100%"
            ml="-10px"
            src="images/psyche/intro-progress.png"
            filter="blur(3px)"
          />
        </Flex>
      </Box>
      <Box pos="relative" w="100vw" h="100vh" overflow="hidden">
        <TitleBg title="Psyche" />
        <Box
          mt="110px"
          mb="40px"
          h="calc(100% - 150px)"
          w="full"
          color="#fff"
          fontFamily="Swiss721BT-Heavy"
          fontSize="18px"
          lineHeight="24px"
          display="flex"
          justifyContent="center"
        >
          <VStack h="full" w="80%">
            <Box h="300px" w="full">
              <Text>
                KNexus - Psyche is an NFT project that combines Web3 and AIGC
                (Artificial Intelligence Generated Content) features.
              </Text>

              <Text pt={4}>
                Users can participate in the creation of the NFT by providing a
                half of the prompt,
              </Text>
              <Text mt="-1px!important">
                which is created by KNN3 using Web3 graph data as a data
                foundation,
              </Text>
              <Text mt="-1px!important">
                and then the user can complete the other half of the prompt by
                "scrolling" to generate a text prompt.
              </Text>

              <Text pt={4}>
                This co-creation process using AIGC creates a complete prompt,
              </Text>
              <Text mt="-1px!important">
                which then generates the image of the NFT.
              </Text>

              <Text pt={4}>
                Users can create their own exclusive NFT images based
              </Text>
              <Text mt="-1px!important">
                on their own Web3 graph data and their own preferences for the
                NFT image.
              </Text>

              <Text pt={4} w="full">
                Core Features:
              </Text>

              <Text mt="-1px!important" w="full">
                Data (Web3 graph data) - Text - Image
              </Text>

              <Text mt="-1px!important" w="full">
                KNN3 - User - AIGC co-create
              </Text>
            </Box>
            <Box
              w="full"
              h="calc(100% - 300px)"
              pt="20px"
              border="solid 0px red"
            >
              <Center h="full">
                <Image h="100%" fit="contain" src="images/psyche/knexus.png" />
              </Center>
            </Box>
          </VStack>
        </Box>
      </Box>
      <Box pos="relative" w="100vw" h="100vh" overflow="hidden">
        <TitleBg title="Roadmap" />
        <Center mt="80px" w="full" h="calc(100% - 80px)">
          <VStack color="#fff">
            <HStack alignItems="flex-start" w="full">
              <Text
                w="210px"
                fontSize="26px"
                fontFamily="StretchPro"
                fontWeight="semibold"
                mt="-2px"
              >
                2023 Q1
              </Text>
              <Box fontFamily="Swiss721BT-Heavy" fontSize="20px">
                <Text>TopScore Launch</Text>
                <Text>
                  TopScore: Your 2022 wrapped on Lens NFT Collection launch
                </Text>
              </Box>
            </HStack>
            <Box w="full">
              <Divider
                orientation="vertical"
                h="70px"
                borderLeftWidth="1.5px"
                opacity="1"
                ml="80px"
                mt="-15px"
                mb="10px"
              />
            </Box>
            <HStack alignItems="flex-start" w="full">
              <Text
                w="210px"
                fontSize="26px"
                fontFamily="StretchPro"
                fontWeight="semibold"
                mt="-2px"
              >
                2023 Q2
              </Text>
              <Box fontFamily="Swiss721BT-Heavy" fontSize="20px">
                <Text>KNexus - Psyche Homepage Launch </Text>
                <Text>KNexus - Psyche NFT Collection Launch</Text>
                <Text>AI Avatar Generate</Text>
                <Text>TopScore Beta Launch</Text>
              </Box>
            </HStack>
            <Box w="full">
              <Divider
                orientation="vertical"
                h="100px"
                borderLeftWidth="1.5px"
                opacity="1"
                ml="80px"
                mt="-80px"
                mb="10px"
              />
            </Box>
            <HStack alignItems="flex-start" w="full">
              <Text
                w="210px"
                fontSize="26px"
                fontFamily="StretchPro"
                fontWeight="semibold"
                mt="-2px"
              >
                2023 Q3
              </Text>
              <Box fontFamily="Swiss721BT-Heavy" fontSize="20px">
                <Text>KNexus - AGI Creator Platform Launch</Text>
                <Text>KNexus Collection 2 Launch</Text>
                <Text>Loyal System Announce</Text>
              </Box>
            </HStack>
            <Box w="full">
              <Divider
                orientation="vertical"
                h="110px"
                borderLeftWidth="1.5px"
                opacity="1"
                ml="80px"
                mt="-45px"
                mb="10px"
              />
            </Box>
            <HStack alignItems="flex-start" w="full">
              <Text
                w="210px"
                fontSize="26px"
                fontFamily="StretchPro"
                fontWeight="semibold"
                mt="-2px"
              >
                2023 Q4
              </Text>
              <Box fontFamily="Swiss721BT-Heavy" fontSize="20px">
                <Text>Market expansion </Text>
                <Text>Establish partnerships</Text>
              </Box>
            </HStack>
          </VStack>
        </Center>
      </Box>
      <Box pos="relative" w="100vw" h="100vh" overflow="hidden">
        <TitleBg title="Holders‘ Benefit" />
        <HStack align="center" h="full" pr="50px" pl="20px" pt="80px">
          <Box w="55%">
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
                      bg="rgba(240, 242, 244, 0.2)"
                      boxShadow="0px 4px 6px rgba(0, 0, 0, 0.2)"
                      backdropFilter="blur(4px)"
                      borderRadius="10px"
                      mt="4px"
                    >
                      <Center w="full" h="full">
                        <Box w="5px" h="5px" borderRadius="3px" bg="#fff" />
                      </Center>
                    </Box>
                    <Box flex="1">
                      <Text
                        key={item}
                        mb="26px"
                        fontSize="24px"
                        fontWeight="semibold"
                        fontFamily="Swiss721BT-Heavy"
                      >
                        {item}
                      </Text>
                    </Box>
                  </Flex>
                );
              })}
            </OrderedList>
          </Box>
          <Image mt="2px" w="45%" src="images/psyche/benefit.webp" />
        </HStack>
      </Box>
      <Box pos="relative" w="100vw" minH="100vh" overflow="hidden">
        <TitleBg title="FAQ" />
        <Box h="full" w="100vw">
          <VStack
            color="#fff"
            h="full"
            justify="flex-start"
            mt="140px"
            spacing="0"
          >
            {QaTexts.map((item, index) => {
              return (
                <Box
                  w="full"
                  key={index}
                  h={clickIndex === index && isOpen ? "auto" : "80px"}
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
                    bg="#fff"
                    w={
                      clickIndex === index && isOpen ? "full!important" : "full"
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
                      clickIndex === index && isOpen ? "#000!important" : "#fff"
                    }
                    className={
                      hoverIndex === index && isOnMouseHover
                        ? "enterTextColorAni"
                        : "leaveTextColorAni"
                    }
                  >
                    <Text
                      key={index}
                      pl="80px"
                      w="full"
                      fontWeight="semibold"
                      fontSize="23px"
                      whiteSpace="nowrap"
                      onClick={() => setClick(index)}
                      fontFamily="Swiss721BT-BoldExtended"
                    >
                      {item}
                    </Text>
                    <Box mt="20px">
                      <Icon
                        as={TfiPlus}
                        fontWeight="light"
                        boxSize={8}
                        transform={
                          clickIndex === index && isOpen
                            ? "rotate(45deg)"
                            : "rotate(0deg)"
                        }
                        transitionDuration=".5s"
                      />
                    </Box>
                  </HStack>
                  <Collapse
                    in={clickIndex === index && isOpen}
                    animateOpacity
                    style={{ marginTop: "80px" }}
                  >
                    <Center
                      w="90%"
                      fontSize="20px"
                      lineHeight="28px"
                      whiteSpace="pre-wrap"
                      fontFamily="Swiss721BT-Medium"
                    >
                      <Box py="50px" pl="8%" pr="15%">
                        {index === 0 ? (
                          <Box w="full">
                            <Text>
                              KNexus - Psyche is an NFT project that combines
                              Web3 and AIGC (Artificial Intelligence Generated
                              Content) features. Users can participate in the
                              creation of the NFT by providing a half of the
                              prompt, which is created by KNN3 using Web3 graph
                              data as a data foundation, and then the user can
                              complete the other half of the prompt by
                              "scrolling" to generate a text prompt. This
                              co-creation process using AIGC creates a complete
                              prompt, which then generates the image of the NFT.
                              Users can create their own exclusive NFT images
                              based on their own Web3 graph data and their own
                              preferences for the NFT image.
                            </Text>
                            <br />
                            <Text mt="3px">Core Features:</Text>
                            <Text mt="3px">
                              Data (Web3 graph data) - Text - Image
                            </Text>
                            <Text mt="3px">KNN3 - User - AIGC co-create</Text>
                            <br />
                            <Text mt="5px">
                              Additionally, KNexus - Psyche holders will enjoy
                              product benefits from KNN3's other products,
                              resulting in a richer Web3 experience!
                            </Text>
                            <br />
                            <Box>
                              About
                              <NextLink
                                target="_blank"
                                href="https://topscore.social"
                                style={{
                                  color: "#74a5e7",
                                  borderBottom: "solid 1px #74a5e7",
                                  marginLeft: "8px",
                                }}
                              >
                                TopScore
                              </NextLink>
                            </Box>
                            <Text>
                              TopScore is a decentralized identity system based
                              on Web3 blockchain social behavior. It uses the
                              same scoring standards to score each address/Web3
                              social account based on its social behavior on the
                              blockchain. For example, Lens handle is very
                              active in social publishing and interaction on
                              Lens protocol, which is reflected in its global
                              activity score, and each address/Web3 social
                              account will ultimately receive a total score to
                              evaluate its social credibility.
                            </Text>
                          </Box>
                        ) : index === 2 ? (
                          <>
                            <Text>{QaExplains[index]}</Text>
                            <Box>
                              Holders of the 2022 Wrapped on Lens NFT need to
                              submit their application by
                              <NextLink
                                target="_blank"
                                href="https://form.typeform.com/to/Zif2fhcw"
                                style={{
                                  color: "#74a5e7",
                                  borderBottom: "solid 1px #74a5e7",
                                  marginLeft: "5px",
                                }}
                              >
                                joining the waitlist
                              </NextLink>
                            </Box>
                          </>
                        ) : index === 3 ? (
                          <Box w="full">
                            <Text>
                              The KNexus - Psyche Collection NFT is a project
                              that combines Web3 and AIGC features. Users can
                              participate in the creation of the NFTs by
                              co-creating a complete "Prompt" using Web3 data,
                              text, and images. This allows users to customize
                              their NFT images through AI co-creation and bind
                              product rights to the intrinsic value of
                              Non-Fungible Tokens.
                            </Text>
                            <br />
                            <Text>
                              KNN3's Nexus NFT has opened up a new paradigm in
                              the NFT field. Using the Web3 Data - Text - Image
                              image-making chain, KNN3's data graph becomes the
                              data support. Through the deep analysis of users'
                              various dimensions of on-chain data, these
                              insights from Web3 data are encrypted into "Text
                              Prompts", providing each NFT with a unique value
                              structure.
                            </Text>
                            <br />
                            <Text>
                              KNN3's data graph classifies Web3 data according
                              to its nature and features. In the rich data
                              graph, the user's six core dimensions of on-chain
                              footprints are combined into a six-dimensional
                              evaluation model: Possession, Follow, Bond,
                              Attendance, Governance, and Lens. These insights
                              from Web3 data are encrypted into the first half
                              of the complete "Text Prompt", and users complete
                              the other half of the "Prompt" based on their
                              personal aesthetic preferences and personality
                              through interaction at the Typography product
                              front-end, co-creating an AI Avatar with the user.
                            </Text>
                          </Box>
                        ) : index === 5 ? (
                          <Box w="full">
                            <Text>
                              KNN3 believes that the development of a popular
                              Web3 community cannot rely solely on the project.
                              Otherwise, it will neglect the internal needs of
                              the crypto natives, resulting in a lack of
                              vitality and fun in the community. We are most
                              concerned about how to build a vibrant and
                              creative community where everyone is willing to
                              create and share. Therefore, we hope to attract a
                              more diverse group of people to collide in the
                              community, and seek more prestigious talents and
                              creative Web3 believers and AIGC creators to join,
                              fully tap the potential of the community.
                            </Text>
                            <br />
                            <Text>Who can join?</Text>
                            <Text>
                              People who love and recognize the brand value of
                              KNN3
                            </Text>
                            <Text>
                              People who enjoy communicating, sharing, and
                              building social relationships with others
                            </Text>
                            <br />
                            <Text>
                              If you think you qualify as a Psyche Ambassador,
                              please submit your application through the Psyche
                              Ambassador recruitment on our website.
                            </Text>
                            <br />
                            <Text>How to apply?</Text>
                            <Text>
                              If you believe you are qualified to serve as a
                              Psyche Ambassador, please submit your application
                              through the{" "}
                              <NextLink
                                target="_blank"
                                href="https://form.typeform.com/to/GykaG2ki"
                                style={{
                                  color: "#74a5e7",
                                  borderBottom: "solid 1px #74a5e7",
                                  marginLeft: "5px",
                                }}
                              >
                                Psyche Ambassador recruitment.
                              </NextLink>
                            </Text>
                          </Box>
                        ) : index === 6 ? (
                          <Box w="full">
                            <Text>
                              Follow the official Twitter account
                              <NextLink
                                target="_blank"
                                href="https://twitter.com/Knn3Network"
                                style={{
                                  color: "#74a5e7",
                                  borderBottom: "solid 1px #74a5e7",
                                  marginLeft: "5px",
                                  marginRight: "5px",
                                }}
                              >
                                @KNN3Network.
                              </NextLink>
                              All announcements will be posted there. We will
                              never suddenly go live on chain. Beware of
                              impersonators and scammers, and always check if
                              you are on the official Twitter or website.
                            </Text>
                          </Box>
                        ) : (
                          <Text>{QaExplains[index]}</Text>
                        )}
                      </Box>
                    </Center>
                  </Collapse>
                </Box>
              );
            })}
          </VStack>
        </Box>
      </Box>
    </Container>
  );
}
