import { useContext } from "react";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { Image } from "@chakra-ui/react";
import api from "api";
import { motion as m } from "framer-motion";
import { ButtonClickTrace } from "lib";
import { useUserInfoStore } from "store/userInfoStore";

interface ILike {
  isLike: boolean;
  id: string;
  count: number;
  type?: string;
}

export const Like = (props: ILike) => {
  const [liked, setLiked] = useState<any>(false);
  const [likeCount, setLikeCount] = useState<any>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { setLikeRefresh, likeRefresh } = useUserInfoStore();

  const handleStar = async () => {
    ButtonClickTrace("like");
    setLoading(true);
    let params: any = {};
    if (props.type == "Gallery") {
      params.gallery_id = props.id;
    } else if (props.type == "Comment") {
      params.comment_id = props.id;
    } else {
      params.collection_id = props.id;
    }
    if (liked) {
      const res: any = await api.post(`/api/user/unlike`, params);
      if (res) {
        setLikeRefresh(!likeRefresh);
        setLiked(false);
        if (props.isLike) {
          setLikeCount(props.count - 1);
        } else {
          setLikeCount(props.count);
        }
      }
      setLoading(false);
    } else {
      if (router.pathname === "/account") {
        ButtonClickTrace("userinfo-unlike");
      }
      const res: any = await api.post(`/api/user/like`, params);
      if (res) {
        setLikeRefresh(!likeRefresh);
        setLiked(true);
        if (props.isLike) {
          setLikeCount(props.count);
        } else {
          setLikeCount(props.count + 1);
        }
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    setLiked(props.isLike);
    setLikeCount(props.count);
  }, []);

  return (
    <>
      <span
        className={`${
          loading ? "pointer-events-none cursor-not-allowed" : ""
        } cursor-pointer`}
        onClick={(e) => {
          e.stopPropagation();
          handleStar();
        }}
      >
        {liked ? (
          <m.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: [0.7, 1.2, 1] }}
            exit={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeIn" }}
          >
            <Image src="/images/like.svg" width="20px" alt="" />
          </m.div>
        ) : (
          <div>
            <Image src="/images/unlike.svg" width="20px" alt="" />
          </div>
        )}
      </span>
      <span>{likeCount}</span>
    </>
  );
};
