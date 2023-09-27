import React, { ReactNode, useEffect, useState } from "react";

import { useRouter } from "next/router";

import { Button, Image } from "@chakra-ui/react";
import api from "api";
import { Follow, HeadImgEdit } from "components/common";
import CarouselScroll from "components/result/CarouselScroll";
import { shortenAddr } from "lib/tool";
import { INftCard } from "lib/types";
import { SyncLoader } from "react-spinners";

const info = {
  amount: 0,
  block_number: "",
  cfg_scale: "",
  collection_image: "",
  control_img: "",
  control_net: false,
  created_at: "",
  created_by: "",
  description: "",
  id: "",
  like: [],
  like_count: "",
  log_index: "",
  model: "",
  name: "",
  preprocessor: "",
  price: 0,
  sale_count: 0,
  sampling_method: "",
  sampling_steps: "",
  seed: "",
  size: "",
  status: 1,
  token_address: "",
  token_id: "",
  tx_hash: "",
  updated_at: "",
  user: { name: null, image: null, address: "" },
  weight: "",
  words: "",
  owned: 0,
  used_count: 0,
  style: "",
  is_follow: false,
};

export default function CollectionsArea(props: any) {
  const [selectedType, setSelectedType] = useState<"Prompt" | "Gallery">(
    "Prompt",
  );

  const [nftList, setNftList] = useState<INftCard[]>([]);

  const router = useRouter();

  const [nftInfo, setNftInfo] = useState<any>(info);

  const [loading, setLoading] = useState<any>(false);

  const getNftDetail = async () => {
    setLoading(true);
    try {
      const res: any = await api.get(
        `/api/collections/${router.query.collection_id || router.query.id}`,
      );
      setLoading(false);
      if (res && res.id) {
        setNftInfo({ ...res });
      } else {
        setNftInfo(info);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(router);
    if (
      router &&
      router.query &&
      (router.query.collection_id || router.query.id)
    ) {
      getNftDetail();
    }
  }, [router]);

  return (
    <div className="h-[300px] relative bg-[#000] overflow-hidden px-[90px] shrink-0">
      <Image
        width={200}
        src="/images/kkbg.png"
        alt=""
        className="absolute -bottom-[120px] -left-[120px]"
      />
      <Image
        width={200}
        src="/images/kkbg.png"
        alt=""
        className="absolute -bottom-[120px] -right-[120px]"
        style={{ transform: "rotateY(180deg)" }}
      />
      {/* <Image
        width={200}
        src="/images/kkbg.png"
        alt=""
        className="absolute -top-[120px] -left-[120px]"
        style={{ transform: "rotateX(180deg)" }}
      />
      <Image
        width={200}
        src="/images/kkbg.png"
        alt=""
        className="absolute -top-[120px] -right-[120px]"
        style={{ transform: "rotate(180deg)" }}
      /> */}
      <div className="flex justify-between py-4 pt-8 text-lg items-end">
        <div className="flex gap-2">
          <div className="h-[40px] w-[40px] shrink-0">
            <HeadImgEdit
              showEdit={false}
              imgSrc={nftInfo?.user?.image}
              id={nftInfo.created_by}
            />
          </div>
          <div className="flex items-center">
            <div className="text-white mr-3">
              {nftInfo.user?.name || `User${nftInfo.user?.num}`}
            </div>
            <div>
              <Follow
                id={nftInfo.created_by}
                isFollow={nftInfo.is_follow}
                variant={"primary"}
              />
            </div>
          </div>
        </div>
        <ul className="flex gap-4 cursor-pointer">
          <li
            onClick={() => setSelectedType("Prompt")}
            className={`${
              selectedType === "Prompt" ? "text-green" : "text-[#fff]"
            }`}
          >
            Prompt
          </li>
          <li
            onClick={() => setSelectedType("Gallery")}
            className={`${
              selectedType === "Gallery" ? "text-green" : "text-[#fff]"
            }`}
          >
            Gallery
          </li>
        </ul>
      </div>
      {loading ? (
        <div className="w-full h-[200px] flex justify-center items-center">
          <SyncLoader color="#fff" size={20} />
        </div>
      ) : (
        <CarouselScroll
          userId={nftInfo.created_by}
          type={selectedType}
          promptInfo={nftInfo}
          prePositionLeft={60}
          prePositionRight={60}
          isShowCollectionsCard={props.isShowCollectionsCard}
        />
      )}
    </div>
  );
}
