import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { Image } from "@chakra-ui/react";
import { Upload } from "antd";
import api from "api";

interface IHead {
  showEdit?: boolean;
  id?: string;
  imgSrc?: string;
  changeImg?: any;
  crossOrigin?: any;
}

export const HeadImgEdit = (props: IHead) => {
  const { showEdit, imgSrc, changeImg } = props;

  const router = useRouter();

  const uploadFile = (file: any) => {
    const formData = new FormData();
    formData.append("file", file);
    api
      .post("/api/upload", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      })
      .then(
        (res: any) => {
          if (res && res.url) {
            changeImg(res.url);
          }
        },
        (err: any) => {
          console.log(err);
        },
      );
  };

  const checkUser = () => {
    if (router.pathname !== "/account") {
      router.push(`/account?userId=${props.id}`);
    }
  };

  return (
    <div className="w-full h-full rounded-[50%] relative group cursor-pointer bg-green flex items-center justify-center overflow-hidden">
      {imgSrc ? (
        <>
          {props.crossOrigin ? (
            <img
              className="rounded-[50%] w-full h-full"
              onClick={(e) => {
                e.stopPropagation();
                checkUser();
              }}
              crossOrigin="anonymous"
              src={imgSrc}
            />
          ) : (
            <Image
              className="rounded-[50%] w-full h-full"
              onClick={(e) => {
                e.stopPropagation();
                checkUser();
              }}
              src={imgSrc}
            />
          )}
        </>
      ) : (
        <Image
          className="rounded-[50%] border-[2px] border-[#000]"
          onClick={(e) => {
            e.stopPropagation();
            checkUser();
          }}
          src="/images/common/default-head.png"
        />
      )}
      {showEdit && (
        <Upload
          customRequest={(e: any) => uploadFile(e.file)}
          accept=".jpg, .jpeg, .png"
          showUploadList={false}
        >
          <div className="absolute w-full h-full bg-[rgba(0,0,0,0.3)] left-0 top-0 rounded-[50%] flex items-center justify-center invisible group-hover:visible">
            <div className="w-10 h-10 bg-[rgba(0,0,0,0.5)] flex items-center justify-center rounded-[50%]">
              <Image height={"20px"} src="/images/common/head-edit.png" />
            </div>
          </div>
        </Upload>
      )}
    </div>
  );
};
