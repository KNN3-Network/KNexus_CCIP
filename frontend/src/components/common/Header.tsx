import React, { useEffect, useRef, useState } from "react";

import { useRouter } from "next/router";

import { Box, Button, Flex, Image } from "@chakra-ui/react";
import { Popover } from "antd";
import api from "api";
import { BaseModal, NotData } from "components/common";
import { versionConfig } from "config/base";
import useWeb3Context from "hooks/useWeb3Context";
import { ButtonClickTrace } from "lib";
import lodash from "lodash";
import { SyncLoader } from "react-spinners";
import { useEarlyUserStore } from "store/earlyUserStore";
import { useUserInfoStore } from "store/userInfoStore";
import { useWalletStore } from "store/walletStore";
import { v4 as uuidv4 } from "uuid";

import { SearchInput } from "../antd/SearchInput";
import Campign from "./Campign";

const menuItems = [
  {
    name: "Pandora NFT",
    router: "pandora",
  },
  {
    name: "Marketplace",
    router: "marketplace",
  },
  {
    name: "Create",
    router: "create",
  },
];

let pageNumber = 0;

let next = true;

export default function Header() {
  const { showNotion, setShowNotion } = useEarlyUserStore();

  const router = useRouter();

  const myRef = useRef(null);

  const { doLogin, connectWallet, doLogout } = useWeb3Context();

  const { jwt, setJwt } = useWalletStore();

  const [nofiLoading, setNofiLoading] = useState<boolean>(false);

  const [open, setOpen] = useState<boolean>(false);

  const [notifiList, setNotifiList] = useState<any>([]);

  const [count, setCount] = useState<any>(0);

  const [notifiCount, setNotifiCount] = useState<number>(0);

  const { id, image } = useUserInfoStore();

  const getNotification = async () => {
    setNofiLoading(true);
    try {
      const res: any = await api.get(`/api/user/notification`, {
        params: {
          pageSize: 30,
          pageNumber,
        },
      });
      setNofiLoading(false);
      if (res && res.count) {
        setCount(res.count);
      }
      if (res && res.list && res.list.length) {
        if (pageNumber == 0) {
          setNotifiList(res.list);
        } else {
          setNotifiList((prev: any) => {
            return [...prev, ...res.list];
          });
        }
        next = res.next;
      } else {
        next = res.next;
      }
    } catch (error) {
      setNotifiList([]);
      setNofiLoading(false);
      setCount(0);
    }
  };

  const notifyRead = async (id: any) => {
    try {
      const res: any = await api.post(`/api/notification/read`, {
        id,
      });
      getIshaveNotifi();
      let idx = lodash.findIndex(
        notifiList,
        (e: any) => {
          return e.id == id;
        },
        0,
      );
      setNotifiList((prev: any) => {
        prev[idx]["status"] = 1;
        return [...prev];
      });
    } catch (error) {}
  };

  const handleScroll = () => {
    const node: any = myRef.current;
    if (node.scrollHeight - node.scrollTop <= node.clientHeight) {
      if (next) {
        getNotification();
      }
    }
  };

  const handleOpenChange = (e: any) => {
    next = false;
    pageNumber = 0;
    setOpen(e);
    getNotification();
  };

  useEffect(() => {
    getIshaveNotifi();
    setInterval(
      () => {
        getIshaveNotifi();
      },
      10 * 60 * 10000,
    );
  }, []);

  const getIshaveNotifi = async () => {
    if (!id) return false;
    const res: any = await api.get(`/api/user/notification`, {
      params: {
        pageSize: 1000,
        pageNumber: 0,
        status: 0,
      },
    });
    if (res && res.list && res.list.length == 0) {
      setNotifiCount(0);
    }
    if (res && res.list && res.list.length > 0) {
      setNotifiCount(res.list.length);
    }
  };

  const menuTrigger = (routerNm: any) => {
    if (routerNm === "/draw") {
      window.open("https://knexus.pandora.staging.knn3.xyz/", "_blank");
    } else {
      router.push(`/${routerNm}`);
    }
  };

  return (
    <div className="w-full">
      <Box
        w="full"
        h="64px"
        py="15px"
        background="rgba(255,255,255,0.2)"
        paddingX="36px"
        className="font-eurostile flex items-center text-[#000]"
      >
        <div className="flex items-center w-full">
          <div className="flex justify-between w-full gap-[3em]">
            <Flex alignItems="center">
              <Image
                className="cursor-pointer"
                onClick={() => router.push(`/home`)}
                src="/images/home/logo.png"
                height="40px"
                mr="10px"
              />
              <div
                className="text-[24px] font-bold cursor-pointer"
                onClick={() => router.push(`/home`)}
              >
                KNexus
              </div>
            </Flex>
            <div className="flex items-center gap-[5em] flex-1">
              <div className="flex item-center gap-[1em]">
                {menuItems.slice(0, 2).map((t, i) => (
                  <div
                    key={i}
                    onClick={() => menuTrigger(t.router)}
                    className={`shrink-0 cursor-pointer h-full py-1 text-[16px] rounded-[20px] desktop:text-[18px] px-4 hover:bg-green
                    ${router.pathname === `/${t.router}` ? "bg-green" : ""}`}
                  >
                    {t.name}
                  </div>
                ))}
              </div>
              <SearchInput />
            </div>
            <div className="ml-[auto] flex items-center gap-[2rem] shrink-0">
              {[menuItems[2]].map((t, i) => (
                <div
                  key={i}
                  onClick={() => menuTrigger(t.router)}
                  className={`h-[40px] shrink-0 cursor-pointer flex items-center text-[16px] rounded-[20px] desktop:text-[18px] px-6 border border-[#000] hover:bg-green ${
                    router.pathname === `/${t.router}` ? "bg-green" : ""
                  }`}
                >
                  {t.name}
                </div>
              ))}
              <div className="shrink-0">
                <Popover
                  content={
                    <div className="w-[400px] font-eurostile">
                      <div className="flex items-center gap-5 px-4 py-2">
                        <div className="text-[20px] font-bold">
                          <span className="text-[20px] font-bold">{count}</span>{" "}
                          Messages
                        </div>
                      </div>
                      {nofiLoading ? (
                        <div
                          className={`h-[300px] w-full flex items-center justify-center`}
                        >
                          <SyncLoader color="#000" size={20} />
                        </div>
                      ) : (
                        <>
                          {notifiList && notifiList.length == 0 ? (
                            <div
                              className={`h-[300px] w-full flex items-center justify-center`}
                            >
                              <NotData size="md" />
                            </div>
                          ) : (
                            <div
                              className="max-h-[400px] overflow-auto show-scroll"
                              ref={myRef}
                              onScroll={handleScroll}
                            >
                              {notifiList.map((t: any, i: number) => (
                                <div
                                  className="mt-2 cursor-pointer hover:bg-green rounded-[10px] py-2 px-4 flex items-center gap-4"
                                  onClick={() => notifyRead(t.id)}
                                  key={i}
                                >
                                  <div
                                    className={`w-2 h-2 bg-[red] ${
                                      t.status == 0 ? "visible" : "invisible"
                                    } rounded-[50%] shrink-0`}
                                  ></div>
                                  <div>
                                    <div className="text-[18px] font-bold">
                                      {t.title}
                                    </div>
                                    <div className="text-[#666666]">
                                      {t.body}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  }
                  title=""
                  trigger="click"
                  placement="bottomRight"
                  open={open}
                  onOpenChange={handleOpenChange}
                >
                  {/* <Image
                                        className="cursor-pointer h-8 mr-8"
                                        src={`${isHaveNotifi ? '/images/common/havenoti.png' : '/images/common/nonoti.png'}`}
                                    /> */}
                  <div className="bg-white border-[2px] p-1 border-[#000] rounded-lg relative">
                    {notifiCount ? (
                      <div className="h-[24px] min-w-[24px] p-1 bg-red absolute top-0 right-0 bg-[#ED3A00] -translate-y-1/2 translate-x-1/2 rounded-full text-[12px] flex items-center justify-center text-[#fff]">
                        {notifiCount}
                      </div>
                    ) : null}
                    <Image
                      src="/images/common/kknoti.png"
                      width="26px"
                      height="26px"
                      alt=""
                    />
                  </div>
                </Popover>
              </div>
              {id && jwt ? (
                <div className="shrink-0">
                  <Popover
                    trigger="click"
                    content={
                      <div className="font-eurostile">
                        <div
                          className="hover:bg-green font-bold px-3 py-2 cursor-pointer rounded-[4px]"
                          onClick={() => {
                            ButtonClickTrace("user-Account");
                            router.push(`/account?userId=${id}`);
                          }}
                        >
                          Account
                        </div>
                        <div
                          className="hover:bg-green font-bold px-3 py-2 cursor-pointer rounded-[4px] flex items-center"
                          onClick={() => router.push(`/earn`)}
                        >
                          Earn
                          <Image
                            width="30px"
                            src="/images/promtpoint.svg"
                            alt=""
                          />
                        </div>
                        <div
                          className="hover:bg-green font-bold px-3 py-2 cursor-pointer rounded-[4px]"
                          onClick={() => doLogout()}
                        >
                          Log out
                        </div>
                      </div>
                    }
                    placement="bottomRight"
                  >
                    <div className="w-10 h-10 cursor-pointer">
                      {image ? (
                        <Image className="rounded-[50%]" src={image} />
                      ) : (
                        <Image
                          className="rounded-[50%]"
                          src="/images/common/head-icon.png"
                        />
                      )}
                    </div>
                  </Popover>
                </div>
              ) : (
                <Button variant="primary" onClick={() => router.push("/login")}>
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
}
