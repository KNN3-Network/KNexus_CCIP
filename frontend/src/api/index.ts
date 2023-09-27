import { createStandaloneToast } from "@chakra-ui/react";
import { message } from "antd";
import axios from "axios";
import { baseURL } from "config/base";
import { useEarlyUserStore } from "store/earlyUserStore";
import { useUserInfoStore } from "store/userInfoStore";
import { useWalletStore } from "store/walletStore";

const { ToastContainer, toast } = createStandaloneToast();

const walletStore = useWalletStore.getState();
const userInfoStore = useUserInfoStore.getState();
const earlyUserStore = useEarlyUserStore.getState();

const api = axios.create({
  baseURL,
});

function logOut() {
  userInfoStore.clearUserInfo();
  walletStore.setJwt("");
  walletStore.setAutoConnect(false);
  walletStore.clearWallet();
  earlyUserStore.setIsEarlyUser(false);
  api.defaults.headers.authorization = "";
}

api.interceptors.request.use(
  (config) => {
    const jwt = useWalletStore.getState().jwt;
    if (jwt) {
      config.headers.authorization = `Bearer ${jwt}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

api.interceptors.response.use(
  (res: any) => {
    if (res.data.code === 200) {
      return res.data.data;
    } else {
      if (res.data.code === 1006 || res.data.code === 1001) {
        logOut();
        toast({
          title: res.data.errorMsg,
          status: "info",
          variant: "subtle",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      } else if (res.data.code === 2001) {
        earlyUserStore.setIsBindEmail(true);
      } else {
        toast({
          title: res.data.errorMsg,
          status: "error",
          variant: "subtle",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      }
    }
  },
  (error: any) => {
    toast({
      title: "The system is busy, please try again later.",
      status: "error",
      variant: "subtle",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
  },
);

export default api;
