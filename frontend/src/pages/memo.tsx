import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { LeftOutlined } from "@ant-design/icons";
import { Box, Button, Image, Input, useToast } from "@chakra-ui/react";
import { Select, Upload } from "antd";
import api from "api";
import { NextSeo } from "components";
import {
  Header,
  SocialButton,
  UploadAgree,
  WaterPrint,
} from "components/common";
import Campign from "components/common/Campign";
import {
  CfgScale,
  PublishModal,
  Sampler,
  Seed,
  Step,
  Tabs,
  TextPrompt,
} from "components/create";
import { usdtContractAddress } from "config/base";
import { isProduction } from "config/base";
import { config } from "config/walletNet";
import useKnexusContract from "contract/useKnexusContract";
import { ButtonClickTrace } from "lib/trace";
import { SyncLoader } from "react-spinners";
import { useEarlyUserStore } from "store/earlyUserStore";
import { useScrollStore } from "store/scrollStore";
import { useUserInfoStore } from "store/userInfoStore";

const { Dragger } = Upload;

const tabs = ["Prompt Memo"];

const Memo = () => {
  const { coupon, address, name, num } = useUserInfoStore();

  const { setShowScrollModal } = useScrollStore();

  const knexusContract = useKnexusContract();

  const toast = useToast();

  const router = useRouter();

  const { showNotion, setIsShowAgree, isShowAgree } = useEarlyUserStore();

  const [isPublishGalleryOpen, setIsPublishGalleryOpen] =
    useState<boolean>(false);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [activeIdx, setActiveIdx] = useState<number>(0);

  const [positive_prompt, setPositive_prompt] = useState<string>("");

  const [sampling_method, setSampling_method] = useState<string>(
    "DPM++ 2M SDE Karras",
  );

  const [selectImgUrl, setSelectImgUrl] = useState<any>([]);

  const [sampling_steps, setSampling_steps] = useState<number>(30);

  const [cfg_scale, setCfg_scale] = useState<number>(7);

  const [seed, setSeed] = useState<number>(-1);

  const [pubName, setPubName] = useState<string>("");

  const [description, setDescription] = useState<string>("");

  const [design, setDesign] = useState<number>(1);

  const [price, setPrice] = useState<number>(10);

  const [amount, setAmount] = useState<number>(10);

  const [saleLoad, setSaleLoad] = useState<boolean>(false);

  const [uploadModel, setUploadModel] = useState<string>("Midjourney");

  const [version, setVersion] = useState<string>("Midjourney Model V1.0");

  const [checkpoint, setCheckpoint] = useState<string>("");

  const [cusImgUrl, setCusImgUrl] = useState<string>("");

  const [cusLoading, setCusLoading] = useState<boolean>(false);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    setVersion(
      uploadModel == "Stable Diffusion"
        ? "Stable Diffusion V1.5"
        : "Midjourney Model V1.0",
    );
  }, [uploadModel]);

  const uploadFile = (file: any) => {
    if (!isShowAgree) {
      setIsOpen(true);
      return;
    }
    setCusLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    api
      .post("/api/upload", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      })
      .then(
        (res: any) => {
          setCusLoading(false);
          if (res && res.url) {
            setCusImgUrl(res.url);
          }
        },
        (err: any) => {
          setCusLoading(false);
        },
      );
  };

  const launch = async () => {
    if (coupon == 0) {
      setShowScrollModal(true);
      return false;
    }
    // setSaleLoad(true)
    if (design == 3 && !address) {
      if (window.ethereum) {
        toast({
          title: "Please log in with a wallet to sell.",
          status: "info",
          variant: "subtle",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      } else {
        toast({
          title: "You need a web3 wallet to continue.",
          status: "info",
          variant: "subtle",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      }
      return false;
    }
    let res: any;
    let params: any = {
      chain_id:
        design == 3
          ? isProduction
            ? config.chainId
            : config.stagingChainId
          : 0,
      kind: design == 3 ? 1 : 2,
      visibility: design == 1 ? 2 : 1,
      currency: design == 3 ? usdtContractAddress : "",
      name: pubName,
      description,
      amount: design == 3 ? Number(amount) : 0,
      price: design == 3 || design == 2 ? price.toString() : "0",
      collection_image: cusImgUrl,
      positive_prompt: positive_prompt,
      model_type: uploadModel,
      version: version,
    };
    if (uploadModel == "Stable Diffusion") {
      params.sampling_method = sampling_method;
      params.sampling_steps = sampling_steps;
      params.cfg_scale = cfg_scale.toString();
      params.checkpoint = checkpoint;
      params.seed = seed;
    }
    ButtonClickTrace(`create-publish-${tabs[activeIdx]}`);
    try {
      res = await api.post(`/api/collections/custom`, {
        ...params,
      });

      if ((res && typeof res == "string" && design == 1) || design == 2) {
        try {
          const res1: any = await api.get(`/api/collections/${res}`);
          if (res1 && res1.id) {
            router.push(`/nftdetail/${res}?imgUrl=${res1.collection_image}`);
            setSaleLoad(false);
          }
        } catch (error) {
          console.log(error);
        }
      }
      if (res && typeof res == "string" && design == 3) {
        uploadJsonFile(res);
      }
    } catch (error) {
      setSaleLoad(false);
      console.log("launch-error", error);
    }
  };

  const uploadJsonFile = async (launchId: string) => {
    let obj = {
      name: pubName,
      image: selectImgUrl[0]["url"],
    };
    let content = JSON.stringify(obj);
    const fileData = new Blob([content], { type: "text/plain" });
    const file = new File([fileData], `${launchId}_${Date.now()}.json`, {
      type: "text/plain",
    });
    const formData = new FormData();
    formData.append("file", file);
    await api
      .post("/api/upload", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      })
      .then(
        (res: any) => {
          if (res && res.url) {
            mint(launchId, res.url);
          }
        },
        (err: any) => {
          console.log("upLoadJson-error", err);
        },
      );
  };

  const mint = async (launchId: string, fileUrl: string) => {
    try {
      const res: any = await knexusContract.mint(
        fileUrl,
        price,
        amount,
        launchId,
      );
      setSaleLoad(false);
      if (res && res.status) {
        try {
          const res1: any = await api.get(`/api/collections/${launchId}`);
          if (res1 && res1.id) {
            router.push(
              `/nftdetail/${launchId}?imgUrl=${res1.collection_image}`,
            );
            setSaleLoad(false);
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      setSaleLoad(false);
      console.log("error", error);
    }
  };

  return (
    <>
      <NextSeo title="Memo | KNexus" />
      <div className="flex flex-col h-screen bg-[url('/images/bg.png')] bg-cover font-eurostile">
        <div className="w-full flex flex-col" style={{ zIndex: 11 }}>
          <Campign />
          <Box
            backdropFilter="blur(100px)"
            w="calc(100% - 80px)"
            m="0 auto"
            mt="10px"
            borderRadius="full"
            overflow="hidden"
            background="rgba(255, 255, 255, 0.20)"
            boxShadow="0px 0px 10px 0px rgba(0, 0, 0, 0.20)"
          >
            <Header />
          </Box>
        </div>
        <SocialButton />
        <PublishModal
          showTag={false}
          isModalOpen={isModalOpen}
          changeModal={(e: boolean) => setIsModalOpen(e)}
          pubName={pubName}
          changePubName={(e: string) => setPubName(e)}
          description={description}
          changeDescription={(e: string) => setDescription(e)}
          launchTags={[]}
          clearLanuchTags={() => {}}
          changeLanuchTags={(e: string) => {}}
          design={design}
          changeDesign={(e: number) => setDesign(e)}
          amount={amount}
          changeAmount={(e: number) => setAmount(e)}
          price={price}
          changePrice={(e: number) => setPrice(e)}
          saleLoad={saleLoad}
          nextClick={() => launch()}
        />
        <UploadAgree
          isOpen={isOpen}
          onClose={() => {
            setIsShowAgree(true);
            setIsOpen(false);
          }}
        />
        <div
          className={`${
            showNotion ? "h-[calc(100vh-114px)]" : "h-[calc(100vh-74px)]"
          } overflow-auto`}
        >
          <div className="w-[90%] mx-[auto] mt-10 mb-5">
            <div className="flex justify-between gap-20">
              <div className="w-[60%] shrink-0 flex">
                <div
                  className="w-[40px] h-[40px] bg-[#fff] cursor-pointer flex items-center 
                                justify-center rounded-md border-[2px] border-[rgba(0,0,0,0.1)] mr-5 hover:opacity-70 
                                sticky top-[10px] z-10 "
                  style={{ boxShadow: "0 0 5px 0 rgba(0,0,0,0.2)" }}
                  onClick={() => router.push("/create")}
                >
                  <LeftOutlined style={{ fontSize: "20px" }} />
                </div>
                <div
                  className="w-[calc(100%-80px)] rounded-[20px] px-10 py-5 border-[2px] border-[rgba(0,0,0,0.1)] bg-[#FFFFFB]"
                  style={{ boxShadow: "0 0 10px 0 rgba(0,0,0,0.2)" }}
                >
                  <div className="mb-8 sticky top-0 z-10 ">
                    <Tabs
                      tabs={tabs}
                      activeIdx={activeIdx}
                      tabChange={(idx) => setActiveIdx(idx)}
                    />
                  </div>
                  <div className="mb-8">
                    <TextPrompt
                      positive_prompt={positive_prompt}
                      promptChange={(str) => setPositive_prompt(str)}
                    />
                  </div>
                  <div className="mb-8">
                    <div className="font-[600] text-[24px] mb-3 flex items-center">
                      <div>Model</div>
                      {/* <div className="ml-2"><DesTooltip text={tooltipDesInfo.mode} /></div> */}
                    </div>
                    <div>
                      <Select
                        size="large"
                        style={{ width: "100%" }}
                        value={uploadModel}
                        onChange={(e: any) => setUploadModel(e)}
                        options={[
                          {
                            value: "Stable Diffusion",
                            label: "Stable Diffusion",
                            className: "font-eurostile text-[20px]",
                          },
                          {
                            value: "Midjourney",
                            label: "Midjourney",
                            className: "font-eurostile text-[20px]",
                          },
                        ]}
                      />
                    </div>
                  </div>
                  <div className="mb-8">
                    <div className="font-[600] text-[24px] mb-3 flex items-center">
                      <div>Vision</div>
                      {/* <div className="ml-2"><DesTooltip text={tooltipDesInfo.mode} /></div> */}
                    </div>
                    <div>
                      <Select
                        size="large"
                        style={{ width: "100%" }}
                        value={version}
                        onChange={(e: any) => setVersion(e)}
                        options={
                          uploadModel == "Stable Diffusion"
                            ? [
                                {
                                  value: "Stable Diffusion V1.5",
                                  label: "Stable Diffusion V1.5",
                                  className: "font-eurostile text-[20px]",
                                },
                                {
                                  value: "Stable Diffusion V2.1",
                                  label: "Stable Diffusion V2.1",
                                  className: "font-eurostile text-[20px]",
                                },
                              ]
                            : [
                                {
                                  value: "Midjourney Model V1.0",
                                  label: "Midjourney Model V1.0",
                                  className: "font-eurostile text-[20px]",
                                },
                                {
                                  value: "Midjourney Model V2.0",
                                  label: "Midjourney Model V2.0",
                                  className: "font-eurostile text-[20px]",
                                },
                                {
                                  value: "Midjourney Model V3.0",
                                  label: "Midjourney Model V3.0",
                                  className: "font-eurostile text-[20px]",
                                },
                                {
                                  value: "Midjourney Model V4.0",
                                  label: "Midjourney Model V4.0",
                                  className: "font-eurostile text-[20px]",
                                },
                                {
                                  value: "Midjourney Model V5.0",
                                  label: "Midjourney Model V5.0",
                                  className: "font-eurostile text-[20px]",
                                },
                                {
                                  value: "Midjourney Model V5.1",
                                  label: "Midjourney Model V5.1",
                                  className: "font-eurostile text-[20px]",
                                },
                                {
                                  value: "Midjourney Model V5.2",
                                  label: "Midjourney Model V5.2",
                                  className: "font-eurostile text-[20px]",
                                },
                                {
                                  value: "Niji Model V5",
                                  label: "Niji Model V5",
                                  className: "font-eurostile text-[20px]",
                                },
                              ]
                        }
                      />
                    </div>
                  </div>
                  {uploadModel == "Stable Diffusion" && (
                    <>
                      <div className="mb-8">
                        <div className="font-[600] text-[24px] mb-3 flex items-center">
                          <div>Checkpoint (Optional)</div>
                          {/* <div className="ml-2"><DesTooltip text={tooltipDesInfo.mode} /></div> */}
                        </div>
                        <div>
                          <Input
                            focusBorderColor={"bg.main"}
                            value={checkpoint}
                            onChange={(e: any) => setCheckpoint(e.target.value)}
                            placeholder="input"
                          />
                        </div>
                      </div>
                      <div className="mb-8">
                        <Sampler
                          sampling_method={sampling_method}
                          sampChange={(str) => setSampling_method(str)}
                        />
                      </div>
                      <div className="mb-8">
                        <Step
                          sampling_steps={sampling_steps}
                          changeSampling_steps={(e: number) =>
                            setSampling_steps(e)
                          }
                        />
                      </div>
                      <div className="mb-8">
                        <CfgScale
                          cfg_scale={cfg_scale}
                          changeCfg_scale={(e: number) => setCfg_scale(e)}
                        />
                      </div>
                      <div className="mb-8">
                        <Seed
                          seed={seed}
                          changeSeed={(e: number) => setSeed(e)}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div
                className="w-[calc(40%-80px)] shrink-0 mb-8"
                onContextMenu={(e: any) => e.preventDefault()}
              >
                <div className="mb-8">
                  {cusImgUrl ? (
                    <div className="relative w-[fit-content]">
                      <Image src={cusImgUrl} />
                      <Image
                        className="right-5 top-5 absolute h-10 w-10 cursor-pointer hover:opacity-70"
                        onClick={() => setCusImgUrl("")}
                        src="/images/common/delete-img.png"
                      />
                      <WaterPrint userName={name || `User${num}`} />
                    </div>
                  ) : (
                    <>
                      {cusLoading ? (
                        <div className="w-full h-[25vw] flex items-center justify-center">
                          <SyncLoader color="#000" size={10} />
                        </div>
                      ) : (
                        <Dragger
                          className="creat-upload"
                          maxCount={1}
                          fileList={[]}
                          customRequest={(e: any) => uploadFile(e.file)}
                          accept=".jpg, .jpeg, .png"
                        >
                          <div className="h-[25vw] flex items-center justify-center">
                            <div>
                              <div className="mx-[auto] w-[fit-content]">
                                <Image src="/images/common/upload.png" />
                              </div>
                              <div className="font-eurostile">
                                <span className="text-[#2B6CB0] font-[600]">
                                  Click to upload
                                </span>
                                <span> or drag and drop</span>
                              </div>
                              <div className="mb-4 font-eurostile">
                                PNG, JPG up to 2MB
                              </div>
                            </div>
                          </div>
                        </Dragger>
                      )}
                    </>
                  )}
                </div>
                <div className="flex justify-center mb-5 items-center">
                  <Button
                    variant="blackPrimary"
                    height="40px"
                    isDisabled={!cusImgUrl || !positive_prompt}
                    borderRadius={"20px"}
                    size="lg"
                    w="100px"
                    marginRight="20px"
                    className="text-[#D5F95F]"
                    onClick={() => {
                      ButtonClickTrace(`create-next-${tabs[activeIdx]}`);
                      if (
                        router.query &&
                        router.query.kind &&
                        router.query.kind == "gallery"
                      ) {
                        setIsPublishGalleryOpen(true);
                      } else {
                        setIsModalOpen(true);
                      }
                    }}
                  >
                    Publish
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Memo;
