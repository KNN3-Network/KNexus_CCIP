import React, { useEffect, useRef, useState } from "react";

import { useRouter } from "next/router";

import { Button } from "@chakra-ui/react";
import { BaseModal, NotData } from "components/common";
import { useEarlyUserStore } from "store/earlyUserStore";
import { useUserInfoStore } from "store/userInfoStore";

interface TooltipProps {
  text: string;
}

export const MainModal = () => {
  const router = useRouter();
  const {
    isEarlyUser,
    setIsEarlyUser,
    isMintSuccess,
    setIsMintSuccess,
    mintId,
    setMintId,
    isBindEmail,
    setIsBindEmail,
  } = useEarlyUserStore();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [isMintSuccessModalOpen, setIsMintSuccessModalOpen] =
    useState<boolean>(false);

  const [isBindEmailOpen, setIsBindEmailOpen] = useState<boolean>(false);

  useEffect(() => {
    if (
      isEarlyUser &&
      router.pathname != "/" &&
      router.pathname != "/verifyemail"
    ) {
      setIsModalOpen(true);
      setIsEarlyUser(false);
    }
  }, [isEarlyUser]);

  useEffect(() => {
    if (isMintSuccess) {
      setIsMintSuccessModalOpen(true);
      setIsMintSuccess(false);
    }
  }, [isMintSuccess]);

  useEffect(() => {
    if (isBindEmail) {
      setIsBindEmailOpen(true);
      setIsBindEmail(false);
    }
  }, [isBindEmail]);

  const { id } = useUserInfoStore();

  return (
    <div>
      <BaseModal
        isOpen={isModalOpen}
        size="xl"
        onClose={() => {
          setIsModalOpen(false);
        }}
      >
        <div>
          <div className="flex items-center justify-center text-[34px] font-[700] pt-5">
            Congratulations!
          </div>
          <div className="flex items-center justify-center text-[20px] my-5">
            You’ve got 200 Prompt Points as an early bird reward.
          </div>
        </div>
      </BaseModal>
      <BaseModal
        isOpen={isMintSuccessModalOpen}
        size="xl"
        onClose={() => {
          setIsMintSuccessModalOpen(false);
        }}
      >
        <div>
          <div className="flex items-center text-[24px] font-[700] pt-5">
            Successful Purchase
          </div>
          <div className="flex items-center text-[16px] my-4">
            Congratulations! You have successfully bought the Generative NFT.
          </div>
          <div className="flex items-right justify-end mt-8 w-full">
            <Button
              variant="primary"
              className="mr-5"
              size="md"
              w="140px"
              onClick={() => {
                router.push(`/account?userId=${id}&activeIndex=${1}`);
                setIsMintSuccessModalOpen(false);
              }}
            >
              View Item
            </Button>
            <Button
              variant="primary"
              size="md"
              w="140px"
              onClick={() => {
                router.push(`/create?id=${mintId}`);
                setIsModalOpen(false);
              }}
            >
              Generate
            </Button>
          </div>
        </div>
      </BaseModal>
      <BaseModal
        isOpen={isBindEmailOpen}
        size="xl"
        onClose={() => {
          setIsBindEmailOpen(false);
        }}
      >
        <div>
          <div className="flex items-center justify-center text-[20px] my-8">
            Please verify your email before proceeding with related operations.
          </div>
          <div className="flex items-right justify-end mt-4 w-full">
            <Button
              variant="primary"
              className="mr-5"
              size="md"
              w="140px"
              onClick={() => {
                setIsBindEmailOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="md"
              w="140px"
              onClick={() => {
                router.push("/verifyemail");
                setIsBindEmailOpen(false);
              }}
            >
              Verify now
            </Button>
          </div>
        </div>
      </BaseModal>
    </div>
  );
};
