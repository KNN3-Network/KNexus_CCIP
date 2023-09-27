import { INftCard, SortBy } from "lib/types";
import { create } from "zustand";

interface IStore {
  scroll_item: string | number;
  setScrollItem: (scroll_top: number | string) => void;
  pageNumber: number;
  setPageNumber: (pageNumber: number) => void;
  sortBy: SortBy | undefined;
  setSortBy: (sortBy: SortBy | undefined) => void;
  nftList: INftCard[];
  setNftList: (nftList: INftCard[]) => void;
  nft: INftCard | null;
  setNft: (setNft: INftCard) => void;
  simpleDetailModalOpen: boolean;
  setSimpleDetailModalOpen: (simpleDetailModalOpen: boolean) => void;
  isStackedCarousel: boolean;
  setIsStackedCarousel: (isStackedCarousel: boolean) => void;
}

export const useStore = create<IStore>()((set) => ({
  scroll_item: "",
  setScrollItem: (scroll_item: number | string) => set({ scroll_item }),
  pageNumber: 0,
  setPageNumber: (pageNumber: number) => set({ pageNumber }),
  sortBy: 2,
  setSortBy: (sortBy: SortBy | undefined) => set({ sortBy }),
  nftList: [],
  setNftList: (nftList: INftCard[]) => set({ nftList }),
  nft: null,
  setNft: (nft: INftCard) => set({ nft }),
  simpleDetailModalOpen: false,
  setSimpleDetailModalOpen: (simpleDetailModalOpen: boolean) =>
    set({ simpleDetailModalOpen }),
  isStackedCarousel: true,
  setIsStackedCarousel: (isStackedCarousel: boolean) =>
    set({ isStackedCarousel }),
}));
