import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useEarlyUserStore: any = create<any>()(
  persist(
    (set, get) => ({
      isEarlyUser: false,
      isMintSuccess: false,
      isBindEmail: false,
      mintId: "",
      showNotion: true,
      shareTwNum: 0,
      isShowAgree: false,
      setIsShowAgree: (isShowAgree: boolean) => {
        set({ isShowAgree });
      },
      setShowNotion: (showNotion: boolean) => {
        set({ showNotion });
      },
      setIsEarlyUser: (isEarlyUser: boolean) => {
        set({ isEarlyUser });
      },
      setIsMintSuccess: (isMintSuccess: boolean) => {
        set({ isMintSuccess });
      },
      setMintId: (mintId: string) => {
        set({ mintId });
      },
      setIsBindEmail: (isBindEmail: boolean) => {
        set({ isBindEmail });
      },
      setShareTwNum: (shareTwNum: number) => {
        set({ shareTwNum });
      },
      clearEarlyUser: () => {
        set({
          isEarlyUser: false,
          isMintSuccess: false,
          isBindEmail: false,
          mintId: "",
          showNotion: true,
          shareTwNum: 0,
        });
      },
    }),
    {
      name: "useEarlyUserStore",
    },
  ),
);
