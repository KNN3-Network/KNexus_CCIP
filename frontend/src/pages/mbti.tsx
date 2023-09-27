import { useContext } from "react";
import React, { useEffect, useRef, useState } from "react";

import { useRouter } from "next/router";

import { LeftOutlined } from "@ant-design/icons";
import { Box, Button, Image, useToast } from "@chakra-ui/react";
import { Upload } from "antd";
import api from "api";
import { NextSeo } from "components";
import {
  BaseModal,
  DesTooltip,
  Header,
  NoScrollModal,
  SocialButton,
  Steps,
  Title,
  WaterPrint,
} from "components/common";
import Campign from "components/common/Campign";
import {
  HistoryImg,
  PromptImgSelect,
  PublishGalleryModal,
  Tabs,
  TextPrompt,
} from "components/create";
import useKnexusContract from "contract/useKnexusContract";
import { mbtiStyleEnumConfig } from "lib/promptEnum";
import { ButtonClickTrace, ButtonSelectTrace } from "lib/trace";
import lodash from "lodash";
import { useEarlyUserStore } from "store/earlyUserStore";
import { useScrollStore } from "store/scrollStore";
import { useUserInfoStore } from "store/userInfoStore";

const default_nage_prompt =
  "(NSFW:1), paintings, sketches, fingers, (worst quality:2), (low quality:2), (normal quality:2), lowres, normal quality, ((monochrome)), ((grayscale)), skin spots, acnes, skin blemishes, age spot, (outdoor:1.6), backlight,(ugly:1.331), (duplicate:1.331), (morbid:1.21), (mutilated:1.21), (tranny:1.331), mutated hands, (poorly drawn hands:1.5), blurry, (bad anatomy:1.21), (bad proportions:1.331), extra limbs, (disfigured:1.331), (more than 2 nipples:1.331), (missing arms:1.331), (extra legs:1.331), (fused fingers:1.61051), (too many fingers:1.61051), (unclear eyes:1.331), lowers, bad hands, missing fingers, extra digit, (futa:1.1),bad hands, missing fingers, bad-hands-5, big breast, huge boobs, big boobs, bare chest, NSFW, nude, breast out, tits, nipples, horny";

const default_checkpoint = "camelliamix25D_v2.safetensors";

const tabs = ["MBTI"];

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

const Mbti = () => {
  const { coupon, address, id, setUserStoreInfo } = useUserInfoStore();

  const { showScrollModal, setShowScrollModal } = useScrollStore();

  const knexusContract = useKnexusContract();

  const toast = useToast();

  const router = useRouter();

  const { showNotion } = useEarlyUserStore();

  const [isPublishGalleryOpen, setIsPublishGalleryOpen] =
    useState<boolean>(false);

  const [activeIdx2, setActiveIdx2] = useState<number>(0);

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

  const [model, setModel] = useState<string>("");

  const [weight, setWeight] = useState<number>(1);

  const [imgChoose, setImgChoose] = useState<any>([]);

  const [selectImgUrl, setSelectImgUrl] = useState<any>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const [hisImgs, setHisImgs] = useState<any>([]);

  const [showRetry, setShowRetry] = useState<boolean>(false);

  useEffect(() => {
    getHistoryImgs();
  }, [activeIdx]);

  useEffect(() => {
    if (tabs[activeIdx] == "MBTI") {
      setPositive_prompt(mbtiStyleEnumConfig[activeIdx2]["value"]);
    }
  }, [activeIdx2]);

  const generateImg = async () => {
    setLoading(true);
    setImgChoose([]);
    setSelectImgUrl([]);
    const res: any = await api.post(`/api/collections/generateImage`, {
      positive_prompt,
      negative_prompt: default_nage_prompt,
      sampling_method,
      style: "",
      style_key: mbtiStyleEnumConfig[activeIdx2]["label"],
      checkpoint: default_checkpoint,
      sampling_steps: 45,
      cfg_scale: "10",
      seed: -1,
      size: "1:1",
      control_net: false,
      control_img: "",
      preprocessor: "",
      performance: "0",
      model: "",
      weight: "0",
      pattern: "mbti",
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
        return t.pattern === `mbti`;
      });
      setHisImgs(res1);
    }
  };

  const resetParams = (params: any) => {
    setPositive_prompt(params.positive_prompt);
    let stylIdx = lodash.findIndex(
      mbtiStyleEnumConfig,
      (e: any) => {
        return e.label == params.style_key;
      },
      0,
    );
    setActiveIdx2(stylIdx > -1 ? stylIdx : 0);
  };

  return (
    <>
      <NextSeo title="Mbti | KNexus" />
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
                  className="w-[calc(100%-80px)] rounded-[20px] px-10 py-5 border-[2px] border-[rgba(0,0,0,0.1)] bg-[#FFFFFB] h-[fit-content]"
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
                    <div className="font-[600] text-[24px] mb-3 flex items-center">
                      <div>MBTI Style</div>
                    </div>
                    <div className="w-full card-grid-column-create-style mb-8">
                      {mbtiStyleEnumConfig.map((t: any, i: number) => (
                        <div
                          key={i}
                          className={`${
                            activeIdx2 == i ? "" : ""
                          } box-border rounded-[20px] relative`}
                        >
                          <Image
                            className="w-full h-full rounded-[20px]"
                            src={t.activeImg}
                            objectFit="cover"
                          />
                          <div
                            onClick={() => setActiveIdx2(i)}
                            className={`${
                              activeIdx2 == i
                                ? "border-[2px] border-green"
                                : "bg-[rgba(0,0,0,0.6)]"
                            } rounded-[20px] cursor-pointer absolute top-0 left-0 h-full w-full flex items-center justify-center text-[#fff] text-[1.1em] font-bold`}
                          >
                            {t.label}
                          </div>
                        </div>
                      ))}
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
                    default_img={"/images/common/mbti-test.png"}
                    imgChoose={imgChoose}
                    selectImgUrl={selectImgUrl}
                    loading={loading}
                  />
                </div>
                <div className="flex justify-center mb-5 items-center">
                  {showRetry ||
                    (router.query.kind && router.query.kind == "gallery" && (
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
                    ))}
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
                      {showRetry ? "Retry" : "Create NOW"} -1 PP
                    </span>
                  </Button>
                </div>
                <div>
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

export default Mbti;
