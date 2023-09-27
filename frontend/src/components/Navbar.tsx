import React, { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { Button } from "@chakra-ui/react";
import { isPhone } from "lib/tool";
import { BsXLg } from "react-icons/bs";

import LogoDark from "../../public/images/logo-dark.svg";
import Logo from "../../public/images/logo.svg";
import SocalIcon1 from "../../public/images/social/icon1-dark.svg";
import SocalIcon2 from "../../public/images/social/icon2-dark.svg";
import SocalIcon3 from "../../public/images/social/icon3-dark.svg";
import SocalIcon4 from "../../public/images/social/icon4-dark.svg";
import SocalIcon5 from "../../public/images/social/icon5-dark.svg";

export default function Navbar(props: any) {
  const router = useRouter();
  const [showNavMobile, setShowNavMobile] = useState(false);

  const clickToRouter = (routerName?: any) => {
    if (isPhone()) {
      props.showModal();
    } else {
      router.push(`/${routerName}`);
    }
  };

  return (
    <nav
      className="flex justify-between items-center fixed w-full z-50 laptop:py-[40px] mobile:py-[10px] shadow-2xl"
      style={{
        background: "rgba(255, 255, 255, 0.20)",
        boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.20)",
      }}
    >
      <div className="laptop:h-[60px] mobile:h-[40px] w-full absolute top-0 left-0"></div>
      <Image
        src={Logo}
        alt=""
        onClick={() => router.push("/")}
        className="cursor-pointer laptop:ml-20 laptop:w-[178px] laptop:h-[66px] mobile:ml-5 mobile:h-[35px] mobile:w-[104px]"
      />
      {!showNavMobile ? (
        <div
          className="mobile:block laptop:hidden absolute z-30 right-5 cursor-pointer"
          onClick={() => setShowNavMobile(true)}
        >
          <div className="w-[30px] h-[5px] rounded-full bg-[#000] m-[5px]"></div>
          <div className="w-[30px] h-[5px] rounded-full bg-[#000] m-[5px]"></div>
          <div className="w-[30px] h-[5px] rounded-full bg-[#000] m-[5px]"></div>
        </div>
      ) : (
        <>
          <BsXLg
            className="mobile:block laptop:hidden text-black absolute z-30 text-3xl font-bold right-5 cursor-pointer"
            onClick={() => setShowNavMobile(false)}
          />
          <Image
            src={LogoDark}
            alt=""
            onClick={() => router.push("/")}
            className="mobile:block laptop:hidden absolute z-30 left-1/2 -translate-x-1/2 cursor-pointer laptop:ml-20 laptop:w-[178px] laptop:h-[66px] mobile:ml-5 mobile:h-[35px] mobile:w-[104px]"
          />
          <div
            className="fixed bottom-10 z-50 mobile:flex laptop:hidden
            mobile:justify-between mobile:gap-2 mobile:left-1/2 mobile:-translate-x-1/2 
            tablet:gap-4
            laptop:left-20 laptop:gap-6 laptop:-translate-x-0"
          >
            <Image
              onClick={() => window.open("https://twitter.com/KNexus_KNN3")}
              src={SocalIcon1}
              className="mobile:!w-[30px] tablet:!w-[40px] laptop:!w-[40px] cursor-pointer"
              alt=""
            />
            <Image
              onClick={() =>
                window.open("https://discord.com/invite/BabRGjHHWm")
              }
              src={SocalIcon2}
              className="mobile:!w-[30px] tablet:!w-[40px] laptop:!w-[40px] cursor-pointer"
              alt=""
            />
            <Image
              onClick={() =>
                window.open("https://www.youtube.com/@KNexus-PromptIgnitesInte")
              }
              src={SocalIcon3}
              className="mobile:!w-[30px] tablet:!w-[40px] laptop:!w-[40px] cursor-pointer"
              alt=""
            />
            <Image
              onClick={() => window.open("https://mirror.xyz/knexus.eth")}
              src={SocalIcon4}
              className="mobile:!w-[30px] tablet:!w-[40px] laptop:!w-[40px] cursor-pointer"
              alt=""
            />
            <Image
              onClick={() => window.open("https://knn3.substack.com")}
              src={SocalIcon5}
              className="mobile:!w-[30px] tablet:!w-[40px] laptop:!w-[40px] cursor-pointer"
              alt=""
            />
          </div>
        </>
      )}
      <ul
        className={
          !showNavMobile
            ? `mb-0 laptop:text-[#D5F95F] laptop:bg-[#000] laptop:h-auto laptop:w-auto laptop:flex laptop:static laptop:flex-row laptop:mr-20
        mobile:hidden mobile:flex-col mobile:justify-center mobile:items-center mobile:text-center mobile:text-[#000] mobile:fixed mobile:top-0 mobile:bottom-0 mobile:left-0 mobile:right-0 mobile:bg-[#D5F95F] mobile:mr-0 text-xl z-40`
            : `laptop:text-[#D5F95F] laptop:bg-[#000] laptop:h-auto laptop:w-auto laptop:flex laptop:static laptop:flex-row laptop:mr-20
          mobile:flex mobile:flex-col mobile:justify-center mobile:items-center mobile:text-center mobile:text-[#000] mobile:fixed mobile:top-0 mobile:bottom-0 mobile:left-0 mobile:right-0 mobile:bg-[#fefead] mobile:mr-0 text-xl`
        }
      >
        <li className="mobile:w-full laptop:w-auto cursor-pointer">
          <button
            onClick={() => router.push("/pandora")}
            className={`font-eurostile laptop:rounded-full relative
            laptop:py-1 laptop:px-6 mobile:py-4 mobile:w-full
            mobile:focus:bg-black mobile:focus:text-[#D5F95F]
            mobile:hover:bg-black mobile:hover:text-[#D5F95F]
            laptop:focus:bg-[#D5F95F] laptop:focus:text-black
            laptop:hover:bg-[#D5F95F] laptop:hover:text-black
            ${
              router.pathname === "/pandora"
                ? "laptop:bg-[#D5F95F] mobile:bg-black mobile:text-[#D5F95F] laptop:text-black"
                : "mobile:text-black mobile:bg-transparent mobile:text-2xl laptop:text-xl laptop:bg-transparent laptop:text-[#D5F95F]"
            }`}
          >
            Pandora NFT
          </button>
        </li>
        <li className="mobile:w-full laptop:w-auto cursor-pointer">
          <button
            onClick={() => clickToRouter("marketplace")}
            className={`font-eurostile laptop:rounded-full relative
           laptop:py-1 laptop:px-6 mobile:py-4 mobile:w-full
           mobile:focus:bg-black mobile:focus:text-[#D5F95F]
           mobile:hover:bg-black mobile:hover:text-[#D5F95F]
           laptop:focus:bg-[#D5F95F] laptop:focus:text-black
           laptop:hover:bg-[#D5F95F] laptop:hover:text-black
           ${
             router.pathname === "/marketplace"
               ? "laptop:bg-[#D5F95F] mobile:bg-black mobile:text-[#D5F95F] laptop:text-black"
               : "mobile:text-black mobile:bg-transparent mobile:text-2xl laptop:text-xl laptop:bg-transparent laptop:text-[#D5F95F]"
           }`}
          >
            Marketplace
            {/* <span className='laptop:bg-[#D5F95F] laptop:text-[#000] mobile:text-[#D5F95F] mobile:bg-[#000] text-black absolute laptop:top-0 w-[38px] text-[12px] rounded-full' style={{height: 12, lineHeight: '12px'}}>soon</span> */}
          </button>
        </li>
        <li className="mobile:w-full laptop:w-auto cursor-pointer">
          <button
            onClick={() => clickToRouter("create")}
            className={`font-eurostile laptop:rounded-full relative
           laptop:py-1 laptop:px-6 mobile:py-4 mobile:w-full
           mobile:focus:bg-black mobile:focus:text-[#D5F95F]
           mobile:hover:bg-black mobile:hover:text-[#D5F95F]
           laptop:focus:bg-[#D5F95F] laptop:focus:text-black
           laptop:hover:bg-[#D5F95F] laptop:hover:text-black
           ${
             router.pathname === "/create"
               ? "laptop:bg-[#D5F95F] mobile:bg-black mobile:text-[#D5F95F] laptop:text-black"
               : "mobile:text-black mobile:bg-transparent mobile:text-2xl laptop:text-xl laptop:bg-transparent laptop:text-[#D5F95F]"
           }`}
          >
            Create
            {/* <span className='laptop:bg-[#D5F95F] laptop:text-[#000] mobile:text-[#D5F95F] mobile:bg-[#000] text-black absolute laptop:top-0 w-[38px] text-[12px] rounded-full' style={{height: 12, lineHeight: '12px'}}>soon</span> */}
          </button>
        </li>
      </ul>
    </nav>
  );
}
