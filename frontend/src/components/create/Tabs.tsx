import React from "react";

import { Image } from "@chakra-ui/react";
import { DesTooltip } from "components/common";
import { useUserInfoStore } from "store/userInfoStore";

const tip =
  "Prompt Point is a unique point system within the KNexus platform, designed to ignite creativity. It can be used for AI-generated art creation and payment.";

interface ICreateTab {
  tabChange(idx: number): void;
  tabs: string[];
  activeIdx: number;
}

export const Tabs = (props: ICreateTab) => {
  const { coupon } = useUserInfoStore();

  return (
    <div className="flex border-b-[2px] border-[#CCCCCC] bg-[#FFFFFB] items-center">
      {props.tabs.map((t: any, i: number) => (
        <div
          key={i}
          onClick={() => {
            props.tabChange(i);
          }}
          className={`mr-14 relative text-[24px] h-16 cursor-pointer flex items-center justify-center ${
            props.activeIdx === i ? "text-[#000]" : "text-[#B3B3B0]"
          }`}
        >
          {t}
          {props.activeIdx === i && (
            <div className="absolute bottom-[-4px] left-0 w-full bg-[#D5F95F] h-[6px] rounded-[3px]"></div>
          )}
        </div>
      ))}
      <div className="ml-auto text-[18px] flex items-center">
        <Image src="/images/promtpoint.svg" alt="" />
        <span className="mt-1">{coupon}</span>
        <div className="ml-2">
          <DesTooltip text={tip} />
        </div>
      </div>
    </div>
  );
};
