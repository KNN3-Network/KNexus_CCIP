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
  changeSampling_steps(e: number): void;
  sampling_steps: number;
}

const tip =
  "Sampling steps refer to the iterations from random noise to a recognizable image based on the text prompt. Higher sampling steps add more detail to your image, but come with longer processing time.";

export const Step = (props: IHis) => {
  const { sampling_steps, changeSampling_steps } = props;

  return (
    <div>
      <div className="font-[600] text-[24px] mb-3 flex items-center">
        <div>Steps</div>
        <div className="ml-2">
          <DesTooltip text={tip} />
        </div>
      </div>
      <div className="flex items-center">
        <div className="w-[calc(100%-120px)] mr-5">
          <Slider
            aria-label="slider-ex-1"
            step={1}
            min={20}
            max={70}
            value={sampling_steps}
            onChange={(e: any) => {
              changeSampling_steps(e);
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
            value={sampling_steps}
            min={20}
            max={70}
            onChange={(e: any) => changeSampling_steps(e)}
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
