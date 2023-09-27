import React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { useRouter } from "next/router";

import { Box, Flex, Image, VStack } from "@chakra-ui/react";
import { Dropdown, Empty, Input, MenuProps } from "antd";
import api from "api";
import { NotData } from "components";
import { ButtonClickTrace } from "lib/trace";
import { INftCard } from "lib/types";
import lodash from "lodash";
import { AiFillCloseCircle } from "react-icons/ai";
import { SyncLoader } from "react-spinners";

export function SearchInput() {
  const [inputValue, setInputValue] = useState<string>("");

  const [loading, setLoading] = useState(true);

  const [drapOpen, setDrapOpen] = useState<boolean>(false);

  const router = useRouter();

  const [nftList, setNftList] = useState<INftCard[]>([]);

  const [items, setItems] = useState<MenuProps["items"]>([]);

  const getCollections = async (name: string) => {
    try {
      setLoading(true);
      const res: any = await api.post(`/api/collections`, {
        pageNumber: 0,
        name,
        pageSize: 5,
      });
      if (res.list) {
        setNftList(res.list);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setNftList([]);
    }
  };

  useEffect(() => {
    setDrapOpen(inputValue ? true : false);
  }, [inputValue]);

  const drapChange = (e: any) => {
    if (inputValue) {
      setDrapOpen(e);
    }
  };

  const debouncedChange = useCallback(
    lodash.debounce(async (value) => {
      getCollections(value);
    }, 700),
    [],
  );

  const handleSearch = (value: string) => {
    ButtonClickTrace("global-search");
    setInputValue(value);
    debouncedChange(value);
  };

  useEffect(() => {
    const items: MenuProps["items"] = nftList.map((t) => ({
      label: (
        <Flex
          key={t.id}
          className="items-center py-1 font-eurostile text-[20px]"
          onClick={() => router.push(`nftdetail/${t.id}`)}
        >
          <Image src={t.collection_image} mr="10px" className="w-[56px]" />
          <Box>
            <p
              dangerouslySetInnerHTML={{
                __html: t.name.replaceAll(
                  inputValue,
                  `<span style="color: #0575E6;font-weight: bold">${inputValue}</span>`,
                ),
              }}
            />
            <p className=" text-[14px] text-[#888888]">{t.price}USDT</p>
          </Box>
        </Flex>
      ),
      key: t.id,
    }));
    setItems(items);
  }, [nftList]);

  return (
    <Dropdown
      open={drapOpen}
      onOpenChange={(e: any) => drapChange(e)}
      menu={{ items }}
      dropdownRender={(menu) => (
        <Box className="bg-[#fff] max-h-[460px] overflow-auto border-[2px] border-[#ccc] rounded-[16px] font-eurostile">
          {loading ? (
            <div className="h-[calc(100vh-700px)] w-full flex items-center justify-center">
              <SyncLoader color="#000" size={14} />
            </div>
          ) : (
            <>
              <Box className="text-[20px] font-[600] px-5 pt-2">
                Search Results
              </Box>
              {nftList.length > 0 ? (
                <>
                  {React.cloneElement(menu as React.ReactElement, {
                    style: { backgroundColor: "#fff", boxShadow: "none" },
                  })}
                  <Box
                    className="text-[20px] font-[600] text-[#666666] cursor-pointer px-5 py-2"
                    onClick={() => router.push("/marketplace")}
                  >
                    See More
                  </Box>
                </>
              ) : (
                <NotData />
              )}
            </>
          )}
        </Box>
      )}
    >
      <Input
        size="large"
        allowClear={{
          clearIcon: <AiFillCloseCircle className="text-lg text-black" />,
        }}
        className="w-full"
        style={{
          opacity: 0.6,
          boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.25)",
          backdropFilter: "blur(10px)",
          height: 36,
          minWidth: "120px",
          borderRadius: 18,

          border: "none",
        }}
        value={inputValue}
        onChange={(e: any) => handleSearch(e.target.value)}
        placeholder="Search items,description"
        prefix={
          <Image
            src={`/images/home/search.png`}
            className="h-[16px] w-[16px]"
          />
        }
      />
    </Dropdown>
  );
}
