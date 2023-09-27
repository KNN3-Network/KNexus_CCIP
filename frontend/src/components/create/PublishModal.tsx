import React, { useEffect, useRef, useState } from "react";

import { LeftOutlined, UndoOutlined } from "@ant-design/icons";
import {
  Button,
  Select as ChakraSelect,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Textarea,
} from "@chakra-ui/react";
import { Select } from "antd";
import api from "api";
import { BaseModal } from "components/common";
import { Tags } from "components/create";

interface IHis {
  changeModal(e: boolean): void;
  isModalOpen: boolean;
  pubName: string;
  changePubName(e: string): void;
  description: string;
  changeDescription(e: string): void;
  launchTags: string[];
  clearLanuchTags(): void;
  changeLanuchTags(e: string): void;
  design: number;
  changeDesign(e: number): void;
  amount: number;
  changeAmount(e: any): void;
  price: number;
  changePrice(e: number): void;
  nextClick(): void;
  saleLoad: boolean;
  showTag?: boolean;
}

export const PublishModal = (props: IHis) => {
  const {
    changeModal,
    isModalOpen,
    pubName,
    changePubName,
    description,
    changeDescription,
    launchTags,
    changeLanuchTags,
    design,
    changeDesign,
    amount,
    changeAmount,
    clearLanuchTags,
    price,
    changePrice,
    saleLoad,
    nextClick,
    showTag,
  } = props;

  const getDescription = async () => {
    try {
      const res: any = await api.get(`/api/collections/help/ai2Description`);
      if (res && res.content) {
        changeDescription(res.content);
      } else {
        changeDescription("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BaseModal
      isOpen={isModalOpen}
      onClose={() => {
        changeModal(false);
      }}
      size="xl"
      title=""
    >
      <div className=" font-eurostile">
        <div className="font-bold mb-2 text-[20px] mt-5">Publish</div>
        <div className="font-bold mb-2 text-[20px] flex items-center justify-between">
          <div>Name</div>
          <div>{pubName.length}/50</div>
        </div>
        <div className="mb-4">
          <Input
            focusBorderColor={"bg.main"}
            value={pubName}
            onChange={(e: any) => changePubName(e.target.value)}
            placeholder="input"
          />
        </div>
        <div className="font-bold mb-2 text-[20px] flex items-center justify-between">
          <div>
            Description
            <span
              className="text-[#005DFF] cursor-pointer ml-4 text-[16px]"
              onClick={() => getDescription()}
            >
              Help Me Out
            </span>
          </div>
          <div>{description.length}/300</div>
        </div>
        <div className="w-full h-[120px] relative mb-4">
          <Textarea
            height={"120px"}
            focusBorderColor={"bg.main"}
            onChange={(e: any) => changeDescription(e.target.value)}
            value={description}
            resize="none"
            placeholder="input"
          />
          <div
            onClick={() => changeDescription("")}
            className="absolute right-3 bottom-3 text-[rgba(0,0,0,0.5)] cursor-pointer"
          >
            clear
          </div>
        </div>
        {showTag && (
          <div className="w-full mb-4">
            <div className="font-bold mb-2 text-[20px] flex items-center">
              <div className="mr-4">Tag</div>
              <UndoOutlined
                style={{
                  fontSize: "20px",
                  color: "#005DFF",
                  cursor: "pointer",
                }}
                onClick={() => clearLanuchTags()}
              />
            </div>
            <Tags
              activeComTags={launchTags || []}
              tagsComChange={(e) => changeLanuchTags(e)}
            />
          </div>
        )}
        <div className="font-bold mb-2 text-[20px]">Pattern</div>
        <div className="mb-4">
          <Select
            size="large"
            style={{ width: "100%" }}
            value={design}
            onChange={(e) => changeDesign(e)}
            options={[
              {
                value: 1,
                label: "Free, open to your followers only.",
                className: "font-eurostile text-[20px]",
              },
              {
                value: 2,
                label: "Payment, using Prompt Points.",
                className: "font-eurostile text-[20px]",
              },
              {
                value: 3,
                label: "Payment, crafted as a Prompt NFT.",
                className: "font-eurostile text-[20px]",
              },
            ]}
          />
        </div>
        {design == 3 && (
          <div>
            <div className="font-bold mb-2 text-[20px]">Target Chain</div>
            <ChakraSelect placeholder="Select chain">
              <option value="polygon">Polygon</option>
              <option value="bnb">BNB</option>
            </ChakraSelect>
            <div className="font-bold mb-2 text-[20px]">Amount</div>
            <div className="mb-4">
              <NumberInput
                focusBorderColor={"bg.main"}
                size="md"
                value={amount}
                min={1}
                max={1000}
                onChange={(e: any) => changeAmount(e)}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper
                    bg="#fff"
                    border="none"
                    _active={{ bg: "#fff" }}
                    children="+"
                  />
                  <NumberDecrementStepper
                    bg="#fff"
                    border="none"
                    _active={{ bg: "#fff" }}
                    children="-"
                  />
                </NumberInputStepper>
              </NumberInput>
            </div>
          </div>
        )}
        {design !== 1 && (
          <div>
            <div className="font-bold mb-2 text-[20px]">Price</div>
            <div>
              <Input
                type="number"
                focusBorderColor={"bg.main"}
                value={price}
                onChange={(e: any) =>
                  e.target.value < 0
                    ? changePrice(0)
                    : changePrice(e.target.value)
                }
                placeholder="input"
              />
            </div>
          </div>
        )}
        <div className="flex ml-[auto] w-[fit-content] mt-8 items-center">
          {design == 3 && (
            <div className="mr-4 text-center">
              <div className="font-bold">{price} USDT</div>
            </div>
          )}
          <div>
            <Button
              variant="primary"
              loadingText={"Confirm"}
              isLoading={saleLoad}
              size="md"
              w="140px"
              onClick={() => nextClick()}
              isDisabled={!pubName || !description}
            >
              <div>
                <span className="mr-1 text-[20px]">Confirm</span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};
