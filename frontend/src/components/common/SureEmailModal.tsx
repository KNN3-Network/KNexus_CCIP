import React, { useEffect, useRef, useState } from "react";

import { Button } from "@chakra-ui/react";
import { createStandaloneToast } from "@chakra-ui/react";
import api from "api";
import { BaseModal } from "components/common";
import useKnexusContract from "contract/useKnexusContract";
import { ButtonClickTrace } from "lib/trace";
import { useWalletStore } from "store/walletStore";

const { ToastContainer, toast } = createStandaloneToast();

export type SureEmailModalProps = {
  email?: string;
  title?: any;
  emailSendTime?: number;
  isLoading?: boolean;
  loginEmail: VoidFunction;
  onClose: VoidFunction;
  isOpen: boolean;
};

let interval: any;

export const SureEmailModal: React.FC<SureEmailModalProps> = (props) => {
  const knexusContract = useKnexusContract();

  const { setJwt } = useWalletStore();

  const {
    email,
    title,
    onClose,
    isOpen,
    loginEmail,
    emailSendTime,
    isLoading,
  } = props;

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title={title} size="xl">
      <div>
        <div className="mb-5">
          We will send a registration verification email to{" "}
          <span className="text-[#0575E6]">{email}</span>, the link will expire
          after 30 mins.{" "}
        </div>
        <div>
          By signing up, you agree to the{" "}
          <span
            className="text-[#0575E6] cursor-pointer"
            onClick={() =>
              window.open("https://knexus.xyz/terms-of-use/", "_blank")
            }
          >
            Terms of Service
          </span>{" "}
          and{" "}
          <span
            className="text-[#0575E6] cursor-pointer"
            onClick={() =>
              window.open("https://knexus.xyz/privacy-policy/", "_blank")
            }
          >
            Privacy Policy
          </span>
        </div>

        <div className="flex ml-[auto] w-[fit-content] mt-8 items-center">
          <div>
            <Button
              loadingText={"Resend"}
              isLoading={isLoading}
              isDisabled={emailSendTime != 0}
              variant="primary"
              size="md"
              w="140px"
              onClick={() => loginEmail()}
            >
              <div>
                <span className="mr-1 text-[16px]">
                  {emailSendTime == 0
                    ? "Resend"
                    : `Email Sent (${emailSendTime})`}
                </span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};
