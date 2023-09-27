/* eslint-disable react/jsx-props-no-spreading */
import type { DocumentContext } from "next/document";
import Document, { Head, Html, Main, NextScript } from "next/document";

import { ColorModeScript } from "@chakra-ui/react";

import customTheme from "./../styles/theme";

class MyDocument extends Document {
  static getInitialProps(ctx: DocumentContext) {
    return Document.getInitialProps(ctx);
  }

  render() {
    return (
      <Html lang="en">
        <title>KNexus</title>
        <Head>
          <link rel="shortcut icon" href="/favicon.png" />
          <link
            rel="stylesheet"
            href="https://cdn.bootcdn.net/ajax/libs/antd/4.16.8/antd.min.css"
          />
        </Head>
        <body>
          {/* <ColorModeScript
						initialColorMode={customTheme.config?.initialColorMode}
					/> */}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
