import React, { useEffect, useRef, useState } from "react";

import { Button } from "@chakra-ui/react";
import { BaseModal } from "components/common";

interface IHis {
  onClose(): void;
  isOpen: boolean;
}

export const UploadAgree = (props: IHis) => {
  return (
    <BaseModal
      isOpen={props.isOpen}
      onClose={props.onClose}
      title="Upload Responsibility"
      size="lg"
      maxW="600px"
      hideCloseIcon={true}
      closeOnOverlayClick={true}
    >
      <div className="bg-[#F7F7F7] p-3 max-h-[50vh] overflow-auto">
        <p>
          KNexus supports users in uploading their AI prompts and generated
          content to the platform for sharing with the community and benefiting
          other users. However, we strongly oppose any form of misuse or
          malicious behavior. Please adhere to the following guidelines of
          upload responsibility:
        </p>
        <div className="mt-4">
          <span className="font-bold mr-1">1. Copyright Compliance:</span>
          <span>
            Before uploading any content, please ensure that you possess
            appropriate intellectual property rights or permissions to avoid
            infringing on the copyrights or intellectual property of others. Do
            not upload works that contain third-party content without proper
            authorization.
          </span>
        </div>
        <div className="mt-2">
          <span className="font-bold mr-1">2. No Malicious Appropriation:</span>
          <span>
            It is strictly prohibited to upload someone else's original AI
            prompts or generated content and represent them as your own
            creations. If you use another person's AI prompts, please clearly
            acknowledge and provide proper source attribution.
          </span>
        </div>
        <div className="mt-2">
          <span className="font-bold mr-1">3. Respect Privacy:</span>
          <span>
            Refrain from uploading content that contains personal or sensitive
            information, such as personal identification, addresses, phone
            numbers, or any information that can be used to identify
            individuals.
          </span>
        </div>
        <div className="mt-2">
          <span className="font-bold mr-1">4. Legal and Compliance:</span>
          <span>
            Content that violates laws, contains explicit, offensive,
            discriminatory, or encourages violent or illegal activities is
            prohibited. Please adhere to all applicable laws and regulations as
            well as community guidelines.
          </span>
        </div>
        <div className="mt-2 mb-4">
          <span className="font-bold mr-1">5. Self-Responsibility:</span>
          <span>
            As the uploader, you bear ultimate responsibility for the content
            you upload. Ensure that your works comply with KNexus' usage
            policies and guidelines.
          </span>
        </div>
        <p>
          If you believe that certain uploaded content violates these
          guidelines, please promptly report it to us via{" "}
          <span className="text-[#0575E6]">report@knexus.com</span>. We will
          take appropriate measures to uphold fairness and transparency on the
          platform.
        </p>
      </div>
      <div className="flex justify-end items-center mt-5">
        <Button
          variant="blackPrimary"
          height="40px"
          borderRadius={"20px"}
          size="lg"
          w="100px"
          marginRight="20px"
          className="text-[#D5F95F]"
          onClick={() => {
            props.onClose();
          }}
        >
          Agree
        </Button>
      </div>
    </BaseModal>
  );
};
