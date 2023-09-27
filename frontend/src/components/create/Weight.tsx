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
  Textarea,
} from "@chakra-ui/react";
import { Upload } from "antd";
import api from "api";
import { DesTooltip } from "components/common";

const tip =
  "Weight controls how much the control map is followed relative to the image prompt.";

interface IWeight {
  weightChange(idx: number): void;
  weight: number;
}

export const Weight = (props: IWeight) => {
  const { weight, weightChange } = props;

  return (
    <>
      <div className="font-[600] text-[24px] mb-3 flex items-center">
        <div>Weight</div>
        <div className="ml-2">
          <DesTooltip text={tip} />
        </div>
      </div>
      <div className="flex items-center">
        <div className="w-[calc(100%-120px)] mr-5">
          <Slider
            aria-label="slider-ex-1"
            step={1}
            value={Math.round((weight / 2) * 100)}
            onChange={(e: any) =>
              weightChange(
                Math.floor(Math.ceil(((e / 100) * 2) / 0.05) * 0.05 * 100) /
                  100,
              )
            }
          >
            <SliderTrack bg={"#000"}>
              <SliderFilledTrack bg={"bg.main"} />
            </SliderTrack>
            <SliderThumb bg={"bg.main"} />
          </Slider>
        </div>
        <div className="w-[100px]">
          <NumberInput
            focusBorderColor={"bg.main"}
            size="md"
            step={0.05}
            value={weight}
            min={0}
            max={2}
            onChange={(e: any) => weightChange(e)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper
                bg="#fff"
                border="none"
                fontSize="18px"
                _active={{ bg: "#fff" }}
                children="+"
              />
              <NumberDecrementStepper
                bg="#fff"
                border="none"
                fontSize="18px"
                _active={{ bg: "#fff" }}
                children="-"
              />
            </NumberInputStepper>
          </NumberInput>
        </div>
      </div>
    </>
  );
};
