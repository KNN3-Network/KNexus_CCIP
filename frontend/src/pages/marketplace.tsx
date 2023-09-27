import React, { useCallback, useEffect, useRef, useState } from "react";

import { useRouter } from "next/router";

import {
  Box,
  Button,
  Image,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useUpdateEffect } from "ahooks";
import api from "api";
import { Header, NextSeo, NotData, SocialButton } from "components";
import { CampignList } from "components/common";
import Campign from "components/common/Campign";
import NftcardList from "components/nftcardList";
import SimpleDetailModal from "components/nftcardList/SimpleDetailModal";
import StackedCarousel from "components/nftcardList/StackedCarousel";
import useWeb3Context from "hooks/useWeb3Context";
import { ButtonClickTrace, ButtonSelectTrace } from "lib/trace";
import { INftCard, Size, SortBy } from "lib/types";
import { useInView } from "react-intersection-observer";
import useSmoothScroll from "react-smooth-scroll-hook";
import { FadeLoader, SyncLoader } from "react-spinners";
import { useEarlyUserStore } from "store/earlyUserStore";
import { useStore } from "store/store";
import { useWalletStore } from "store/walletStore";

const Marketplace = () => {
  const router = useRouter();
  const { setJwt } = useWalletStore();
  const { doLogin, connectWallet, getUserInfo } = useWeb3Context();
  const {
    simpleDetailModalOpen,
    setSimpleDetailModalOpen,
    nft,
    isStackedCarousel,
    setIsStackedCarousel,
  } = useStore();
  const {
    nftList,
    setNftList,
    pageNumber,
    setPageNumber,
    scroll_item,
    sortBy,
    setSortBy,
  } = useStore();
  const [isControlNet, setIsControlNet] = useState<boolean>(false);
  const [size, setSize] = useState<Size>([]);
  const [pageSize, setPageSize] = useState<number>(20);
  const [firstLoading, setFirstLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [noMoreData, setNoMoreData] = useState(false);
  const myRef = useRef(null);
  const { setShowNotion } = useEarlyUserStore();
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  useEffect(() => {
    setSortBy(Number(sessionStorage.getItem("sortBy")) || 2);
  }, []);

  const { scrollTo } = useSmoothScroll({
    ref: myRef,
    speed: 1000,
    direction: "y",
  });

  const [ref, inView] = useInView({
    triggerOnce: false,
  });

  useEffect(() => {
    if (!scroll_item) return;
    setTimeout(() => {
      scrollTo(`#${scroll_item}`);
    }, 500);
  }, [myRef, scroll_item, isStackedCarousel]);

  useEffect(() => {
    if (inView) {
      if (pageNumber) {
        getCollections();
      }
    }
  }, [inView]);

  useEffect(() => {
    if (router && router.query && router.query.j) {
      const jwtCode: any = router.query.j;
      const res = JSON.parse(atob(jwtCode));
      if (res && res.accessToken && res.accessToken.accessToken) {
        ButtonClickTrace("sign in");
        setJwt(res.accessToken.accessToken);
        api.defaults.headers.authorization = `Bearer ${res.accessToken.accessToken}`;
        setShowNotion(true);
        getUserInfo();
      }
    }
  }, [router]);

  const getCollections = useCallback(
    async (pn?: number) => {
      try {
        if (pn === undefined) {
          setLoading(true);
          setFirstLoading(false);
        } else {
          setLoading(false);
          setFirstLoading(true);
        }
        if (!sortBy) return;
        const res: any = await api.post(`/api/collections`, {
          pageNumber: pn === undefined ? pageNumber : pn,
          isControlNet,
          size,
          sortBy,
          pageSize,
        });
        if (!size.length && !isControlNet && sortBy === SortBy.Hottest) {
          ButtonClickTrace("bazaar-list");
        }
        if (res.pageNumber) {
          setPageNumber(res.pageNumber);
          setNoMoreData(false);
        } else {
          setPageNumber(0);
          setNoMoreData(true);
        }
        if (res.list && res.list.length) {
          const list = res.list.map((nft: INftCard) => ({
            ...nft,
            boxId: `y-item-${nft.id.substring(0, 8)}`,
          }));
          setNftList([...nftList, ...list]);
        }
        setFirstLoading(false);
        setLoading(false);
      } catch (error) {
        setNftList([]);
        setFirstLoading(false);
        setLoading(false);
      }
    },
    [pageNumber, isControlNet, size, sortBy, pageSize],
  );

  useEffect(() => {
    if (!nftList.length) {
      getCollections(0);
    }
  }, [nftList]);

  useUpdateEffect(() => {
    setNftList([]);
    setPageNumber(0);
  }, [sortBy, isControlNet, size]);

  const [showFilter, setShowfilter] = useState<boolean>(false);

  return (
    <>
      <NextSeo title="Top Prompts | KNexus" />
      <div
        className="flex flex-col gap-2 h-screen bg-[#fff] text-[#000] font-eurostile bg-[url('/images/bg.png')] bg-cover"
        onContextMenu={(e: any) => e.preventDefault()}
      >
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
        <SocialButton />
        <div className="flex-1 overflow-auto" ref={myRef}>
          <div>
            {/* <div
              className="sticky top-0 py-2 bg-[url('/images/grad-bg.png')] bg-cover z-10"
              style={{ backgroundPosition: "left -90px" }}
            >
              <div className="w-[80%] mx-[auto] flex justify-between">
                <Button
                  variant="primary"
                  className="flex items-center"
                  boxShadow="0px 6px 16px 2px rgba(0, 0, 0, 0.20)"
                  onClick={() => setShowfilter(!showFilter)}
                >
                  <Image className="mr-2" src="/images/common/filter.png" />
                  Filter
                </Button>
                <div>
                  <span className="mr-4 text-[18px]">Sort by:</span>
                  <Select
                    value={sortBy}
                    style={{
                      width: 240,
                      border: "2px solid #ccc",
                      borderRadius: 6,
                    }}
                    popupClassName="rounded-[6px] p-2 border-[2px] border-[#ccc]"
                    onChange={(value: SortBy) => {
                      ButtonClickTrace("bazaar-filter-sortby");
                      ButtonSelectTrace("bazaar-filter-sortby-select", value);
                      sessionStorage.setItem("sortBy", value.toString());
                      setSortBy(value);
                    }}
                    options={[
                      {
                        value: SortBy.Likes,
                        label: "Likes",
                        className: "font-eurostile rounded-[6px]",
                      },
                      {
                        value: SortBy.Newest,
                        label: "Newest",
                        className: "font-eurostile rounded-[6px]",
                      },
                      {
                        value: SortBy.Hottest,
                        label: "Hottest",
                        className: "font-eurostile rounded-[6px]",
                      },
                    ]}
                  ></Select>
                </div>
              </div>
            </div> */}
            <Tabs
              className="flex w-[80%] m-auto relative"
              index={tabIndex}
              onChange={handleTabsChange}
            >
              <TabList
                className="sticky top-0 backdrop-blur-md h-[60px]"
                style={{ zIndex: 1000, borderBottom: "2px solid #ccc" }}
              >
                {tabIndex === 0 ? (
                  <div className="absolute z-10 w-[50%] h-full right-[20px] flex items-center justify-end gap-2">
                    <div className="flex items-center justify-center gap-1 h-[50px] py-1 px-1 bg-white bg-opacity-60 rounded-md">
                      <Button
                        bg="transparent"
                        borderRadius="4px"
                        size="sm"
                        p={2}
                        boxShadow={isStackedCarousel ? "md" : "none"}
                        onClick={() => setIsStackedCarousel(true)}
                      >
                        <Image
                          alt=""
                          src="/images/magicCard.svg"
                          className="w-[70%]"
                        />
                      </Button>
                      <Button
                        bg="transparent"
                        borderRadius="4px"
                        size="sm"
                        p={2}
                        boxShadow={!isStackedCarousel ? "md" : "none"}
                        onClick={() => setIsStackedCarousel(false)}
                      >
                        <Image
                          alt=""
                          src="/images/gridLayout.svg"
                          className="w-[70%]"
                        />
                      </Button>
                    </div>
                  </div>
                ) : null}
                <Tab fontSize="xl">Marketplace</Tab>
                <Tab fontSize="xl">Gallery</Tab>
                <TabIndicator
                  mt="58px"
                  height="4px"
                  bg="#000"
                  borderRadius="1px"
                />
              </TabList>
              <TabPanels>
                <TabPanel>
                  <div className="flex flex-col gap-4">
                    {firstLoading ? (
                      <div className="h-[calc(100vh-540px)] w-full flex items-center justify-center">
                        <SyncLoader color="#000" size={20} />
                      </div>
                    ) : (
                      <>
                        {[nftList].length > 0 ? (
                          <>
                            {!isStackedCarousel ? (
                              <NftcardList nftList={nftList} />
                            ) : (
                              <StackedCarousel
                                loadMoreCallback={getCollections}
                              />
                            )}
                          </>
                        ) : (
                          <div className="w-full h-[500px] flex items-center justify-center">
                            <NotData size="lg" />
                          </div>
                        )}
                      </>
                    )}
                    <div
                      className="w-full h-[20px] flex justify-center"
                      ref={ref}
                    >
                      {loading ? (
                        <FadeLoader
                          color="#36d7b7"
                          height={8}
                          margin={-10}
                          width={4}
                          cssOverride={{ left: "18px" }}
                        />
                      ) : null}
                      {noMoreData ? (
                        <p className="text-ellipsis text-[#000] pb-[40px]">
                          No more items
                        </p>
                      ) : null}
                    </div>
                  </div>
                </TabPanel>
                <TabPanel>
                  <CampignList
                    campainChange={(e: any) => {
                      router.push(`/gallery/?campaignid=${e.id}`);
                    }}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        </div>
        {nft ? (
          <SimpleDetailModal
            nft={nft}
            isOpen={simpleDetailModalOpen}
            onClose={() => setSimpleDetailModalOpen(false)}
          />
        ) : null}
      </div>
    </>
  );
};

export default Marketplace;
