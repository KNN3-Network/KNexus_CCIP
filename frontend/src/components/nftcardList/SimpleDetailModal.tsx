import React from "react";

import { useRouter } from "next/router";

import { Button, Image } from "@chakra-ui/react";
import { Tooltip } from "antd";
import { BaseModal, HeadImgEdit, Like } from "components/common";
import { INftCard } from "lib/types";
import moment from "moment";
import { useStore } from "store/store";

interface ISimpleDetail {
  nft: INftCard;
  isOpen: boolean;
  onClose: () => void;
}

export default function SimpleDetailModal(props: ISimpleDetail) {
  const { isOpen, onClose, nft: nftInfo } = props;
  const router = useRouter();
  const { setScrollItem } = useStore();
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title=""
      size="lg"
      maxW="800px"
      hideCloseIcon={true}
    >
      <div className="flex flex-col gap-1">
        <div className="flex justify-between gap-4">
          <div
            className="w-[450px] overflow-hidden rounded-xl shadow-lg"
            style={{ backdropFilter: "blur(100px)" }}
          >
            <Image alt="" src={nftInfo.collection_image} />
          </div>
          <div className="flex flex-1 flex-col gap-2 justify-between">
            <div className="flex justify-between gap-5">
              <div className="flex flex-col flex-1">
                {nftInfo?.kind == 1 ? (
                  <>
                    <span className="text-[20px] font-bold">
                      Prompt NFT Price:
                    </span>
                    <span className="text-[28px] font-bold">
                      ${nftInfo.price}
                    </span>
                  </>
                ) : (
                  <span className="text-[20px] font-bold">Free Prompt</span>
                )}
              </div>
              {/* <div className="flex flex-col flex-1">
                <span className="text-[16px] font-bold">Prompt Words:</span>
                <span className="text-[28px] font-bold">1008</span>
              </div> */}
            </div>
            <div>
              <h3 className="text-[20px] font-bold">Description</h3>
              <p className="text-[14px] text-[rgba(0,0,0,0.6)] font-inter font-medium">
                {nftInfo.description}
              </p>
            </div>
            <div>
              <div className="flex flex-col flex-1">
                <span className="text-[20px] font-bold">Content Type</span>
                <span className="text-[14px] font-inter text-[rgba(0,0,0,0.6)]">
                  Text to lmage
                </span>
              </div>
              <div className="flex flex-col flex-1">
                <span className="text-[20px] font-bold">Style</span>
                <span className="text-[14px] font-inter text-[rgba(0,0,0,0.6)]">
                  {nftInfo.style_key}
                </span>
              </div>
            </div>
            <Button
              onClick={() => {
                setScrollItem(nftInfo.boxId);
                onClose();
                router.push(
                  `/nftdetail/${nftInfo.id}?imgUrl=${nftInfo.collection_image}`,
                );
              }}
              bg="#000"
              color="#D5F95F"
              _hover={{ background: "#333" }}
            >
              View Details
            </Button>
          </div>
        </div>
        {/* <div className="flex mt-3 text-[14px] font-[600] items-center">
          <div className="flex items-center mr-4 desktop:mr-8 cursor-pointer">
            <div className="h-6 w-6 mr-1">
              <HeadImgEdit
                showEdit={false}
                imgSrc={nftInfo?.user?.image}
                id={nftInfo.created_by}
              />
            </div>
            <div
              onClick={() =>
                router.push(`/account?userId=${nftInfo.created_by}`)
              }
            >
              {nftInfo.user?.name || `User${nftInfo.user?.num}`}
            </div>
          </div>
          <div className="flex items-center gap-2 mr-4 desktop:mr-8">
            <Like
              isLike={nftInfo.like.length > 0}
              id={nftInfo.id}
              count={nftInfo.like_count}
            />
          </div>
          <div className=" mr-4 desktop:mr-8">
            <Tooltip
              placement="top"
              zIndex={99999}
              title={"Create At"}
              arrow={false}
              color="#fff"
              overlayInnerStyle={{
                color: "#000",
                fontFamily: "Eurostile",
                fontSize: "18px",
              }}
            >
              <div>
                {nftInfo.updated_at
                  ? moment(nftInfo.updated_at).format("YYYY-MM-DD")
                  : "-"}
              </div>
            </Tooltip>
          </div>
          {nftInfo?.kind == 1 ? (
            <div>{nftInfo.sale_count} Sold</div>
          ) : (
            <div>{nftInfo.used_count} Used</div>
          )}
        </div> */}
      </div>
    </BaseModal>
  );
}
