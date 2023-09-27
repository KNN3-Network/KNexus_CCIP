import { createContext, useCallback, useEffect, useState } from "react";
import { useContext } from "react";

import { createStandaloneToast } from "@chakra-ui/react";
import {
  earnAddress,
  isProduction,
  knexusContractAddress,
  usdtContractAddress,
} from "config/base";
import { config } from "config/walletNet";
import Decimal from "decimal.js";
import { Web3Context } from "lib/Web3Context";
import MintAbi from "lib/abi.json";
import Erc20Abi from "lib/erc20.json";
import Web3 from "web3";

const { ToastContainer, toast } = createStandaloneToast();

const contractAddress = knexusContractAddress;

export default function useKnexusContract() {
  const { account, sendTx, web3, chainId } = useContext(Web3Context);
  const [configChainId, setConfigChainId] = useState(
    isProduction ? config.chainId : config.stagingChainId,
  );

  const verifyChainIdAndMeta = () => {
    if (chainId != configChainId) {
      // switchChain(configChainId)
      toast({
        title: `KNexus is working on ${
          isProduction ? "Polygon" : "Mumbai Test"
        } Chain, please switch to the right RPC`,
        status: "info",
        variant: "subtle",
        duration: 10000,
        isClosable: true,
        position: "top-right",
      });
      return false;
    }
    if (!window.ethereum) {
      toast({
        title: `You need a web3 wallet to continue`,
        status: "info",
        variant: "subtle",
        duration: 10000,
        isClosable: true,
        position: "top-right",
      });
      return false;
    }
  };

  return {
    async mint(fileUrl, price, amount, launchId) {
      const address = "0xb21f6ce8641cba30bdd3b430ae1c663325d3df47";
      const abi = [
        {
          inputs: [
            {
              internalType: "uint64",
              name: "destinationChainSelector",
              type: "uint64",
            },
            { internalType: "address", name: "receiver", type: "address" },
            {
              internalType: "enum KnexusItemSourceMinter.PayFeesIn",
              name: "payFeesIn",
              type: "uint8",
            },
            { internalType: "string", name: "_tokenURI", type: "string" },
            { internalType: "uint256", name: "_maxSupply", type: "uint256" },
            { internalType: "string", name: "_metadataId", type: "string" },
          ],
          name: "authorise",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ];
      await window.ethereum.enable();
      const web3Raw = new Web3(window.ethereum);
      const contract = new web3Raw.eth.Contract(abi, address);
      const func = contract.methods.authorise(
        "13264668187771770619",
        "0x044e7b702b30098BfcF93fb69ec9CAb734050516",
        1,
        "https://knn3-knexus-staging.s3.us-west-2.amazonaws.com/1692985702031_2.png",
        10,
        "0041d649-e9f9-4206-b60a-d7a34e96167a",
      );
      return await sendTx(func);
    },
    async mintWith(tokenId, price) {
      const address = "0x574fb848D0B118fCf83EF0B5106b30bff2D13cEE";
      const abi = [
        {
          inputs: [
            {
              internalType: "uint64",
              name: "destinationChainSelector",
              type: "uint64",
            },
            { internalType: "address", name: "receiver", type: "address" },
            {
              internalType: "enum KnexusItemSourceMinter.PayFeesIn",
              name: "payFeesIn",
              type: "uint8",
            },
            { internalType: "uint256", name: "_tokenId", type: "uint256" },
            { internalType: "uint256", name: "_value", type: "uint256" },
            { internalType: "bytes", name: "_data", type: "bytes" },
          ],
          name: "mint",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ];
      const web3Raw = new Web3(window.ethereum);
      const contract = new web3Raw.eth.Contract(abi, address);
      const func = contract.methods.mint(
        "13264668187771770619",
        "0x044e7b702b30098BfcF93fb69ec9CAb734050516",
        1,
        6,
        1,
        "0x",
      );
      return await sendTx(func);
      // if (chainId == configChainId && window.ethereum) {
      //   await window.ethereum.enable();
      //   const web3Raw = new Web3(window.ethereum);
      //   const contract = new web3Raw.eth.Contract(
      //     Erc20Abi,
      //     usdtContractAddress,
      //   );
      //   const balance = await contract.methods.balanceOf(account).call();
      //   const result = await contract.methods
      //     .allowance(account, contractAddress)
      //     .call();
      //   const priceNum = new Decimal(price).mul(isProduction ? 1e6 : 1e18);
      //   const deciBalance = new Decimal(balance);
      //   const deciResult = new Decimal(result);
      //   console.log("余额", deciBalance.toFixed());
      //   console.log("授权", deciResult.toFixed());
      //   console.log("价格", priceNum.toFixed());
      //   console.log("余额是否足够", !deciBalance.lt(priceNum));
      //   console.log("授权是否足够", !deciResult.lt(priceNum));
      //   if (!deciBalance.lt(priceNum)) {
      //     if (!deciResult.lt(priceNum)) {
      //       const contractTx = new web3Raw.eth.Contract(
      //         MintAbi,
      //         contractAddress,
      //       );
      //       const func = contractTx.methods.mint(tokenId.toString(), 1, "0x");
      //       return await sendTx(func);
      //     } else {
      //       const func = contract.methods.approve(
      //         contractAddress,
      //         "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
      //       );
      //       try {
      //         const res = await sendTx(func);
      //         if (res && res.status) {
      //           const contractTx = new web3Raw.eth.Contract(
      //             MintAbi,
      //             contractAddress,
      //           );
      //           const func = contractTx.methods.mint(
      //             tokenId.toString(),
      //             1,
      //             "0x",
      //           );
      //           return await sendTx(func);
      //         }
      //       } catch (error) {
      //         console.log("error", error);
      //       }
      //     }
      //   } else {
      //     toast({
      //       title: "insufficient $USDT balance.",
      //       status: "info",
      //       variant: "subtle",
      //       duration: 3000,
      //       isClosable: true,
      //       position: "top-right",
      //     });
      //     return false;
      //   }
      // } else {
      //   verifyChainIdAndMeta();
      // }
    },
    async unlock(tokenId) {
      if (chainId == configChainId && window.ethereum) {
        await window.ethereum.enable();
        const web3Raw = new Web3(window.ethereum);
        const contract = new web3Raw.eth.Contract(MintAbi, contractAddress);
        const func = contract.methods.unlock(tokenId.toString());
        return await sendTx(func);
      } else {
        verifyChainIdAndMeta();
      }
    },
    async lock(tokenId) {
      if (chainId == configChainId && window.ethereum) {
        await window.ethereum.enable();
        const web3Raw = new Web3(window.ethereum);
        const contract = new web3Raw.eth.Contract(MintAbi, contractAddress);
        const func = contract.methods.lock(tokenId.toString());
        return await sendTx(func);
      } else {
        verifyChainIdAndMeta();
      }
    },
    async setTokenPrice(tokenId, price) {
      if (chainId == configChainId && window.ethereum) {
        await window.ethereum.enable();
        const web3Raw = new Web3(window.ethereum);
        const contract = new web3Raw.eth.Contract(MintAbi, contractAddress);
        console.log("account", account);
        console.log(
          account,
          tokenId,
          contractAddress,
          usdtContractAddress,
          isProduction,
        );
        const func = contract.methods.setTokenPrice(
          tokenId.toString(),
          0,
          usdtContractAddress,
          new Decimal(price).mul(isProduction ? 1e6 : 1e18).toFixed(),
        );
        return await sendTx(func);
      } else {
        verifyChainIdAndMeta();
      }
    },

    async transfer(value) {
      if (chainId == configChainId && window.ethereum) {
        const web3Raw = new Web3(window.ethereum);
        const contract = new web3Raw.eth.Contract(
          Erc20Abi,
          usdtContractAddress,
        );
        const func = contract.methods.transfer(
          earnAddress,
          new Decimal(value).mul(isProduction ? 1e6 : 1e18).toFixed(),
        );
        return await sendTx(func);
      } else {
        verifyChainIdAndMeta();
      }
    },
    // async balanceOf(tokenId) {
    //   await window.ethereum.enable();
    //   const web3Raw = new Web3(window.ethereum);
    //   const contract = new web3Raw.eth.Contract(MintAbi, contractAddress);
    //   console.log('tokenid', tokenId)
    //   return new Promise((resolve, reject) => {
    //     contract.methods
    //       .balanceOf(account, tokenId.toString())
    //       .call()
    //       .then((res) => {
    //         console.log('banlance', res)
    //         resolve(res);
    //       })
    //       .catch((err) => {
    //         console.log("Error", err);
    //         reject(err);
    //       });
    //   });
    // },
  };
}
