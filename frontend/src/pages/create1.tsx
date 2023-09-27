import { useContext } from "react";
import React, { useEffect, useRef, useState } from "react";

import { useRouter } from "next/router";

import {
  Box,
  Button,
  Image,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Switch,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { Cascader, Radio, Select, Upload } from "antd";
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
import { usdtContractAddress } from "config/base";
import { isProduction, siteName } from "config/base";
import { config } from "config/walletNet";
import useKnexusContract from "contract/useKnexusContract";
import useWeb3Context from "hooks/useWeb3Context";
import {
  getPreprocessorByValue,
  mbtiStyleEnumConfig,
  preprocessorEnumConfig,
  styleEnumConfig,
} from "lib/promptEnum";
import { ButtonClickTrace, ButtonSelectTrace } from "lib/trace";
import lodash from "lodash";
import { SyncLoader } from "react-spinners";
import { useEarlyUserStore } from "store/earlyUserStore";
import { useScrollStore } from "store/scrollStore";
import { useUserInfoStore } from "store/userInfoStore";

const { Dragger } = Upload;

const sizes = ["1:1", "4:3", "16:9"];

const defaultImgs = [
  "/images/common/create-test.png",
  "/images/common/create-test.png",
  "/images/common/create-test.png",
];

const defult_negative_prompt =
  "(NSFW:-1), paintings, sketches, fingers, (worst quality:2), (low quality:2), (normal quality:2), lowres, normal quality, ((monochrome)), ((grayscale)), skin spots, acnes, skin blemishes, age spot, (outdoor:1.6), backlight,(ugly:1.331), (duplicate:1.331), (morbid:1.21), (mutilated:1.21), (tranny:1.331), mutated hands, (poorly drawn hands:1.5), blurry, (bad anatomy:1.21), (bad proportions:1.331), extra limbs, (disfigured:1.331), (more than 2 nipples:1.331), (missing arms:1.331), (extra legs:1.331), (fused fingers:1.61051), (too many fingers:1.61051), (unclear eyes:1.331), lowers, bad hands, missing fingers, extra digit, (futa:1.1),bad hands, missing fingers, bad-hands-5";

const tooltipDesInfo = {
  promptPoint:
    "Prompt Point is a unique point system within the KNexus platform, designed to ignite creativity. It can be used for AI-generated art creation and payment.",
  prompt:
    "Detail your subject as much as possible, make sure to include keywords to define the style.",
  style:
    "Select the type of image you want to generate, different types may need to increase the prompt for the corresponding type.",
  mode: "A sampler dictates the image's calculation from input (prompt) to output (image) in latent diffusion models, influencing subsequent steps without delving into the math.",
  steps:
    "Sampling steps refer to the iterations from random noise to a recognizable image based on the text prompt. Higher sampling steps add more detail to your image, but come with longer processing time.",
  scale:
    "The CFG scale controls the guidance and similarity between the input prompt and the generated image. Higher values produce input-resembling images, while lower values yield creative and abstract results.",
  seed: "Numeric values used to initialize the generation process.",
  size: "The proportional dimensions (height and width) of an image.",
  controlnet:
    "An Image Prompt is a guiding image used in image generation tasks, providing stylistic direction that influences the attributes of the produced image.",
  preprocessor:
    "Select how you want the prompt image information to be handled.",
  model:
    "Dedicated models for each preprocessor, addressing specific processing needs and enhancing overall performance.",
  weight:
    "Weight controls how much the control map is followed relative to the image prompt.",
  free: "Set your work as free, and you can choose the scope of publicity from the options below.",
  salable:
    "Users will need to pay to use your content, which may require integration with a Web3 wallet and other related infrastructure. Please set up as needed.",
};

const tabs = ["Memo", "Basic", "Master", "MBTI"];

const modalTabs = ["Free Public", "Salable"];

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

const Create = () => {
  const router = useRouter();

  const { showNotion } = useEarlyUserStore();

  const { showScrollModal, setShowScrollModal } = useScrollStore();

  const toast = useToast();

  const knexusContract = useKnexusContract();

  const myRef = useRef(null);

  const imgRef2: any = useRef(null);

  const imgRef3: any = useRef(null);

  const { sendTx, account, web3, chainId } = useWeb3Context();

  const { coupon, address, id, setUserStoreInfo, name, num, clearUserInfo } =
    useUserInfoStore();

  console.log("name", name);

  const [positive_prompt, setPositive_prompt] = useState<string>("");

  const [negative_prompt, setNegative_prompt] = useState<string>(
    defult_negative_prompt,
  );

  const [sampling_method, setSampling_method] = useState<string>(
    "DPM++ 2M SDE Karras",
  );

  const [sampling_steps, setSampling_steps] = useState<number>(50);

  const [cfg_scale, setCfg_scale] = useState<number>(7.5);

  const [performance, setPerformance] = useState<number>(0);

  const [seed, setSeed] = useState<number>(-1);

  const [control_net, setControl_net] = useState<boolean>(true);

  const [loading, setLoading] = useState<boolean>(false);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [actSize, setActSize] = useState<number>(0);

  const [weight, setWeight] = useState<number>(1);

  const [imgUrl, setImgUrl] = useState<string>("");

  const [imgChoose, setImgChoose] = useState<any>([]);

  const [selectImgUrl, setSelectImgUrl] = useState<any>([]);

  const [preprocessor, setPreprocessor] = useState<string[]>(["invert"]);

  const [model, setModel] = useState<string>("");

  const [pubName, setPubName] = useState<string>("");

  const [description, setDescription] = useState<string>("");

  const [amount, setAmount] = useState<number>(100);

  const [price, setPrice] = useState<number>(1);

  const [bnbPrice, setBnbPrice] = useState<any>(0);

  const [activeIdx, setActiveIdx] = useState<number>(0);

  const [activeIdx1, setActiveIdx1] = useState<number>(0);

  const [activeIdx2, setActiveIdx2] = useState<number>(0);

  const [radioValue, setRadioValue] = useState<number>(0);

  const [hisImgs, setHisImgs] = useState<any>([]);

  const [visibility, setVisibility] = useState<number>(1);

  const [isPublishGalleryOpen, setIsPublishGalleryOpen] =
    useState<boolean>(false);

  const [pubLoading, setPubLoading] = useState<boolean>(false);

  const [pubGalleryNm, setPubGalleryNm] = useState<string>("");

  const [pubComment, setPubComment] = useState<string>("");

  const [saleLoad, setSaleLoad] = useState<boolean>(false);

  const [uploadLoading, setUploadLoading] = useState<boolean>(false);

  const [sellAginImg, setSellAginImg] = useState<string>("");

  const [uploadModel, setUploadModel] = useState<string>("Stable Diffusion");

  const [version, setVersion] = useState<string>("Stable Diffusion V1.5");

  const [cusImgUrl, setCusImgUrl] = useState<string>("");

  const [cusLoading, setCusLoading] = useState<boolean>(false);

  useEffect(() => {
    setVersion(
      uploadModel == "Stable Diffusion"
        ? "Stable Diffusion V1.5"
        : "Midjourney Model V1.0",
    );
  }, [uploadModel]);

  const uploadFile = (file: any, type: "1" | "2") => {
    if (type == "1") {
      setUploadLoading(true);
    } else {
      setCusLoading(true);
    }
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
          if (type == "1") {
            setUploadLoading(false);
            if (res && res.url) {
              setImgUrl(res.url);
            }
          } else {
            setCusLoading(false);
            if (res && res.url) {
              setCusImgUrl(res.url);
            }
          }
        },
        (err: any) => {
          if (type == "1") {
            setUploadLoading(false);
          } else {
            setCusLoading(false);
          }
          console.log(err);
        },
      );
  };

  const generateImg = async () => {
    const node: any = myRef.current;
    node.scrollTop = 0;
    setLoading(true);
    setImgChoose([]);
    setSelectImgUrl([]);
    console.log(performance);
    console.log((((performance + 1) / 2) * 50 + 20).toFixed(0));
    console.log((((performance + 1) / 2) * 10 + 5).toFixed(0).toString());
    const res: any = await api.post(`/api/collections/generateImage`, {
      positive_prompt,
      negative_prompt: styleEnumConfig[activeIdx1]["negative_prompt"],
      sampling_method,
      style: styleEnumConfig[activeIdx1]["value"],
      style_key:
        tabs[activeIdx] == "MBTI"
          ? mbtiStyleEnumConfig[activeIdx2]["label"]
          : styleEnumConfig[activeIdx1]["label"],
      checkpoint: styleEnumConfig[activeIdx1]["checkpoint"],
      sampling_steps: Number((((performance + 1) / 2) * 50 + 20).toFixed(0)),
      cfg_scale: (((performance + 1) / 2) * 10 + 5).toFixed(0).toString(),
      seed: -1,
      size: actSize === 0 ? "1:1" : actSize === 1 ? "4:3" : "16:9",
      control_net:
        tabs[activeIdx] == "Basic" || tabs[activeIdx] == "MBTI"
          ? false
          : control_net && imgUrl
          ? true
          : false,
      control_img:
        tabs[activeIdx] == "Basic" || tabs[activeIdx] == "MBTI"
          ? ""
          : control_net && imgUrl
          ? imgUrl
          : "",
      preprocessor:
        tabs[activeIdx] == "Basic" || tabs[activeIdx] == "MBTI"
          ? ""
          : preprocessor[preprocessor.length - 1],
      performance: performance.toString(),
      model:
        tabs[activeIdx] == "Basic" || tabs[activeIdx] == "MBTI" ? "" : model,
      weight:
        tabs[activeIdx] == "Basic" || tabs[activeIdx] == "MBTI"
          ? "0"
          : weight.toString(),
      pattern:
        tabs[activeIdx] == "MBTI"
          ? "mbti"
          : tabs[activeIdx] == "Basic"
          ? "basic"
          : "master",
    });
    ButtonSelectTrace("create-sampler", sampling_method);
    ButtonSelectTrace("create-steps", sampling_steps);
    ButtonSelectTrace("create-seed", seed);
    ButtonSelectTrace(
      "create-size",
      actSize === 0 ? "1:1" : actSize === 1 ? "4:3" : "16:9",
    );
    ButtonSelectTrace(
      "create-control_net",
      control_net && imgUrl ? true : false,
    );
    ButtonSelectTrace(
      "create-control_img",
      control_net && imgUrl ? imgUrl : "",
    );
    ButtonSelectTrace("create-preprocessor", preprocessor);
    ButtonSelectTrace("create-model", model);
    ButtonSelectTrace("create-weight", weight.toString());
    ButtonClickTrace(`create-now-${tabs[activeIdx]}`);
    setLoading(false);
    if (Array.isArray(res) && res.length > 0) {
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
          t.pattern ===
          `${
            tabs[activeIdx] == "MBTI"
              ? "mbti"
              : tabs[activeIdx] == "Basic"
              ? "basic"
              : "master"
          }`
        );
      });
      setHisImgs(res1);
    }
  };

  const launch = async () => {
    if (coupon == 0) {
      setShowScrollModal(true);
      return false;
    }
    setSaleLoad(true);
    if (radioValue == 1 && !address) {
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
        radioValue == 0
          ? 0
          : isProduction
          ? config.chainId
          : config.stagingChainId,
      kind: radioValue == 0 ? 2 : 1,
      visibility,
      currency: radioValue == 0 ? "" : usdtContractAddress,
      name: pubName,
      description,
      amount: radioValue == 0 ? 0 : Number(amount),
      price: radioValue == 0 ? "0" : price.toString(),
    };
    if (tabs[activeIdx] == "Memo") {
      params.collection_image = cusImgUrl;
      params.positive_prompt = positive_prompt;
      params.model = uploadModel;
      params.version = version;
    }
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
        if (tabs[activeIdx] == "Memo") {
          res = await api.post(`/api/collections/custom`, {
            ...params,
          });
        } else {
          res = await api.post(`/api/collections/launch`, {
            request_id: selectImgUrl[0]["id"],
            ...params,
          });
        }
      }

      if (res && typeof res == "string" && radioValue == 0) {
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
      if (res && typeof res == "string" && radioValue == 1) {
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
          : tabs[activeIdx] == "Memo"
          ? cusImgUrl
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

  const getBnbPrice = async () => {
    try {
      const res = await api.get(`/api/bnb_price`);
      if (res && res.data && res.data.code) {
        console.log("bnb-error", res);
        setBnbPrice(0);
      } else {
        setBnbPrice(Number(res).toFixed(3));
      }
    } catch (error) {
      console.log("bnb-error", error);
    }
  };

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

  const resetParams = (params: any) => {
    console.log(params);
    setPositive_prompt(params.positive_prompt);
    if (params.pattern == "custom") {
      setUploadModel(params.model);
      setVersion(params.version);
      // setCusImgUrl(params.collection_image)
      setActiveIdx(0);
    } else {
      if (params.pattern == "mbti") {
        let stylIdx = lodash.findIndex(
          mbtiStyleEnumConfig,
          (e: any) => {
            return e.label == params.style_key;
          },
          0,
        );
        setActiveIdx2(stylIdx > -1 ? stylIdx : 0);
      } else {
        let stylIdx = lodash.findIndex(
          styleEnumConfig,
          (e: any) => {
            return e.label == params.style_key;
          },
          0,
        );
        setActiveIdx1(stylIdx > -1 ? stylIdx : 0);
      }
      setActiveIdx(
        params.pattern == "mbti" ? 3 : params.pattern == "basic" ? 1 : 2,
      );
      setNegative_prompt(params.negative_prompt);
      setPerformance(params.performance ? params.performance : 0);

      if (samplerConfigs.includes(params.sampling_method)) {
        setSampling_method(params.sampling_method);
      } else {
        setSampling_method("Euler");
      }
      setSampling_steps(params.sampling_steps);
      setCfg_scale(params.cfg_scale);
      setSeed(params.seed);
      setSellAginImg(params.collection_image);
      setActSize(params.size == "1:1" ? 0 : params.size == "4:3" ? 1 : 2);
      if (params.pattern == "master") {
        setControl_net(params.control_net);
        setImgUrl(params.control_img);
        setPreprocessor(getPreprocessorByValue(params.preprocessor));
        setModel(params.model);
        setWeight(params.weight);
      }
    }
  };

  const getDescription = async () => {
    try {
      const res: any = await api.get(`/api/collections/help/ai2Description`);
      if (res && res.content) {
        setDescription(res.content);
      } else {
        setDescription("");
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

  const getPerformance = (step: number) => {
    return Number((((step - 20) / (70 - 20)) * 90 + 10).toFixed(0).toString());
  };

  const publishGallery = async () => {
    setPubLoading(true);
    const res: any = await api.post(`/api/gallery`, {
      collection_id: router.query.id,
      name: pubGalleryNm,
      remark: pubComment,
      request_id: selectImgUrl[0]["id"],
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
            router.push(
              `/gallerydetail/?userId=${id}&gallery_id=${res}&collection_id=${galleryList[0].collection_id}&imgUrl=${galleryList[0].image}`,
            );
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const tabChange = (idx: any) => {
    setActiveIdx(idx);
    setImgChoose([]);
    setSelectImgUrl([]);
    setSampling_method("DPM++ 2M SDE Karras");
    if (tabs[idx] == "MBTI") {
      setActiveIdx2(0);
      setPositive_prompt(mbtiStyleEnumConfig[activeIdx2]["value"]);
    } else {
      setPositive_prompt("");
    }
  };

  useEffect(() => {
    if (router && router.query && router.query.id) {
      getNftDetail(router.query.id);
    }
  }, [router]);

  useEffect(() => {
    getHistoryImgs();
  }, [activeIdx]);

  useEffect(() => {
    if (tabs[activeIdx] == "MBTI") {
      setPositive_prompt(mbtiStyleEnumConfig[activeIdx2]["value"]);
    }
  }, [activeIdx2]);

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
        <BaseModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          }}
          size="xl"
          title=""
        >
          <div className=" font-eurostile">
            <div className="font-bold mb-2 text-[20px] mt-8">
              {activeIdx != 0 ? "Please choose" : "Publish"}
            </div>
            {/* <div>
							<Radio.Group value={radioValue} onChange={(e:any) => setRadioValue(e.target.value)}>
								<Radio value={1}><span className=" font-eurostile">Free Public</span></Radio>
								<Radio value={2}><span className=" font-eurostile">Salable</span></Radio>
							</Radio.Group>
						</div> */}
            {activeIdx != 0 && (
              <div className="flex gap-5 items-center mb-4">
                {modalTabs.map((t: any, i: number) => (
                  <div className="flex items-center" key={i}>
                    <div
                      className={`${
                        radioValue == i ? " bg-green" : "bg-[#fff]"
                      } w-6 h-6 flex items-center border-[2px] border-[#000] rounded-[50%] cursor-pointer`}
                      onClick={() => setRadioValue(i)}
                    >
                      {radioValue == i && (
                        <Image
                          className="ml-[1px]"
                          src="/images/common/sure.png"
                        />
                      )}
                    </div>
                    <div className="ml-2 font-bold text-[18px]">{t}</div>
                    <div className="ml-2">
                      <DesTooltip
                        text={
                          i == 0 ? tooltipDesInfo.free : tooltipDesInfo.salable
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="font-bold mb-2 text-[20px] flex items-center justify-between">
              <div>Name</div>
              <div>{pubName.length}/50</div>
            </div>
            <div className="mb-4">
              <Input
                focusBorderColor={"bg.main"}
                value={pubName}
                onChange={(e: any) => setPubName(e.target.value)}
                placeholder="input"
              />
            </div>
            <div className="font-bold mb-2 text-[20px] flex items-center justify-between">
              <div>
                Description
                <span
                  className="text-[#005DFF] cursor-pointer ml-4 text-[16px]"
                  onClick={() => getDescription()}
                >
                  Help Me Out
                </span>
              </div>
              <div>{description.length}/300</div>
            </div>
            <div className="w-full h-[160px] relative mb-4">
              <Textarea
                height={"160px"}
                focusBorderColor={"bg.main"}
                onChange={(e: any) => setDescription(e.target.value)}
                value={description}
                resize="none"
                placeholder="input"
              />
              <div
                onClick={() => setDescription("")}
                className="absolute right-3 bottom-3 text-[rgba(0,0,0,0.5)] cursor-pointer"
              >
                clear
              </div>
            </div>
            {radioValue === 0 && activeIdx != 0 && (
              <>
                <div className="font-bold mb-2 text-[20px]">
                  Visibility Options
                </div>
                <div className="mb-4">
                  <Select
                    size="large"
                    style={{ width: "100%" }}
                    value={visibility}
                    onChange={(e) => setVisibility(e)}
                    options={[
                      {
                        value: 1,
                        label: "Visible to Everyone",
                        className: "font-eurostile text-[20px]",
                      },
                      {
                        value: 2,
                        label: "Visible to Followers Only",
                        className: "font-eurostile text-[20px]",
                      },
                    ]}
                  />
                </div>
              </>
            )}

            {radioValue === 1 && activeIdx != 0 && (
              <>
                <div className="font-bold mb-2 text-[20px]">Amount</div>
                <div className="mb-4">
                  <NumberInput
                    focusBorderColor={"bg.main"}
                    size="md"
                    value={amount}
                    min={1}
                    max={1000}
                    onChange={(e: any) => setAmount(e)}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper
                        bg="#fff"
                        border="none"
                        _active={{ bg: "#fff" }}
                        children="+"
                      />
                      <NumberDecrementStepper
                        bg="#fff"
                        border="none"
                        _active={{ bg: "#fff" }}
                        children="-"
                      />
                    </NumberInputStepper>
                  </NumberInput>
                </div>
                <div className="font-bold mb-2 text-[20px]">Price</div>
                <div>
                  <Input
                    type="number"
                    focusBorderColor={"bg.main"}
                    value={price}
                    onChange={(e: any) =>
                      e.target.value < 0
                        ? setPrice(0)
                        : setPrice(e.target.value)
                    }
                    placeholder="input"
                  />
                </div>
              </>
            )}

            <div className="flex ml-[auto] w-[fit-content] mt-8 items-center">
              {radioValue === 1 && (
                <div className="mr-4 text-center">
                  <div className="font-bold">{price} USDT</div>
                </div>
              )}

              <div>
                <Button
                  variant="primary"
                  loadingText={radioValue === 0 ? "Confirm" : "Sell"}
                  isLoading={saleLoad}
                  size="md"
                  w="140px"
                  onClick={() => launch()}
                  isDisabled={!pubName || !description || !price || !amount}
                >
                  <div>
                    <span className="mr-1 text-[20px]">
                      {radioValue === 0 ? "Confirm" : "Sell"}
                    </span>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </BaseModal>
        <BaseModal
          isOpen={isPublishGalleryOpen}
          onClose={() => {
            setIsPublishGalleryOpen(false);
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
              <div>
                Comments
                <span className="text-[12px] text-[#666] ml-1">(optional)</span>
              </div>
              {/* <div>{pubComment.length}/50</div> */}
            </div>
            <div className="mb-4">
              <Input
                focusBorderColor={"bg.main"}
                value={pubComment}
                onChange={(e: any) => setPubComment(e.target.value)}
                placeholder="what do you think of this prompt"
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
        <NoScrollModal />
        <div
          className={`${
            showNotion ? "h-[calc(100vh-174px)]" : "h-[calc(100vh-134px)]"
          } overflow-auto`}
          ref={myRef}
        >
          <div className="w-[90%] mx-[auto]">
            <div className="flex justify-between gap-20">
              <div className="w-[55%] shrink-0">
                <div className="flex border-b-[2px] border-[#CCCCCC] sticky top-0 z-10 bg-[url('/images/bg.png')] bg-[lenth:4000px_4000px] mb-8 items-center">
                  {tabs.map((t: any, i: number) => (
                    <div
                      key={i}
                      onClick={() => {
                        tabChange(i);
                      }}
                      className={`mr-14 relative text-[24px] h-16 cursor-pointer flex items-center justify-center ${
                        activeIdx === i ? "text-[#000]" : "text-[#B3B3B0]"
                      } ${
                        router.query &&
                        router.query.kind &&
                        router.query.kind == "gallery" &&
                        t == "Memo"
                          ? "hidden"
                          : ""
                      }`}
                    >
                      {t}
                      {activeIdx === i && (
                        <div className="absolute bottom-[-4px] left-0 w-full bg-black h-[6px] rounded-[3px]"></div>
                      )}
                    </div>
                  ))}
                  <div className="ml-auto text-[18px] flex items-center">
                    <Image src="/images/promtpoint.svg" alt="" />
                    <span className="mt-1">{coupon}</span>
                    <div className="ml-2">
                      <DesTooltip text={tooltipDesInfo.promptPoint} />
                    </div>
                  </div>
                </div>
                {tabs[activeIdx] == "MBTI" && (
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
                )}
                <div className="mb-8">
                  <div className="font-[600] text-[24px] mb-3 flex items-center">
                    <div>Text Prompt</div>
                    <div className="ml-2">
                      <DesTooltip text={tooltipDesInfo.prompt} />
                    </div>

                    {activeIdx != 1 && (
                      <div
                        onClick={() =>
                          window.open(
                            "https://mirror.xyz/knexus.eth/wB8bepkZZVw45iPJnT3_LH6vqyvSizN7dicEOQmDPlw",
                            "_blank",
                          )
                        }
                        className={`shrink-0 cursor-pointer mr-4 h-full py-1 text-[16px] rounded-[20px] px-4 bg-green ml-2`}
                      >
                        Prompt guide
                      </div>
                    )}

                    <div className="ml-[auto] text-[18px]">
                      {positive_prompt.length}/1000
                    </div>
                  </div>
                  <div className="w-full h-[140px] relative">
                    <Textarea
                      height={"140px"}
                      resize="none"
                      borderWidth="2px"
                      borderColor="#ccc"
                      focusBorderColor={"bg.main"}
                      onChange={(e: any) => setPositive_prompt(e.target.value)}
                      value={positive_prompt}
                      placeholder="input"
                    />
                    <div
                      onClick={() => setPositive_prompt("")}
                      className="absolute right-3 bottom-3 text-[rgba(0,0,0,0.5)] cursor-pointer z-10"
                    >
                      clear
                    </div>
                  </div>
                </div>
                {tabs[activeIdx] == "MBTI" ||
                tabs[activeIdx] == "Basic" ||
                tabs[activeIdx] == "Master" ? (
                  <>
                    {(tabs[activeIdx] == "Basic" ||
                      tabs[activeIdx] == "Master") && (
                      <>
                        <div className="mb-8">
                          <div className="font-[600] text-[24px] mb-3 flex items-center">
                            <div>Style</div>
                            <div className="ml-2">
                              <DesTooltip text={tooltipDesInfo.style} />
                            </div>
                          </div>
                          <div className="w-full card-grid-column-create-style">
                            {styleEnumConfig.map((t: any, i: number) => (
                              <div
                                key={i}
                                className={`${
                                  activeIdx1 == i ? "" : ""
                                } box-border rounded-[20px] relative`}
                              >
                                <Image
                                  className="w-full h-full rounded-[20px]"
                                  src={t.activeImg}
                                  objectFit="cover"
                                />
                                <div
                                  onClick={() => setActiveIdx1(i)}
                                  className={`${
                                    activeIdx1 == i
                                      ? "border-[2px] border-green"
                                      : "bg-[rgba(0,0,0,0.6)]"
                                  } rounded-[20px] cursor-pointer absolute top-0 left-0 h-full w-full flex items-center justify-center text-[#fff] text-[1.1em] font-bold`}
                                >
                                  {t.label}
                                </div>
                              </div>
                            ))}
                          </div>
                          {styleEnumConfig[activeIdx1]["des"] && (
                            <p className="mt-5">
                              {styleEnumConfig[activeIdx1]["des"]}
                            </p>
                          )}
                        </div>
                        <div className="mb-8">
                          <div className="font-[600] text-[24px] mb-3 flex items-center">
                            <div>Sampler</div>
                            <div className="ml-2">
                              <DesTooltip text={tooltipDesInfo.mode} />
                            </div>
                          </div>
                          <div>
                            <Select
                              size="large"
                              style={{ width: "100%" }}
                              value={sampling_method}
                              onChange={(e: any) => setSampling_method(e)}
                              options={[
                                {
                                  value: "Euler",
                                  label: "Euler",
                                  className: "font-eurostile text-[20px]",
                                },
                                {
                                  value: "Euler a",
                                  label: "Euler a",
                                  className: "font-eurostile text-[20px]",
                                },
                                {
                                  value: "LMS",
                                  label: "LMS",
                                  className: "font-eurostile text-[20px]",
                                },
                                // { value: 'Heun', label: 'Heun', className: 'font-eurostile text-[20px]' },
                                // { value: 'DPM2', label: 'DPM2', className: 'font-eurostile text-[20px]' },
                                // { value: 'DPM2 a', label: 'DPM2 a', className: 'font-eurostile text-[20px]' },
                                {
                                  value: "DPM++ 2S a",
                                  label: "DPM++ 2S a",
                                  className: "font-eurostile text-[20px]",
                                },
                                {
                                  value: "DPM++ 2M",
                                  label: "DPM++ 2M",
                                  className: "font-eurostile text-[20px]",
                                },
                                {
                                  value: "DPM++ SDE",
                                  label: "DPM++ SDE",
                                  className: "font-eurostile text-[20px]",
                                },
                                {
                                  value: "DPM++ 2M SDE",
                                  label: "DPM++ 2M SDE",
                                  className: "font-eurostile text-[20px]",
                                },
                                {
                                  value: "DPM fast",
                                  label: "DPM fast",
                                  className: "font-eurostile text-[20px]",
                                },
                                // { value: 'DPM adaptive', label: 'DPM adaptive', className: 'font-eurostile text-[20px]' },
                                // { value: 'DMP fast', label: 'DMP fast', className: 'font-eurostile text-[20px]' },
                                // { value: 'DMP adaptive', label: 'DMP adaptive', className: 'font-eurostile text-[20px]' },
                                // { value: 'LMS Karras', label: 'LMS Karras', className: 'font-eurostile text-[20px]' },
                                // { value: 'DPM2 Karras', label: 'DPM2 Karras', className: 'font-eurostile text-[20px]' },
                                // { value: 'DPM2 a Karras', label: 'DPM2 a Karras', className: 'font-eurostile text-[20px]' },
                                // { value: 'DPM++ 2S a Karras', label: 'DPM++ 2S a Karras', className: 'font-eurostile text-[20px]' },
                                {
                                  value: "DPM++ 2M Karras",
                                  label: "DPM++ 2M Karras",
                                  className: "font-eurostile text-[20px]",
                                },
                                {
                                  value: "DPM++ SDE Karras",
                                  label: "DPM++ SDE Karras",
                                  className: "font-eurostile text-[20px]",
                                },
                                {
                                  value: "DPM++ 2M SDE Karras",
                                  label: "DPM++ 2M SDE Karras",
                                  className: "font-eurostile text-[20px]",
                                },
                                {
                                  value: "DDIM",
                                  label: "DDIM",
                                  className: "font-eurostile text-[20px]",
                                },
                                {
                                  value: "PLMS",
                                  label: "PLMS",
                                  className: "font-eurostile text-[20px]",
                                },
                                {
                                  value: "UniPC",
                                  label: "UniPC",
                                  className: "font-eurostile text-[20px]",
                                },
                              ]}
                            />
                          </div>
                        </div>
                        <div className="mb-8">
                          <div className="font-[600] text-[24px] mb-3">
                            <div className="flex items-center justify-between">
                              <div>Performance</div>
                              <div>{performance}</div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className="w-full">
                              <Slider
                                aria-label="slider-ex-1"
                                step={0.1}
                                max={1}
                                min={-1}
                                value={performance}
                                onChange={(e: any) => {
                                  setPerformance(e);
                                  console.log(e);
                                }}
                              >
                                <SliderTrack bg={"#000"}>
                                  <SliderFilledTrack bg={"bg.main"} />
                                </SliderTrack>
                                <SliderThumb bg={"bg.main"} />
                              </Slider>
                            </div>
                          </div>
                          <div className="flex justify-between items-center font-[600] text-[18px]">
                            <div>Speed</div>
                            <div className="ml-[4px]">0</div>
                            <div>Quality</div>
                          </div>
                        </div>
                        {tabs[activeIdx] == "Master" && (
                          <>
                            <div className="mb-8">
                              <div className="font-[600] text-[24px] mb-3 flex items-center">
                                <div>Size</div>
                                <div className="ml-2">
                                  <DesTooltip text={tooltipDesInfo.size} />
                                </div>
                              </div>
                              <div className="flex">
                                {sizes.map((t: any, i: number) => (
                                  <div
                                    key={i}
                                    onClick={() => setActSize(i)}
                                    className={`cursor-pointer mr-10 border-[2px] border-[#ccc] h-[100px] w-[100px] rounded-[10px] ${
                                      actSize == i
                                        ? "bg-[#000]"
                                        : "bg-[#D5F95F]"
                                    }`}
                                  >
                                    <div className="flex items-center justify-center h-[70px]">
                                      <div
                                        className={`w-[50px] ${
                                          i == 0
                                            ? "h-[50px]"
                                            : i == 1
                                            ? "h-[37px]"
                                            : "h-[28px]"
                                        } ${
                                          actSize == i
                                            ? "bg-[#D5F95F]"
                                            : "bg-[#000]"
                                        }`}
                                      ></div>
                                    </div>
                                    <div
                                      className={` ${
                                        actSize == i
                                          ? "text-[#D5F95F]"
                                          : "text-[#000]"
                                      } flex justify-center h-[30px] font-[600]`}
                                    >
                                      {t}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className=" mb-3">
                              <div className="flex items-center justify-between">
                                <div className="font-[600] text-[24px] mb-3 flex items-center">
                                  <div>Image Prompt</div>
                                  <div className="ml-2">
                                    <DesTooltip
                                      text={tooltipDesInfo.controlnet}
                                    />
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
                                  {imgUrl ? (
                                    <div className="relative w-[fit-content] max-w-[200px]">
                                      <Image src={imgUrl} />
                                      <Image
                                        className="right-3 top-3 absolute h-8 w-8 cursor-pointer hover:opacity-70"
                                        onClick={() => setImgUrl("")}
                                        src="/images/common/delete-img.png"
                                      />
                                    </div>
                                  ) : (
                                    <>
                                      {uploadLoading ? (
                                        <div className="w-full h-[196px] flex items-center justify-center">
                                          <SyncLoader color="#000" size={10} />
                                        </div>
                                      ) : (
                                        <Dragger
                                          className="creat-upload"
                                          maxCount={1}
                                          fileList={[]}
                                          customRequest={(e: any) =>
                                            uploadFile(e.file, "1")
                                          }
                                          accept=".jpg, .jpeg, .png"
                                        >
                                          <div className="h-[160px] flex items-center justify-center">
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
                                <div className="mb-8">
                                  <div className="font-[600] text-[24px] mb-3 flex items-center">
                                    <div>Preprocessor</div>
                                    <div className="ml-2">
                                      <DesTooltip
                                        text={tooltipDesInfo.preprocessor}
                                      />
                                    </div>
                                  </div>
                                  <div>
                                    <Cascader
                                      size="large"
                                      onChange={(e, opt) =>
                                        cascaderChange(e, opt)
                                      }
                                      value={preprocessor}
                                      popupClassName={"create-cascader"}
                                      options={preprocessorEnumConfig}
                                      placeholder="Please select"
                                      style={{ width: "100%" }}
                                    />
                                  </div>
                                </div>
                                <div className="mb-5">
                                  <div className="font-[600] text-[24px] mb-3 flex items-center">
                                    <div>Weight</div>
                                    <div className="ml-2">
                                      <DesTooltip
                                        text={tooltipDesInfo.weight}
                                      />
                                    </div>
                                  </div>
                                  <div className="flex items-center">
                                    <div className="w-[calc(100%-120px)] mr-5">
                                      <Slider
                                        aria-label="slider-ex-1"
                                        step={1}
                                        value={Math.round((weight / 2) * 100)}
                                        onChange={(e: any) =>
                                          setWeight(
                                            Math.floor(
                                              Math.ceil(
                                                ((e / 100) * 2) / 0.05,
                                              ) *
                                                0.05 *
                                                100,
                                            ) / 100,
                                          )
                                        }
                                      >
                                        <SliderTrack bg={"#000"}>
                                          <SliderFilledTrack bg={"bg.main"} />
                                        </SliderTrack>
                                        <SliderThumb bg={"bg.main"} />
                                      </Slider>
                                    </div>
                                    <div className="w-[100px]">
                                      <NumberInput
                                        focusBorderColor={"bg.main"}
                                        size="md"
                                        step={0.05}
                                        value={weight}
                                        min={0}
                                        max={2}
                                        onChange={(e: any) => setWeight(e)}
                                      >
                                        <NumberInputField />
                                        <NumberInputStepper>
                                          <NumberIncrementStepper
                                            bg="#fff"
                                            border="none"
                                            fontSize="18px"
                                            _active={{ bg: "#fff" }}
                                            children="+"
                                          />
                                          <NumberDecrementStepper
                                            bg="#fff"
                                            border="none"
                                            fontSize="18px"
                                            _active={{ bg: "#fff" }}
                                            children="-"
                                          />
                                        </NumberInputStepper>
                                      </NumberInput>
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}
                          </>
                        )}
                      </>
                    )}

                    <div className="fixed bottom-0 w-[calc(100vw)] left-0 bg-[#000] py-3 z-10">
                      <div className="left-[10%] w-[calc(30%)] ml-[15%]">
                        <Button
                          variant="primary"
                          size="lg"
                          height="40px"
                          isDisabled={loading || !positive_prompt}
                          w="full"
                          onClick={() => generateImg()}
                        >
                          Create NOW
                          <span className="text-[14px] ml-2">
                            {" "}
                            -
                            {tabs[activeIdx] == "Basic" ||
                            tabs[activeIdx] == "MBTI"
                              ? "1"
                              : "2"}{" "}
                            Prompt Point
                          </span>
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {tabs[activeIdx] == "Memo" && (
                      <>
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
                      </>
                    )}
                  </>
                )}
              </div>
              {tabs[activeIdx] == "MBTI" ||
              tabs[activeIdx] == "Basic" ||
              tabs[activeIdx] == "Master" ? (
                <div
                  className="w-[calc(45%-80px)] mb-8"
                  onContextMenu={(e: any) => e.preventDefault()}
                >
                  <div className="sticky top-[20px]">
                    <div className="mt-5 shrink-0 ">
                      {imgChoose.length > 0 || selectImgUrl.length > 0 ? (
                        <>
                          {selectImgUrl.length > 0 ? (
                            <div className="border-green border-[4px] rounded-[20px] overflow-hidden relative">
                              <Image
                                className="w-full"
                                src={selectImgUrl[0]["url"]}
                              />
                              <WaterPrint userName={name || `User${num}`} />
                            </div>
                          ) : (
                            <div className="border-green border-[4px] rounded-[20px] overflow-hidden relative">
                              <Image
                                className="w-full"
                                src={imgChoose[0]["url"]}
                              />
                              <WaterPrint userName={name || `User${num}`} />
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <div
                            className={`${
                              loading || tabs[activeIdx] == "MBTI"
                                ? "bg-green border-[2px] border-[#000] rounded-[10px] overflow-hidden"
                                : ""
                            }`}
                          >
                            {loading ? (
                              <div className="h-[30vw] flex items-center justify-center ">
                                <SyncLoader color="#000" size={10} />
                              </div>
                            ) : (
                              <div
                                className={`${
                                  tabs[activeIdx] != "MBTI"
                                    ? "border-[#000] border-[2px] rounded-2xl relative overflow-hidden"
                                    : "relative"
                                }`}
                              >
                                <Image
                                  className={`w-full`}
                                  src={
                                    tabs[activeIdx] == "MBTI"
                                      ? "/images/common/mbti-test.png"
                                      : "/images/common/basic-master.png"
                                  }
                                />
                                <Image
                                  className="absolute bottom-4 w-[50px] right-4"
                                  src="/images/logo-notext.svg"
                                />
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                    {tabs[activeIdx] == "Master" && (
                      <>
                        <div
                          className="flex justify-between gap-5 mt-5"
                          ref={imgRef2}
                        >
                          {imgChoose.length > 0 &&
                            imgChoose.map((t: any, i: number) => (
                              <div
                                key={i}
                                className="max-w-[calc(33.3%-10px)] flex-1 min-h-[120px] flex items-center justify-center"
                                onClick={() => {
                                  console.log(t);
                                  setSelectImgUrl([t]);
                                }}
                              >
                                <div className="border-green border-[4px] rounded-[24px] overflow-hidden relative">
                                  <Image
                                    className="cursor-pointer"
                                    src={t["thumbnail_image"]}
                                  />
                                  {t["url"] === selectImgUrl[0]["url"] && (
                                    <div className="w-[36px] h-[34px] bg-green rounded-tl-[24px] absolute z-40 bottom-0 right-0 text-black flex items-center justify-center">
                                      <Image src="/images/selected.svg" />
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          {imgChoose.length === 0 &&
                            defaultImgs.map((t: any, i: number) => (
                              <div
                                key={i}
                                className={`flex-1 min-h-[120px] flex items-center justify-center ${
                                  loading
                                    ? "bg-green border-[2px] border-[#000] rounded-[10px]"
                                    : ""
                                }`}
                              >
                                {loading ? (
                                  <SyncLoader color="#000" size={10} />
                                ) : (
                                  <div className="border-[#000] border-[2px] rounded-2xl overflow-hidden">
                                    <Image
                                      className="cursor-pointer w-full"
                                      src="/images/common/basic-master.png"
                                    />
                                  </div>
                                )}
                              </div>
                            ))}
                        </div>
                        <div className="mt-5">
                          <p>1. Create a batch of 3 images.</p>
                          <p>
                            2. Choose 1 image to mint the final Generative NFT.
                          </p>
                        </div>
                      </>
                    )}
                    <div className="mb-10">
                      <Button
                        variant="primary"
                        height="40px"
                        isDisabled={selectImgUrl.length == 0}
                        size="lg"
                        w="200px"
                        className="mt-5"
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
                        Next
                      </Button>
                    </div>
                    <div className="font-[600] text-[24px] mb-3">History</div>
                    <div
                      className="grid gap-5 grid-cols-3 max-h-[400px] overflow-auto mb-10 show-scroll pr-1"
                      ref={imgRef3}
                    >
                      {hisImgs.map((t: any, i: number) => (
                        <div
                          className="relative flex items-center rounded-[24px] border-green border-[4px] overflow-hidden justify-center"
                          key={i}
                          onClick={() => {
                            console.log(t);
                            resetParams(t);
                            setSelectImgUrl([
                              { id: t.request_id, url: t.collection_image },
                            ]);
                          }}
                        >
                          <Image
                            className="cursor-pointer w-full"
                            src={t.thumbnail_image}
                          />
                          {selectImgUrl.length > 0 &&
                            t["request_id"] === selectImgUrl[0]["id"] && (
                              <div className="w-[36px] h-[34px] bg-green rounded-tl-[24px] absolute z-40 bottom-0 right-0 text-black flex items-center justify-center">
                                <Image src="/images/selected.svg" />
                              </div>
                            )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="w-[calc(45%-80px)] shrink-0">
                    <div className="mb-8 mt-5">
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
                              customRequest={(e: any) =>
                                uploadFile(e.file, "2")
                              }
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
                    <div>
                      <Button
                        variant="primary"
                        height="40px"
                        isDisabled={!cusImgUrl || !positive_prompt}
                        size="lg"
                        w="200px"
                        onClick={() => {
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
                        Next
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Create;
