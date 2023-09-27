import React from "react";

import { Button, Image } from "@chakra-ui/react";
import { BaseModal } from "components/common";
import { useScrollStore } from "store/scrollStore";

export const NoScrollModal = () => {
  const { showScrollModal, setShowScrollModal } = useScrollStore();

  return (
    <BaseModal
      isOpen={showScrollModal}
      onClose={() => setShowScrollModal(false)}
      isCentered={true}
    >
      <div className="text-center font-eurostile text-[18px] font-[600] pt-5">
        <div>the scroll has been depleted. </div>
        <div>Please earn more scrolls before use. </div>
        <div>Join our Discord community for more information.</div>
        <div className="flex items-center justify-center w-full mt-8">
          <Image
            className="w-10 h-10 cursor-pointer"
            src={"/images/social/icon2.svg"}
            onClick={() => window.open("https://discord.gg/CxFYKpz5cF")}
            alt=""
          />
        </div>
      </div>
    </BaseModal>
  );
};
