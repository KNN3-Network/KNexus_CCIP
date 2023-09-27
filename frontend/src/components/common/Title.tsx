import { useRouter } from "next/router";

import { Image } from "@chakra-ui/react";

export function Title(props: any) {
  const router = useRouter();

  return (
    <div className="w-full flex items-center bg-[#000] h-[80px] text-center rounded-[10px] font-eurostile">
      <div className="mr-[auto] h-full flex-1">
        <Image className="h-full" src="/images/common/bg-l.png" />
      </div>
      <div className="text-[#fff] flex-1 flex flex-col justify-center">
        <div className="text-[32px]">{props.name || "-"}</div>
        <div className="text-[14px]">
          Discover, learn, create, buy & sell Prompt
        </div>
      </div>
      <div className="ml-[auto] h-full flex-1 flex">
        <Image className="h-full ml-[auto]" src="/images/common/bg-r.png" />
      </div>
    </div>
  );
}
