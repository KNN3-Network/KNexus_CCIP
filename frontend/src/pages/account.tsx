import React, { useEffect, useRef, useState } from "react";

import { useRouter } from "next/router";

import { Box, Button, Image, Input, Textarea } from "@chakra-ui/react";
import api from "api";
import { NftCard } from "components";
import { NextSeo } from "components";
import ClaimOatModal from "components/account/claimOat";
import {
  BaseModal,
  Follow,
  Footer,
  HeadImgEdit,
  Header,
  LazyloadCard,
  NotData,
  SkeletonNftCard,
} from "components/common";
import Campign from "components/common/Campign";
import { shortenAddr } from "lib/tool";
import { ButtonClickTrace } from "lib/trace";
import { INftCard } from "lib/types";
import moment from "moment";
import { useInView } from "react-intersection-observer";
import { SyncLoader } from "react-spinners";
import { useEarlyUserStore } from "store/earlyUserStore";
import { useUserInfoStore } from "store/userInfoStore";

const tabs = ["Prompts", "Bought", "Gallery", "Liked"];

const tabs1 = [
  {
    name: "List",
    value: 1,
  },
  {
    name: "Unlisted",
    value: 0,
  },
];

const userInfoInit = {
  id: "",
  address: "",
  name: null,
  description: null,
  coupon: 0,
  image: null,
  created_at: "",
  updated_at: "",
  owners: 0,
  items: 0,
  total: 0,
  num: "",
  follow_follower_followee: [],
};

const saleInfoInit = {
  boughtCount: 0,
  buyerCount: 0,
  collectionCount: 0,
  earnAmount: 0,
  galleryCount: 0,
  likeCount: 0,
  promptCount: 0,
};

let initRefresh = true;

let pageNumber = 0;

const UserInfo = () => {
  const { showNotion } = useEarlyUserStore();

  const { id, likeRefresh, setUserStoreInfo } = useUserInfoStore((state) => {
    return {
      id: state.id,
      likeRefresh: state.likeRefresh,
      setUserStoreInfo: state.setUserStoreInfo,
    };
  });

  const router = useRouter();

  const myRef = useRef(null);

  const [activeIdx, setActiveIdx] = useState<number>(0);

  const [activeIdx1, setActiveIdx1] = useState<number>(0);

  const [nftList, setNftList] = useState<INftCard[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const [userInfo, setUserInfo] = useState<any>(userInfoInit);

  const [saleInfo, setSaleInfo] = useState<any>(saleInfoInit);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [editNm, setEditNm] = useState<string>("");

  const [editDes, setEditDes] = useState<string>("");

  const [editImg, setEditImg] = useState<string>("");

  const [isFilterBg, setIsFilterBg] = useState(false);

  // const [pageNumber, setPageNumber] = useState(0);

  const [next, setNext] = useState(false);

  const [carouselRef, inView] = useInView({
    triggerOnce: false,
  });

  const [loadingBox, inLoadingView] = useInView({
    triggerOnce: false,
  });

  useEffect(() => {
    if (next && inLoadingView) {
      console.log("next", next);
      getNftInfo();
    }
  }, [inLoadingView, next]);

  useEffect(() => {
    if (router.query.userId == id && !initRefresh) {
      getSaleInfo();
      // setNext(true);
      pageNumber = 0;
      setNftList([]);
      setLoading(true);
      getNftInfo(0);
    }
  }, [likeRefresh]);

  useEffect(() => {
    return () => {
      initRefresh = true;
    };
  }, []);

  useEffect(() => {
    if (inView) {
      setIsFilterBg(false);
    } else {
      setIsFilterBg(true);
    }
  }, [inView]);

  const getNftInfo = async (pn?: number) => {
    try {
      let res: any;
      if (activeIdx == 0) {
        res = await api.get(`/api/user/collection`, {
          params: {
            pageSize: 30,
            pageNumber,
            user_id: router.query.userId,
            status: id == router.query.userId ? (activeIdx1 == 0 ? 1 : 0) : 1,
          },
        });
      }

      if (activeIdx == 1) {
        res = await api.get(`/api/user/bought`, {
          params: {
            pageSize: 30,
            pageNumber,
            user_id: router.query.userId,
          },
        });
      }

      if (activeIdx == 2) {
        res = await api.get(`/api/user/gallery`, {
          params: {
            pageSize: 30,
            pageNumber,
            user_id: router.query.userId,
          },
        });
      }

      if (activeIdx == 3) {
        res = await api.get(`/api/user/like`, {
          params: {
            pageSize: 30,
            pageNumber,
            user_id: router.query.userId,
          },
        });
      }
      initRefresh = false;

      if (res && res.list && res.list.length) {
        if (activeIdx == 0 || activeIdx == 2) {
          setNftList((prev) => {
            return [...prev, ...res.list];
          });
        } else {
          let list: any = [];
          res.list.map((t: any) => {
            if (t.collection_id) {
              list.push({ ...t.collection });
            }
            if (t.gallery_id) {
              list.push({ ...t.gallery, type: "Gallery" });
            }
          });
          setNftList((prev) => {
            return [...prev, ...list];
          });
        }
        setNext(res.next);
        if (res.next) pageNumber++;
      } else {
        setNext(false);
        if (res.next) pageNumber = 0;
      }
      setLoading(false);
    } catch (error) {
      initRefresh = false;
      setNftList([]);
      setLoading(false);
      console.log(error);
      setNext(false);
    }
  };

  const getUserInfo = async () => {
    setUserInfo({ ...userInfoInit });
    // setUserStoreInfo({...userInfoInit})
    try {
      const res: any = await api.get(`/api/user/${router.query.userId}`);
      if (res && res.id) {
        setUserInfo({ ...res });
        // setUserStoreInfo({...res})
      } else {
        setUserInfo({ ...userInfoInit });
        // setUserStoreInfo({...userInfoInit})
      }
    } catch (error) {
      setUserInfo({ ...userInfoInit });
      // setUserStoreInfo({...userInfoInit})
    }
  };

  const getSaleInfo = async () => {
    try {
      const res: any = await api.get(`/api/user/sts`, {
        params: {
          user_id: router.query.userId,
        },
      });
      if (res) {
        setSaleInfo({ ...res });
      } else {
        setSaleInfo({ ...saleInfoInit });
      }
    } catch (error) {
      setSaleInfo({ ...saleInfoInit });
    }
  };

  const showEditModal = () => {
    setIsModalOpen(true);
    setEditNm(userInfo.name ? userInfo.name : `User${userInfo.num}`);
    setEditDes(userInfo.description ? userInfo.description : "");
    setEditImg(userInfo.image);
  };

  const editDone = async () => {
    try {
      const res: any = await api.put(`/api/user`, {
        name: editNm,
        description: editDes,
        image: editImg ? editImg : "",
      });
      setIsModalOpen(false);
      if (res) {
        getUserInfo();
        const res1: any = await api.get(`/api/user`);
        if (res1 && res1.id) {
          setUserStoreInfo({ ...res1 });
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    setNext(false);
    pageNumber = 0;
    setNftList([]);
    if (router && router.query && router.query.userId) {
      setLoading(true);
      getNftInfo(0);
    }
  }, [activeIdx, activeIdx1, router]);

  useEffect(() => {
    if (router && router.query) {
      if (router.query.userId) {
        getUserInfo();
        getSaleInfo();
      }
      if (router.query.activeIndex) {
        setActiveIdx(2);
      }
    }
  }, [router]);

  return (
    <>
      <NextSeo title="Profile | KNexus" />
      <div className="flex flex-col h-screen text-[#000] font-eurostile overflow-auto">
        <div className="fixed z-20 w-full flex flex-col">
          <div className="bg-white">
            <Campign />
          </div>
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
        <div className="w-full" ref={carouselRef}>
          <Image className="mr-2 w-full" src="/images/common/user-bg.png" />
        </div>
        <BaseModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          }}
          size="xl"
          title="Edit your profile"
        >
          <div>
            <Image className="mr-2 w-full" src="/images/common/edit-bg.png" />
          </div>
          <div className="h-[80px] w-[80px] mt-[-40px]">
            <HeadImgEdit
              showEdit={true}
              imgSrc={editImg}
              changeImg={(e: any) => setEditImg(e)}
              id={userInfo.id}
            />
          </div>
          <div className="font-bold mt-5 mb-2 text-[18px] flex justify-between">
            <div>Name</div>
            <div>{editNm.length}/20</div>
          </div>
          <div className="mb-4">
            <Input
              focusBorderColor={"bg.main"}
              value={editNm}
              onChange={(e) => {
                if (e.target.value.length > 20) return;
                setEditNm(e.target.value);
              }}
              placeholder="input"
            />
          </div>
          <div className="font-bold mb-2 text-[18px] flex justify-between">
            <div>Bio</div>
            <div>{editDes.length}/300</div>
          </div>
          <div className="w-full h-[140px] relative">
            <Textarea
              height={"140px"}
              resize="none"
              borderWidth="2px"
              borderColor="#ccc"
              focusBorderColor={"bg.main"}
              value={editDes}
              onChange={(e) => setEditDes(e.target.value)}
              placeholder="input"
            />
          </div>
          <div
            className="flex ml-[auto] w-[fit-content] mt-8 items-center"
            onClick={() => editDone()}
          >
            <Button variant="primary" size="md" w="100px">
              <div>
                <span className="mr-1 text-[18px]">Done</span>
              </div>
            </Button>
          </div>
        </BaseModal>
        <div className="flex-1 w-full">
          <div className="w-[90%] mx-[auto] mt-0 flex gap-10 mb-10 -translate-y-[50px]">
            <div className="w-[340px]">
              <div className="w-full h-[fit-content] sticky top-[130px]">
                <div className="flex justify-between mb-2 items-center">
                  <div className="h-[100px] w-[100px] shrink-0">
                    <HeadImgEdit
                      showEdit={false}
                      imgSrc={userInfo.image}
                      id={userInfo.id}
                    />
                  </div>
                  {router.query.userId == id ? (
                    <div>
                      <Button
                        variant="blackPrimary"
                        className="flex items-center w-full rounded-[15px] mt-[70px]"
                        borderRadius={"15px"}
                        height={"30px"}
                      >
                        <div
                          className="flex items-center justify-center"
                          onClick={() => showEditModal()}
                        >
                          <div>
                            <Image
                              className="mr-2"
                              height={"20px"}
                              src="/images/common/edit.png"
                            />
                          </div>
                          <div>Edit</div>
                        </div>
                      </Button>
                    </div>
                  ) : (
                    <div className="mt-[70px]">
                      <Follow
                        id={userInfo.id}
                        isFollow={
                          userInfo?.follow_follower_followee?.length > 0
                            ? true
                            : false
                        }
                      />
                    </div>
                  )}
                </div>
                <p className="font-bold text-[24px] mb-1">
                  {userInfo.name || `User${userInfo.num}`}
                </p>
                <div className="text-[#727272] mb-3">
                  <span className="mr-4 text-[16px]">
                    User ID: {userInfo.num || "-"}
                  </span>
                  <span className="mr-4">|</span>
                  <span>
                    Joined:{" "}
                    {userInfo.created_at
                      ? moment(userInfo.created_at).format("YYYY-MM-DD")
                      : "-"}
                  </span>
                </div>
                <div className="flex gap-5 mb-3 text-[#727272] ">
                  {userInfo.email && router.query.userId == id && (
                    <div className="py-1 px-3 rounded-[20px] border-[1px] border-[#727272]">
                      {userInfo.email}
                    </div>
                  )}
                  {userInfo.address && (
                    <div className="py-1 px-3 rounded-[20px] border-[1px] border-[#727272]">
                      {shortenAddr(userInfo.address, 6) || "-"}
                    </div>
                  )}
                </div>
                <pre className="text-[#727272] whitespace-pre-wrap w-full">
                  {userInfo.description}
                </pre>

                <div className="mt-6 bg-green border-[1px] border-[#000] px-6 py-4 rounded-[16px] text-[20px]">
                  <p className=" text-[#727272] text-[16px] mb-1">Earned</p>
                  <div className="w-1/2 flex items-center">
                    <Image
                      className="h-[20px] mr-2"
                      src="/images/common/earn.png"
                    />
                    {saleInfo.earnAmount} USDT
                  </div>
                </div>
                <div className="mx-[auto] w-[90%] mt-6">
                  <div className="flex items-center">
                    <div className="w-[110px]">
                      <div className="text-[24px] text-[#000]">
                        {saleInfo.promptCount}
                      </div>
                      <div className="text-[14px] text-[#727272]">Prompts</div>
                    </div>
                    <div className="w-[124px]">
                      <div className="text-[24px] text-[#000]">
                        {userInfo.coupon}
                      </div>
                      <div className="text-[14px] text-[#727272]">
                        Prompt Point
                      </div>
                    </div>
                    <div>
                      <div className="text-[24px] text-[#000]">
                        {saleInfo.galleryCount}
                      </div>
                      <div className="text-[14px] text-[#727272]">Gallery</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-[110px]">
                      <div className="text-[24px] text-[#000]">
                        {saleInfo.buyerCount}
                      </div>
                      <div className="text-[14px] text-[#727272]">Buyers</div>
                    </div>
                    <div className="w-[124px]">
                      <div className="text-[24px] text-[#000]">
                        {userInfo.followee_count}
                      </div>
                      <div className="text-[14px] text-[#727272]">Follower</div>
                    </div>
                    <div>
                      <div className="text-[24px] text-[#000]">
                        {userInfo.follower_count}
                      </div>
                      <div className="text-[14px] text-[#727272]">
                        Following
                      </div>
                    </div>
                  </div>
                </div>
                {router.query.userId == id && (
                  <div className="flex flex-col gap-2 mt-4">
                    <Button
                      onClick={() => router.push("/earn")}
                      color="#D5F95F"
                      bg="#000"
                      boxShadow="0px 0px 16px 0px rgba(0, 0, 0, 0.25)"
                      borderRadius="full"
                      _hover={{ background: "rgba(0,0,0,0.5)" }}
                    >
                      <div className="flex items-center">
                        <Image
                          className="h-[20px] mr-1"
                          src="/images/common/coin.png"
                        />
                        Earn more
                      </div>
                    </Button>
                    <ClaimOatModal />
                  </div>
                )}
              </div>
            </div>
            <div className="w-[calc(100%-340px)]">
              <div
                className={`flex mt-16 border-b-[2px] border-[#CCCCCC] px-10 sticky ${
                  showNotion ? "top-[148px]" : "top-[120px]"
                } z-40 bg-[#fff]`}
              >
                {tabs.map((t: any, i: number) => (
                  <div
                    key={i}
                    onClick={() => {
                      ButtonClickTrace(
                        i === 0
                          ? "userinfo-listing"
                          : i === 1
                          ? "userinfo-collected"
                          : "userinfo-liked",
                      );
                      setActiveIdx(i);
                    }}
                    className={`mr-14 relative text-[24px] h-16 cursor-pointer flex items-center justify-center ${
                      router.query.userId != id && i == 1 ? "hidden" : ""
                    }`}
                  >
                    {t}
                    <div className="bg-green ml-2 text-[14px] px-2 rounded-[20px]">
                      {i == 0
                        ? saleInfo.promptCount
                        : i == 1
                        ? saleInfo.boughtCount
                        : i == 2
                        ? saleInfo.galleryCount
                        : saleInfo.likeCount}
                    </div>
                    {activeIdx === i && (
                      <div className="absolute bottom-[-4px] left-0 w-full bg-black h-[6px] rounded-[3px]"></div>
                    )}
                  </div>
                ))}
              </div>
              {activeIdx === 0 && id == router.query.userId && (
                <div
                  className={`flex px-10 h-20 items-center z-40 bg-[#fff] sticky ${
                    showNotion ? "top-[214px]" : "top-[186px]"
                  }`}
                >
                  {tabs1.map((t: any, i: number) => (
                    <div
                      key={i}
                      onClick={() => setActiveIdx1(i)}
                      className={`mr-5 text-[18px] py-1 rounded-[20px] w-[100px] flex items-center justify-center cursor-pointer ${
                        activeIdx1 === i ? "font-[700] bg-green" : ""
                      }`}
                    >
                      {t["name"]}
                    </div>
                  ))}
                </div>
              )}
              {loading ? (
                <div
                  className={`${
                    activeIdx !== 0
                      ? "h-[calc(100vh-510px)]"
                      : "h-[calc(100vh-540px)]"
                  } w-full flex items-center justify-center`}
                >
                  <SyncLoader color="#000" size={20} />
                </div>
              ) : (
                <>
                  {nftList.length > 0 ? (
                    <>
                      <div
                        className={`overflow-auto card-grid-column mb-10 px-10 show-scroll ${
                          activeIdx !== 0 || id !== router.query.userId
                            ? "mt-5"
                            : ""
                        }`}
                        ref={myRef}
                      >
                        {nftList.map((nft: any, i: number) => (
                          <LazyloadCard
                            delay={1000}
                            key={i}
                            nftinfo={nft}
                            skeleton={<SkeletonNftCard />}
                          >
                            <NftCard
                              type={tabs[activeIdx]}
                              {...nft}
                              status={activeIdx1 == 0 ? 1 : 0}
                              key={i}
                              showImgHoverIcon={
                                router &&
                                router.query &&
                                router.query.userId &&
                                router.query.userId == id
                              }
                            />
                          </LazyloadCard>
                        ))}
                      </div>
                      <div className="w-full h-[5px]" ref={loadingBox}></div>
                    </>
                  ) : (
                    <div className="w-full h-[800px] flex items-center justify-center">
                      <NotData size="lg" />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="mt-[60px]">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
