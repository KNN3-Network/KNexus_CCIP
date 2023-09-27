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
  changeSeed(e: number): void;
  seed: number;
}

export const Seed = (props: IHis) => {
  const { seed, changeSeed } = props;

  return (
    <div>
      <div className="font-[600] text-[24px] mb-3 flex items-center">
        <div>Seed</div>
        {/* <div className="ml-2"><DesTooltip text={tip} /></div> */}
      </div>
      <div className="flex items-center">
        <div className="w-full">
          <NumberInput
            size="md"
            focusBorderColor={"bg.main"}
            value={seed}
            min={-1}
            max={100000}
            onChange={(e: any) => changeSeed(e)}
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
