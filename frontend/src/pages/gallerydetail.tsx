import React, { useEffect, useState } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import { Box } from "@chakra-ui/react";
import api from "api";
import { Header, SocialButton } from "components";
import Campign from "components/common/Campign";
import CollectionsArea from "components/result/CollectionsArea";
import StackedCarousel from "components/result/StackedCarousel";
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
  const [nftList, setNftList] = useState<INftCard[]>([]);

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const getGallery = async () => {
    setLoading(true);
    try {
      const res: any = await api.get(`/api/user/gallery`, {
        params: {
          pageSize: 100,
          pageNumber: 0,
          user_id: router.query.userId,
        },
      });
      if (res && res.list && res.list.length) {
        let galleryList = res.list.filter((t: any) => {
          return t.collection;
        });
        setNftList(galleryList);
      } else {
        setNftList([]);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      router &&
      router.query &&
      router.query.gallery_id &&
      router.query.userId
    ) {
      getGallery();
    }
  }, []);

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
          content={`${siteName}/gallerydetail/?userId=${router.query.userId}&gallery_id=${router.query.id}&collection_id=${router.query.collection_id}&imgUrl=${imgUrl}`}
        />
        <meta
          name="twitter:title"
          content="KNeuxs - Web3 & AI Prompt Marketplace"
        />
        <meta name="twitter:image" content={`${imgUrl}`} />
        <meta
          property="og:url"
          content={`${siteName}/gallerydetail/?userId=${router.query.userId}&gallery_id=${router.query.id}&collection_id=${router.query.collection_id}&imgUrl=${imgUrl}`}
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
      {/* <NextSeo title="result-Knexus" /> */}
      <div className="flex flex-col h-screen font-eurostile bg-[url('/images/bg.png')]">
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
        <div className="flex flex-col justify-between h-[calc(100vh-70px)] overflow-y-auto">
          <div className="py-4 h-[600px]">
            {loading ? (
              <div className="w-full h-[200px] flex justify-center items-center">
                <SyncLoader color="#000" size={20} />
              </div>
            ) : nftList.length > 0 ? (
              <StackedCarousel data={nftList} />
            ) : null}
          </div>
          <CollectionsArea isShowCollectionsCard={true} />
        </div>
      </div>
    </>
  );
}
