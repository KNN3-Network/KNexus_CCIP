import React, { useEffect, useRef, useState } from "react";

import { CheckOutlined } from "@ant-design/icons";
import { Image } from "@chakra-ui/react";
import { Popover } from "antd";
import { DesTooltip } from "components/common";
import { styleEnumConfig } from "lib/promptEnum";

const tip =
  "Select the type of image you want to generate, different types may need to increase the prompt for the corresponding type.";

interface ITags {
  tagsComChange(e: string): void;
  activeComTags: string[];
}

export const Tags = (props: ITags) => {
  const { tagsComChange, activeComTags } = props;

  const [visibleTags, setVisibelTags] = useState<string[]>([
    "Anime",
    "Chinese",
    "SDXL",
    "Portrait",
    "Realistic",
  ]);

  const [inVisibleTags, setInVisibleTags] = useState<string[]>([
    "Girl",
    "2D",
    "2.5D",
    "3D",
    "Space",
    "Landscape",
    "Art",
    "General",
    "Architecture",
    "Mecha",
    "Robot",
    "Chibi",
    "Cartoon",
    "Cute",
    "Disney",
    "Pixar",
    "Niji",
  ]);

  const [actInvisibleTags, setActInvisibleTags] = useState<string[]>([]);

  const changeVisibleTag = (e: string) => {
    tagsComChange(e);
  };

  const changeInvisibleTag = (e: string) => {
    if (actInvisibleTags.includes(e)) {
      setActInvisibleTags((prev: string[]) => {
        prev.splice(prev.indexOf(e), 1);
        return [...prev];
      });
      setVisibelTags((prev: string[]) => {
        prev.splice(prev.indexOf(e), 1);
        return [...prev];
      });
    } else {
      setActInvisibleTags((prev: string[]) => {
        prev.push(e);
        return [...prev];
      });
      setVisibelTags((prev: string[]) => {
        prev.push(e);
        return [...prev];
      });
    }
  };

  return (
    <div className="w-full overflow-hidden">
      {visibleTags.map((t, i) => (
        <>
          <div
            key={i}
            onClick={() => changeVisibleTag(t)}
            className={`mb-2 border-[2px] float-left mr-3 rounded-[20px] py-1 px-3 
                            text-[14px] text-center bg-[#000] text-[#ccc] cursor-pointer hover:opacity-70
                            ${
                              activeComTags.includes(t)
                                ? "border-[#D5F95F]"
                                : "border-[#000]"
                            }`}
          >
            {t}
          </div>
        </>
      ))}
      <div>
        <Popover
          placement="top"
          title={""}
          content={
            <div className="h-[200px] overflow-auto font-eurostile pr-5">
              {inVisibleTags.map((t, i) => (
                <div
                  key={i}
                  className="flex items-center cursor-pointer hover:opacity-70"
                  onClick={() => {
                    changeInvisibleTag(t);
                  }}
                >
                  <div className="mr-2 flex items-center w-5">
                    {actInvisibleTags.includes(t) && <CheckOutlined />}
                  </div>
                  <div>{t}</div>
                </div>
              ))}
            </div>
          }
          trigger="hover"
        >
          <div className="border-[#000] border-[2px] mb-2 float-left mr-5 rounded-[20px] py-1 px-3 text-[14px] text-center bg-[#000] text-[#ccc] cursor-pointer hover:opacity-70">
            More
          </div>
        </Popover>
      </div>
    </div>
  );
};
