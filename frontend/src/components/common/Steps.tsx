import { useRouter } from "next/router";

import { Image } from "@chakra-ui/react";

export function Steps(props: any) {
  const { step } = props;
  return (
    <div className="w-full bg-[#000] h-[80px] text-center rounded-[10px] font-eurostile px-20 text-[#fff]">
      <div className="w-[80%] mx-[auto] h-full flex items-center">
        <div className="flex items-center w-[150px]">
          <div className="flex items-center justify-center h-10 w-10 rounded-[50%] border-[2px] border-green text-[22px] font-bold mr-4">
            1
          </div>
          <div className=" text-[22px]">Create</div>
        </div>
        <div
          className={`h-1 w-[calc(50%-217px)] ${
            step == 1 ? "bg-[#404b1c]" : "bg-green"
          } mr-2`}
        ></div>
        <div className="flex items-center w-[130px]">
          <div
            className={`flex items-center justify-center ${
              step == 1 ? "border-[#404b1c] text-[#4C4C4C]" : " border-green"
            } h-10 w-10 rounded-[50%] border-[2px] text-[22px] font-bold mr-4`}
          >
            2
          </div>
          <div className={`${step == 1 ? "text-[#4C4C4C]" : ""} text-[22px]`}>
            Next
          </div>
        </div>
        <div className="h-1 w-[calc(50%-217px)] bg-[#404b1c] mr-2"></div>
        <div className="flex items-center w-[150px]">
          <div className="flex items-center justify-center h-10 w-10 rounded-[50%] border-[2px] border-[#404b1c] text-[#4C4C4C] text-[22px] font-bold mr-4">
            3
          </div>
          <div className=" text-[22px] text-[#4C4C4C]">Sell</div>
        </div>
      </div>
    </div>
  );
}
