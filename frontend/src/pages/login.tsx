import React, { useEffect, useRef, useState } from "react";

import { Router, useRouter } from "next/router";

import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  createStandaloneToast,
} from "@chakra-ui/react";
import { Checkbox } from "antd";
import api from "api";
import { NextSeo } from "components";
import { SureEmailModal } from "components/common";
import useWeb3Context from "hooks/useWeb3Context";
import { useWalletStore } from "store/walletStore";

const { ToastContainer, toast } = createStandaloneToast();

let interval: any;

const Login = () => {
  const router = useRouter();

  const { doLogin, connectWallet, getUserInfo } = useWeb3Context();

  const [isChecked, setIsChecked] = useState<boolean>(false);

  const { setJwt, setAutoConnect } = useWalletStore();

  const [agreeVeri, setAgreeVeri] = useState<boolean>(true);

  const [loading, setLoading] = useState<boolean>(false);

  const [emailModalOpen, setEmailModalOpen] = useState<boolean>(false);

  const [emailSendTime, setEmailSendTime] = useState<number>(0);

  const [email, setEmail] = useState<string>("");

  const connectClick = async (type: any) => {
    // if (!isChecked) {
    //   setAgreeVeri(false);
    //   toast({
    //     title: "Please check out the Terms of Use and Privacy Policy.",
    //     status: "info",
    //     variant: "subtle",
    //     duration: 3000,
    //     isClosable: true,
    //     position: "top-right",
    //   });
    //   return false;
    // } else {
    //   setAgreeVeri(true);
    // }

    const res = await connectWallet(type);

    try {
      if (res) {
        await doLogin(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const googleLogin = () => {
    if (!isChecked) {
      setAgreeVeri(false);
      return false;
    } else {
      setAgreeVeri(true);
    }
    window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=560651742100-jlhr8apqg2qc74vc0tmq61d5pf0ege4p.apps.googleusercontent.com&redirect_uri=https://v2.knexus.xyz/oauth/gmail&response_type=code&scope=https://www.googleapis.com/auth/gmail.readonly&state=knexus$success=${window.location.origin}/login$fail=${window.location.origin}/login`;
  };

  const loginEmail = async () => {
    // if (!isChecked) {
    //   setAgreeVeri(false);
    //   toast({
    //     title: "Please check out the Terms of Use and Privacy Policy.",
    //     status: "info",
    //     variant: "subtle",
    //     duration: 3000,
    //     isClosable: true,
    //     position: "top-right",
    //   });
    //   return false;
    // } else {
    //   setAgreeVeri(true);
    // }
    if (emailSendTime != 0) {
      setEmailModalOpen(true);
      return false;
    }
    setLoading(true);
    const res: any = await api.post(`/api/user/sendEmail`, {
      email,
      event: router?.query?.from == "early" ? "Login_Early" : "Login",
    });
    setLoading(false);
    if (res && res.data && res.data.errorMsg) {
      console.log(res.data.errorMsg);
    } else if (res) {
      setAutoConnect(false);
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

  useEffect(() => {
    if (router && router.query && router.query.j) {
      const jwtCode: any = router.query.j;
      const res = JSON.parse(atob(jwtCode));
      if (res && res.data && res.data.accessToken) {
        setJwt(res.data.accessToken);
        api.defaults.headers.authorization = `Bearer ${res.data.accessToken}`;
        getUserInfo();
      }
    }
  }, [router]);

  return (
    <>
      <NextSeo title="Login | Knexus" />
      <SureEmailModal
        isOpen={emailModalOpen}
        onClose={() => setEmailModalOpen(false)}
        email={email}
        emailSendTime={emailSendTime}
        loginEmail={loginEmail}
        isLoading={loading}
        title={"Registration Verification Required"}
      />
      <div className="w-full h-full bg-[#fff] flex gap-10 justify-between">
        <div className="flex-1 h-[100vh] p-10 relative flex items-center justify-center">
          <div
            className="flex justify-between absolute w-full top-10 left-10 cursor-pointer"
            onClick={() => router.push(`/home`)}
          >
            <div className="flex items-center">
              <Image
                className="cursor-pointer"
                src="/images/common/login-logo.png"
                height="54px"
                mr="10px"
              />
              <div className="mr-20 text-[28px] font-bold">KNexus</div>
            </div>
          </div>

          <div className="w-[80%]">
            <div className="flex items-center">
              <div className="text-[30px] font-bold mr-2">/: Hello </div>
              <div>
                <Image
                  className="cursor-pointer"
                  src="/images/common/login-hi.png"
                  height="46px"
                  mr="10px"
                />
              </div>
            </div>
            <div className="w-full text-[20px] text-[rgba(0,0,0,0.6)]">
              Discover, learn, create, buy & sell Prompt on KNexus
            </div>
            <div className="w-full text-[20px] text-[rgba(0,0,0,0.6)] mb-8">
              Join our vibrant community of prompt enthusiasts, push the
              boundaries of AIGC🌟
            </div>

            {/* <Button variant="primary" onClick={() => googleLogin()} className="flex items-center w-full text-[24px]" height={'54px'}>
                            <Image
                                className="mr-2"
                                src='/images/common/google.png'
                            />
                            Continue with Google
                        </Button> */}

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
              onClick={() => loginEmail()}
              className="flex items-center w-full text-[24px]"
              height={"46px"}
            >
              Sign in with email link
            </Button>

            <p className="text-center font-bold text-[20px] text-[rgba(0,0,0,0.6)] my-6">
              OR
            </p>

            <div className="mb-5">
              <Button
                variant="whitePrimary"
                className="flex items-center w-full border-[2px] border-[#ccc]"
                height={"50px"}
                onClick={() => connectClick("")}
              >
                <Image src="/images/common/metamask.png" />
              </Button>
            </div>
            <div className="mb-5">
              <Button
                variant="whitePrimary"
                className="flex items-center w-full border-[2px] border-[#ccc]"
                height={"50px"}
                onClick={() => connectClick("walletconnect")}
              >
                <Image src="/images/common/mobile-wallet.png" />
              </Button>
            </div>
            <div
              className={`flex items-center ${
                agreeVeri || isChecked ? "" : "text-[red]"
              }`}
            >
              <div className="flex items-center">
                <Checkbox
                  className="mr-2 flex items-center"
                  checked={isChecked}
                  onChange={(e) => {
                    console.log(e);
                    setIsChecked(e.target.checked);
                  }}
                ></Checkbox>
              </div>
              <div className="mt-1">
                I agree to the
                <span
                  className="text-[#127BDB] cursor-pointer"
                  onClick={() =>
                    window.open("https://knexus.xyz/terms-of-use/", "_blank")
                  }
                >
                  {" "}
                  Terms of Use{" "}
                </span>{" "}
                and the
                <span
                  className="text-[#127BDB] cursor-pointer"
                  onClick={() =>
                    window.open("https://knexus.xyz/privacy-policy/", "_blank")
                  }
                >
                  {" "}
                  Privacy Policy
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 h-[100vh] flex items-center justify-center overflow-hidden">
          <Image src="/images/common/login-bg.png" />
        </div>
      </div>
    </>
  );
};

export default Login;
