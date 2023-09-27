import React, { useEffect, useRef, useState } from "react";

import { CheckOutlined } from "@ant-design/icons";
import { Image } from "@chakra-ui/react";
import { Popover } from "antd";
import { DesTooltip } from "components/common";
import { Tags } from "components/create";
import { styleEnumConfig } from "lib/promptEnum";

const tip =
  "Select the type of image you want to generate, different types may need to increase the prompt for the corresponding type.";

interface ISamp {
  tagsChange(e: string[]): void;
  styleChange(e: string[]): void;
  activeTags: string[];
  activeStyle: string[];
}

export const StyleComps = (props: ISamp) => {
  const { activeTags, activeStyle, styleChange, tagsChange } = props;

  const [styles, setStyles] = useState<any[]>([]);

  useEffect(() => {
    if (activeTags.length > 0) {
      const filterStyle = styleEnumConfig.filter((t: any) => {
        const isSubset = activeTags.every((elem: string) =>
          t.type.includes(elem),
        );
        if (isSubset) return { ...t };
      });
      setStyles(filterStyle);
    } else {
      setStyles(styleEnumConfig);
    }
  }, [activeTags]);

  const changeVisibleTag = (e: string) => {
    if (activeTags.includes(e)) {
      const ts = [...activeTags];
      ts.splice(ts.indexOf(e), 1);
      tagsChange(ts);
    } else {
      tagsChange([...activeTags, e]);
    }
  };

  return (
    <div>
      <div className="font-[600] text-[24px] mb-3 flex items-center">
        <div>Style</div>
        <div className="ml-2">
          <DesTooltip text={tip} />
        </div>
      </div>
      <Tags
        activeComTags={activeTags}
        tagsComChange={(e) => changeVisibleTag(e)}
      />
      <div className="w-full card-grid-column-create-style mt-5">
        {styles.map((t: any, i: number) => (
          <div
            key={i}
            className={`${
              activeStyle.includes(t.label) ? "" : ""
            } box-border rounded-[20px] relative`}
          >
            <Image
              className="w-full h-full rounded-[10px]"
              src={t.activeImg}
              objectFit="cover"
            />
            <div
              onClick={() => styleChange(t)}
              className={`${
                activeStyle.includes(t.label)
                  ? "border-[2px] border-[#000]"
                  : ""
              } rounded-[10px] overflow-hidden cursor-pointer absolute top-0 left-0 h-full w-full flex items-center justify-center text-[#fff] text-[1.1em] font-bold`}
            >
              {activeStyle.includes(t.label) && (
                <Image
                  className="absolute right-[-2px] top-[-2px] w-10"
                  src={"/images/common/style_select.png"}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
