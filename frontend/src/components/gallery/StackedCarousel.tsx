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
import { Select, Tooltip } from "antd";
import { DownloadBtn, HeadImgEdit, LazyloadCard } from "components/common";
import { motion as m } from "framer-motion";

import { Like } from "../common/Like";
import { ShareModal } from "./../common/ShareModal";

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
  loadMoreCallback: (e: number) => void;
  nftList: any;
  pageNumber: number;
  next: boolean;
}) {
  const { nftList, pageNumber } = props;
  const [activeindex, setActiveindex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(440);
  const [shareModalOpen, setShareModalOpen] = useState<boolean>(false);
  const [nftInfo, setNftInfo] = useState<any>({});
  const router = useRouter();

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
    if (nftList && nftList.length > 0 && activeindex % 1 === 0) {
      router.push(
        `/gallery/?campaignid=${router.query.campaignid}&imgUrl=${nftList[activeindex]["image"]}`,
      );
    }
    if (activeindex != nftList.length - 1 || !props.next) return;
    props.loadMoreCallback(Number(pageNumber) + 1);
  }, [activeindex]);

  // useEffect(() => {
  //   if (!containerRef.current) return;
  //   const { height } = containerRef.current.getBoundingClientRect();
  //   setHeight(Math.floor(height * 0.8));
  // }, [containerRef]);

  return (
    <div
      ref={containerRef}
      onWheel={(e) => {
        onWheelHander(e);
        run(e.deltaY * -1);
      }}
    >
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        nft={nftInfo}
      />
      {nftList.map((item: any, index: number) => {
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
                className="relative h-full w-full rounded-[20px]"
                style={{
                  display:
                    activeindex - 10 < index && activeindex + 10 > index
                      ? "block"
                      : "none",
                  boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.20)",
                  backdropFilter: "blur(100px)",
                  WebkitBoxReflect:
                    "below 10px linear-gradient( transparent 0%, transparent 25%, transparent 50%, transparent 75%, rgba(0, 0, 0, 0.1) 90%, rgba(0, 0, 0, 0.2) 100%)",
                }}
              >
                <Image
                  className="rounded-[20px]"
                  src={item.thumbnail}
                  alt=""
                  width={height}
                  height={height}
                  backdropFilter="blur(100px)"
                  objectFit="cover"
                  onClick={() => {
                    setActiveindex(index);
                  }}
                />
                <div
                  style={{
                    background: "rgba(255, 255, 255)",
                    filter: "drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.20))",
                    backdropFilter: "blur(100px)",
                  }}
                  className={`${
                    activeindex === index ? "visible" : "invisible"
                  } rounded-[16px] flex items-center justify-between p-4 absolute z-10 top-[450px] w-[100%]`}
                >
                  <div className="w-full flex flex-col gap-2">
                    {/* <h3 className="text-[18px]">{item.name}</h3> */}
                    <div className="flex gap-2 items-center">
                      {/* <Image src="./images/UserIcon.png" width={18} className='rounded-full' alt='' /> */}
                      <div className="text-[18px]">{item.name}</div>
                      <div className="h-[28px] w-[28px] shrink-0">
                        <HeadImgEdit
                          showEdit={false}
                          imgSrc={item.user?.image}
                          id={item.user_id}
                        />
                      </div>
                      {item.user?.name}
                      <div className="ml-4 flex gap-2">
                        <Like
                          isLike={item.like?.length > 0}
                          id={item.id}
                          count={item.like_count}
                          type={"Gallery"}
                        />
                      </div>
                      <div className="ml-auto flex items-center">
                        <div className="mr-5">
                          <DownloadBtn img={item.image} nft={item} />
                        </div>
                        <Tooltip
                          placement="top"
                          title={"Share"}
                          arrow={false}
                          color="#fff"
                          overlayInnerStyle={{
                            color: "#000",
                            fontFamily: "Eurostile",
                            fontSize: "18px",
                          }}
                        >
                          <Image
                            onClick={() => {
                              setShareModalOpen(true);
                              setNftInfo(item);
                            }}
                            className="cursor-pointer hover:opacity-70 h-10"
                            src="/images/common/share.png"
                          />
                        </Tooltip>
                      </div>
                      {/* <span>
                        {item.updated_at
                          ? moment(item.updated_at).format("YYYY-MM-DD")
                          : "-"}
                      </span> */}
                    </div>
                    <div>{item.description}</div>
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
