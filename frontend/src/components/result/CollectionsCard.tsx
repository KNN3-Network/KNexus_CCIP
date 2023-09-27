import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";

import api from "api";
import { Like } from "components";
import { INftCard } from "lib/types";
import moment from "moment";

export default function CollectionsCard(props: any) {
  const router = useRouter();

  return (
    <div
      className="shrink-0 group relative font-eurostile rounded-[14px] cursor-pointer overflow-hidden border-[2px] border-[#D5F95F] flex bg-green"
      onClick={() => router.push(`nftdetail/${router.query.collection_id}`)}
    >
      <div className="shrink-0 w-[213px] h-[160px] rounded-t-[10px] relative flex flex-col items-center justify-center overflow-hidden border-[#D5F95F] border-r-[2px] rounded-[10px]">
        <div
          className={`absolute top-0 left-0 right-0 bottom-0 bg-cover`}
          style={{ backgroundImage: `url(${props.collection_image})` }}
        ></div>
        <div className="absolute left-5 top-5 text-[rgba(255,255,255,0.15)]">
          @
          {props.user && props.user.name
            ? props.user.name
            : `User${props.user.num}`}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="w-[350px] h-[40px] px-5 bottom-0 left-0 text-[#000]">
          <div
            title={props.name}
            className={`font-[600] text-[18px] leading-[70px] h-[40px] w-full overflow-hidden marquee flex items-center`}
            style={{ containerType: "inline-size" }}
          >
            <span>Original Prompt</span>
          </div>
        </div>
        <div className="flex flex-col justify-around px-5 py-3 text-[14px] bg-[#000] flex-1">
          <div
            style={{ containerType: "inline-size" }}
            className="overflow-hidden marquee text-[14px]"
          >
            {props.name}
          </div>
          <div>
            {props.created_at
              ? moment(props.created_at).format("YYYY-MM-DD")
              : "-"}
          </div>
          <div className="flex items-center gap-2">
            <Like
              isLike={props.like.length > 0}
              id={props.id}
              count={props.like_count}
            />
          </div>
          <div className="flex rounded-[4px] text-black gap-4 items-center">
            <div className="bg-green mt-[2px] rounded-[5px] px-3">
              {props.price == 0 ? "Free" : `${props.price} USDT`}
            </div>
            <div className="text-green">
              {props.price == 0
                ? `${props.used_count} Used`
                : `${props.sale_count} Sold`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
