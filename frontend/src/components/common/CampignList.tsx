import React, { useCallback, useEffect, useState } from "react";

import router from "next/router";

import { Image } from "@chakra-ui/react";
import api from "api";

interface ICam {
  campainChange(e: any): void;
}

export const CampignList = (props: ICam) => {
  const [list, setList] = useState<any>([]);

  useEffect(() => {
    getCampain();
  }, []);

  const getCampain = async () => {
    try {
      const res: any = await api.get(`/api/campaign`);
      if (res) {
        setList(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toPage = (t: any) => {
    props.campainChange(t);
  };

  return (
    <div className={`w-full h-[fit-content] card-grid-column`}>
      {list.map((t: any, i: number) => (
        <div
          key={i}
          onClick={() => toPage(t)}
          className="group relative flex flex-col h-full font-eurostile rounded-[14px] cursor-pointer overflow-hidden"
          style={{
            boxShadow: "0px 6px 16px 2px rgba(0, 0, 0, 0.20)",
          }}
        >
          <div className="w-full h-full rounded-t-[10px] relative flex flex-col items-center justify-center overflow-hidden">
            <div className="bg-cover hover:scale-110 transition-all flex justify-center items-center w-full h-full">
              <Image
                className="cursor-pointer hover:scale-110 transition-all w-full h-[150px]"
                src={t.image}
                objectFit="cover"
              />
            </div>
          </div>
          <div className="h-10 text-[16px] pl-5">{t.name}</div>
        </div>
      ))}
    </div>
  );
};
