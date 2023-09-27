import React from "react";

import { useRouter } from "next/router";

import { Image } from "@chakra-ui/react";
import { Like } from "components/common";
import { INftCard } from "lib/types";
import { useStore } from "store/store";

export const NftCard = (props: INftCard) => {
  const { setNft, setSimpleDetailModalOpen } = useStore();
  const router = useRouter();

  return (
    <article
      key={props.id}
      onContextMenu={(e: any) => e.preventDefault()}
      className="group relative flex flex-col h-full font-eurostile rounded-[14px] cursor-pointer overflow-hidden"
      style={{ boxShadow: "0px 6px 16px 2px rgba(0, 0, 0, 0.20)" }}
      onClick={() => {
        setNft(props);
        setSimpleDetailModalOpen(true);
        if (props.type == "Gallery") {
          if (props.collection) {
            router.push(
              `/gallerydetail/?userId=${router.query.userId}&gallery_id=${props.id}&collection_id=${props.collection_id}&imgUrl=${props.image}`,
            );
          } else {
            router.push(`/gallery/?campaignid=${props.campaign_id}`);
          }
        } else if (!router.pathname.includes("marketplace")) {
          router.push(
            `/nftdetail/${props.id}?imgUrl=${props.collection_image}`,
          );
        }
      }}
    >
      <div className="w-full h-full rounded-t-[10px] relative flex flex-col items-center justify-center overflow-hidden">
        <div className="bg-cover hover:scale-110 transition-all flex justify-center items-center w-full h-full">
          <div
            className="absolute top-0 left-0 right-0 bottom-0 bg-cover blur-md -z-10"
            style={{
              backgroundImage: `url(${
                props.type == "Gallery"
                  ? props.thumbnail || props.image
                  : props.thumbnail_image
              })`,
            }}
          ></div>
          <Image
            className="cursor-pointer hover:scale-110 transition-all w-full h-full"
            src={
              props.type == "Gallery"
                ? props.thumbnail || props.image
                : props.thumbnail_image
            }
            objectFit="cover"
          />
        </div>
        <div className="absolute left-5 top-5 text-[rgba(255,255,255,0.15)]">
          @
          {props.user && props.user.name
            ? props.user.name
            : `User${props?.user?.num}`}
        </div>
      </div>
      <div className="w-full py-3 rounded-b-[10px] px-3 nft-card-linear absolute bottom-0 left-0 text-green invisible group-hover:visible">
        {props.type == "Gallery" ? (
          <>
            <div className="flex justify-between text-[14px] items-center">
              <div
                title={props.name}
                className={`font-[600] text-[16px] pt-2 pb-1 px-0 h-[36px] w-full overflow-hidden whitespace-nowrap overflow-ellipsis`}
                style={{ containerType: "inline-size" }}
              >
                <span>{props.name}</span>
              </div>
              <div className="flex gap-2 items-center">
                <Like
                  isLike={props.like.length > 0}
                  id={props.id}
                  count={props.like_count}
                  type={props.type}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              title={props.name}
              style={{ containerType: "inline-size" }}
              className={`font-[600] text-[16px] pt-2 pb-1 px-0 h-[36px] w-full overflow-hidden whitespace-nowrap marquee`}
            >
              <span>{props.name}</span>
            </div>
            <div className="flex justify-between text-[14px]">
              <div className="flex items-center gap-2">
                <Like
                  isLike={props.like.length > 0}
                  id={props.id}
                  count={props.like_count}
                />
                {props.price == 0 ? (
                  <div>{props.used_count} Used</div>
                ) : (
                  <div>{props.sale_count} Sold</div>
                )}
              </div>
              <div className="bg-green px-3 rounded-[4px] text-black">
                {props.price == 0 ? (
                  <div className="mt-[2px]">Free</div>
                ) : (
                  <div className="mt-[2px]">{props.price} USDT</div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </article>
  );
};
