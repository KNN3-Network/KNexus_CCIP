import React from "react";

import { Cascader } from "antd";
import { DesTooltip } from "components/common";
import { preprocessorEnumConfig } from "lib/promptEnum";

const tip = "Select how you want the prompt image information to be handled.";

interface ITextPrompt {
  cascaderChange(e: any, opt: any): void;
  preprocessor: string[];
}

export const Preprocessor = (props: ITextPrompt) => {
  const { preprocessor, cascaderChange } = props;

  return (
    <>
      <div className="font-[600] text-[24px] mb-3 flex items-center">
        <div>Preprocessor</div>
        <div className="ml-2">
          <DesTooltip text={tip} />
        </div>
      </div>
      <div>
        <Cascader
          size="large"
          onChange={(e: any, opt: any) => cascaderChange(e, opt)}
          value={preprocessor}
          popupClassName={"create-cascader"}
          options={preprocessorEnumConfig}
          placeholder="Please select"
          style={{ width: "100%" }}
        />
      </div>
    </>
  );
};
