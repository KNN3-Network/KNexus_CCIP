import type React from "react";

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

export type BaseModalProps = {
  isOpen: boolean;
  onClose: VoidFunction;
  isCentered?: boolean;
  children?: React.ReactElement | React.ReactElement[];
  maxW?: number | string;
  title?: string | React.ReactElement;
  size?: string;
  hideCloseIcon?: boolean;
  hideModalBody?: boolean;
  closeOnOverlayClick?: boolean;
};

export const BaseModal: React.FC<BaseModalProps> = (props) => {
  const {
    isOpen,
    onClose,
    maxW,
    children,
    isCentered,
    title,
    size,
    hideCloseIcon,
    hideModalBody,
    closeOnOverlayClick,
  } = props;

  return (
    <Modal
      isOpen={isOpen}
      isCentered={isCentered !== undefined ? isCentered : true}
      motionPreset="slideInBottom"
      onClose={onClose}
      size={size}
      closeOnOverlayClick={!closeOnOverlayClick}
    >
      <ModalOverlay className="backdrop-blur transition" />
      <ModalContent
        maxW={maxW}
        w={"800px"}
        borderRadius="md"
        bg="bg.white"
        color="text.black"
      >
        {title ? (
          <ModalHeader
            maxW="calc(100% - 60px)"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
            fontSize="xl"
            fontWeight="semibold"
            pb={1}
          >
            {title}
          </ModalHeader>
        ) : null}
        {!hideCloseIcon && (
          <ModalCloseButton
            color="text.black"
            borderRadius="0"
            w="20px"
            h="20px"
            fontSize="12px"
          />
        )}
        {hideModalBody ? (
          <div>{children}</div>
        ) : (
          <ModalBody p={6}>{children}</ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
};
