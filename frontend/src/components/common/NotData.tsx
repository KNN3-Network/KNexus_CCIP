import React from "react";

import { Image } from "@chakra-ui/react";
import { Empty } from "antd";

import KK from "../../../public/images/kk.png";

export const NotData = (props: { size?: "lg" | "md" }) => {
  return (
    <Empty
      className="py-8"
      image={<Image src="/images/kk.png" className="m-auto"></Image>}
      imageStyle={{ height: props.size === "lg" ? 300 : 150 }}
      description={false}
    />
  );
};
