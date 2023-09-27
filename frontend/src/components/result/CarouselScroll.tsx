import React, { useCallback, useEffect, useRef, useState } from "react";

import { useRouter } from "next/router";

import api from "api";
import { NftCard, NotData } from "components/common";
import CollectionsCard from "components/result/CollectionsCard";
import lodash from "lodash";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { SyncLoader } from "react-spinners";

let pageNumber = 0;

let nextPage = true;

export default function CarouselScroll(props: {
  userId: string;
  type: "Prompt" | "Gallery";
  promptInfo?: any;
  isShowCollectionsCard?: boolean;
  prePositionLeft?: number;
  prePositionRight?: number;
}) {
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [offsetWidth, setOffsetWidth] = useState(0);
  const [loading, setLoading] = useState(false);
  const [nftList, setNftList] = useState<any>([]);
  const containerEl = useRef<any>(null);
  const router = useRouter();
  const {
    userId,
    type,
    prePositionRight = 60,
    prePositionLeft = 775,
    isShowCollectionsCard = true,
  } = props;

  useEffect(() => {
    if (!containerEl.current) return;
    setScrollLeft(containerEl.current.scrollLeft);
    setOffsetWidth(containerEl.current.offsetWidth);
    setScrollWidth(containerEl.current.scrollWidth);
  }, [containerEl]);

  const changeContainerEl = useCallback((e: any) => {
    const containerEl: any = e.target as HTMLDivElement;
    if (!containerEl) return;
    setOffsetWidth(containerEl.offsetWidth);
    setScrollWidth(containerEl.scrollWidth);
    setScrollLeft(containerEl.scrollLeft);
  }, []);

  const debouncedChange = useCallback(
    lodash.debounce(async (value) => {
      changeContainerEl(value);
    }, 700),
    [],
  );

  const scrollEvent = useCallback((e: any) => {
    debouncedChange(e);
  }, []);

  const getNftInfo = async () => {
    let res: any;
    setLoading(true);
    try {
      if (type == "Prompt") {
        res = await api.get(`/api/user/collection`, {
          params: {
            pageSize: 100,
            pageNumber,
            user_id: userId,
            status: 1,
          },
        });
      }
      if (type == "Gallery") {
        res = await api.get(`/api/user/gallery`, {
          params: {
            pageSize: 100,
            pageNumber,
            user_id: userId,
          },
        });
      }
      setLoading(false);
      if (res && res.list && res.list.length > 0) {
        setNftList(res.list);
      } else {
        setNftList([]);
      }
    } catch (error) {
      console.log(error);
      setNftList([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    pageNumber = 0;
    nextPage = true;
    setNftList([]);
    getNftInfo();
  }, [type]);

  const pre = useCallback(() => {
    const el: any = containerEl.current;
    if (!containerEl.current) return;
    const scrollLeft = el?.scrollLeft;
    if (scrollLeft > 0) {
      el.scrollLeft = scrollLeft - 300;
    }
  }, [containerEl]);

  const next = useCallback(() => {
    const el: any = containerEl.current;
    if (!containerEl.current) return;
    const scrollLeft = el?.scrollLeft;
    const max = (nftList.length - 1) * 300; //轮播图的数量 -1
    if (scrollLeft < max) {
      el.scrollLeft = scrollLeft + 300;
    }
  }, [containerEl, nftList]);

  return (
    <div className="text-green flex items-center justify-between gap-8 shrink-0">
      {isShowCollectionsCard ? <CollectionsCard {...props.promptInfo} /> : null}
      {isShowCollectionsCard ? (
        <div className="h-[200px] w-[4px] bg-green shrink-0 mx-4 rounded-full"></div>
      ) : null}
      {scrollLeft > 0 && nftList.length > 0 ? (
        <div
          className={`w-[60px] h-[60px] absolute hover:bg-green bg-lightGreen z-20 rounded-full flex items-center justify-center cursor-pointer`}
          onClick={() => pre()}
          style={{
            left: `${isShowCollectionsCard ? "775px" : prePositionLeft + "px"}`,
          }}
        >
          <FiChevronLeft className="text-[36px] text-[#000]" />
        </div>
      ) : null}
      {loading ? (
        <div className="w-full h-[200px] flex justify-center items-center">
          <SyncLoader color="#fff" size={20} />
        </div>
      ) : (
        <>
          {nftList.length > 0 ? (
            <div
              onScroll={(e) => scrollEvent(e)}
              className="flex-1 overflow-auto flex snap-x snap-mandatory scroll-smooth items-center pb-3"
              ref={containerEl}
            >
              <div className="flex-1 flex items-center gap-8">
                {nftList.length
                  ? nftList.map((nft: any, i: number) => (
                      <div className="shrink-0 leading-250px snap-start w-[213px] h-[160px]">
                        <NftCard key={i} {...nft} type={props.type} />
                      </div>
                    ))
                  : null}
              </div>
            </div>
          ) : (
            <div className="flex-1 h-full">
              <NotData size="md" />
            </div>
          )}
        </>
      )}
      {(scrollWidth - offsetWidth > scrollLeft ||
        scrollWidth === offsetWidth) &&
      nftList.length > 0 ? (
        <div
          className={`w-[60px] h-[60px] absolute hover:bg-green bg-lightGreen z-20 rounded-full flex items-center justify-center cursor-pointer`}
          onClick={() => next()}
          style={{ right: `${prePositionRight}px` }}
        >
          <FiChevronRight className="text-[36px] text-[#000]" />
        </div>
      ) : null}
    </div>
  );
}
