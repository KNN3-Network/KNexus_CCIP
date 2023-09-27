import React from "react";

import { DesTooltip } from "components/common";

const tip = "The proportional dimensions (height and width) of an image.";

interface ISamp {
  sizeChange(e: string): void;
  sizeConfig: string[];
  actSize: string;
}

export const Size = (props: ISamp) => {
  const { sizeChange, sizeConfig, actSize } = props;

  return (
    <>
      <div className="font-[600] text-[24px] mb-3 flex items-center">
        <div>Size</div>
        <div className="ml-2">
          <DesTooltip text={tip} />
        </div>
      </div>
      <div className="overflow-hidden">
        {sizeConfig.map((t: any, i: number) => (
          <div
            key={i}
            onClick={() => sizeChange(sizeConfig[i])}
            className={`cursor-pointer mr-5 mb-5 border-[2px] border-[#ccc] float-left h-[100px] w-[100px] rounded-[10px] ${
              actSize == props.sizeConfig[i] ? "bg-[#000]" : "bg-[#D5F95F]"
            }`}
          >
            <div className="flex items-center justify-center h-[70px]">
              <div
                className={`w-[50px] ${
                  i == 0 ? "h-[50px]" : i == 1 ? "h-[37px]" : "h-[28px]"
                } ${
                  actSize == props.sizeConfig[i] ? "bg-[#D5F95F]" : "bg-[#000]"
                }`}
              ></div>
            </div>
            <div
              className={` ${
                actSize == sizeConfig[i] ? "text-[#D5F95F]" : "text-[#000]"
              } flex justify-center h-[30px] font-[600]`}
            >
              {t}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
