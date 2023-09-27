import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useScrollStore: any = create<any>()(
  persist(
    (set, get) => ({
      showScrollModal: false,
      detail_img: "",
      setShowScrollModal: (showScrollModal: boolean) => {
        set({ showScrollModal });
      },
      setDetailImg: (detail_img: string) => {
        set({ detail_img });
      },
    }),
    {
      name: "useScrollStore",
    },
  ),
);
