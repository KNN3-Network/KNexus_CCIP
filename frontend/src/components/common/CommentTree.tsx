import React, { useCallback, useEffect, useState } from "react";

import { useRouter } from "next/router";

import { HeadImgEdit, Like } from "components/common";
import { shortenAddr } from "lib/tool";
import moment from "moment";
import { usePidCommentStore } from "store/pidCommentStore";

interface IComments {
  item: any;
  subItems: any;
}

export const CommentTree = (props: IComments) => {
  console.log(props);

  const { commentData, setCommentData } = usePidCommentStore();

  const router = useRouter();

  return (
    <div className="w-full pl-5">
      <div className="flex mb-3">
        <div className="h-10 w-10 mr-3 shrink-0">
          <HeadImgEdit
            showEdit={false}
            imgSrc={props.item.user ? props.item.user.image : ""}
            id={props.item.user ? props.item.user_id : ""}
          />
        </div>
        <div className="w-full">
          <div className="text-[20px] font-bold">
            {props.item.user && props.item.user.name
              ? props.item.user.name
              : `User${props.item.user.num}`}
          </div>
          <div>
            <p className="text-[16px] font-bold m-0">{props.item.content}</p>
          </div>
          <div className="text-[#666666] text-[14px] font-bold flex w-full">
            <div>
              {props.item.updated_at
                ? moment(props.item.updated_at).format("YYYY-MM-DD")
                : "-"}
            </div>
            <div
              className="cursor-pointer text-[#0575E6] ml-5"
              onClick={() => {
                setCommentData(props.item);
              }}
            >
              reply
            </div>
            <div className="flex items-center gap-1 ml-[auto] text-black mr-3">
              <Like
                isLike={props.item.like && props.item.like.length > 0}
                id={props.item.id}
                count={props.item.like_count}
                type={"Comment"}
              />
            </div>
          </div>
        </div>
      </div>
      {props.subItems && props.subItems.length > 0 && (
        <>
          {props.subItems.map((t: any, i: number) => (
            <div className="w-full" key={t.id}>
              <CommentTree {...t} />
            </div>
          ))}
        </>
      )}
    </div>
  );
};
