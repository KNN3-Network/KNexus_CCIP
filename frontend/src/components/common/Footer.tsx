import React from "react";

import { Router, useRouter } from "next/router";

import { Image } from "@chakra-ui/react";
import { useUserInfoStore } from "store/userInfoStore";

export const Footer = () => {
  const router = useRouter();

  const { id } = useUserInfoStore();

  return (
    <div className="w-full h-[fit-content] bg-green px-[120px] pt-10 pb-1">
      <div className="flex gap-12">
        <div className="flex flex-col flex-[2] shrink-0 w-0 min-w-[300px]">
          <div className="flex items-center mb-5">
            <div className="shrink-0">
              <Image
                className="cursor-pointer"
                src="/images/common/black-logo.png"
                height="40px"
                mr="10px"
              />
            </div>
            <div className="text-[24px] font-bold">KNexus</div>
          </div>
          <div className="flex flex-col text-[18px] font-inter">
            <span className="font-bold">Web3 & AI Prompt Marketplace</span>
            <span className="text-[16px]">
              Discover, create, buy & sell Prompt on KNexus
            </span>
          </div>
          <div className="my-2">
            <div
              className="inline-flex mobile:gap-3 tablet:gap-6"
              style={{ margin: "0 auto" }}
            >
              <Image
                src="/images/social/icon1.svg"
                onClick={() => window.open("https://twitter.com/KNexus_KNN3")}
                className="mobile:!w-[30px] tablet:!w-[28px] laptop:!w-[28px] cursor-pointer hover:opacity-80"
                alt=""
              />
              <Image
                src="/images/social/icon5.svg"
                onClick={() => window.open("https://t.me/+PK-CjWDgtDw2N2Zl")}
                className="mobile:!w-[30px] tablet:!w-[28px] laptop:!w-[28px] cursor-pointer hover:opacity-80"
                alt=""
              />
              <Image
                src="/images/social/icon2.svg"
                onClick={() =>
                  window.open("https://discord.com/invite/BabRGjHHWm")
                }
                className="mobile:!w-[30px] tablet:!w-[28px] laptop:!w-[28px] cursor-pointer hover:opacity-80"
                alt=""
              />
              <Image
                src="/images/social/icon4.svg"
                onClick={() => window.open("https://mirror.xyz/knexus.eth")}
                className="mobile:!w-[30px] tablet:!w-[28px] laptop:!w-[28px] cursor-pointer hover:opacity-80"
                alt=""
              />
              <Image
                src="/images/social/icon3.svg"
                onClick={() =>
                  window.open(
                    "https://www.youtube.com/@KNexus-PromptIgnitesInte",
                  )
                }
                className="mobile:!w-[30px] tablet:!w-[28px] laptop:!w-[28px] cursor-pointer hover:opacity-80"
                alt=""
              />
            </div>
          </div>
          <div className="flex gap-12 font-inter flex-col tablet:flex-row">
            <div
              className="cursor-pointer mb-1"
              onClick={() =>
                window.open("https://knexus.xyz/privacy-policy/", "_blank")
              }
            >
              Privacy Policy
            </div>
            <div
              className="cursor-pointer mb-1"
              onClick={() =>
                window.open("https://knexus.xyz/terms-of-use/", "_blank")
              }
            >
              Terms of Service
            </div>
          </div>
        </div>
        <div className="flex-1 text-[16px]">
          <div className=" mb-1 text-[24px] font-bold">Fast Access</div>
          <div
            className="cursor-pointer mb-1 font-inter"
            onClick={() => router.push("/create")}
          >
            Create
          </div>
          <div
            className="cursor-pointer mb-1 font-inter"
            onClick={() =>
              window.open("https://knexus.pandora.staging.knn3.xyz/", "_blank")
            }
          >
            Pandora NFT
          </div>
        </div>
        <div className="flex-1 text-[16px]">
          <div className=" mb-1 text-[24px] font-bold">Marketplace</div>
          <div
            className="cursor-pointer mb-1 font-inter"
            onClick={() => router.push("/marketplace")}
          >
            Marketplace
          </div>
          <div
            className="cursor-pointer mb-1 font-inter"
            onClick={() =>
              router.push(`/account?userId=${id}&activeIndex=${2}`)
            }
          >
            Gallery
          </div>
        </div>
        <div className="flex-1 text-[16px]">
          <div className=" mb-1 text-[24px] font-bold">Resources</div>
          <div
            className="cursor-pointer mb-1 font-inter"
            onClick={() =>
              window.open(
                "https://tall-wildcat-cdb.notion.site/About-KNexus-ff36b75262a047ef9ad7c5898dd1a089?pvs=4",
                "_blank",
              )
            }
          >
            About KNexus
          </div>
          <div
            className="cursor-pointer mb-1 font-inter"
            onClick={() =>
              window.open(
                "https://tall-wildcat-cdb.notion.site/FAQs-355a63cb6cff4c81acb1fed5e1a2cad6?pvs=4",
                "_blank",
              )
            }
          >
            FAQ
          </div>
          <div
            className="cursor-pointer mb-1 font-inter"
            onClick={() =>
              window.open(
                "https://tall-wildcat-cdb.notion.site/KNexus-Docs-3231ca49a93244e9ad2f492dedfcd27d?pvs=4",
                "_blank",
              )
            }
          >
            Documentation
          </div>
        </div>
        <div className="flex-1 text-[16px]">
          <div className=" mb-1 text-[24px] font-bold">Contact Us</div>
          <div className="cursor-pointer font-inter">contact@knexus.xyz</div>
        </div>
      </div>
      {/* <div className="flex gap-5 items-center my-10">
                <div>
                    <Image
                        className="cursor-pointer"
                        src='/images/common/twitter.png'
                        mr='10px'
                    />
                </div>
                <div>
                    <Image
                        className="cursor-pointer"
                        src='/images/common/discord.png'
                        mr='10px'
                    />
                </div>
                <div>
                    <Image
                        className="cursor-pointer"
                        src='/images/common/github.png'
                        mr='10px'
                    />
                </div>
            </div> */}
      <div className="border-t-[2px] border-[#000] text-center pt-1 font-inter">
        Copyright @KNexus 2023
      </div>
    </div>
  );
};
