import { useRouter } from "next/router";

import { Image } from "@chakra-ui/react";

export function WaterPrint(props: any) {
  const { userName } = props;

  return (
    <div className="absolute bottom-3 h-[30] w-full text-[rgba(255,255,255,0.3)] flex justify-between items-end">
      <div className="ml-4">@{userName}</div>
      <div>
        <Image
          className="cursor-pointer"
          src="/images/home/logo.png"
          height="30px"
          mr="12px"
        />
      </div>
    </div>
  );
}
