import React, { useEffect, useRef, useState } from "react";

import { Router, useRouter } from "next/router";

import { Box, Button, Flex, Image } from "@chakra-ui/react";
import { createStandaloneToast } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Checkbox } from "antd";
import api from "api";
import { NextSeo } from "components";
import { SureEmailModal } from "components/common";
import useWeb3Context from "hooks/useWeb3Context";
import { useWalletStore } from "store/walletStore";

const { ToastContainer, toast } = createStandaloneToast();

let interval: any;

const Verifyemail = () => {
  const router = useRouter();

  const { doLogin, connectWallet, getUserInfo } = useWeb3Context();

  const [loading, setLoading] = useState<boolean>(false);

  const [email, setEmail] = useState<any>("");

  const [emailModalOpen, setEmailModalOpen] = useState<boolean>(false);

  const [emailSendTime, setEmailSendTime] = useState<number>(0);

  const { setJwt } = useWalletStore();

  const sendEmail = async () => {
    setLoading(true);
    const res: any = await api.post(`/api/user/sendEmail`, {
      email,
      event: "Bind",
    });
    setLoading(false);
    if (res && res.data && res.data.errorMsg) {
      console.log(res.data.errorMsg);
    } else if (res) {
      setEmailModalOpen(true);
      setEmailSendTime(60);
      interval = setInterval(
        () =>
          setEmailSendTime((prev: any) => {
            if (prev == 1) {
              clearInterval(interval);
            }
            return prev - 1;
          }),
        1000,
      );
    }
  };

  return (
    <>
      <NextSeo title="Login | Knexus" />
      <SureEmailModal
        isOpen={emailModalOpen}
        onClose={() => setEmailModalOpen(false)}
        email={email}
        emailSendTime={emailSendTime}
        loginEmail={sendEmail}
        isLoading={loading}
        title={"Verification Required"}
      />
      <div className="w-full h-full bg-[#fff] flex gap-10 justify-between">
        <div className="flex-1 h-[100vh] p-10 relative flex items-center justify-center">
          <div className="flex justify-between absolute w-full top-10 left-10">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => router.push(`/home`)}
            >
              <Image
                className="cursor-pointer"
                src="/images/common/login-logo.png"
                height="54px"
                mr="10px"
              />
              <div className="mr-20 text-[28px] font-bold">KNexus</div>
            </div>
            <div
              className="flex items-center cursor-pointer"
              onClick={() => router.push("/login")}
            >
              <Image
                className="cursor-pointer"
                src="/images/common/back.png"
                height="20px"
                mr="10px"
              />
              <div className="mr-20 text-[20px] font-bold">Back</div>
            </div>
          </div>

          <div className="w-[80%]">
            <div className="flex items-center">
              <div className="text-[30px] font-bold mr-2">/: Hey, Hello 👋</div>
              {/* <div>
                                <Image
                                    className="cursor-pointer"
                                    src='/images/common/login-hi.png'
                                    height="46px"
                                    mr='10px'
                                />
                            </div> */}
            </div>
            <div className="w-[80%] text-[20px] text-[rgba(0,0,0,0.6)] mb-8">
              Please enter your email
            </div>
            <div className="mb-5">
              <Input
                focusBorderColor={"bg.main"}
                height="46px"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>

            <Button
              variant="primary"
              loadingText={"Continue"}
              isLoading={loading}
              onClick={() => sendEmail()}
              className="flex items-center w-full text-[24px]"
              height={"46px"}
            >
              Continue
            </Button>
          </div>
        </div>
        <div className="flex-1 h-[100vh] flex items-center justify-center overflow-hidden">
          <Image src="/images/common/login-bg.png" />
        </div>
      </div>
    </>
  );
};

export default Verifyemail;
