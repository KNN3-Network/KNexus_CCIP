import React from "react";

import { Router, useRouter } from "next/router";

import { Image } from "@chakra-ui/react";
import { baseURL, siteName } from "config/base";
import { INftCard } from "lib/types";
import QRCode from "qrcode.react";
import { useUserInfoStore } from "store/userInfoStore";

export const HasWaterPic: React.FC<any> = (props: { nft: INftCard }) => {
  const router = useRouter();

  const { nft } = props;

  const { id } = useUserInfoStore();

  return (
    <div>
      <div className="w-full">
        <img
          src={`${
            nft.image || nft.collection_image
          }?time=${new Date().valueOf()}`}
          alt=""
          crossOrigin="anonymous"
        />
      </div>
      <div className="w-full h-[fit-content] absolute left-0 bottom-0 right-0 border-none">
        <div className="w-[92%] mx-[auto] h-[100px] flex mb-5">
          <QRCode
            id="qrCode"
            value={`${siteName}`}
            size={100} // 二维码的大小
            bgColor="#D5F95F"
            fgColor="#000000" // 二维码的颜色
            style={{
              border: "10px solid #D5F95F",
              borderTopLeftRadius: 12,
              borderBottomLeftRadius: 12,
              borderBottomRightRadius: 12,
            }}
            imageSettings={{
              // 二维码中间的logo图片
              src: "logoUrl",
              height: 100,
              width: 100,
              excavate: true, // 中间图片所在的位置是否镂空
            }}
          />
          <div className="flex flex-col flex-1">
            <div className="h-[72px] bg-green flex justify-between px-4 items-center rounded-r-lg">
              <div className="font-bold text-[26px]">{nft.name}</div>
              <div className="flex gap-4 items-center">
                {/* <Image src="./images/UserIcon.png" width='40px' height="40px" className='rounded-full shrink-0' alt='' /> */}
                <div className="h-10 w-10">
                  {/* <HeadImgEdit showEdit={false} imgSrc={nft.user.image} id={nft.user_id} crossOrigin='anonymous' /> */}
                  {nft?.user?.image ? (
                    <img
                      className="rounded-[50%]"
                      crossOrigin="anonymous"
                      src={`${nft.user?.image}?time=${new Date().valueOf()}`}
                    />
                  ) : (
                    <Image
                      className="rounded-[50%]"
                      src="/images/common/default-head.png"
                    />
                  )}
                </div>
                <div className="w-[2px] h-[34px] rounded-full bg-[#000]"></div>
                <Image
                  src="/images/logoblack.svg"
                  width="40px"
                  height="40px"
                  className="shrink-0"
                  alt=""
                />
              </div>
            </div>
            <div className="flex-1 flex justify-between text-[16px] font-bold text-green items-center px-1">
              <div className="text-center">
                {nft.user?.name || `User${nft.user?.num}`}
              </div>
              <div className="text-[14px]">
                KNexus /: Web3 & AI Prompt Marketplace
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
