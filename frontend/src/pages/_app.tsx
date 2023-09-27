import React, { useEffect, useState } from "react";

import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";

import { ChakraProvider } from "@chakra-ui/react";
import "antd/dist/reset.css";
import { MainModal } from "components/common";
import { Trace } from "components/layout/Trace";
import { baseURL, siteName } from "config/base";
import { isProduction } from "lib";
import { Web3ContextProvider } from "lib/Web3Context";
import { QueryClient, QueryClientProvider } from "react-query";
import "styles/antd-reset.scss";
import "styles/globals.css";
import customTheme from "styles/theme";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={customTheme}>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${
            isProduction ? "G-N9B6ZWRBQN" : "G-LVX6BBWG3T"
          }`}
        ></Script>
        <Script id="google-analytics">
          {isProduction
            ? `
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
					
						gtag('config', 'G-N9B6ZWRBQN');
					`
            : `
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
					
						gtag('config', 'G-LVX6BBWG3T');
					`}
        </Script>
        <Web3ContextProvider>
          {router.query.image ? (
            <Head>
              <title>Knexus</title>
              <meta name="description" content="knexus" />
              <link rel="icon" href="/favicon.png" />
              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:site" content={`${siteName}`} />
              <meta
                name="twitter:title"
                content="KNexus——Prompt Ignites Intelligence"
              />
              <meta
                name="twitter:image"
                content={`${baseURL}/api/generateImage?image=${router.query.image}`}
              />
            </Head>
          ) : router.route.includes("/nftdetail") ? (
            <Head children={undefined}></Head>
          ) : (
            <Head>
              <title>Knexus</title>
              <meta name="description" content="knexus" />
              <link rel="icon" href="/favicon.png" />
              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:site" content={`${siteName}`} />
              <meta
                name="twitter:title"
                content="KNexus——Prompt Ignites Intelligence"
              />
              <meta
                name="twitter:image"
                content={`${siteName}/images/twitter-share.png`}
              />
            </Head>
          )}
          <Component {...pageProps}></Component>
          <Trace />
          <MainModal />
        </Web3ContextProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default MyApp;
