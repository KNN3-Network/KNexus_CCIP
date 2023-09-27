import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useWalletStore: any = create<any>()(
  persist(
    (set, get) => ({
      autoConnect: true,
      message: "",
      signature: "",
      jwt: "",
      setJwt: (jwt: boolean) => {
        set({ jwt });
      },
      setAutoConnect: (autoConnect: boolean) => {
        set({ autoConnect });
      },
      setMessage: (message: string) => {
        set({ message });
      },
      setSignature: (signature: string) => {
        set({ signature });
      },
      clearWallet: () => {
        set({
          autoConnect: false,
          message: "",
          signature: "",
        });
      },
    }),
    {
      name: "useWalletStore",
    },
  ),
);
