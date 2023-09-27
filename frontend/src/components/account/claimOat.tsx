import { useState } from "react";

import { SpinnerIcon } from "@chakra-ui/icons";
import {
  Button,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import { claimOat, getBalance } from "lib/contract/claimOat";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useMessageStore = create<{
  message: string;
  setMessage: (message: string) => void;
}>()(
  persist(
    (set) => ({
      message: "",
      setMessage: (message: string) =>
        set({
          message: message,
        }),
    }),
    {
      name: "ccip-contract-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);

const ClaimOatModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [targetChain, setTargetChain] = useState<number>();
  const { message, setMessage } = useMessageStore((state) => ({
    message: state.message,
    setMessage: state.setMessage,
  }));

  const queryClient = useQueryClient();
  const balanceQuery = useQuery("balance", getBalance, {
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const writeContractMutation = useMutation(claimOat, {
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log(data);
      if (data.type == "CCIP") {
        setMessage(data.messageId);
      }
      queryClient.invalidateQueries("balance");
    },
  });

  const submitButtonDisabled =
    !targetChain ||
    !!message ||
    writeContractMutation.isLoading ||
    balanceQuery.isLoading ||
    balanceQuery.data! > 0;

  return (
    <>
      <Button
        color="#D5F95F"
        bg="#000"
        boxShadow="0px 0px 16px 0px rgba(0, 0, 0, 0.25)"
        borderRadius="full"
        _hover={{ background: "rgba(0,0,0,0.5)" }}
        onClick={onOpen}
      >
        Claim your CCIP OAT
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Claim your OAT</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p className="mb-8 text-base font-bold">
              Chainlink's CCIP offers a streamlined cross-chain protocol for
              trust-minimized data and token transfers by smart contract
              developers. KNexus use this technology for convenient cross-chain
              communication.
            </p>
            <Select
              placeholder="Select Target Chain"
              variant="outline"
              onChange={(e) => {
                e.preventDefault();
                setTargetChain(Number(e.target.value));
              }}
            >
              <option value="80001">Polygon Mumbai</option>
              <option value="97">BNB</option>
            </Select>
            {balanceQuery.data && balanceQuery.data > 0 && (
              <div className="flex flex-col gap-2 pt-4">
                <p>Already claimed amount:</p>
                {balanceQuery.data}
              </div>
            )}
            {message && (
              <div className="flex flex-col gap-2 pt-4">
                <p>Already claimed through CCIP:</p>
                <Link
                  href={`https://ccip.chain.link/msg/${message}`}
                  isExternal
                >
                  https://ccip.chain.link/msg/{message}
                </Link>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              isDisabled={submitButtonDisabled}
              onClick={() => {
                writeContractMutation.mutate(targetChain!);
              }}
            >
              Submit
              {writeContractMutation.isLoading && (
                <SpinnerIcon className="ml-2 animate-spin" />
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ClaimOatModal;
