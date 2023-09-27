import React, { useCallback, useEffect, useState } from "react";

import { useRouter } from "next/router";

import { Image } from "@chakra-ui/react";
import { HeadImgEdit, Like } from "components/common";
import { shortenAddr } from "lib/tool";
import moment from "moment";

interface IComments {
  collection_id: string;
  content: string;
  created_at: string;
  id: string;
  like_count: number;
  like: any;
  p_id: string;
  reply_count: string;
  updated_at: string;
  user_id: string;
  isLike?: boolean;
  commentCheck?: any;
  user: any;
}

export const CommentCard = (props: IComments) => {
  const router = useRouter();

  return (
    <div className="w-[260px] h-[fit-content] rounded-[10px] p-5 mb-5 grid-item border-[2px] border-[rgba(0,0,0,0.3)]">
      <div className="flex items-center mb-3">
        <div className="h-10 w-10 mr-3">
          <HeadImgEdit
            showEdit={false}
            imgSrc={props.user?.image}
            id={props.user_id}
          />
        </div>
        <div>
          <div className="text-[16px] font-bold">
            {props.user?.name || `User${props.user?.num}`}
          </div>
          <div className=" text-[#666666]">
            {props.created_at
              ? moment(props.created_at).format("YYYY-MM-DD")
              : "-"}
          </div>
        </div>
      </div>
      <div>
        <p className="mb-2">{props.content}</p>
        <div className="float-right flex items-center">
          <div className="bg-[#fff] border-[1px] border-[#000] w-[fit-content] px-3 py-[2px] flex items-center rounded-[20px] mr-5 text-[#000] gap-1">
            <Like
              isLike={props.like.length > 0}
              id={props.id}
              count={props.like_count}
              type={"Comment"}
            />
          </div>
          <div
            className="bg-[#fff] border-[1px] border-[#000] text-[#000] w-[fit-content] px-3 py-[2px] flex items-center rounded-[20px] cursor-pointer"
            onClick={() => props.commentCheck(props)}
          >
            <span className="cursor-pointer mr-1">
              <Image src={"/images/common/comment.png"} alt="" />
            </span>
            <span>{props.reply_count}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
