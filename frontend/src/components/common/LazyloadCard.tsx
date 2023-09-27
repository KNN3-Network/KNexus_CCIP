import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { INftCard } from "lib/types";
import { useInView } from "react-intersection-observer";

export function LazyloadCard(props: {
  children: ReactNode;
  skeleton: ReactNode;
  nftinfo: INftCard;
  aspectRatio?: string;
  delay?: number;
  triggerOnce?: boolean;
}) {
  const [aspectRatio, SetAspectRatio] = useState(props.aspectRatio || "4/3");
  const [ref, inView] = useInView({
    trackVisibility: true,
    delay: props.delay,
    triggerOnce: props.triggerOnce,
  });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!inView) return;
    let img: any = new Image();
    img.src =
      props.nftinfo.type == "Gallery"
        ? props.nftinfo.thumbnail || props.nftinfo.image
        : props.nftinfo.thumbnail_image;
    img.onload = () => {
      setLoaded(true);
      img!.onload = null;
      img!.error = null;
      img = null;
    };
    img.onerror = () => {
      setLoaded(true);
      img!.onload = null;
      img!.error = null;
      img = null;
    };
  }, [props.nftinfo, inView]);

  return (
    <div ref={ref} style={{ aspectRatio }} id={props.nftinfo.boxId}>
      {inView && loaded ? props.children : props.skeleton}
    </div>
  );
}
