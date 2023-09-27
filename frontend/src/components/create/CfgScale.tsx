import React, { useEffect, useRef, useState } from "react";

import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import { DesTooltip } from "components/common";

interface IHis {
  changeCfg_scale(e: number): void;
  cfg_scale: number;
}

const tip =
  "The CFG scale controls the guidance and similarity between the input prompt and the generated image. Higher values produce input-resembling images, while lower values yield creative and abstract results.";

export const CfgScale = (props: IHis) => {
  const { cfg_scale, changeCfg_scale } = props;

  return (
    <div>
      <div className="font-[600] text-[24px] mb-3 flex items-center">
        <div>CFG Scale</div>
        <div className="ml-2">
          <DesTooltip text={tip} />
        </div>
      </div>
      <div className="flex items-center">
        <div className="w-[calc(100%-120px)] mr-5">
          <Slider
            aria-label="slider-ex-1"
            step={1}
            min={5}
            max={15}
            value={cfg_scale}
            onChange={(e: any) => {
              changeCfg_scale(e);
            }}
          >
            <SliderTrack bg={"#000"}>
              <SliderFilledTrack bg={"bg.main"} />
            </SliderTrack>
            <SliderThumb bg={"bg.main"} />
          </Slider>
        </div>
        <div className="w-[100px]">
          <NumberInput
            size="md"
            focusBorderColor={"bg.main"}
            value={cfg_scale}
            min={5}
            max={15}
            onChange={(e: any) => changeCfg_scale(e)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper
                bg="#fff"
                border="none"
                _active={{ bg: "#fff" }}
                fontSize="18px"
                children="+"
              />
              <NumberDecrementStepper
                bg="#fff"
                border="none"
                _active={{ bg: "#fff" }}
                fontSize="18px"
                children="-"
              />
            </NumberInputStepper>
          </NumberInput>
        </div>
      </div>
    </div>
  );
};
