import React, { useEffect, useRef, useState } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import {
  Box,
  Button,
  Image,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Textarea,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { Select, Tooltip } from "antd";
import api from "api";
import { NextSeo } from "components";
import {
  CommentTree,
  Header,
  Like,
  NotData,
  WaterPrint,
} from "components/common";
import {
  BaseModal,
  CommentCard,
  DownloadBtn,
  HeadImgEdit,
  SureSaleModal,
} from "components/common";
import Campign from "components/common/Campign";
import CollectionsArea from "components/result/CollectionsArea";
import { siteName } from "config/base";
import useKnexusContract from "contract/useKnexusContract";
import { getPreprocessorByLabel, styleEnumConfig } from "lib/promptEnum";
import { getChainNm, shortenAddr, urlToBase64 } from "lib/tool";
import { ButtonClickTrace } from "lib/trace";
import { INftCard } from "lib/types";
import lodash from "lodash";
import moment from "moment";
import { SyncLoader } from "react-spinners";
import { useEarlyUserStore } from "store/earlyUserStore";
import { usePidCommentStore } from "store/pidCommentStore";
import { useScrollStore } from "store/scrollStore";
import { useUserInfoStore } from "store/userInfoStore";
import { v4 as uuidv4 } from "uuid";

import { ShareModal } from "./../../components/common/ShareModal";

const info = {
  amount: 0,
  block_number: "",
  cfg_scale: "",
  collection_image: "",
  control_img: "",
  control_net: false,
  created_at: "",
  created_by: "",
  description: "",
  id: "",
  like: [],
  like_count: "",
  log_index: "",
  model: "",
  name: "",
  preprocessor: "",
  price: 0,
  sale_count: 0,
  sampling_method: "",
  sampling_steps: "",
  seed: "",
  size: "",
  status: 1,
  token_address: "",
  token_id: "",
  tx_hash: "",
  updated_at: "",
  user: { name: null, image: null, address: "" },
  weight: "",
  words: "",
  owned: 0,
  used_count: 0,
  style: "",
  style_key: "",
};

const hideInfoStr = "*****";

let pageNumber = 0;

export async function getServerSideProps(context: any) {
  return {
    props: {
      imgUrl: context.query.imgUrl || null,
    },
  };
}

const Web3Info = (props: any) => {
  return (
    <div className="card-shadow rounded-[10px] mb-8 border-[2px] border-[#000]">
      <div className="text-[20px] font-[600] pb-2 border-b-[2px] border-[rgba(0,0,0,0.1)]  py-3 px-6 rounded-tl-[10px] rounded-tr-[10px]">
        Attributes
      </div>
      <div className="px-5 py-3 text-[16px]">
        <div className="flex mb-5">
          <div className="shrink-0 w-1/2">
            <p className="text-[rgba(0,0,0,0.6)]">Token Address</p>
            <p className="font-[700] text-[20px]">
              {shortenAddr(props.token_address, 6) || "-"}
            </p>
          </div>
          <div className="shrink-0 w-1/2">
            <p className="text-[rgba(0,0,0,0.6)]">Token ID</p>
            <p className="font-[700] text-[20px]">{props.token_id || "-"}</p>
          </div>
        </div>
        <div className="flex mb-5">
          <div className="shrink-0 w-1/2">
            <p className="text-[rgba(0,0,0,0.6)]">Chain</p>
            <p className="font-[700] text-[20px]">
              {getChainNm(props.chain_id)}
            </p>
          </div>
          <div className="shrink-0 w-1/2">
            <p className="text-[rgba(0,0,0,0.6)]">Max Supply</p>
            <p className="font-[700] text-[20px]">{props.amount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// const NftDetail = () =>
export default function NftDetail({ imgUrl }: any) {
  const imgCollectionRef: any = useRef(null);

  const myRef = useRef(null);

  const toast = useToast();

  const { commentData, setCommentData } = usePidCommentStore();

  const knexusContract = useKnexusContract();

  const { id, address } = useUserInfoStore((state) => {
    return {
      id: state.id,
      address: state.address,
    };
  });

  const { isMintSuccess, setIsMintSuccess, setMintId } = useEarlyUserStore();

  const { setDetailImg, detail_img } = useScrollStore();

  const router = useRouter();

  const [nftInfo, setNftInfo] = useState<any>(info);

  const [bnbPrice, setBnbPrice] = useState<any>(0);

  const [sureSaleModalOpen, setSureSaleModalOpen] = useState<boolean>(false);

  const [isPromptOpen, setIsPromptOpen] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(true);

  const [negative_prompt, setNegative_prompt] = useState<string>("");

  const [positive_prompt, setPositive_prompt] = useState<string>("");

  const [isModifyModalOpen, setIsModifyModalOpen] = useState<boolean>(false);

  const [mintLoading, setMintLoading] = useState<boolean>(false);

  const [mainCommentsOpen, setMainCommentsOpen] = useState<boolean>(false);

  const [commentsOpen, setCommentsOpen] = useState<boolean>(false);

  const [modifyDes, setModifyDes] = useState<string>("");

  const [modifyPrice, setModifyPrice] = useState<number>(1);

  const [modifyVisibility, setModifyVisibility] = useState<string>("");

  const [commentContent, setCommentContent] = useState<string>("");

  const [commentList, setCommentList] = useState<any>([]);

  const [pageNext, setPageNext] = useState<any>(true);

  const [commentsList, setCommentsList] = useState<any>([]);

  const [nftList, setNftList] = useState<INftCard[]>([]);

  const [isFollowModalOpen, setIsFollowModalOpen] = useState<any>(false);

  const [followLoading, setFollowLoading] = useState<boolean>(false);

  const [commentMainLoading, setCommentMainLoading] = useState<boolean>(false);

  const [shareModalOpen, setShareModalOpen] = useState<boolean>(false);

  const [editPriceLoading, setEditPriceLoading] = useState<boolean>(false);

  const [isOldPrompt, setIsOldPrompt] = useState<boolean>(false);

  const [collectionImgBase64, setCollectionImgBase64] = useState<any>("");

  const [pidCommentsList, setPidCommentsList] = useState<any>({
    item: {},
    subItems: [],
  });

  const [pidCommentLoading, setPidCommentLoading] = useState<boolean>(false);

  const [currentComment, setCurrentComment] = useState<any>({
    user: {
      image: "",
      name: "",
      content: "",
    },
    user_id: "",
    children: [],
  });

  const [currentPidContent, setCurrentPidContent] = useState<any>("");

  const getCollections = async () => {
    try {
      // setLoading(true);
      const res: any = await api.post(`/api/collections`, {
        pageNumber: 0,
        pageSize: 20,
      });
      if (res && res.list && res.list.length > 0) {
        setNftList(res.list);
      } else {
        setNftList([]);
        // setLoading(false);
      }
    } catch (error) {
      console.log(error);
      // setLoading(false);
    }
  };

  useEffect(() => {
    getCollections();
  }, []);

  const getNftDetail = async () => {
    setLoading(true);
    try {
      const res: any = await api.get(`/api/collections/${router.query.id}`);
      if (res && res.id) {
        setNftInfo({ ...res });
        setDetailImg(res.collection_image);
        // urlToBase64(res.thumbnail_image).then((base) => {
        //     console.log('图片base',base)
        //     setDetailImg(base);
        //     // setCollectionImgBase64(base)
        // })
        console.log(res.thumbnail_image);
        // getPrompt()
        pageNumber = 0;
        getComments(res.id);
        if (res.chain_id == 56 && res.created_by == id) {
          setIsOldPrompt(true);
        }
        // <meta property="og:image" content={`${detail_img}`} />

        // let meta = document.createElement('meta');
        // meta.content = res.collection_image;
        // meta.name = "twitter:image";
        // document.getElementsByTagName('head')[0].appendChild(meta);

        // let meta1 = document.createElement('meta');
        // meta1.content = res.collection_image;
        // meta1.name = "og:image";
        // document.getElementsByTagName('head')[0].appendChild(meta1);

        // if (res.token_id) {
        //     getOwned(res.token_id)
        // }
      } else {
        setNftInfo(info);
      }
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (router && router.query && router.query.id) {
      getNftDetail();
      if (myRef && myRef.current) {
        const node: any = myRef.current;
        node.scrollTop = 0;
      }
    }
  }, [router]);

  // const getBnbPrice = async () => {
  //     try {
  //         const res = await api.get(
  //             `/api/bnb_price`
  //         );
  //         if (res && res.data && res.data.code) {
  //             console.log('bnb-error', res)
  //             setBnbPrice(0)
  //         } else {
  //             setBnbPrice(Number(res).toFixed(3))
  //         }
  //     }
  //     catch (error) {
  //         console.log('bnb-error', error)
  //     }
  // }

  const mintWith = async () => {
    if (!id) {
      toast({
        title: "Please sign in first.",
        status: "info",
        variant: "subtle",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return false;
    }
    if (!address) {
      toast({
        title: "Please log in with a wallet to purchase.",
        status: "info",
        variant: "subtle",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return false;
    }
    if (nftInfo.owned == 0) {
      ButtonClickTrace("mint");
      setMintLoading(true);
      try {
        const res: any = await knexusContract.mintWith(
          nftInfo.token_id,
          Number(nftInfo.price),
        );
        setMintLoading(false);
        if (res && res.status) {
          console.log("res1", res);
          for (let key in res.events) {
            let t: any = res.events[key];
            if (t && t.raw && t.raw.topics && t.raw.topics.length > 0) {
              if (
                t.raw.topics[0] ==
                "0x54791b38f3859327992a1ca0590ad3c0f08feba98d1a4f56ab0dca74d203392a"
              ) {
                window.open(
                  `https://ccip.chain.link/msg/${t.raw.data}`,
                  "_blank",
                );
              }
            }
          }
          setMintLoading(false);
          // setIsMintSuccess(true)
          setMintId(router.query.id);
          getNftDetail();
          toast({
            title: "Successful purchased!",
            status: "success",
            variant: "subtle",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
        } else {
          setMintLoading(false);
        }
      } catch (error) {
        console.log(error);
        setMintLoading(false);
      }
    }
  };

  const replicas = () => {
    if (!id) {
      toast({
        title: "Please sign in first.",
        status: "info",
        variant: "subtle",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return false;
    }
    ButtonClickTrace("generate");
    if (nftInfo.kind == 2 && !nftInfo.is_follow && nftInfo.visibility == 2) {
      setIsFollowModalOpen(true);
    } else {
      if (nftInfo.pattern == "mbti") {
        router.push(`/mbti/?id=${router.query.id}&kind=gallery`);
      } else {
        router.push(`/texttoimage/?id=${router.query.id}&kind=gallery`);
      }
    }
  };

  // const getOwned = async (id: any) => {
  //     try {
  //         const res = await knexusContract.balanceOf(id);
  //         if (res) {
  //             setNftInfo((prev: any) => {
  //                 prev.owned = res
  //                 return { ...prev }
  //             })
  //         }
  //     }
  //     catch (error) {
  //         console.log(error)
  //     }
  // }

  // const getPrompt = async () => {
  //     if (!nftInfo.id) return false;
  //     try {
  //         const res: any = await api.get(`/api/collections/unlock?collection_id=${nftInfo.id}`);
  //         // setIsPromptOpen(true)
  //         if (res && res.positive_prompt) {
  //             // setNegative_prompt(res.negative_prompt)
  //             setPositive_prompt(res.positive_prompt)
  //         } else {
  //             setPositive_prompt('')
  //         }
  //     }
  //     catch (error) {
  //         toast({
  //             title: 'error',
  //             status: 'error',
  //             variant: 'subtle',
  //             duration: 3000,
  //             isClosable: true,
  //             position: 'top-right'
  //         })
  //     }
  // }

  const getDescription = async () => {
    try {
      const res: any = await api.get(`/api/collections/help/ai2Description`);
      if (res && res.content) {
        setModifyDes(res.content);
      } else {
        setModifyDes("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const modifyRequest = async () => {
    setEditPriceLoading(true);
    try {
      const res: any = await api.put(`/api/collections/${nftInfo.id}`, {
        description: modifyDes,
        // "price": modifyPrice.toString(),
        // "status": nftInfo.status,
        visibility: modifyVisibility,
      });
      setEditPriceLoading(false);
      if (res) {
        getNftDetail();
        setIsModifyModalOpen(false);
        toast({
          title: "Successfully modified!",
          status: "success",
          variant: "subtle",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      }
    } catch (error) {
      setEditPriceLoading(false);
      console.log(error);
    }
  };

  const modify = async () => {
    if (nftInfo.kind === 1) {
      if (modifyPrice.toString() !== nftInfo.price.toString()) {
        try {
          setEditPriceLoading(true);
          const res: any = await knexusContract.setTokenPrice(
            nftInfo.token_id,
            Number(modifyPrice),
          );
          if (res && res.status) {
            modifyRequest();
          } else {
            setEditPriceLoading(false);
          }
        } catch (error) {
          console.log("error", error);
        }
      } else {
        modifyRequest();
      }
    } else {
      modifyRequest();
    }
  };

  const getComments = async (id: string) => {
    try {
      let res: any = await api.get(`/api/comment`, {
        params: {
          collection_id: id,
          pageNumber,
          pageSize: 60,
          p_id: "0",
        },
      });
      if (res) {
        if (pageNumber == 0) {
          setCommentsList((prev: any) => {
            return [...res.list];
          });
        } else {
          setCommentsList((prev: any) => {
            return [...prev, ...res.list];
          });
        }
        setPageNext(res.next);
        pageNumber++;
      } else {
        setCommentList([]);
        // cursor = ''
      }
      // setCLoading(false)
    } catch (error) {
      setCommentList([]);
      // setLoading(false)
    }
  };

  const postComment = async () => {
    setCommentMainLoading(true);
    try {
      const res: any = await api.post(`/api/comment`, {
        collection_id: nftInfo.id,
        p_id: "0",
        content: commentContent,
      });
      setCommentContent("");
      setCommentMainLoading(false);
      if (res) {
        toast({
          title: "Successfully posted!",
          status: "success",
          variant: "subtle",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        pageNumber = 0;
        setMainCommentsOpen(false);
        getComments(nftInfo.id);
      }
    } catch (error) {
      console.log(error);
      setCommentMainLoading(false);
    }
  };

  const getPidComments = async (e: any) => {
    setCommentsOpen(true);
    setCurrentComment(e);
    setCommentData(e);
    try {
      let res: any = await api.get(`/api/comment/tree`, {
        params: {
          p_id: e.id,
        },
      });
      if (res && res.item && res.item.id) {
        setPidCommentsList(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const postPidComment = async () => {
    setPidCommentLoading(true);
    try {
      const res: any = await api.post(`/api/comment`, {
        collection_id: nftInfo.id,
        p_id: commentData.id,
        content: currentPidContent,
      });
      setPidCommentLoading(false);
      getPidComments(currentComment);
      setCurrentPidContent("");
      if (res) {
        toast({
          title: "Successfully posted!",
          status: "success",
          variant: "subtle",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      }
    } catch (error) {}
  };

  useEffect(() => {
    setCurrentPidContent("");
  }, [commentData]);

  const loadMoreComment = () => {
    if (pageNext) {
      getComments(nftInfo.id);
    }
  };

  // const getStyle = (str: string) => {
  //     if (!str) return '-'
  //     if (str == hideInfoStr) return hideInfoStr
  //     let filtStyle = styleEnumConfig.filter((t) => { return t.checkpoint === str })
  //     if (filtStyle.length > 0) {
  //         return filtStyle[0]['label']
  //     }
  // }

  const setDefaultModifyValue = () => {
    ButtonClickTrace("edit");
    setModifyDes(nftInfo.description);
    setModifyPrice(Number(nftInfo.price));
    setModifyVisibility(nftInfo.visibility);
    setIsModifyModalOpen(true);
  };

  const follow = async () => {
    setFollowLoading(true);
    const res: any = await api.post(`/api/follow`, {
      followee_id: nftInfo.created_by,
    });
    if (res) {
      setFollowLoading(false);
      setIsFollowModalOpen(false);
      toast({
        title: "Successfully followed!",
        status: "success",
        variant: "subtle",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      getNftDetail();
      // router.push(`/create/?id=${router.query.id}`)
    }
  };
  return (
    <>
      <Head>
        <title>Detail ｜ Knexus</title>
        <meta
          name="description"
          content="Explore our AI prompt marketplace for Stable Diffusion & Midjourney. Prompt perfect & mint your ideas into Generative NFTs with our pro-2D anime drawing engine"
        />
        <meta
          name="keyworlds"
          content="Web3 AI Prompt Marketplace, AI prompts, Prompt perfect, prompt free"
        />
        <link rel="icon" href="/favicon.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:site"
          content={`${siteName}/nftdetail/${router.query.id}?imgUrl=${router.query.imgUrl}`}
        />
        <meta
          name="twitter:title"
          content="KNexus——Prompt Ignites Intelligence"
        />
        <meta name="twitter:image" content={`${imgUrl}`} />
        <meta
          property="og:url"
          content={`${siteName}/nftdetail/${router.query.id}?imgUrl=${router.query.imgUrl}`}
        />
        <meta
          property="og:title"
          content="KNeuxs - Web3 & AI Prompt Marketplace"
        />
        <meta property="og:image" content={`${imgUrl}`} />
        <meta
          property="og:description"
          content="Discover, create, buy & sell Prompt on KNexus"
        />
      </Head>
      {/* <NextSeo
                title="Detail ｜ Knexus"
                openGraph={{
					url: `${siteName}/nftdetail/${router.query.id}`,
					title: 'KNeuxs - Web3 & AI Prompt Marketplace',
					description: 'Discover, create, buy & sell Prompt on KNexus',
					images: [
					  {
						url: detail_img,
						type: 'image/png',
					  }
					],
					site_name: 'knexus'
				  }}
				twitter={{
					cardType: 'summary_large_image'
				}}
            /> */}
      <div className="flex flex-col h-screen bg-[url('/images/bg.png')] bg-cover text-[#000] font-eurostile">
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
        <div className="h-[calc(100vh-70px)] overflow-auto" ref={myRef}>
          <SureSaleModal
            isOpen={sureSaleModalOpen}
            onClose={() => setSureSaleModalOpen(false)}
            refreshNft={() => getNftDetail()}
            status={nftInfo.status}
            price={nftInfo.price}
            kind={nftInfo.kind}
            name={nftInfo.name}
            collection_id={nftInfo.id}
          />
          <BaseModal
            isOpen={isModifyModalOpen}
            onClose={() => {
              setIsModifyModalOpen(false);
            }}
            size="xl"
            title="Prompt NFT Info"
          >
            <div className=" font-eurostile">
              {/* <div className="font-bold mb-2 text-[20px]">Name</div> */}
              <div className="font-bold mb-2 text-[20px] flex items-center justify-between">
                <div>Name</div>
                <div>{nftInfo.name.length}/50</div>
              </div>
              <div className="mb-4">
                <Input
                  focusBorderColor={"bg.main"}
                  value={nftInfo.name || `User${nftInfo.num}`}
                  isDisabled
                  placeholder="input"
                />
              </div>
              <div className="font-bold mb-2 text-[20px] flex items-center justify-between">
                <div>
                  Description
                  <span
                    className="text-[#005DFF] cursor-pointer ml-4 text-[16px]"
                    onClick={() => getDescription()}
                  >
                    Help Me Out
                  </span>
                </div>
                <div>{modifyDes.length}/300</div>
              </div>
              <div className="w-full h-[160px] relative mb-4">
                <Textarea
                  height={"160px"}
                  focusBorderColor={"bg.main"}
                  value={modifyDes}
                  onChange={(e: any) => setModifyDes(e.target.value)}
                  placeholder="input"
                />
                <div
                  onClick={() => setModifyDes("")}
                  className="absolute right-3 bottom-3 text-[rgba(0,0,0,0.5)] cursor-pointer z-10"
                >
                  clear
                </div>
              </div>
              {nftInfo.kind === 2 && nftInfo.pattern != "mbti" && (
                <>
                  <div className="font-bold mb-2 text-[20px]">
                    Visibility Options
                  </div>
                  <div className="mb-4">
                    <Select
                      size="large"
                      style={{ width: "100%" }}
                      value={modifyVisibility}
                      onChange={(e) => setModifyVisibility(e)}
                      options={[
                        {
                          value: 1,
                          label: "Visible to Everyone",
                          className: "font-eurostile text-[20px]",
                        },
                        {
                          value: 2,
                          label: "Visible to Followers Only",
                          className: "font-eurostile text-[20px]",
                        },
                      ]}
                    />
                  </div>
                </>
              )}
              {nftInfo.kind === 1 && (
                <>
                  <div className="font-bold mb-2 text-[20px]">Amount</div>
                  <div className="mb-4">
                    <NumberInput
                      focusBorderColor={"bg.main"}
                      isDisabled
                      size="md"
                      value={nftInfo.amount}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper
                          bg="#fff"
                          border="none"
                          _active={{ bg: "#fff" }}
                          children="+"
                        />
                        <NumberDecrementStepper
                          bg="#fff"
                          border="none"
                          _active={{ bg: "#fff" }}
                          children="-"
                        />
                      </NumberInputStepper>
                    </NumberInput>
                  </div>
                  <div className="font-bold mb-2 text-[20px]">Price</div>
                  <div>
                    <Input
                      type="number"
                      focusBorderColor={"bg.main"}
                      value={modifyPrice}
                      onChange={(e: any) =>
                        e.target.value < 0
                          ? setModifyPrice(0)
                          : setModifyPrice(e.target.value)
                      }
                      placeholder="input"
                    />
                  </div>
                </>
              )}

              <div className="flex ml-[auto] w-[fit-content] mt-8 items-center">
                {nftInfo.kind === 1 && (
                  <div className="mr-4 text-center">
                    <div className="font-bold">{modifyPrice} USDT</div>
                  </div>
                )}

                <div>
                  <Button
                    variant="primary"
                    size="md"
                    w="140px"
                    loadingText="Confirm"
                    isLoading={editPriceLoading}
                    onClick={() => modify()}
                    isDisabled={
                      (nftInfo.kind === 1 && (!modifyPrice || !modifyDes)) ||
                      (nftInfo.kind === 2 && !modifyDes)
                    }
                  >
                    <div>
                      <span className="mr-1 text-[20px]">Confirm</span>
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </BaseModal>
          <BaseModal
            isOpen={mainCommentsOpen}
            onClose={() => {
              setMainCommentsOpen(false);
            }}
            size="xl"
            title="Comments"
          >
            <div className=" font-eurostile">
              <div className="flex items-center justify-end font-bold mb-2 text-[18px]">
                12/200
              </div>
              <div className="w-full h-[160px] relative mb-4">
                <Textarea
                  height={"160px"}
                  focusBorderColor={"bg.main"}
                  value={commentContent}
                  onChange={(e: any) => setCommentContent(e.target.value)}
                  placeholder="input"
                />
              </div>
              <div className="flex ml-[auto] w-[fit-content] mt-8 items-center">
                <Button
                  variant="primary"
                  size="md"
                  w="140px"
                  loadingText={"Confirm"}
                  isLoading={commentMainLoading}
                  isDisabled={!commentContent}
                  onClick={() => postComment()}
                >
                  <div>
                    <span className="mr-1 text-[20px]">Confirm</span>
                  </div>
                </Button>
              </div>
            </div>
          </BaseModal>
          <BaseModal
            isOpen={commentsOpen}
            onClose={() => {
              setCommentsOpen(false);
            }}
            size="xl"
            title="Comments"
          >
            <div className="font-eurostile">
              <div className="w-full max-h-[50vh] overflow-auto mb-5">
                {pidCommentsList.item.id && (
                  <CommentTree {...pidCommentsList} />
                )}
              </div>

              <div className="flex items-center justify-end font-bold mb-2 text-[18px]">
                {currentPidContent.length}/200
              </div>
              <div className="w-full relative mb-4">
                <Input
                  focusBorderColor={"bg.main"}
                  value={currentPidContent}
                  onChange={(e: any) => setCurrentPidContent(e.target.value)}
                  placeholder={`@${
                    commentData.user.name || `User${commentData.user.num}`
                  }     what do you think of this prompt`}
                />
              </div>
              <div className="flex ml-[auto] w-[fit-content] mt-8 items-center">
                <Button
                  variant="primary"
                  isDisabled={!currentPidContent}
                  size="md"
                  w="140px"
                  isLoading={pidCommentLoading}
                  onClick={() => postPidComment()}
                >
                  <div>
                    <span className="mr-1 text-[20px]">Confirm</span>
                  </div>
                </Button>
              </div>
            </div>
          </BaseModal>
          <BaseModal
            isOpen={isFollowModalOpen}
            size="xl"
            onClose={() => {
              setIsFollowModalOpen(false);
            }}
          >
            <div>
              <div className="flex items-center text-[24px] font-[700] pt-5">
                Prompt👀
              </div>
              <div className="flex items-center text-[16px] my-4">
                You can only generate similar creations if you follow the
                creator.
              </div>
              <div className="flex items-right justify-end w-[fit-content] mt-4 w-full">
                <Button
                  variant="primary"
                  className="mr-5"
                  size="md"
                  w="140px"
                  onClick={() => {
                    setIsFollowModalOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  loadingText={"Following"}
                  isLoading={followLoading}
                  variant="primary"
                  size="md"
                  w="140px"
                  onClick={() => {
                    follow();
                  }}
                >
                  Follow
                </Button>
              </div>
            </div>
          </BaseModal>
          <BaseModal
            isOpen={isOldPrompt}
            size="xl"
            onClose={() => {
              setIsOldPrompt(false);
            }}
          >
            <div>
              <div className="flex items-center text-[24px] font-[700] pt-5">
                Notification
              </div>
              <div className="flex items-center text-[16px] mt-4">
                To better serve you and reduce blockchain gas costs, we have
                migrated our data to the Polygon network.
              </div>
              <div className="flex items-center text-[16px]">
                Additionally, to standardize the platform, all future works will
                be priced in a unified unit to avoid any price
                misunderstandings.
              </div>
              <div className="flex items-center text-[16px] mb-4">
                We apologize for any inconvenience this may cause. Please adjust
                the price of your work and relist it.
              </div>
              <div className="flex items-right justify-end w-[fit-content] mt-4 w-full">
                <Button
                  variant="primary"
                  className="mr-5"
                  size="md"
                  w="140px"
                  onClick={() => {
                    setIsOldPrompt(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  w="140px"
                  onClick={() =>
                    router.push(`/create/?id=${router.query.id}&kind=sellagin`)
                  }
                >
                  Confirm
                </Button>
              </div>
            </div>
          </BaseModal>
          <ShareModal
            isOpen={shareModalOpen}
            onClose={() => setShareModalOpen(false)}
            nft={nftInfo}
          />
          {loading ? (
            <div className="w-full h-full flex items-center justify-center">
              <SyncLoader color="#000" size={20} />
            </div>
          ) : (
            <div className="w-[80%] mx-[auto] mt-6">
              <div className="flex justify-between gap-20">
                <div
                  className="flex-1 shrink-0 w-0"
                  onContextMenu={(e: any) => e.preventDefault()}
                >
                  <div
                    className={`w-full ${
                      nftInfo.collection_image
                        ? " border-[2px] border-[#000]"
                        : ""
                    } rounded-[20px] overflow-hidden relative`}
                  >
                    <Image
                      className="w-full"
                      src={
                        nftInfo.collection_image
                          ? nftInfo.collection_image
                          : "/images/common/create-large-test.png"
                      }
                    />
                    <WaterPrint
                      userName={`${
                        nftInfo.user?.name || `User${nftInfo.user?.num}`
                      }`}
                    />
                  </div>
                  <div className="flex items-center mt-2 mb-2">
                    <div className="text-[24px] font-[600]">
                      {nftInfo.name || "-"}
                    </div>
                    {/* <div><Follow id={nftInfo.user.id} isFollow={nftInfo.is_follow}/></div> */}

                    {
                      <div className="ml-auto flex items-center">
                        <div className="mr-5">
                          <DownloadBtn
                            img={nftInfo.collection_image}
                            nft={nftInfo}
                          />
                        </div>
                        <Tooltip
                          placement="top"
                          title={"Share"}
                          arrow={false}
                          color="#fff"
                          overlayInnerStyle={{
                            color: "#000",
                            fontFamily: "Eurostile",
                            fontSize: "18px",
                          }}
                        >
                          <Image
                            onClick={() => setShareModalOpen(true)}
                            className="cursor-pointer hover:opacity-70 h-10"
                            src="/images/common/share.png"
                          />
                        </Tooltip>
                      </div>
                    }
                  </div>
                  <div className="flex text-[18px] font-[600] mb-2">
                    <div className="flex items-center mr-4 desktop:mr-8 cursor-pointer">
                      <div className="h-6 w-6 mr-1">
                        <HeadImgEdit
                          showEdit={false}
                          imgSrc={nftInfo?.user?.image}
                          id={nftInfo.created_by}
                        />
                      </div>
                      <div
                        onClick={() =>
                          router.push(`/account?userId=${nftInfo.created_by}`)
                        }
                      >
                        {nftInfo.user?.name || `User${nftInfo.user?.num}`}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mr-4 desktop:mr-8">
                      <Like
                        isLike={nftInfo.like.length > 0}
                        id={nftInfo.id}
                        count={nftInfo.like_count}
                      />
                    </div>

                    <div className=" mr-4 desktop:mr-8">
                      <Tooltip
                        placement="top"
                        zIndex={99999}
                        title={"Create At"}
                        arrow={false}
                        color="#fff"
                        overlayInnerStyle={{
                          color: "#000",
                          fontFamily: "Eurostile",
                          fontSize: "18px",
                        }}
                      >
                        <div>
                          {nftInfo.created_at
                            ? moment(nftInfo.created_at).format("YYYY-MM-DD")
                            : "-"}
                        </div>
                      </Tooltip>
                    </div>
                    {nftInfo.kind == 1 ? (
                      <div>{nftInfo.sale_count} Sold</div>
                    ) : (
                      <div>{nftInfo.used_count} Used</div>
                    )}
                  </div>
                  <div className="card-shadow rounded-[10px] mt-3 mb-5 border-[2px] border-[#000]">
                    <div className="text-[20px] mb-3 flex items-center justify-between gap-2 font-[600] pb-2 border-b-[2px] border-[rgba(0,0,0,0.1)]  py-3 px-6 rounded-tl-[10px] rounded-tr-[10px]">
                      <span>
                        {nftInfo.kind == 2 ? "Free prompt" : "Prompt NFT"}
                      </span>
                      <span>{nftInfo.words || 0} Words</span>
                    </div>
                    {(nftInfo.kind == 2 &&
                      (nftInfo.created_by == id ||
                        (nftInfo.visibility == 2 && nftInfo.is_follow) ||
                        nftInfo.visibility == 1)) ||
                    (nftInfo.kind == 1 &&
                      (nftInfo.created_by == id || nftInfo.owned != 0)) ? (
                      <div className="max-h-[200px] overflow-auto mb-2 w-full">
                        <pre className="text-[rgba(0,0,0,0.6)] px-6 text-[16px] whitespace-pre-wrap w-full">
                          {nftInfo.positive_prompt || "-"}
                        </pre>
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-between items-center h-[200px] relative">
                          <Image src="/images/common/no-prompt-permission.png" />
                          <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-center bg-[#fff] border-[2px] border-[#D6D6D6] px-5 py-3 rounded-[10px]">
                            <div className="flex justify-center mb-2">
                              <Image src="/images/common/eye.png" />
                            </div>
                            {nftInfo.kind == 2 ? (
                              <>
                                <div>Unlock the prompt and </div>
                                <div>make your own!</div>
                              </>
                            ) : (
                              <>
                                <div>You must buy the prompt</div>
                                <div>in order to unlock it</div>
                              </>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  {nftInfo.kind == 1 && (
                    <div className="card-shadow rounded-[10px] mt-3 border-[2px] border-[#000]">
                      <div className="text-[20px] flex items-center gap-2 font-[600] pb-2 border-b-[2px] border-[rgba(0,0,0,0.1)]  py-3 px-6 rounded-tl-[10px] rounded-tr-[10px]">
                        <span>Primary Market</span>
                      </div>
                      <div className="flex justify-between items-baseline py-3 px-5">
                        <div className="flex items-baseline">
                          <div className="mr-4 text-[28px] desktop:text-[36px] font-[600]">
                            {nftInfo.price} USDT
                          </div>
                        </div>
                        <div className="text-[20px] font-[600]">
                          Available:{nftInfo.amount - nftInfo.sale_count}
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center mt-5">
                    {nftInfo.kind == 1 && (
                      <div className="font-[600] text-[20px]">
                        You owned : {nftInfo.owned}
                      </div>
                    )}
                    {nftInfo.created_by == id && (
                      <div className="flex ml-[auto]">
                        <div className="ml-auto">
                          <Button
                            variant="blackBorderPrimary"
                            isDisabled={nftInfo.chain_id == 56}
                            loadingText="Edit"
                            w="100px"
                            h="40px"
                            marginRight={"20px"}
                            borderRadius={"20px"}
                            onClick={() => setDefaultModifyValue()}
                          >
                            <Image
                              className={`mr-[6px]`}
                              src="/images/common/edit1.png"
                            />
                            Edit
                          </Button>
                          <Button
                            variant="blackBorderPrimary"
                            isDisabled={nftInfo.chain_id == 56}
                            borderRadius={"20px"}
                            w="100px"
                            h="40px"
                            className="flex items-center ml-[auto] w-[120px] h-[40px]"
                            onClick={() => setSureSaleModalOpen(true)}
                          >
                            <Image
                              className={`mr-[6px] ${
                                nftInfo.status === 1
                                  ? "rotate-180 mt-[-4px]"
                                  : ""
                              }`}
                              src="/images/common/unlist.png"
                            />
                            {nftInfo.status === 1 ? "Unlist" : "List"}
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mb-[60px] flex items-center justify-center">
                    {/* <Button variant="primary" isLoading={mintLoading} loadingText='Mint' w="full" h="60px" borderWidth='4px' fontSize={'18px'} onClick={() => mintWith()}>
                                                    {nftInfo.created_by == id ? nftInfo.status === 1 ? 'Unlist' : 'List' : nftInfo.owned == 0 ? 'Mint' : 'Generate'}
                                                </Button> */}

                    {/* {nftInfo.created_by === id && (
                      <Button
                        variant="blackPrimary"
                        isDisabled={nftInfo.chain_id == 56}
                        loadingText="Edit"
                        w="160px"
                        h="40px"
                        borderRadius={'20px'}
                        borderWidth="2px"
                        fontSize={"18px"}
                        onClick={() => setDefaultModifyValue()}
                      >
                        Edit
                      </Button>
                    )} */}

                    {nftInfo.created_by !== id && nftInfo.kind == 2 && (
                      <Button
                        variant="blackPrimary"
                        isDisabled={nftInfo.chain_id == 56}
                        loadingText="Replica"
                        w="160px"
                        h="40px"
                        borderRadius={"20px"}
                        borderWidth="2px"
                        fontSize={"18px"}
                        onClick={() => replicas()}
                      >
                        Replica
                      </Button>
                    )}

                    {nftInfo.created_by !== id &&
                      nftInfo.kind == 1 &&
                      nftInfo.owned == 0 && (
                        <Button
                          variant="blackPrimary"
                          isDisabled={nftInfo.chain_id == 56}
                          loadingText="Buy Now"
                          isLoading={mintLoading}
                          w="160px"
                          h="40px"
                          borderRadius={"20px"}
                          borderWidth="2px"
                          fontSize={"18px"}
                          onClick={() => mintWith()}
                        >
                          Buy Now
                        </Button>
                      )}

                    {nftInfo.created_by !== id &&
                      nftInfo.kind == 1 &&
                      nftInfo.owned != 0 && (
                        <Button
                          variant="blackPrimary"
                          isDisabled={nftInfo.chain_id == 56}
                          loadingText="Replica"
                          w="160px"
                          h="40px"
                          borderRadius={"20px"}
                          borderWidth="2px"
                          fontSize={"18px"}
                          onClick={() => replicas()}
                        >
                          Replica
                        </Button>
                      )}
                  </div>
                </div>
                <div className="flex-1 shrink-0 w-0">
                  <div className="sticky top-[20px]">
                    <div className="card-shadow rounded-[10px] mt-3 mb-3 min-h-[200px] border-[2px] border-[#000]">
                      <div className="text-[20px] font-[600] pb-2 border-b-[2px] border-[rgba(0,0,0,0.1)] mb-3  py-3 px-6 rounded-tl-[10px] rounded-tr-[10px]">
                        Description
                      </div>
                      <div className="max-h-[200px] overflow-auto mb-2 w-full">
                        <pre className="text-[rgba(0,0,0,0.6)] px-6 text-[16px] whitespace-pre-wrap w-full">
                          {nftInfo.description || "-"}
                        </pre>
                      </div>
                    </div>

                    {nftInfo.pattern == "custom" ? (
                      <>
                        <div className="card-shadow rounded-[10px] mt-5 mb-8 border-[2px] border-[#000]">
                          <div className="text-[20px] font-[600] pb-2 border-b-[2px] border-[rgba(0,0,0,0.1)]  py-3 px-6 rounded-tl-[10px] rounded-tr-[10px]">
                            Details
                          </div>
                          <div className="px-5 py-3">
                            <div className="flex mb-5">
                              <div className="shrink-0 w-1/2">
                                <p className="text-[rgba(0,0,0,0.6)]">Model</p>
                                <p className="font-[700] text-[20px]">
                                  {nftInfo.model || nftInfo.model_type}
                                </p>
                              </div>
                              <div className="shrink-0 w-1/2">
                                <p className="text-[rgba(0,0,0,0.6)]">
                                  Version
                                </p>
                                <p className="font-[700] text-[20px]">
                                  {nftInfo.version}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        {nftInfo.kind == 1 && <Web3Info {...nftInfo} />}
                      </>
                    ) : (
                      <div className="card-shadow rounded-[10px] mt-5 mb-5 border-[2px] border-[#000]">
                        <div className="text-[20px] font-[600] pb-2 border-b-[2px] border-[rgba(0,0,0,0.1)]  py-3 px-6 rounded-tl-[10px] rounded-tr-[10px]">
                          Details
                        </div>
                        <div className="px-5 py-3">
                          <div className="flex mb-5">
                            <div className="shrink-0 w-1/2">
                              <p className="text-[rgba(0,0,0,0.6)]">
                                Content Type
                              </p>
                              <p className="font-[700] text-[20px]">
                                Text to Image
                              </p>
                            </div>
                            <div className="shrink-0 w-1/2">
                              <p className="text-[rgba(0,0,0,0.6)]">Style</p>
                              <p className="font-[700] text-[20px]">
                                {nftInfo.style_key}
                              </p>
                            </div>
                          </div>
                          {nftInfo.pattern != "mbti" && (
                            <>
                              <div className="flex mb-5">
                                <div className="shrink-0 w-1/2">
                                  <p className="text-[rgba(0,0,0,0.6)]">
                                    Sampler
                                  </p>
                                  <p className="font-[700] text-[20px]">
                                    {nftInfo.sampling_method}
                                  </p>
                                </div>
                                {/* <div className="shrink-0 w-1/2">
                                  <p className="text-[rgba(0,0,0,0.6)]">
                                    Performance
                                  </p>
                                  <p className="font-[700] text-[20px]">
                                    {nftInfo.performance}
                                  </p>
                                </div> */}
                                <div className="shrink-0 w-1/2">
                                  <p className="text-[rgba(0,0,0,0.6)]">
                                    Input Image
                                  </p>
                                  <p className="font-[700] text-[20px]">
                                    {nftInfo.control_img ? "Yes" : "No"}
                                  </p>
                                </div>
                              </div>
                              <div className="flex mb-5">
                                <div className="shrink-0 w-1/2">
                                  <p className="text-[rgba(0,0,0,0.6)]">Size</p>
                                  <p className="font-[700] text-[20px]">
                                    {nftInfo.size}
                                  </p>
                                </div>
                              </div>
                            </>
                          )}
                          {nftInfo.pattern == "master" && (
                            <>
                              <div className="text-[20px] font-[600] pb-2 border-b-[2px] border-[rgba(0,0,0,0.1)] mb-3">
                                Image Prompt
                              </div>
                              <div className="flex mb-5">
                                <div className="shrink-0 w-1/2">
                                  <p className="text-[rgba(0,0,0,0.6)]">
                                    Weight
                                  </p>
                                  <p className="font-[700] text-[20px]">
                                    {nftInfo.weight}
                                  </p>
                                </div>
                              </div>
                              <div className="flex mb-5">
                                <div>
                                  <p className="text-[rgba(0,0,0,0.6)]">
                                    Preprocessor
                                  </p>
                                  <p className="font-[700] text-[20px]">
                                    {getPreprocessorByLabel(
                                      nftInfo.preprocessor,
                                    ).join("/")}
                                  </p>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    )}

                    {nftInfo.kind == 2 && (
                      <div className="card-shadow rounded-[10px] mt-3 border-[2px] border-[#000] px-6 py-3 mb-8">
                        <div className="text-[20px] font-[600]">
                          <span className="mr-4">Visibility Options:</span>
                          <span>
                            {nftInfo.visibility == 1
                              ? "Visible to Everyone"
                              : "Visible to Followers Only"}
                          </span>
                        </div>
                      </div>
                    )}

                    {nftInfo.kind == 1 && nftInfo.pattern != "custom" && (
                      <Web3Info {...nftInfo} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="bg-white text-black mt-[60px]">
            <div className="w-[80%] mx-[auto] pt-14">
              <div className="flex gap-5 items-center mb-5">
                <div className="font-bold text-[24px]">Comments</div>
                <Button
                  variant="blackPrimary"
                  borderRadius={"20px"}
                  className="flex items-center h-[40px]"
                  onClick={() => setMainCommentsOpen(true)}
                >
                  <Image
                    className={`mr-[6px] ${
                      nftInfo.status === 1 ? "" : "rotate-180 mt-[-4px]"
                    }`}
                    src="/images/common/addcom.png"
                  />
                  Add Comment
                </Button>
              </div>
              {commentsList.length == 0 ? (
                <div
                  className={`h-[300px] w-full flex items-center justify-center`}
                >
                  <NotData size="md" />
                </div>
              ) : (
                <div className="max-h-[500px] overflow-auto w-full">
                  <div className={`grid-container show-scroll`}>
                    {commentsList.map((t: any, i: number) => (
                      <>
                        <CommentCard
                          key={i}
                          {...t}
                          commentCheck={(e: any) => getPidComments(e)}
                        />
                      </>
                    ))}
                  </div>
                  {commentsList.length > 0 && (
                    <div
                      className="text-black text-[20px] text-center font-bold cursor-pointer my-5"
                      onClick={() => loadMoreComment()}
                    >
                      {pageNext ? "Load More" : "All loaded"}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="flex overflow-y-auto flex-col justify-between">
            <CollectionsArea isShowCollectionsCard={false} />
          </div>
        </div>
      </div>
    </>
  );
}
