import React from "react";

import { Textarea } from "@chakra-ui/react";
import { DesTooltip } from "components/common";

const tip =
  "Detail your subject as much as possible, make sure to include keywords to define the style.";

interface ITextPrompt {
  promptChange(idx: string): void;
  positive_prompt: string;
}

export const TextPrompt = (props: ITextPrompt) => {
  return (
    <div>
      <div className="font-[600] text-[24px] mb-3 flex items-center">
        <div>Text Prompt</div>
        <div className="ml-2">
          <DesTooltip text={tip} />
        </div>
        <div
          onClick={() =>
            window.open(
              "https://mirror.xyz/knexus.eth/wB8bepkZZVw45iPJnT3_LH6vqyvSizN7dicEOQmDPlw",
              "_blank",
            )
          }
          className={`shrink-0 cursor-pointer mr-4 h-full py-1 text-[16px] rounded-[20px] px-4 bg-green ml-2`}
        >
          Prompt guide
        </div>
        <div className="ml-[auto] text-[18px]">
          {props.positive_prompt.length}/1000
        </div>
      </div>
      <div className="w-full h-[140px] relative">
        <Textarea
          height={"140px"}
          resize="none"
          borderWidth="2px"
          borderColor="#ccc"
          focusBorderColor={"bg.main"}
          onChange={(e: any) => props.promptChange(e.target.value)}
          value={props.positive_prompt}
          placeholder="input"
        />
        <div
          onClick={() => props.promptChange("")}
          className="absolute right-3 bottom-3 text-[rgba(0,0,0,0.5)] cursor-pointer z-10"
        >
          clear
        </div>
      </div>
    </div>
  );
};
