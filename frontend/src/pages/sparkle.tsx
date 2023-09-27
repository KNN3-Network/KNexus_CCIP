import { useContext } from "react";
import React, { useEffect, useRef, useState } from "react";

import { useRouter } from "next/router";

import { LeftOutlined } from "@ant-design/icons";
import { Box, Button } from "@chakra-ui/react";
import { Select, Upload } from "antd";
import api from "api";
import { NextSeo } from "components";
import {
  DesTooltip,
  Header,
  NoScrollModal,
  SocialButton,
} from "components/common";
import Campign from "components/common/Campign";
import {
  HistoryImg,
  ImgPromptUpload,
  PromptImgChoose,
  PromptImgSelect,
  PublishGalleryModal,
  Size,
  StyleComps,
  Tabs,
  TextPrompt,
} from "components/create";
import { default_text_prompt, styleEnumConfig } from "lib/promptEnum";
import { ButtonClickTrace, ButtonSelectTrace } from "lib/trace";
import { useEarlyUserStore } from "store/earlyUserStore";
import { useUserInfoStore } from "store/userInfoStore";

const { Dragger } = Upload;

const tooltipDesInfo = {
  controlnet:
    "An  is a guiding image used in image generation tasks, providing stylistic direction that influences the attributes of the produced image.",
};

const tabs = ["Sparkle"];

const Texttoimage = () => {
  const { coupon, address, id, setUserStoreInfo } = useUserInfoStore();

  const router = useRouter();

  const { showNotion } = useEarlyUserStore();

  const [isPublishGalleryOpen, setIsPublishGalleryOpen] =
    useState<boolean>(false);

  const [activeIdx, setActiveIdx] = useState<number>(0);

  const [positive_prompt, setPositive_prompt] =
    useState<string>(default_text_prompt);

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

  const [sampling_steps, setSampling_steps] = useState<number>(20);

  const [cfg_scale, setCfg_scale] = useState<string>("7");

  const [seed, setSeed] = useState<number>(-1);

  const [actTags, setActTags] = useState<any>(["Anime"]);

  const [actStyle, setActStyle] = useState<any>([
    "4Guofeng4XL_v1125D.safetensors",
  ]);

  const [checkpoint, setCheckpoint] = useState<string>(
    "4Guofeng4XL_v1125D.safetensors",
  );

  const [styleValue, setStyleValue] = useState<string>("");

  const [gender, setGender] = useState<string>("Girl");

  const [bookFrame, setBookFrame] = useState<string>("Arrow");

  const [symbol, setSymbol] = useState<string>("Ascendant");

  const [elementVa, setElementVa] = useState<string>("Air");

  const [magic, setMagic] = useState<string>("Darkness");

  const [bookMark, setBookMark] = useState<string>("Golden leaf");

  const [showRetry, setShowRetry] = useState<boolean>(false);

  useEffect(() => {
    getHistoryImgs();
  }, []);

  useEffect(() => {
    setPositive_prompt(
      `${default_text_prompt}${gender},${bookFrame},${bookMark},${elementVa},${magic},${symbol}`,
    );
  }, [bookFrame, symbol, elementVa, magic, bookMark]);

  const generateImg = async () => {
    setLoading(true);
    setImgChoose([]);
    setSelectImgUrl([]);
    const res: any = await api.post(`/api/collections/generateImage`, {
      positive_prompt: styleValue + positive_prompt,
      negative_prompt,
      sampling_method,
      style: styleValue,
      style_key: actStyle[0],
      checkpoint,
      sampling_steps: Number(sampling_steps),
      cfg_scale,
      seed,
      size,
      control_net: control_net && control_img ? true : false,
      control_img: control_net && control_img ? control_img : "",
      preprocessor: "",
      performance: performance.toString(),
      model: "",
      weight: "0",
      pattern: "sparkle",
    });
    ButtonSelectTrace("create-sampler", sampling_method);
    ButtonSelectTrace("create-steps", Number(sampling_steps));
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
        return t.pattern === `sparkle`;
      });
      setHisImgs(res1);
    }
  };

  const resetParams = (params: any) => {
    setPositive_prompt(params.positive_prompt);
    setControl_img(params.control_img);
    setSize(params.size);
  };

  return (
    <>
      <NextSeo title="Sparkle | KNexus" />
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
                      tabChange={(idx) => setActiveIdx(idx)}
                    />
                  </div>
                  <div className="mb-3">
                    <div className="flex items-center justify-between">
                      <div className="font-[600] text-[24px] mb-3 flex items-center">
                        <div>Image Prompt</div>
                        <div className="ml-2">
                          <DesTooltip text={tooltipDesInfo.controlnet} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-8">
                    <ImgPromptUpload
                      control_img={control_img}
                      imgChange={(img) => setControl_img(img)}
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
                  <div className="text-[20px]">
                    The image is generated based on your NFT attributes.
                  </div>
                  <div className="flex justify-between gap-5 mb-8">
                    <div className="flex-1">
                      <div className="font-[600] text-[18px] mb-3 flex items-center">
                        <div>Gender</div>
                      </div>
                      <div>
                        <Select
                          size="large"
                          style={{ width: "100%" }}
                          value={gender}
                          onChange={(e: any) => setGender(e)}
                          options={[
                            {
                              value: "Girl",
                              label: "Girl",
                              className: "font-eurostile text-[20px]",
                            },
                            {
                              value: "Boy",
                              label: "Boy",
                              className: "font-eurostile text-[20px]",
                            },
                          ]}
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="font-[600] text-[18px] mb-3 flex items-center">
                        <div>Book Frame</div>
                      </div>
                      <div>
                        <Select
                          size="large"
                          style={{ width: "100%" }}
                          value={bookFrame}
                          onChange={(e: any) => setBookFrame(e)}
                          options={[
                            {
                              value: "Arrow",
                              label: "Arrow",
                              className: "font-eurostile text-[20px]",
                            },
                            {
                              value: "Borago",
                              label: "Borago",
                              className: "font-eurostile text-[20px]",
                            },
                            {
                              value: "Leather",
                              label: "Leather",
                              className: "font-eurostile text-[20px]",
                            },
                            {
                              value: "Sweet Alyssum",
                              label: "Sweet Alyssum",
                              className: "font-eurostile text-[20px]",
                            },
                          ]}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between gap-5 mb-8">
                    <div className="flex-1">
                      <div className="font-[600] text-[18px] mb-3 flex items-center">
                        <div>Element</div>
                      </div>
                      <div>
                        <Select
                          size="large"
                          style={{ width: "100%" }}
                          value={elementVa}
                          onChange={(e: any) => setElementVa(e)}
                          options={[
                            {
                              value: "Air",
                              label: "Air",
                              className: "font-eurostile text-[20px]",
                            },
                            {
                              value: "Earth",
                              label: "Earth",
                              className: "font-eurostile text-[20px]",
                            },
                            {
                              value: "Fire",
                              label: "Fire",
                              className: "font-eurostile text-[20px]",
                            },
                            {
                              value: "Water",
                              label: "Water",
                              className: "font-eurostile text-[20px]",
                            },
                          ]}
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="font-[600] text-[18px] mb-3 flex items-center">
                        <div>Bookmark</div>
                      </div>
                      <div>
                        <Select
                          size="large"
                          style={{ width: "100%" }}
                          value={bookMark}
                          onChange={(e: any) => setBookMark(e)}
                          options={[
                            {
                              value: "Golden leaf",
                              label: "Golden leaf",
                              className: "font-eurostile text-[20px]",
                            },
                            {
                              value: "Leather",
                              label: "Leather",
                              className: "font-eurostile text-[20px]",
                            },
                            {
                              value: "Ribbon",
                              label: "Ribbon",
                              className: "font-eurostile text-[20px]",
                            },
                            {
                              value: "Wing feather",
                              label: "Wing feather",
                              className: "font-eurostile text-[20px]",
                            },
                          ]}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between gap-5 mb-8">
                    <div className="flex-1">
                      <div className="font-[600] text-[18px] mb-3 flex items-center">
                        <div>Magic</div>
                      </div>
                      <div>
                        <Select
                          size="large"
                          style={{ width: "100%" }}
                          value={magic}
                          onChange={(e: any) => setMagic(e)}
                          options={[
                            {
                              value: "Darkness",
                              label: "Darkness",
                              className: "font-eurostile text-[20px]",
                            },
                            {
                              value: "Explosion",
                              label: "Explosion",
                              className: "font-eurostile text-[20px]",
                            },
                            {
                              value: "Flame",
                              label: "Flame",
                              className: "font-eurostile text-[20px]",
                            },
                            {
                              value: "Gold",
                              label: "Gold",
                              className: "font-eurostile text-[20px]",
                            },
                            {
                              value: "Healing",
                              label: "Healing",
                              className: "font-eurostile text-[20px]",
                            },
                            {
                              value: "Holy",
                              label: "Holy",
                              className: "font-eurostile text-[20px]",
                            },
                            {
                              value: "Invisible",
                              label: "Invisible",
                              className: "font-eurostile text-[20px]",
                            },
                            {
                              value: "Knowledge",
                              label: "Knowledge",
                              className: "font-eurostile text-[20px]",
                            },
                            {
                              value: "Life",
                              label: "Life",
                              className: "font-eurostile text-[20px]",
                            },
                            {
                              value: "Lightning",
                              label: "Lightning",
                              className: "font-eurostile text-[20px]",
                            },
                            {
                              value: "Love",
                              label: "Love",
                              className: "font-eurostile text-[20px]",
                            },
                            {
                              value: "Rejuvenation",
                              label: "Rejuvenation",
                              className: "font-eurostile text-[20px]",
                            },
                            {
                              value: "Sound",
                              label: "Sound",
                              className: "font-eurostile text-[20px]",
                            },
                            {
                              value: "Space",
                              label: "Space",
                              className: "font-eurostile text-[20px]",
                            },
                            {
                              value: "Time",
                              label: "Time",
                              className: "font-eurostile text-[20px]",
                            },
                            {
                              value: "Wave",
                              label: "Wave",
                              className: "font-eurostile text-[20px]",
                            },
                            {
                              value: "Wood",
                              label: "Wood",
                              className: "font-eurostile text-[20px]",
                            },
                          ]}
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="font-[600] text-[18px] mb-3 flex items-center">
                        <div>Symbol</div>
                      </div>
                      <div>
                        <Select
                          size="large"
                          style={{ width: "100%" }}
                          value={symbol}
                          onChange={(e: any) => setSymbol(e)}
                          options={[
                            {
                              value: "Ascendant",
                              label: "Ascendant",
                              className: "font-eurostile text-[20px]",
                            },
                            {
                              value: "Jupiter",
                              label: "Jupiter",
                              className: "font-eurostile text-[20px]",
                            },
                            {
                              value: "Mars",
                              label: "Mars",
                              className: "font-eurostile text-[20px]",
                            },
                            {
                              value: "Mercury",
                              label: "Mercury",
                              className: "font-eurostile text-[20px]",
                            },
                            {
                              value: "Moon",
                              label: "Moon",
                              className: "font-eurostile text-[20px]",
                            },
                            {
                              value: "Saturn",
                              label: "Saturn",
                              className: "font-eurostile text-[20px]",
                            },
                            {
                              value: "Sun",
                              label: "Sun",
                              className: "font-eurostile text-[20px]",
                            },
                            {
                              value: "Venus",
                              label: "Venus",
                              className: "font-eurostile text-[20px]",
                            },
                          ]}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-8">
                    <TextPrompt
                      positive_prompt={positive_prompt}
                      promptChange={(str) => setPositive_prompt(str)}
                    />
                  </div>
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
                    type={1}
                    imgChoose={imgChoose}
                    selectImgUrl={selectImgUrl}
                    loading={loading}
                    changeSelectImgUrl={(e) => setSelectImgUrl(e)}
                  />
                </div>
                <div className="flex justify-center mb-5 items-center">
                  {showRetry && (
                    <Button
                      variant="blackPrimary"
                      height="40px"
                      isDisabled={selectImgUrl.length == 0}
                      borderRadius={"20px"}
                      size="lg"
                      w="100px"
                      marginRight="20px"
                      className="text-[#D5F95F]"
                      onClick={() => {
                        ButtonClickTrace(`create-next-${tabs[activeIdx]}`);
                        setIsPublishGalleryOpen(true);
                      }}
                    >
                      Publish
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
                    height="40px"
                    isDisabled={loading || !positive_prompt}
                    onClick={() => generateImg()}
                  >
                    <span className="text-[14px] ml-2">
                      {showRetry ? "Retry" : "Create NOW"} -2 PP
                    </span>
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
