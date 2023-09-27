import React, { useEffect, useRef, useState } from "react";

import { Button, Image } from "@chakra-ui/react";
import { Popover } from "antd";
import api from "api";
import { HasWaterPic } from "components/common";
import html2Canvas from "html2canvas";
import { INftCard } from "lib/types";
import { downLoadNoWaterMark } from "lib/waterImgDownload";
import { useUserInfoStore } from "store/userInfoStore";

interface IHis {
  img: string;
  nft: INftCard;
}

export const DownloadBtn = (props: IHis) => {
  const { img } = props;
  const { setUserStoreInfo } = useUserInfoStore();
  const myRef = useRef(null);

  const downLoadWaterImg = async () => {
    // await downLoadWaterMark(img);
    const node: any = myRef.current;
    html2Canvas(node, {
      useCORS: true,
      allowTaint: true,
    }).then((canvas: any) => {
      console.log(2333, node, canvas);
      let dataURL = canvas.toDataURL("image/png");
      if (dataURL !== "") {
        var aLink = document.createElement("a");
        aLink.download = "knexus.png";
        aLink.href = dataURL;
        aLink.click();
      }
    });
  };

  const downLoadNoWaterImg = async () => {
    await downLoadNoWaterMark(img);
    const res: any = await api.post(`/api/user/decrement`, {
      amount: "2",
    });
    if (res) {
      getUserInfo();
    }
  };

  const getUserInfo = async () => {
    const res: any = await api.get(`/api/user`);
    if (res && res.id) {
      setUserStoreInfo({ ...res });
    }
  };

  return (
    <>
      <div className="ml-auto">
        <Popover
          placement="top"
          title={""}
          content={
            <div className="overflow-hidden w-[460px] h-[72px]">
              <div className="absolute z-20 bg-[#fff]">
                <div className="flex items-center mb-3">
                  <div className="text-[16px] font-bold w-[310px]">
                    Download Image (with watermark)
                  </div>
                  <div>
                    <Button
                      variant="blackPrimary"
                      size="md"
                      w="100px"
                      h="30px"
                      borderRadius={"20px"}
                      loadingText={"Confirm"}
                      className="flex items-center h-full"
                      onClick={() => downLoadWaterImg()}
                    >
                      <div className="text-[16px] text-[#fff]">Download</div>
                    </Button>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="text-[16px] font-bold w-[310px]">
                    Download Image (without watermark)
                  </div>
                  <div>
                    <Button
                      variant="blackPrimary"
                      size="md"
                      w="150px"
                      h="30px"
                      borderRadius={"20px"}
                      loadingText={"Confirm"}
                    >
                      <div>
                        <span
                          className="mr-1 text-[16px] text-[#fff]"
                          onClick={() => downLoadNoWaterImg()}
                        >
                          Download (-2pp)
                        </span>
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="relative max-w-[600px] absolute z-10" ref={myRef}>
                <HasWaterPic nft={props.nft} />
              </div>
            </div>
          }
          trigger="click"
        >
          <Image
            className="cursor-pointer hover:opacity-70 h-10"
            src="/images/common/downloadbtn.png"
          />
        </Popover>
      </div>
    </>
  );
};
