import React, { useEffect, useRef, useState } from "react";

import { useRouter } from "next/router";

import { Button, Input, Textarea, useToast } from "@chakra-ui/react";
import api from "api";
import { BaseModal } from "components/common";
import { useUserInfoStore } from "store/userInfoStore";

interface IHis {
  changeIsPublishGalleryOpen(e: boolean): void;
  isPublishGalleryOpen: boolean;
  request_id: string;
}

export const PublishGalleryModal = (props: IHis) => {
  const router = useRouter();

  const toast = useToast();

  const [pubGalleryNm, setPubGalleryNm] = useState<string>("");

  const [pubDescription, setPubDescription] = useState<string>("");

  const [pubLoading, setPubLoading] = useState<boolean>(false);

  const { changeIsPublishGalleryOpen, isPublishGalleryOpen, request_id } =
    props;

  const { id } = useUserInfoStore();

  const publishGallery = async () => {
    setPubLoading(true);
    let params: any = {
      name: pubGalleryNm,
      description: pubDescription,
      request_id: request_id,
      remark: "",
    };
    if (router.query.id) {
      params.collection_id = router.query.id;
    }
    if (router.query.campaignid) {
      params.campaign_id = router.query.campaignid;
    }
    const res: any = await api.post(`/api/gallery`, {
      ...params,
    });
    if (res) {
      toast({
        title: "Successfully published to Gallery!",
        status: "success",
        variant: "subtle",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      try {
        const res1: any = await api.get(`/api/user/gallery`, {
          params: {
            pageSize: 100,
            pageNumber: 0,
            user_id: id,
          },
        });
        if (res1 && res1.list && res1.list.length > 0) {
          const galleryList: any = res1.list.filter((t: any) => {
            return t.id == res;
          });
          if (galleryList.length > 0) {
            setPubLoading(false);
            if (router.query.campaignid) {
              router.push(`/gallery/?campaignid=${router.query.campaignid}`);
            } else {
              router.push(
                `/gallerydetail/?userId=${id}&gallery_id=${res}&collection_id=${galleryList[0].collection_id}&imgUrl=${galleryList[0].image}`,
              );
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <BaseModal
      isOpen={isPublishGalleryOpen}
      onClose={() => {
        changeIsPublishGalleryOpen(false);
      }}
      size="xl"
      title=""
    >
      <div className=" font-eurostile">
        <div className="flex items-center text-[24px] font-[700] pt-5 mb-3">
          Public to Gallery
        </div>
        <div className="font-bold mb-2 text-[20px] flex items-center justify-between">
          <div>Name</div>
          <div>{pubGalleryNm.length}/50</div>
        </div>
        <div className="mb-4">
          <Input
            focusBorderColor={"bg.main"}
            value={pubGalleryNm}
            onChange={(e: any) => setPubGalleryNm(e.target.value)}
            placeholder="name"
          />
        </div>
        <div className="font-bold mb-2 text-[20px] flex items-center justify-between">
          <div>Description</div>
          {/* <div>{pubComment.length}/50</div> */}
        </div>
        <div className="mb-4">
          <Textarea
            height={"120px"}
            focusBorderColor={"bg.main"}
            onChange={(e: any) => setPubDescription(e.target.value)}
            value={pubDescription}
            resize="none"
            placeholder="input"
          />
        </div>

        <div className="flex items-right justify-end w-[fit-content] mt-4 w-full">
          <Button
            loadingText={"Publish"}
            isLoading={pubLoading}
            variant="primary"
            size="md"
            w="140px"
            onClick={() => {
              publishGallery();
            }}
          >
            Publish
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};
