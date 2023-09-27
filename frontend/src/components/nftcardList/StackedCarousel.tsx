import React, {
  ReactElement,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";

import { useRouter } from "next/router";

import { Image } from "@chakra-ui/react";
import { useDebounceFn, useThrottleFn } from "ahooks";
import { HeadImgEdit, LazyloadCard, SkeletonNftCard } from "components/common";
import { motion as m } from "framer-motion";
import { INftCard } from "lib/types";
import moment from "moment";
import { useStore } from "store/store";

import { Like } from "../common/Like";

const offsetStep = 220; // offset step
const scaleStep = 0.75; // scale rate
const opacityStep = 0.7; // opacity rate

const commonStyle = {
  borderRadius: 20,
  boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.20)",
  backdropFilter: "blur(100px)",
  transition: "all 0.8s ease",
};

export default function StackedCarousel(props: {
  loadMoreCallback: () => void;
}) {
  const { scroll_item, nftList, pageNumber, setNft, setSimpleDetailModalOpen } =
    useStore();
  const [activeindex, setActiveindex] = useState(6);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(500);
  const router = useRouter();
  useEffect(() => {
    const index = nftList.findIndex(
      (nft: INftCard) => nft.boxId === scroll_item,
    );
    setTimeout(() => {
      setActiveindex(index < 0 ? 6 : index);
    }, 1000);
  }, [scroll_item]);

  const { run } = useDebounceFn(
    (arg: number) => {
      if (arg > 0) {
        // 向下滑动
        setActiveindex(Math.ceil(activeindex));
      } else {
        setActiveindex(Math.floor(activeindex));
      }
    },
    { wait: 300 },
  );

  const { run: onWheelHander } = useThrottleFn(
    (e: React.WheelEvent<HTMLDivElement>) => {
      const step = -0.001;
      const deltaY = e.deltaY;
      const dataLength = nftList.length - 1;
      e.stopPropagation();
      setActiveindex((activeindex) => {
        let changeActive = activeindex + activeindex * deltaY * step;
        if (changeActive > 0 && changeActive < dataLength) {
          return changeActive;
        } else if (changeActive === 0) {
          return 1;
        }
        return activeindex;
      });
    },
    { wait: 200 },
  );

  useEffect(() => {
    if (activeindex !== nftList.length - 1 || !pageNumber) return;
    props.loadMoreCallback();
  }, [activeindex]);

  useEffect(() => {
    if (!containerRef.current) return;
    const { height } = containerRef.current.getBoundingClientRect();
    setHeight(Math.floor(height * 0.8));
  }, [containerRef]);

  return (
    <div
      className="relative h-[calc(100vh-240px)] overflow-hidden"
      ref={containerRef}
      onWheel={(e) => {
        onWheelHander(e);
        run(e.deltaY * -1);
      }}
    >
      {nftList.map((item, index) => {
        return (
          <m.div
            key={item.id}
            className="absolute top-1/2 left-1/2 cursor-pointer"
            style={{
              ...commonStyle,
              width: height + "px",
              height: height + "px",
              marginLeft: -height / 2,
              zIndex: `${
                nftList.length - Math.abs(index - Math.ceil(activeindex))
              }`,
              // opacity: `${activeindex === index ? 1 : opacityStep ** Math.abs(index - activeindex)}`,
              transform: `translateY(-56%) translateX(${
                Math.ceil(activeindex) === index
                  ? 0
                  : (index - Math.ceil(activeindex)) *
                      offsetStep *
                      0.92 ** Math.abs(index - Math.ceil(activeindex)) +
                    50 * Math.sign(index - Math.ceil(activeindex))
              }px) scale(${
                Math.ceil(activeindex) === index
                  ? 1
                  : scaleStep ** Math.abs(index - Math.ceil(activeindex))
              })`,
            }}
          >
            <LazyloadCard
              aspectRatio="1/1"
              key={item.id}
              nftinfo={item}
              delay={3000}
              triggerOnce={true}
              skeleton={
                <Image
                  width={height}
                  height={height}
                  backdropFilter="blur(100px)"
                />
              }
            >
              <div
                className="relative h-full w-full"
                style={{
                  display:
                    activeindex - 10 < index && activeindex + 10 > index
                      ? "block"
                      : "none",
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.20)",
                  backdropFilter: "blur(100px)",
                  WebkitBoxReflect:
                    "below 10px linear-gradient( transparent 0%, transparent 25%, transparent 50%, transparent 75%, rgba(0, 0, 0, 0.1) 90%, rgba(0, 0, 0, 0.2) 100%)",
                }}
              >
                <Image
                  src={item.thumbnail_image}
                  alt=""
                  width={height}
                  height={height}
                  backdropFilter="blur(100px)"
                  objectFit="cover"
                  onClick={() => {
                    setActiveindex(index);
                    if (index === activeindex) {
                      setNft(item);
                      setSimpleDetailModalOpen(true);
                    }
                  }}
                />
                <div
                  style={{
                    background: "rgba(255, 255, 255, 0.40)",
                    filter: "drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.20))",
                    backdropFilter: "blur(100px)",
                  }}
                  className={`${
                    activeindex === index ? "visible" : "invisible"
                  } rounded-[16px] flex items-center justify-between p-4 absolute z-10 left-[10%] bottom-[40px] w-[80%]`}
                >
                  <div className="w-full flex flex-col gap-2">
                    <h3 className="text-[18px]">{item.name}</h3>
                    <div className="flex gap-2 items-center">
                      {/* <Image src="./images/UserIcon.png" width={18} className='rounded-full' alt='' /> */}
                      <div className="h-[28px] w-[28px] shrink-0">
                        <HeadImgEdit
                          showEdit={false}
                          imgSrc={item.user?.image}
                          id={item.user_id}
                        />
                      </div>
                      <div
                        onClick={() =>
                          router.push(`/account?userId=${item.created_by}`)
                        }
                      >
                        {item.user?.name || `User${item.user?.num}`}
                      </div>
                      <div className="ml-4 flex gap-2">
                        <Like
                          isLike={item.like.length > 0}
                          id={item.id}
                          count={item.like_count}
                        />
                      </div>
                      {/* {item?.kind == 1 ? (
                        <div>{item.sale_count} Sold</div>
                      ) : (
                        <div>{item.used_count} Used</div>
                      )} */}
                      {/* <span>
                        {item.updated_at
                          ? moment(item.updated_at).format("YYYY-MM-DD")
                          : "-"}
                      </span> */}
                    </div>
                  </div>
                </div>
              </div>
            </LazyloadCard>
          </m.div>
        );
      })}
    </div>
  );
}
