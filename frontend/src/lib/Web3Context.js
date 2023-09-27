import { createContext, useCallback, useEffect, useState } from "react";

import { Router, useRouter } from "next/router";

import { createStandaloneToast } from "@chakra-ui/react";
import { EthereumProvider } from "@walletconnect/ethereum-provider";
import { message } from "antd";
import api from "api";
import { versionConfig } from "config/base";
// import WalletConnectProvider from "@walletconnect/web3-provider";
import { isProduction, siteName } from "config/base";
import { config } from "config/walletNet";
import { ethers } from "ethers";
import { ButtonClickTrace } from "lib";
import { switchChain } from "lib/tool";
import { useEarlyUserStore } from "store/earlyUserStore";
import { useUserInfoStore } from "store/userInfoStore";
import { useWalletStore } from "store/walletStore";
import Web3 from "web3";

const { ToastContainer, toast } = createStandaloneToast();

let connectProvider = null;

const errorMsg = `Metamask plugin not found or not active. Please check your browser's plugin list.`;

export const Web3Context = createContext({
  web3: null,
  // signer: null,
  chainId: null,
  networkId: null,
  blockNumber: null,
  account: null,
  message: null,
  signature: null,
  connector: null,
  couponed: false,
  setCouponed: (couponed) => {},
  coupon: null, // 优惠券数量
  setCoupon: (coupon) => {},
  hash: "",
  setHash: (couponed) => {},
  connectWallet: async (walletName) => {
    return "";
  },
  resetWallet: async () => {},
  estimateGas: async () => {},
  signMessage: async (message) => {
    return "";
  },
  doLogin: async (address) => {},
  earlyBird: async (address) => {},
  doLogout: async () => {},
  getUserInfo: async () => {},
  sendTx: async () => {},
});

export const Web3ContextProvider = ({ children }) => {
  const router = useRouter();
  const [web3, setWeb3] = useState("");
  // const [signer, setSigner] = useState("");
  const [account, setAccount] = useState("");
  const [chainId, setChainId] = useState("");
  const [networkId, setnetworkId] = useState("");
  const [blockNumber, setBlockNumber] = useState("");
  // const [wcProvider, setWcProvider] = useState("");
  const [connector, setConnector] = useState("");
  const [coupon, setCoupon] = useState(0);
  const [hash, setHash] = useState("");
  const [couponed, setCouponed] = useState(false);
  const { autoConnect, setAutoConnect, setMessage, setSignature, setJwt } =
    useWalletStore();
  const { setIsEarlyUser, setShowNotion, clearEarlyUser } = useEarlyUserStore();
  const { setUserStoreInfo, clearUserInfo } = useUserInfoStore();
  const [configChainId, setConfigChainId] = useState(
    isProduction ? config.chainId : config.stagingChainId,
  );

  const listenProvider = () => {
    if (!window.ethereum) {
      return;
    }
    window.ethereum.on("close", () => {
      resetWallet();
    });
    window.ethereum.on("accountsChanged", async (accounts) => {
      api.defaults.headers.authorization = "";
      setJwt("");
      clearUserInfo();
      setIsEarlyUser(false);
    });
    window.ethereum.on("chainChanged", (chainId) => {
      setChainId(parseInt(chainId, 16));
    });
  };

  const connectWallet = useCallback(async (walletName) => {
    if (!window.ethereum && router.pathname != "/") {
      // toast.info(errorMsg)
      // showToast(errorMsg)
      toast({
        title: errorMsg,
        status: "error",
        variant: "subtle",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    try {
      let web3Raw = null;
      connectProvider = null;
      if (walletName === "walletconnect") {
        let provider = null;
        try {
          provider = await EthereumProvider.init({
            projectId: config.projectId,
            showQrModal: true,
            qrModalOptions: { themeMode: "light" },
            chains: [configChainId],
            // methods: ["eth_sendTransaction", "personal_sign"],
            // events: ["chainChanged", "accountsChanged"],
            // metadata: {
            //   name: "KNexus",
            //   description: "KNexus",
            //   url: siteName,
            //   icons: [""],
            // },
          });
          await provider.enable();
          connectProvider = provider;
          setConnector("walletconnect");
          web3Raw = new Web3(provider);
        } catch (error) {
          console.log(error);
          // toast({
          //   title: 'KNexus is working on Polygon Chain, please switch to the right RPC',
          //   status: 'error',
          //   variant: 'subtle',
          //   duration: 3000,
          //   isClosable: true,
          //   position: 'top-right'
          // })
        }
      } else {
        await window.ethereum.enable();
        setConnector("");
        // setWcProvider(window.ethereum)
        connectProvider = window.ethereum;
        web3Raw = new Web3(window.ethereum);
      }

      // if(!web3Raw) return false

      setWeb3(web3Raw);

      // get account, use this variable to detech if user is connected
      const accounts = await web3Raw.eth.getAccounts();
      console.log(accounts[0]);
      setAccount(accounts[0]);
      setAutoConnect(true);

      // // get signer object
      // const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);

      // const signerRaw = ethersProvider.getSigner();

      // setSigner(signerRaw);

      // get network id
      setnetworkId(await web3Raw.eth.net.getId());

      // get chain id
      setChainId(await web3Raw.eth.getChainId());

      valiteNetWork(await web3Raw.eth.getChainId());

      // init block number
      setBlockNumber(await web3Raw.eth.getBlockNumber());

      // switchChain(config.chainId);

      return accounts[0];
    } catch (error) {
      // setWeb3(new Web3(config.provider));
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  const valiteNetWork = (id) => {
    if (connectProvider) {
      if (id != configChainId) {
        switchChain(configChainId);
        // toast({
        //     title: `KNexus is working on ${isProduction ? 'Polygon' : 'Mumbai Test'} Chain, please switch to the right RPC`,
        //     status: 'info',
        //     variant:'subtle',
        //     duration: 10000,
        //     isClosable: true,
        //     position: 'top-right'
        // })
      }
    }
  };

  useEffect(() => {
    valiteNetWork(chainId);
  }, [chainId]);

  useEffect(() => {
    if (autoConnect && window.ethereum) {
      connectWallet("");
    }
  }, [autoConnect]);

  const resetWallet = useCallback(async () => {
    if (connectProvider) {
      // setWcProvider(null);
      connectProvider = null;
      setConnector(null);
    } else {
      // wallet.reset();
    }
    setConnector("");
    setAccount("");
  }, []);

  useEffect(() => {
    listenProvider();
  }, []);

  const estimateGas = async (func, value = 0) => {
    try {
      const gas = await func.estimateGas({
        from: account,
        value,
      });
      return Math.floor(gas * 1.5);
    } catch (error) {
      console.log("eee", error);
      const objStartIndex = error.message.indexOf("{");
      const obj = JSON.parse(error.message.slice(objStartIndex));
      toast({
        title: obj.message,
        status: "error",
        variant: "subtle",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      // showToast(obj.message)
    }
  };

  /**
   *
   * @param {*} func , required
   * @param {*} actionType , required
   * @param {*} value , default 0
   * @returns
   */

  const sendTx = async (func, value = 0) => {
    const gasLimit = await estimateGas(func, value);

    // gas price is necessary for matic
    const gasPrice = Number(await web3.eth.getGasPrice());

    if (!isNaN(gasLimit)) {
      return func
        .send({
          gas: gasLimit,
          gasPrice,
          from: account,
          value,
        })
        .on("transactionHash", (txnHash) => {
          console.log("txnHash", txnHash);
          setHash(txnHash);
          // toast.info(actionMapping[0], {
          //   icon: <LoadingOutlined />,
          // });
        })
        .on("receipt", async (receipt) => {
          console.log("receipt", receipt);
          // const txnHash = receipt?.transactionHash;
          // toast.success(actionMapping[1], {});
        })
        .on("error", async (err, txn) => {
          console.log("err", err);
          // const txnHash = txn?.transactionHash;

          // if (err.code === 4001) {
          //   toast.error("User canceled action");
          // } else {
          //   toast.error(actionMapping[2], {});
          // }
        });
    }
  };

  /**
   * Sign message
   */

  const signMessage = async (message) => {
    console.log(connectProvider);
    await connectProvider.enable();
    const web3Raw = new Web3(connectProvider);
    const signAccount = await web3Raw.eth.getAccounts();
    return await web3Raw.eth.personal.sign(message, signAccount[0]);
  };

  const doLogin = async (address) => {
    const res = await api.post(`/api/auth/challenge`, {
      address: address,
    });

    if (res) {
      setMessage(res);
      const signMsg = await signMessage(res);
      if (signMsg) {
        setSignature(signMsg);
        loginRequest(res, signMsg, address);
      }
    }
  };

  const doLogout = async () => {
    resetWallet();
    setAutoConnect(false);
    setJwt("");
    clearUserInfo();
    clearEarlyUser();
    setIsEarlyUser(false);
    api.defaults.headers.authorization = ``;
    setCouponed(false);
    setCoupon(0);
    setHash("");
  };

  const earlyBird = async (address) => {
    // const challenge = `Hello, welcome to KNexus. Please sign this message to verify your wallet. Please make sure the URL is: ${siteName} \nTime: ${Date.now()}`;
    // setMessage(challenge)
    // const signMsg = await signMessage(challenge);

    const res = await api.post(`/api/auth/challenge`, {
      address: address,
    });
    if (res) {
      setMessage(res);
      const signMsg = await signMessage(res);
      if (signMsg) {
        setSignature(signMsg);
        earlyBirdRequest(res, signMsg, address);
      }
    }
  };

  const earlyBirdRequest = async (challenge, signMsg, address) => {
    const res = await api.post(`/api/auth/login`, {
      message: challenge,
      address: address,
      signature: signMsg,
    });
    if (!res) {
      setCouponed(true);
    }
    if (res && res.accessToken) {
      setJwt(res.accessToken);
      api.defaults.headers.authorization = `Bearer ${res.accessToken}`;
      const res1 = await api.get(`/api/user`);
      if (res1.coupon) setCoupon(res1.coupon);
      // if (res1 && res1.id) {
      //   setUserStoreInfo({ ...res1 })
      // }
    }
  };

  const getUserInfo = async () => {
    const res1 = await api.get(`/api/user`);
    if (res1 && res1.id) {
      setUserStoreInfo({ ...res1 });
      if (res1.is_wait_list !== 0 && res1.is_first == 1) {
        setIsEarlyUser(true);
      } else {
        setIsEarlyUser(false);
      }
      router.push("/home");
    }
  };

  const loginRequest = async (challenge, signMsg, address) => {
    console.log(router);
    const res = await api.post(`/api/auth/knexus/login`, {
      message: challenge,
      address: address,
      signature: signMsg,
      type: router?.query?.from == "early" ? "early" : "normal",
    });
    if (res && res.accessToken) {
      ButtonClickTrace("sign in");
      setShowNotion(true);
      setAutoConnect(true);
      setJwt(res.accessToken);
      api.defaults.headers.authorization = `Bearer ${res.accessToken}`;
      // window?.localStorage.setItem("version", versionConfig);
      getUserInfo();
    }
  };

  return (
    <Web3Context.Provider
      value={{
        web3,
        // signer,
        chainId,
        networkId,
        account,
        message: null,
        signature: null,
        connector,
        blockNumber,
        connectWallet,
        resetWallet,
        estimateGas,
        signMessage,
        doLogin,
        earlyBird,
        coupon,
        setCoupon,
        couponed,
        setCouponed,
        hash,
        setHash,
        doLogout,
        sendTx,
        getUserInfo,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const Web3ContextConsumer = Web3Context.Consumer;
