import React, { useCallback, useEffect, useState } from "react";

import { useRouter } from "next/router";

import { Box, Button, Image, Input } from "@chakra-ui/react";
import api from "api";
import { BaseModal, Header, NextSeo, NotData } from "components";
import Campign from "components/common/Campign";
import { isProduction, siteName, usdtContractAddress } from "config/base";
import { config } from "config/walletNet";
import useKnexusContract from "contract/useKnexusContract";
import useWeb3Context from "hooks/useWeb3Context";
import lodash from "lodash";
import moment from "moment";
import { useEarlyUserStore } from "store/earlyUserStore";
import { useUserInfoStore } from "store/userInfoStore";

const sellConfig = [
  {
    value: 100,
    sell: 10,
  },
  {
    value: 1000,
    sell: 70,
  },
  {
    value: 2500,
    sell: 150,
  },
  {
    value: "Other",
    sell: "Custom",
  },
];

const hisCofig = [
  {
    value: "+10",
    label: "完成一次mint",
    date: "2023.08.23",
  },
  {
    value: "+10",
    label: "完成一次mint",
    date: "2023.08.23",
  },
  {
    value: "+10",
    label: "完成一次mint",
    date: "2023.08.23",
  },
  {
    value: "+10",
    label: "完成一次mint",
    date: "2023.08.23",
  },
];

const pageSize = 6;

let pageNumber = 0;

export default function Earn() {
  const router = useRouter();

  const { showNotion, shareTwNum, setShareTwNum } = useEarlyUserStore();

  const { setUserStoreInfo, clearUserInfo, coupon } = useUserInfoStore();

  const { hash, setHash } = useWeb3Context();

  const [activeIdx, setActiveIdx] = useState<number>(0);

  const [sellMount, setSellMount] = useState<any>(null);

  const [taskList, setTaskList] = useState<any>([]);

  const [buyLoading, setBuyLoading] = useState<boolean>(false);

  const [successOpen, setSuccessOpen] = useState<boolean>(false);

  const [errorOpen, setErrorOpen] = useState<boolean>(false);

  const [next, setNext] = useState<boolean>(true);

  const [historyList, setHistoryList] = useState<any>([]);

  const [pageNumState, setPageNumState] = useState<number>(pageNumber);

  const knexusContract = useKnexusContract();

  const getUserInfo = async () => {
    const res1: any = await api.get(`/api/user`);
    if (res1 && res1.id) {
      setUserStoreInfo({ ...res1 });
    }
  };

  const buyCoinContract = async () => {
    if ((!sellMount || sellMount == 0) && activeIdx == 3) return false;
    setBuyLoading(true);
    try {
      const res: any = await knexusContract.transfer(
        activeIdx == 3
          ? (sellMount / 10).toString()
          : sellConfig[activeIdx].sell.toString(),
      );
      setBuyLoading(false);
      if (res && res.status) {
        setSuccessOpen(true);
        getUserInfo();
        setHash("");
        pageNumber = 0;
        setPageNumState(pageNumber);
        getHistory();
      } else {
        setErrorOpen(false);
      }
    } catch (error) {
      setErrorOpen(false);
      setBuyLoading(false);
    }
  };

  const buyCoinJk = async () => {
    if ((!sellMount || sellMount == 0) && activeIdx == 3) return false;
    try {
      const res: any = await api.post(`/api/recharge`, {
        coupon:
          activeIdx == 3
            ? sellMount.toString()
            : sellConfig[activeIdx].value.toString(),
        amount:
          activeIdx == 3
            ? (sellMount / 10).toString()
            : sellConfig[activeIdx].sell.toString(),
        chain_id: isProduction ? config.chainId : config.stagingChainId,
        currency: usdtContractAddress,
        tx_hash: hash,
      });
    } catch (error) {
      setErrorOpen(false);
      console.log("error", error);
    }
  };

  const getTaskList = async () => {
    try {
      const res: any = await api.get(`/api/user/taskList`);
      if (Array.isArray(res) && res.length > 0) {
        setTaskList(res);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const debouncedClaim = useCallback(
    lodash.debounce(async (id) => {
      claim(id);
    }, 500),
    [],
  );

  const claim = async (id: any) => {
    try {
      const res: any = await api.post(`/api/task/claim`, {
        id,
      });
      if (res) {
        getTaskList();
        getUserInfo();
        getHistory();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const compelte = async (item: any) => {
    try {
      const res: any = await api.post(`/api/task/completed`, {
        task_id: item.id,
      });
      if (res) {
        getTaskList();
        getUserInfo();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const link = async (idx: any, item: any) => {
    if (item.completed_task.length == 0) {
      window.open(
        `${
          idx == 7
            ? "https://discord.gg/vRX9PQeqGX"
            : idx == 8
            ? "https://t.me/+PrA1S6Qz32M5ZWVl"
            : "https://bit.ly/3YSUrX8"
        }`,
        "_blank",
      );
      compelte(item);
    } else {
      claim(item.completed_task[0]["id"]);
    }
  };

  const getHistory = async () => {
    try {
      const res: any = await api.get(
        `/api/user/couponList?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      );
      if (res) {
        setNext(res.next);
      }
      if (res && res.list) {
        setHistoryList(res.list);
      } else {
        setHistoryList([]);
      }
    } catch (error) {
      setHistoryList([]);
      console.log("error", error);
    }
  };

  useEffect(() => {
    pageNumber = 0;
    setPageNumState(pageNumber);
    getTaskList();
    getHistory();
  }, []);

  useEffect(() => {
    if (
      shareTwNum == 5 &&
      taskList.length > 0 &&
      taskList[7]["completed_task"].length == 0
    ) {
      compelte(taskList[7]);
    }
  }, [taskList]);

  useEffect(() => {
    if (hash) {
      buyCoinJk();
    }
  }, [hash]);

  return (
    <>
      {/* <NextSeo title="result-Knexus" /> */}
      <NextSeo title="Earn | KNexus" />
      <div className="flex flex-col h-screen bg-[url('/images/bg.png')] bg-cover font-eurostile">
        <div className="w-full flex flex-col" style={{ zIndex: 11 }}>
          <Campign />
          <Box
            backdropFilter="blur(100px)"
            w="calc(100% - 80px)"
            m="0 auto"
            mt="10px"
            borderRadius="full"
            overflow="hidden"
            background="rgba(255, 255, 255, 0.20)"
            boxShadow="0px 0px 10px 0px rgba(0, 0, 0, 0.20)"
          >
            <Header />
          </Box>
        </div>
        <BaseModal
          isOpen={successOpen}
          onClose={() => {
            setSuccessOpen(false);
          }}
          size="xl"
          title="Successful Recharge"
        >
          <div>
            <p className="text-[16px]">
              Recharge successful! You can now unleash your creativity.
            </p>
            <div className="flex ml-[auto] w-[fit-content] mt-8 items-center">
              <Button
                color="#D5F95F"
                bg="#000"
                boxShadow="0px 0px 16px 0px rgba(0, 0, 0, 0.25)"
                borderRadius="full"
                fontSize="14px"
                _hover={{ background: "rgba(0,0,0,0.5)" }}
                onClick={() => router.push("/create")}
              >
                <div>
                  <span className="mr-1 text-[20px]">Go to create</span>
                </div>
              </Button>
            </div>
          </div>
        </BaseModal>
        <BaseModal
          isOpen={errorOpen}
          onClose={() => {
            setErrorOpen(false);
          }}
          size="xl"
          title="Recharge Unsuccessful"
        >
          <div>
            <p className="text-[16px]">Recharge failed. Please try again.</p>
            <div className="flex ml-[auto] w-[fit-content] mt-8 items-center">
              <Button
                color="#D5F95F"
                bg="#000"
                boxShadow="0px 0px 16px 0px rgba(0, 0, 0, 0.25)"
                borderRadius="full"
                fontSize="14px"
                _hover={{ background: "rgba(0,0,0,0.5)" }}
                onClick={() => setErrorOpen(false)}
              >
                <div>
                  <span className="mr-1 text-[20px]">Close</span>
                </div>
              </Button>
            </div>
          </div>
        </BaseModal>
        <div
          className={`${
            showNotion ? "h-[calc(100vh-110px)]" : "h-[calc(100vh-70px)]"
          } overflow-auto`}
        >
          <div className="w-[90%] min-w-[1000px] max-w-[1440px] mx-[auto]">
            <div className="flex justify-between gap-10 mt-10">
              <div className="w-[calc(50%-20px)] shrink-0">
                <div className="h-[120px] shadow-md flex items-center rounded-lg border-[2px] border-[rgba(0,0,0,0.1)] mb-5">
                  <div className="mr-5 ml-5">
                    <Image className="h-[70px]" src="/images/common/coin.png" />
                  </div>
                  <div>
                    <p className="text-[24px] text-bold">{coupon}</p>
                    <p className="text-[16px]">Balance</p>
                  </div>
                </div>
                <div className="w-full overflow-hidden">
                  {sellConfig.map((t, i) => (
                    <div
                      className={`h-[120px] relative overflow-hidden shadow-md border-[2px]
                       rounded-lg float-left w-[calc(50%-6px)] mb-3 cursor-pointer 
                       ${
                         activeIdx == i
                           ? "border-[#000]"
                           : "border-[rgba(0,0,0,0.1)]"
                       }
                       ${i == 0 || i == 2 ? "mr-3" : ""}`}
                      key={i}
                      onClick={() => setActiveIdx(i)}
                    >
                      <div className="h-[80px] flex items-center">
                        <div className="mr-5 ml-5">
                          <Image
                            className="h-[50px]"
                            src="/images/common/coin.png"
                          />
                        </div>
                        <div className="w-[calc(100%-160px)]">
                          {activeIdx == 3 && i == 3 ? (
                            <div className="flex items-center w-full">
                              <div className="shadow-md w-full relative">
                                <Input
                                  focusBorderColor={"bg.main"}
                                  type="number"
                                  value={sellMount}
                                  onChange={(e: any) =>
                                    e.target.value < 0
                                      ? setSellMount(0)
                                      : setSellMount(e.target.value)
                                  }
                                  style={{ width: "100%", border: "none" }}
                                  placeholder="Please enter"
                                />
                              </div>
                            </div>
                          ) : (
                            <p className={`text-[24px] text-bold`}>{t.value}</p>
                          )}
                          <p
                            className={`text-[16px] ${
                              activeIdx == 3 && i == 3 ? "pl-4" : ""
                            }`}
                          >
                            Prompt Point
                          </p>
                        </div>
                      </div>
                      <div className="h-[36px] w-full flex items-center justify-center bg-[#D5F95F]">
                        {activeIdx == 3 && i == 3 ? (
                          <span>{sellMount ? sellMount / 10 : 0} USDT</span>
                        ) : (
                          <span>{t.sell} USDT</span>
                        )}
                      </div>
                      {activeIdx == i && (
                        <div className="w-[36px] bg-green rounded-tl-[24px] absolute z-40 bottom-[-5px] right-[-5px] text-black flex items-center justify-center">
                          <Image src="/images/common/coin-selected.png" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex items-center mb-5">
                  {/* {
                    activeIdx == 3 &&
                    <div className='flex items-center'>
                      <div className='shadow-md w-[160px] relative'>
                        <Input
                          focusBorderColor={'bg.main'}
                          type='number'
                          value={sellMount}
                          onChange={(e: any) => e.target.value < 0 ? setSellMount(0) : setSellMount(e.target.value)}
                          style={{ 'width': '160px', 'border': 'none', 'textIndent': '30px' }}
                          placeholder="Please enter" />
                        <Image
                          className="h-[20px] left-[14px] top-[6px] absolute"
                          src='/images/common/coin.png'
                        />
                      </div>
                      <div className='w-[200px] ml-3'>{sellMount ? sellMount / 10 : 0} USDT</div>
                    </div>
                  } */}
                  <div className="ml-auto">
                    <Button
                      w="120px"
                      onClick={() => buyCoinContract()}
                      size="lg"
                      color="#D5F95F"
                      bg="#000"
                      boxShadow="0px 0px 16px 0px rgba(0, 0, 0, 0.25)"
                      borderRadius="full"
                      loadingText={"Buy now"}
                      isLoading={buyLoading}
                      _hover={{ background: "rgba(0,0,0,0.5)" }}
                    >
                      Buy now
                    </Button>
                  </div>
                </div>
                <div className="w-full p-5 shadow-md border-[2px] rounded-lg border-[#000] mb-5">
                  <div className="text-[24px] font-[700] mb-5">History</div>

                  {historyList.length == 0 ? (
                    <div
                      className={`h-[220px] w-full flex items-center justify-center`}
                    >
                      <NotData size="md" />
                    </div>
                  ) : (
                    <div className="h-[180px] overflow-auto pr-5">
                      {historyList.map((t: any, i: any) => (
                        <div
                          className="flex items-center text-[16px] mb-2"
                          key={i}
                        >
                          <div className="w-[80px] flex items-center shrink-0">
                            <div className="mr-1 w-10">
                              {t.kind == "increment" ? "+" : "-"}
                              {t.coupon}
                            </div>
                            <div>
                              <Image
                                className="h-[20px]"
                                src="/images/common/coin.png"
                              />
                            </div>
                          </div>
                          <div className="font-bold w-[calc(100%-220px)] shrink-0">
                            {t.description}
                          </div>
                          <div className="ml-auto text-[14px]">
                            {t.created_at
                              ? moment(t.created_at).format("YYYY-MM-DD HH:mm")
                              : "--"}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex h-[40px]">
                    <div className="ml-auto flex items-center gap-5">
                      {pageNumState != 0 && (
                        <div
                          onClick={() => {
                            if (pageNumber != 0) {
                              pageNumber--;
                              setPageNumState(pageNumber);
                              getHistory();
                            }
                          }}
                        >
                          <Image
                            className="h-[40px] cursor-pointer hover:opacity-70"
                            src="/images/common/earn-left.png"
                          />
                        </div>
                      )}
                      {next && (
                        <div
                          onClick={() => {
                            if (next) {
                              pageNumber++;
                              setPageNumState(pageNumber);
                              getHistory();
                            }
                          }}
                        >
                          <Image
                            className="h-[40px] cursor-pointer hover:opacity-70"
                            src="/images/common/earn-right.png"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[calc(50%-20px)] shrink-0">
                <div className="w-full p-5 shadow-md border-[2px] rounded-lg border-[#000] mb-5">
                  <div className="text-[24px] font-[700] mb-5">Quest</div>
                  {taskList.map((t: any, i: any) => (
                    <div className="items-center text-[16px] mb-3" key={i}>
                      <div className="flex justify-between items-center">
                        <div className="text-[18px] font-bold">{t.title}</div>
                        <div className="flex items-center">
                          <div className="mr-1 text-[18px]">+{t.coupon}</div>
                          <div>
                            <Image
                              className="h-[20px]"
                              src="/images/common/coin.png"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-[14px] text-[rgba(0,0,0,0.6)]">
                          {t.content}
                        </div>
                        <div>
                          {i != 7 && i != 8 && i != 9 ? (
                            <Button
                              w="80px"
                              h="30px"
                              color="#fff"
                              bg={`${
                                t.completed_task.length == 0
                                  ? "rgba(0,0,0,0.6)"
                                  : t.completed_task.length != 0 &&
                                    t.completed_task[0]["status"] == 1
                                  ? "rgba(0,0,0,0.2)"
                                  : "#000"
                              }`}
                              isDisabled={t.completed_task.length == 0}
                              boxShadow="0px 0px 16px 0px rgba(0, 0, 0, 0.25)"
                              borderRadius="full"
                              onClick={() => {
                                if (
                                  t.completed_task.length != 0 &&
                                  t.completed_task[0]["status"] == 1
                                ) {
                                  return false;
                                }
                                debouncedClaim(t.completed_task[0]["id"]);
                              }}
                              _hover={{
                                background:
                                  t.completed_task.length != 0 &&
                                  t.completed_task[0]["status"] == 1
                                    ? "rgba(0,0,0,0.2)"
                                    : "rgba(0,0,0,0.6)",
                              }}
                            >
                              {t.completed_task.length == 0
                                ? "Claim"
                                : t.completed_task[0]["status"] == 0
                                ? "Claim"
                                : "Claimed"}
                            </Button>
                          ) : (
                            <Button
                              h="30px"
                              w="80px"
                              color="#fff"
                              bg={`${
                                t.completed_task.length == 0
                                  ? "#000"
                                  : t.completed_task.length != 0 &&
                                    t.completed_task[0]["status"] == 1
                                  ? "rgba(0,0,0,0.2)"
                                  : "#000"
                              }`}
                              boxShadow="0px 0px 16px 0px rgba(0, 0, 0, 0.25)"
                              borderRadius="full"
                              onClick={() => {
                                if (
                                  t.completed_task.length != 0 &&
                                  t.completed_task[0]["status"] == 1
                                ) {
                                  return false;
                                }
                                link(i, t);
                              }}
                              _hover={{
                                background:
                                  t.completed_task.length != 0 &&
                                  t.completed_task[0]["status"] == 1
                                    ? "rgba(0,0,0,0.2)"
                                    : "rgba(0,0,0,0.6)",
                              }}
                            >
                              {t.completed_task.length == 0
                                ? "Go"
                                : t.completed_task[0]["status"] == 0
                                ? "Claim"
                                : "Claimed"}
                            </Button>
                          )}
                        </div>
                      </div>
                      {/* <div className='w-[120px] flex items-center'>
                          <div className='mr-1'>{t.value}</div>
                          <div>
                            <Image
                              className="h-[20px]"
                              src='/images/common/coin.png'
                            />
                          </div>
                        </div>
                        <div className='font-bold'>{t.label}</div>
                        <div className='ml-auto'>{t.date}</div> */}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
