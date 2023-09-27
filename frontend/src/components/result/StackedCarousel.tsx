import React, { useEffect, useRef, useState } from "react";

import { useRouter } from "next/router";

import { Image } from "@chakra-ui/react";
import { HeadImgEdit, WaterPrint } from "components/common";
import { motion as m } from "framer-motion";
import { INftCard } from "lib/types";
import lodash from "lodash";
import moment from "moment";

import { Like } from "../common/Like";
import { ShareModal } from "../common/ShareModal";

const offsetStep = 150;
const scaleStep = 0.7; // 缩放比例
const opacityStep = 0.7; // 透明度比例

export default function StackedCarousel(props: { data: INftCard[] }) {
  const [activeindex, setActiveindex] = useState(0);
  const [shareModalOpen, setShareModalOpen] = useState<boolean>(false);
  const [nft, setNft] = useState<any>(null);
  const router = useRouter();
  const imgRef: any = useRef(null);

  const changeOriginPrompt = (item: any) => {
    console.log("item", item);
    if (item && item.collection_id) {
      router.push(
        `/gallerydetail/?userId=${router.query.userId}&gallery_id=${item.id}&collection_id=${item.collection_id}&imgUrl=${item.image}`,
      );
    }
  };

  useEffect(() => {
    const node: any = imgRef.current;
    if (node) {
      node.addEventListener(
        "contextmenu",
        (event: any) => {
          event.preventDefault();
        },
        false,
      );
    }
  }, []);

  useEffect(() => {
    if (props.data && props.data.length > 0) {
      if (router && router.query && router.query.gallery_id) {
        let idx = lodash.findIndex(
          props.data,
          (e: any) => {
            return e.id == router.query.gallery_id;
          },
          0,
        );
        setActiveindex(idx);
        setNft(props.data[idx]);
        console.log(props.data[idx]);
      }
    }
  }, [props.data]);

  return (
    <div className="relative h-[600px]">
      {props.data.map((item, index) => {
        return (
          <m.div
            className="absolute top-0 left-1/2 cursor-pointer w-[450px]"
            style={{
              transition: "all 0.6s ease",
              marginLeft: -225,
              zIndex: `${props.data.length - Math.abs(index - activeindex)}`,
              // opacity: `${activeindex === index ? 1 : opacityStep ** Math.abs(index - activeindex)}`,
              transform: `translateX(${
                activeindex === index
                  ? 0
                  : (index - activeindex) *
                      offsetStep *
                      0.92 ** Math.abs(index - activeindex) +
                    50 * Math.sign(index - activeindex)
              }px) scale(${
                activeindex === index
                  ? 1
                  : scaleStep ** Math.abs(index - activeindex)
              })`,
            }}
          >
            <div
              ref={imgRef}
              className="relative"
              style={
                activeindex === index
                  ? // WebkitBoxReflect: 'below 10px linear-gradient( transparent 0%, transparent 25%, transparent 50%, transparent 75%, rgba(0, 0, 0, 0.1) 90%, rgba(0, 0, 0, 0.2) 100%)'
                    {
                      borderRadius: "20px",
                      overflow: "hidden",
                      boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.20)",
                      backdropFilter: "blur(100px)",
                    }
                  : {
                      borderRadius: "20px",
                      overflow: "hidden",
                      boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.20)",
                      backdropFilter: "blur(100px)",
                    }
              }
            >
              <Image
                src={item.image}
                alt=""
                width="450"
                height="450"
                backdropFilter="blur(100px)"
                onClick={() => {
                  changeOriginPrompt(item);
                  setActiveindex(index);
                }}
              />
              <WaterPrint
                userName={`@${item.user.name || `User${item.user.num}`}`}
              />
            </div>
            <div
              className={`${
                activeindex === index ? "visible" : "invisible"
              } border-2 mt-[20px] border-[#D5F95F] rounded-[16px] flex items-center justify-between p-4`}
            >
              <div>
                <h3>{item.name}</h3>
                <div className="flex gap-2 items-center">
                  {/* <Image src="./images/UserIcon.png" width={18} className='rounded-full' alt='' /> */}
                  <div className="h-[18px] w-[18px] shrink-0">
                    <HeadImgEdit
                      showEdit={false}
                      imgSrc={item.user?.image}
                      id={item.user_id}
                    />
                  </div>
                  {/* <span>{item.user.name}</span> */}
                  <Like
                    isLike={item.like.length > 0}
                    id={item.id}
                    count={item.like_count}
                    type={"Gallery"}
                  />
                  <span>
                    {item.updated_at
                      ? moment(item.updated_at).format("YYYY-MM-DD")
                      : "-"}
                  </span>
                </div>
              </div>
              <Image
                src="./images/share.svg"
                alt=""
                className="cursor-pointer"
                onClick={() => {
                  setNft(item);
                  setShareModalOpen(true);
                }}
              />
            </div>
          </m.div>
        );
      })}
      {nft ? (
        <ShareModal
          isOpen={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
          nft={nft}
        />
      ) : null}
    </div>
  );
}
