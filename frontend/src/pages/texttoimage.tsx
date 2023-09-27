import { useContext } from "react";
import React, { useEffect, useRef, useState } from "react";

import { useRouter } from "next/router";

import { LeftOutlined } from "@ant-design/icons";
import { Box, Button, Switch, useToast } from "@chakra-ui/react";
import { Cascader, Radio, Select, Upload } from "antd";
import api from "api";
import { NextSeo } from "components";
import {
  DesTooltip,
  Header,
  NoScrollModal,
  SocialButton,
  Steps,
  WaterPrint,
} from "components/common";
import Campign from "components/common/Campign";
import {
  HistoryImg,
  ImgPromptUpload,
  NegPrompt,
  Preprocessor,
  PromptImgChoose,
  PromptImgSelect,
  PublishGalleryModal,
  PublishModal,
  Sampler,
  Size,
  StyleComps,
  Tabs,
  TextPrompt,
  Weight,
} from "components/create";
import { usdtContractAddress } from "config/base";
import { isProduction, siteName } from "config/base";
import { config } from "config/walletNet";
import useKnexusContract from "contract/useKnexusContract";
import useWeb3Context from "hooks/useWeb3Context";
import { getPreprocessorByValue, styleEnumConfig } from "lib/promptEnum";
import { ButtonClickTrace, ButtonSelectTrace } from "lib/trace";
import lodash from "lodash";
import { SyncLoader } from "react-spinners";
import { useEarlyUserStore } from "store/earlyUserStore";
import { useScrollStore } from "store/scrollStore";
import { useUserInfoStore } from "store/userInfoStore";

const { Dragger } = Upload;

const tooltipDesInfo = {
  controlnet:
    "An Image Prompt is a guiding image used in image generation tasks, providing stylistic direction that influences the attributes of the produced image.",
};

const tabs = ["Basic", "Master"];

const samplerConfigs = [
  "Euler",
  "Euler a",
  "LMS",
  "DPM++ 2S a",
  "DPM++ 2M",
  "DPM++ SDE",
  "DPM++ 2M SDE",
  "DPM fast",
  "DPM++ 2M Karras",
  "DPM++ SDE Karras",
  "DPM++ 2M SDE Karras",
  "DDIM",
  "PLMS",
  "UniPC",
];

const Texttoimage = () => {
  const { coupon, address, id, setUserStoreInfo } = useUserInfoStore();

  const { showScrollModal, setShowScrollModal } = useScrollStore();

  const knexusContract = useKnexusContract();

  const toast = useToast();

  const router = useRouter();

  const { showNotion } = useEarlyUserStore();

  const [isPublishGalleryOpen, setIsPublishGalleryOpen] =
    useState<boolean>(false);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [activeIdx, setActiveIdx] = useState<number>(0);

  const [positive_prompt, setPositive_prompt] = useState<string>("");

  const [negative_prompt, setNegative_prompt] = useState<string>("");

  const [sampling_method, setSampling_method] = useState<string>(
    "DPM++ 2M SDE Karras",
  );

  const [size, setSize] = useState<string>("1:1");

  const [control_net, setControl_net] = useState<boolean>(true);

  const [control_img, setControl_img] = useState<string>("");

  const [preprocessor, setPreprocessor] = useState<string[]>(["invert"]);

  const [performance, setPerformance] = useState<number>(0);

  const [activeIdx1, setActiveIdx1] = useState<number>(0);

  const [model, setModel] = useState<string>("");

  const [weight, setWeight] = useState<number>(1);

  const [imgChoose, setImgChoose] = useState<any>([]);

  const [selectImgUrl, setSelectImgUrl] = useState<any>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const [hisImgs, setHisImgs] = useState<any>([]);

  const [sampling_steps, setSampling_steps] = useState<number>(0);

  const [cfg_scale, setCfg_scale] = useState<string>("20");

  const [sellAginImg, setSellAginImg] = useState<string>("");

  const [seed, setSeed] = useState<number>(-1);

  const [actTags, setActTags] = useState<any>(["Anime"]);

  const [actStyle, setActStyle] = useState<any>([
    "4Guofeng4XL_v1125D.safetensors",
  ]);

  const [checkpoint, setCheckpoint] = useState<string>(
    "4Guofeng4XL_v1125D.safetensors",
  );

  const [styleValue, setStyleValue] = useState<string>("");

  const [pubName, setPubName] = useState<string>("");

  const [description, setDescription] = useState<string>("");

  const [design, setDesign] = useState<number>(1);

  const [price, setPrice] = useState<number>(10);

  const [amount, setAmount] = useState<number>(10);

  const [saleLoad, setSaleLoad] = useState<boolean>(false);

  const [launchTags, setLaunchTags] = useState<any>([]);

  const [showRetry, setShowRetry] = useState<boolean>(false);

  useEffect(() => {
    getHistoryImgs();
  }, [activeIdx]);

  useEffect(() => {
    if (router && router.query && router.query.id) {
      getNftDetail(router.query.id);
    }
  }, [router]);

  const getNftDetail = async (collection_id: any) => {
    try {
      const res: any = await api.get(`/api/collections/${collection_id}`);
      if (res && res.id) {
        resetParams(res);
        if (
          router.query.kind &&
          router.query.kind == "sellagin" &&
          res.chain_id == 56
        ) {
          setIsModalOpen(true);
          setPubName(res.name);
          setDescription(res.description);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cascaderChange = (e: any, options: any) => {
    setPreprocessor(e);
    if (options.length > 0) {
      setModel(options[options.length - 1]["model"]);
    }
  };

  const tabChange = (idx: any) => {
    setActiveIdx(idx);
    setImgChoose([]);
    setSelectImgUrl([]);
    setPositive_prompt("");
    setShowRetry(false);
  };

  const generateImg = async () => {
    setLoading(true);
    setImgChoose([]);
    setSelectImgUrl([]);
    const res: any = await api.post(`/api/collections/generateImage`, {
      positive_prompt: styleValue + positive_prompt,
      negative_prompt: styleEnumConfig[activeIdx1]["negative_prompt"],
      sampling_method,
      style: styleValue,
      style_key: actStyle[0],
      checkpoint,
      sampling_steps: Number(sampling_steps),
      cfg_scale,
      seed,
      size,
      control_net:
        tabs[activeIdx] == "Basic"
          ? false
          : control_net && control_img
          ? true
          : false,
      control_img:
        tabs[activeIdx] == "Basic"
          ? ""
          : control_net && control_img
          ? control_img
          : "",
      preprocessor:
        tabs[activeIdx] == "Basic" ? "" : preprocessor[preprocessor.length - 1],
      performance: performance.toString(),
      model: tabs[activeIdx] == "Basic" ? "" : model,
      weight: tabs[activeIdx] == "Basic" ? "0" : weight.toString(),
      pattern: tabs[activeIdx] == "Basic" ? "basic" : "master",
    });
    ButtonSelectTrace("create-sampler", sampling_method);
    ButtonSelectTrace(
      "create-steps",
      Number((((performance + 1) / 2) * 50 + 20).toFixed(0)),
    );
    ButtonSelectTrace("create-seed", "-1");
    ButtonSelectTrace("create-size", size);
    ButtonSelectTrace(
      "create-control_net",
      control_net && control_img ? true : false,
    );
    ButtonSelectTrace(
      "create-control_img",
      control_net && control_img ? control_img : "",
    );
    ButtonSelectTrace("create-preprocessor", preprocessor);
    ButtonSelectTrace("create-model", model);
    ButtonSelectTrace("create-weight", weight.toString());
    ButtonClickTrace(`create-now-${tabs[activeIdx]}`);
    setLoading(false);
    if (Array.isArray(res) && res.length > 0) {
      setShowRetry(true);
      setImgChoose(res);
      setSelectImgUrl([res[0]]);
      getHistoryImgs();
      getUserInfo();
    }
  };

  const getUserInfo = async () => {
    const res: any = await api.get(`/api/user`);
    if (res && res.id) {
      setUserStoreInfo({ ...res });
    }
  };

  const getHistoryImgs = async () => {
    if (!id) return false;
    const res: any = await api.get(`/api/collections/user/imageHistory`);
    if (Array.isArray(res) && res.length > 0) {
      const res1 = res.filter((t) => {
        return (
          t.pattern === `${tabs[activeIdx] == "Basic" ? "basic" : "master"}`
        );
      });
      setHisImgs(res1);
    }
  };

  const resetParams = (params: any) => {
    console.log(params);
    setPositive_prompt(params.positive_prompt);
    let stylIdx = lodash.findIndex(
      styleEnumConfig,
      (e: any) => {
        return e.label == params.style_key;
      },
      0,
    );
    setActiveIdx1(stylIdx > -1 ? stylIdx : 0);
    setActiveIdx(params.pattern == "basic" ? 0 : 1);
    setNegative_prompt(params.negative_prompt);
    setPerformance(params.performance ? params.performance : 0);

    if (samplerConfigs.includes(params.sampling_method)) {
      setSampling_method(params.sampling_method);
    } else {
      setSampling_method("DPM++ 2M SDE Karras");
    }
    setSampling_steps(params.sampling_steps);
    setCfg_scale(params.cfg_scale);
    setSeed(params.seed);
    setSellAginImg(params.collection_image);
    setSize(params.size);
    if (params.pattern == "master") {
      setControl_net(params.control_net);
      setControl_img(params.control_img);
      setPreprocessor(getPreprocessorByValue(params.preprocessor));
      setModel(params.model);
      setWeight(params.weight);
    }
  };

  const launch = async () => {
    if (coupon == 0) {
      setShowScrollModal(true);
      return false;
    }
    setSaleLoad(true);
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
      tags: launchTags,
    };
    ButtonClickTrace(`create-publish-${tabs[activeIdx]}`);
    try {
      if (
        router.query &&
        router.query.kind &&
        router.query.kind == "sellagin"
      ) {
        res = await api.post(`/api/collections/fork`, {
          collection_id: router.query.id,
          ...params,
        });
      } else {
        res = await api.post(`/api/collections/launch`, {
          request_id: selectImgUrl[0]["id"],
          ...params,
        });
      }

      if (res && typeof res == "string" && (design == 1 || design == 2)) {
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
      console.log("launch-error", error);
    }
  };

  const uploadJsonFile = async (launchId: string) => {
    let obj = {
      name: pubName,
      image:
        router.query.kind && router.query.kind == "sellagin"
          ? sellAginImg
          : selectImgUrl[0]["url"],
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
          // mint(launchId,res)
        },
        (err: any) => {
          console.log("upLoadJson-error", err);
        },
      );
  };

  const mint = async (launchId: string, fileUrl: string) => {
    setSaleLoad(true);
    setTimeout(() => {
      router.push(`/nftdetail/86c200b9-77d0-4a1c-a030-0cba23369de9`);
    }, 15 * 1000);
    try {
      const res: any = await knexusContract.mint(
        fileUrl,
        price,
        amount,
        launchId,
      );
      setSaleLoad(false);
    } catch (error) {
      setSaleLoad(false);
    }
  };

  const changeLanuchTags = (e: string) => {
    if (launchTags.includes(e)) {
      const ts = [...launchTags];
      ts.splice(ts.indexOf(e), 1);
      setLaunchTags(ts);
    } else {
      setLaunchTags([...launchTags, e]);
    }
  };

  return (
    <>
      <NextSeo title="Create | KNexus" />
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
        <NoScrollModal />
        <PublishGalleryModal
          isPublishGalleryOpen={isPublishGalleryOpen}
          changeIsPublishGalleryOpen={(e: boolean) =>
            setIsPublishGalleryOpen(e)
          }
          request_id={selectImgUrl.length > 0 ? selectImgUrl[0]["id"] : ""}
        />
        <PublishModal
          showTag={true}
          isModalOpen={isModalOpen}
          changeModal={(e: boolean) => setIsModalOpen(e)}
          pubName={pubName}
          changePubName={(e: string) => setPubName(e)}
          description={description}
          changeDescription={(e: string) => setDescription(e)}
          launchTags={launchTags}
          clearLanuchTags={() => setLaunchTags([])}
          changeLanuchTags={(e: string) => changeLanuchTags(e)}
          design={design}
          changeDesign={(e: number) => setDesign(e)}
          amount={amount}
          changeAmount={(e: number) => setAmount(e)}
          price={price}
          changePrice={(e: number) => setPrice(e)}
          saleLoad={saleLoad}
          nextClick={() => launch()}
        />
        <div
          className={`${
            showNotion ? "h-[calc(100vh-114px)]" : "h-[calc(100vh-74px)]"
          } overflow-auto`}
        >
          <div className="w-[90%] mx-[auto] mt-10">
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
                      tabChange={(idx) => tabChange(idx)}
                    />
                  </div>
                  <div className="mb-8">
                    <TextPrompt
                      positive_prompt={positive_prompt}
                      promptChange={(str) => setPositive_prompt(str)}
                    />
                  </div>
                  {tabs[activeIdx] == "Master" && (
                    <div className="mb-8">
                      <NegPrompt
                        negative_prompt={negative_prompt}
                        promptChange={(str) => setNegative_prompt(str)}
                      />
                    </div>
                  )}

                  <div className="mb-8">
                    <StyleComps
                      activeTags={actTags}
                      activeStyle={actStyle}
                      tagsChange={(e) => setActTags(e)}
                      styleChange={(e: any) => {
                        setNegative_prompt(e.negative_prompt);
                        setSampling_method(e.sampler);
                        setCfg_scale(e.cfg_scale);
                        setSampling_steps(e.step);
                        setStyleValue(e.value);
                        setCheckpoint(e.checkpoint);
                        setActStyle([e.label]);
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <Size
                      actSize={size}
                      sizeConfig={["1:1", "4:3", "16:9", "3:4", "9:16"]}
                      sizeChange={(str) => setSize(str)}
                    />
                  </div>
                  <div className="mb-8">
                    <Sampler
                      sampling_method={sampling_method}
                      sampChange={(str) => setSampling_method(str)}
                    />
                  </div>

                  {tabs[activeIdx] == "Master" && (
                    <>
                      <div className="mb-3">
                        <div className="flex items-center justify-between">
                          <div className="font-[600] text-[24px] mb-3 flex items-center">
                            <div>Image Prompt</div>
                            <div className="ml-2">
                              <DesTooltip text={tooltipDesInfo.controlnet} />
                            </div>
                          </div>
                          <div>
                            <Switch
                              isChecked={control_net}
                              onChange={(e: any) =>
                                setControl_net(e.target.checked)
                              }
                            />
                          </div>
                        </div>
                      </div>
                      {control_net && (
                        <>
                          <div className="mb-8">
                            <ImgPromptUpload
                              control_img={control_img}
                              imgChange={(img) => setControl_img(img)}
                            />
                          </div>
                          <div className="mb-8">
                            <Preprocessor
                              preprocessor={preprocessor}
                              cascaderChange={(e: any, options: any) =>
                                cascaderChange(e, options)
                              }
                            />
                          </div>
                          <div className="mb-8">
                            <Weight
                              weight={weight}
                              weightChange={(e: number) => setWeight(e)}
                            />
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
              <div
                className="w-[calc(40%-80px)] shrink-0 mb-8"
                onContextMenu={(e: any) => e.preventDefault()}
              >
                <div className="mb-5">
                  <PromptImgSelect
                    imgChoose={imgChoose}
                    selectImgUrl={selectImgUrl}
                    loading={loading}
                  />
                </div>
                <div className="mt-5 mb-5">
                  <PromptImgChoose
                    type={tabs[activeIdx] == "Basic" ? 1 : 2}
                    imgChoose={imgChoose}
                    selectImgUrl={selectImgUrl}
                    loading={loading}
                    changeSelectImgUrl={(e) => setSelectImgUrl(e)}
                  />
                </div>
                <div className="flex my-2 justify-evenly">
                  {selectImgUrl.length != 0 && (
                    <Button
                      bg={showRetry ? "#fff" : "#000"}
                      border="1px solid #000"
                      borderRadius="full"
                      color={showRetry ? "#000" : "#D5F95F"}
                      _hover={{
                        background: "rgba(0,0,0,0.7)",
                      }}
                      size="lg"
                      onClick={() => {
                        ButtonClickTrace(`create-next-${tabs[activeIdx]}`);
                        if (
                          router.query &&
                          router.query.kind &&
                          router.query.kind == "gallery"
                        ) {
                          setIsPublishGalleryOpen(true);
                        } else {
                          setLaunchTags(actTags);
                          setIsModalOpen(true);
                        }
                      }}
                    >
                      Mint
                    </Button>
                  )}
                  <Button
                    bg={showRetry ? "#fff" : "#000"}
                    border="1px solid #000"
                    borderRadius="full"
                    color={showRetry ? "#000" : "#D5F95F"}
                    _hover={{
                      background: showRetry
                        ? "rgba(255,255,255,0.7)"
                        : "rgba(0,0,0,0.7)",
                    }}
                    size="lg"
                    isDisabled={loading || !positive_prompt}
                    onClick={() => generateImg()}
                  >
                    {showRetry ? "Retry" : "Create NOW"} -
                    {tabs[activeIdx] == "Basic" ? "1" : "2"} PP
                  </Button>
                </div>
                <div className="mb-8">
                  <HistoryImg
                    hisImgs={hisImgs}
                    changeSelectImgUrl={(e: any) => setSelectImgUrl(e)}
                    selectImgUrl={selectImgUrl}
                    resetParams={(e: any) => resetParams(e)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Texttoimage;
