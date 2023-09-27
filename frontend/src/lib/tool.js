import { createStandaloneToast } from "@chakra-ui/react";
import { isProduction, siteName } from "config/base";

const { ToastContainer, toast } = createStandaloneToast();

export const isPhone = () => {
  let flag =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator?.userAgent,
    );
  const ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    flag = true;
  }
  return flag;
};

export const shortenAddr = (address, length = 3) => {
  if (!address) return "";
  return `${address.slice(0, length)}...${address.slice(-length)}`;
};

export const getChainNm = (chainId) => {
  return chainId == 56
    ? "BNB Smart Chain"
    : chainId == 137
    ? "Polygon Chain"
    : "Mumbai Test Chain";
};

export function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    toast({
      title: "Copied",
      status: "success",
      variant: "subtle",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
  });
}

export const switchChain = async (chainId) => {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: `0x${chainId.toString(16)}` }],
    });
  } catch (error) {
    if (error.code == 4902) {
      // addMaticNetwork(chainId)
      toast({
        title: `KNexus is working on ${
          isProduction ? "Polygon" : "Mumbai"
        } Chain, please switch to the right RPC`,
        status: "info",
        variant: "subtle",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  }
};

export const urlToBase64 = (imageUrl) => {
  return new Promise((resolve, reject) => {
    let canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    let img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageUrl + `?time=${new Date().valueOf()}`;
    img.onload = function () {
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img, 0, 0, img.width, img.height);
      const dataURL = canvas.toDataURL("image/png", 1);
      resolve(dataURL);
      canvas = null;
      img = null;
    };
    img.onerror = function () {
      reject(new Error("Could not load image at " + imageUrl));
    };
  });
};

export async function downLoadNoWaterMark(imgUrl) {
  console.log(imgUrl);
  let img = await urlToImg(`${imgUrl}?time=${new Date().valueOf()}`);
  let canvas = imgToCanvas(img);
  let url = canvas.toDataURL("image/png");
  let a = document.createElement("a");
  let event = new MouseEvent("click");
  a.download = "Knexus";
  a.href = url;
  a.dispatchEvent(event);
}
