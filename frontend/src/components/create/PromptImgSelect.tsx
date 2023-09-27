import React from "react";

import { Image } from "@chakra-ui/react";
import { WaterPrint } from "components/common";
import { SyncLoader } from "react-spinners";
import { useUserInfoStore } from "store/userInfoStore";

const tip =
  "Detail your subject as much as possible, make sure to include keywords to define the style.";

interface ITextPrompt {
  imgChoose: any[];
  selectImgUrl: any[];
  loading: boolean;
  default_img?: string;
}

export const PromptImgSelect = (props: ITextPrompt) => {
  const { name, num } = useUserInfoStore();

  const { imgChoose, selectImgUrl, loading, default_img } = props;

  return (
    <>
      {imgChoose.length > 0 || selectImgUrl.length > 0 ? (
        <>
          {selectImgUrl.length > 0 ? (
            <div className="border-green border-[4px] rounded-[20px] overflow-hidden relative">
              <Image className="w-full" src={selectImgUrl[0]["url"]} />
              <WaterPrint userName={name || `User${num}`} />
            </div>
          ) : (
            <div className="border-green border-[4px] rounded-[20px] overflow-hidden relative">
              <Image className="w-full" src={imgChoose[0]["url"]} />
              <WaterPrint userName={name || `User${num}`} />
            </div>
          )}
        </>
      ) : (
        <>
          <div
            className={`${
              loading
                ? "bg-green border-[2px] border-[#000] rounded-[10px] overflow-hidden"
                : ""
            }`}
          >
            {loading ? (
              <div className="h-[30vw] flex items-center justify-center ">
                <SyncLoader color="#000" size={10} />
              </div>
            ) : (
              <div
                className={`border-[#000] border-[2px] rounded-2xl relative overflow-hidden`}
              >
                <Image
                  className={`w-full`}
                  src={default_img || "/images/common/basic-master.png"}
                />
                <Image
                  className="absolute bottom-4 w-[50px] right-4"
                  src="/images/logo-notext.svg"
                />
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};
