import React, { useEffect, useRef, useState } from "react";

import { Image } from "@chakra-ui/react";

interface IHis {
  changeSelectImgUrl(e: any): void;
  resetParams(e: any): void;
  hisImgs: any[];
  selectImgUrl: any[];
}

export const HistoryImg = (props: IHis) => {
  const { changeSelectImgUrl, resetParams, hisImgs, selectImgUrl } = props;

  return (
    <>
      <div className="font-[600] text-[24px] mb-3">History</div>
      <div className="grid gap-5 grid-cols-3 max-h-[400px] overflow-auto mb-10 show-scroll pr-1">
        {hisImgs.map((t: any, i: number) => (
          <div
            className="relative flex items-center rounded-[24px] border-green border-[4px] overflow-hidden justify-center"
            key={i}
            onClick={() => {
              console.log(t);
              resetParams(t);
              changeSelectImgUrl([
                { id: t.request_id, url: t.collection_image },
              ]);
            }}
          >
            <Image className="cursor-pointer w-full" src={t.thumbnail_image} />
            {selectImgUrl.length > 0 &&
              t["request_id"] === selectImgUrl[0]["id"] && (
                <div className="w-[36px] h-[34px] bg-green rounded-tl-[24px] absolute z-40 bottom-0 right-0 text-black flex items-center justify-center">
                  <Image src="/images/selected.svg" />
                </div>
              )}
          </div>
        ))}
      </div>
    </>
  );
};
