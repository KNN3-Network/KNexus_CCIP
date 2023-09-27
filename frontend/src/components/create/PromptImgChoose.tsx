import React, { useEffect, useRef, useState } from "react";

import { Image } from "@chakra-ui/react";
import { SyncLoader } from "react-spinners";

interface ITextPrompt {
  changeSelectImgUrl(e: any): void;
  imgChoose: any[];
  selectImgUrl: any[];
  loading: boolean;
  type: number;
}

export const PromptImgChoose = (props: ITextPrompt) => {
  const { imgChoose, selectImgUrl, loading, changeSelectImgUrl, type } = props;

  const [defaultImgs, setDefaultImgs] = useState<string[]>([
    "/images/common/create-test.png",
    "/images/common/create-test.png",
    "/images/common/create-test.png",
  ]);

  useEffect(() => {
    if (type == 1) {
      setDefaultImgs([]);
    }
  }, [type]);

  return (
    <>
      <div className="flex justify-between gap-5">
        {imgChoose.length > 0 &&
          type !== 1 &&
          imgChoose.map((t: any, i: number) => (
            <div
              key={i}
              className="max-w-[calc(33.3%-10px)] flex-1 min-h-[120px] flex items-center justify-center"
              onClick={() => changeSelectImgUrl([t])}
            >
              <div className="border-green border-[4px] rounded-[24px] overflow-hidden relative">
                <Image className="cursor-pointer" src={t["thumbnail_image"]} />
                {t["url"] === selectImgUrl[0]["url"] && (
                  <div className="w-[36px] h-[34px] bg-green rounded-tl-[24px] absolute z-40 bottom-0 right-0 text-black flex items-center justify-center">
                    <Image src="/images/selected.svg" />
                  </div>
                )}
              </div>
            </div>
          ))}
        {imgChoose.length === 0 &&
          defaultImgs.map((t: any, i: number) => (
            <div
              key={i}
              className={`flex-1 max-w-[30%] min-h-[120px] flex items-center justify-center ${
                loading
                  ? "bg-green border-[2px] border-[#000] rounded-[10px]"
                  : ""
              }`}
            >
              {loading ? (
                <SyncLoader color="#000" size={10} />
              ) : (
                <div className="border-[#000] border-[2px] rounded-2xl overflow-hidden">
                  <Image
                    className="cursor-pointer w-full"
                    src="/images/common/basic-master.png"
                  />
                </div>
              )}
            </div>
          ))}
      </div>
      {type == 2 && (
        <div className="mt-5">
          <p>1. Create a batch of 3 images.</p>
          <p>2. Choose 1 image to mint the final Generative NFT.</p>
        </div>
      )}
    </>
  );
};
