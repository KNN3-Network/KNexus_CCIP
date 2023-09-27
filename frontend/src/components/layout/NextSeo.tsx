import type { ReactNode } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import { baseURL, siteName } from "config/base";
import { NextSeo as Seo } from "next-seo";
import { OpenGraph, Twitter } from "next-seo/lib/types";
import { useScrollStore } from "store/scrollStore";

type NextSeoProps = {
  title: string;
  description?: string;
  keywords?: string;
  openGraph?: OpenGraph;
  twitter?: Twitter;
};

const comDescription =
  "Explore our AI prompt marketplace for Stable Diffusion & Midjourney. Prompt perfect & mint your ideas into Generative NFTs with our pro-2D anime drawing engine ";
const comKeyword =
  "Web3 AI Prompt Marketplace, AI prompts, Prompt perfect, prompt free";
const comTitle = "KNexus | Web3 AI Prompt Marketplace";

export const NextSeo = ({
  title,
  description,
  keywords,
  openGraph,
  twitter,
}: NextSeoProps) => {
  return (
    <>
      <Head>
        <meta name="keywords" content={keywords || comKeyword} />
      </Head>
      <Seo
        title={title || comTitle}
        description={description || comDescription}
        openGraph={openGraph}
        twitter={twitter}
      />
    </>
  );
};
