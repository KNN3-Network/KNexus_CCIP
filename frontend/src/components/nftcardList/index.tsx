import React from "react";

import { LazyloadCard, NftCard, SkeletonNftCard } from "components/common";
import { INftCard } from "lib/types";

interface IMarketplaceProps {
  nftList: INftCard[];
}

export default function Marketplace(props: IMarketplaceProps) {
  const { nftList } = props;
  return (
    <div className="w-full h-[fit-content] card-grid-column">
      {nftList.map((nft, i: number) => (
        <LazyloadCard
          delay={2000}
          triggerOnce={false}
          key={i}
          nftinfo={nft}
          skeleton={<SkeletonNftCard />}
        >
          <NftCard key={i} {...nft} />
        </LazyloadCard>
      ))}
    </div>
  );
}
