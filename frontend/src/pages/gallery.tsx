import React, { useCallback, useEffect, useState } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import { LeftOutlined } from "@ant-design/icons";
import { Box } from "@chakra-ui/react";
import api from "api";
import { Header, NextSeo, SocialButton } from "components";
import Campign from "components/common/Campign";
import StackedCarousel from "components/gallery/StackedCarousel";
import CollectionsArea from "components/result/CollectionsArea";
import { siteName } from "config/base";
import { INftCard } from "lib/types";
import { SyncLoader } from "react-spinners";

export async function getServerSideProps(context: any) {
  return {
    props: {
      imgUrl: context.query.imgUrl || null,
    },
  };
}

export default function result({ imgUrl }: any) {
  const [loading, setLoading] = useState(false);

  const [pageNumber, setPageNumber] = useState<number>(0);

  const [nftList, setNftList] = useState<any>([]);

  const [next, setNext] = useState<boolean>(true);

  const [camNum, setCamNum] = useState<string>("");

  const router = useRouter();

  // const getGallery = () => {
  //     console.log('加载')
  // }

  useEffect(() => {
    getGallery(0);
    if (router && router.query && router.query.campaignid) {
      getCampain();
    }
  }, []);

  const getCampain = async () => {
    try {
      const res: any = await api.get(`/api/campaign`);
      if (res) {
        let list = res.filter((t: any) => {
          return t.id == router.query.campaignid;
        });
        if (list.length > 0) {
          setCamNum(list[0]["name"]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getGallery = useCallback(
    async (pn: number) => {
      console.log(pn);
      try {
        if (!next) return;
        const res: any = await api.post(`/api/gallery/list`, {
          pageNumber: pn.toString(),
          pageSize: "10",
          campaign_id: router.query.campaignid,
        });
        if (res.list && res.list.length) {
          setNftList((prev: any) => {
            return [...prev, ...res.list];
          });
        }
        if (!res.next) {
          setNext(false);
        } else {
          setPageNumber(pn);
        }
        // setLoading(false);
      } catch (error) {
        setNftList([]);
      }
    },
    [pageNumber],
  );

  return (
    <>
      <Head>
        <title>KNexus | Web3 AI Prompt Marketplace</title>
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
          content={`${siteName}/gallery/?campaignid=${router.query.campaignid}&imgUrl=${imgUrl}`}
        />
        <meta
          name="twitter:title"
          content="KNeuxs - Web3 & AI Prompt Marketplace"
        />
        <meta name="twitter:image" content={`${imgUrl}`} />
        <meta
          property="og:url"
          content={`${siteName}/gallery/?campaignid=${router.query.campaignid}&imgUrl=${imgUrl}`}
        />
        <meta
          property="og:title"
          content="KNeuxs - Web3 & AI Prompt Marketplace"
        />
        <meta
          property="og:description"
          content="Discover, create, buy & sell Prompt on KNexus"
        />
        <meta property="og:image" content={`${imgUrl}`} />
      </Head>
      <NextSeo title="Gallery-Knexus" />
      <div
        className="flex flex-col h-screen font-eurostile bg-[url('/images/bg.png')]"
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
        <div className="h-[calc(100vh-70px)] overflow-y-auto">
          <div className=" w-[calc(100%-80px)] mx-auto pt-5">
            <div className="flex gap-5 items-center">
              <div
                className="w-[40px] h-[40px] bg-[#fff] cursor-pointer flex items-center 
                                justify-center rounded-md border-[2px] border-[rgba(0,0,0,0.1)] mr-5 hover:opacity-70 
                                sticky top-[10px] z-10 "
                style={{ boxShadow: "0 0 5px 0 rgba(0,0,0,0.2)" }}
                onClick={() => router.push("/marketplace")}
              >
                <LeftOutlined style={{ fontSize: "20px" }} />
              </div>
              <div className="flex text-[20px] font-bold items-center">
                {camNum}
              </div>
            </div>
            <div className="py-4 h-[600px] overflow-auto">
              {loading ? (
                <div className="w-full h-[200px] flex justify-center items-center">
                  <SyncLoader color="#000" size={20} />
                </div>
              ) : nftList.length > 0 ? (
                <StackedCarousel
                  loadMoreCallback={(page: number) => getGallery(page)}
                  nftList={nftList}
                  pageNumber={pageNumber}
                  next={next}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
