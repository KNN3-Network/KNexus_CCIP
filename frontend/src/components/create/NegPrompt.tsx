import React from "react";

import { Textarea } from "@chakra-ui/react";
import { DesTooltip } from "components/common";

const tip =
  "Detail your subject as much as possible, make sure to include keywords to define the style.";

interface ITextPrompt {
  promptChange(idx: string): void;
  negative_prompt: string;
}

export const NegPrompt = (props: ITextPrompt) => {
  return (
    <div>
      <div className="font-[600] text-[24px] mb-3 flex items-center">
        <div>Negative prompt</div>
        {/* <div className="ml-2"><DesTooltip text={tip} /></div> */}
        <div className="ml-[auto] text-[18px]">
          {props.negative_prompt.length}/1000
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
          value={props.negative_prompt}
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
