import React, { useEffect, useRef, useState } from "react";

import { Button } from "@chakra-ui/react";
import { createStandaloneToast } from "@chakra-ui/react";
import api from "api";
import { BaseModal } from "components/common";
import useKnexusContract from "contract/useKnexusContract";
import { ButtonClickTrace } from "lib/trace";

const { ToastContainer, toast } = createStandaloneToast();

export type SureSaleModalProps = {
  status?: number;
  price?: any;
  collection_id?: any;
  isOpen: boolean;
  onClose: VoidFunction;
  refreshNft: VoidFunction;
  kind?: number;
  name?: string;
};

export const SureSaleModal: React.FC<SureSaleModalProps> = (props) => {
  const knexusContract = useKnexusContract();

  const {
    status,
    isOpen,
    onClose,
    price,
    collection_id,
    kind,
    refreshNft,
    name,
  } = props;

  const [loading, setLoading] = useState<boolean>(false);

  const operate = async () => {
    setLoading(true);
    const res: any = await api.get(`/api/collections/${props.collection_id}`);
    if (res && res.id) {
      if (res.token_id && res.kind == 1) {
        if (props.status == 0) {
          ButtonClickTrace("unList");
          try {
            const res1 = await knexusContract.unlock(res.token_id);
            accmList("Successfully Unlisted!");
            setLoading(false);
            onClose();
            refreshNft();
          } catch (error) {
            setLoading(false);
            onClose();
          }
        } else {
          ButtonClickTrace("list");
          try {
            const res1 = await knexusContract.lock(res.token_id);
            accmList("Successfully Listed!");
            setLoading(false);
            onClose();
            refreshNft();
          } catch (error) {
            setLoading(false);
            onClose();
          }
        }
      }
      if (res.kind == 2) {
        const res1: any = await api.put(`/api/collections/${res.id}`, {
          status: res.status == 0 ? 1 : 0,
        });
        accmList(`Successfully ${res.status == 0 ? "Listed" : "Unlisted"}!`);
        setLoading(false);
        onClose();
        refreshNft();
      }
    }
  };

  const accmList = (msg: string) => {
    toast({
      title: msg,
      status: "info",
      variant: "subtle",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      // title={status == 1 ? 'Unlist the item' : 'List for sale'}
      title={
        kind == 1
          ? status == 1
            ? "Unlist"
            : "List for sale"
          : status == 1
          ? "Unlist"
          : "List free item"
      }
    >
      <div>
        {kind == 1 ? (
          <>
            {status == 1 ? (
              <p>
                Unlisted items would not appear in the Marketplace. You can
                relist them in the 'Prompts' section of the 'Personnel info'
                page.
              </p>
            ) : (
              <>
                <p>Item Name: {name}</p>
                <p>Price: {price} USDT</p>
              </>
            )}
          </>
        ) : (
          <div>
            {status == 1
              ? "Unlisted items would not appear in the Marketplace. You can relist them in the 'Prompts' section of the 'Personnel info' page."
              : "Click to confirm"}
          </div>
        )}
        <div className="flex ml-[auto] w-[fit-content] mt-8 items-center">
          <div>
            <Button
              loadingText={"Confirm"}
              isLoading={loading}
              variant="primary"
              size="md"
              w="140px"
              onClick={() => operate()}
            >
              <div>
                <span className="mr-1 text-[20px]">Confirm</span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};
