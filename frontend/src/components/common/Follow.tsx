import React, { useCallback, useEffect, useState } from "react";

import { useRouter } from "next/router";

import { CheckOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Image } from "@chakra-ui/react";
import { createStandaloneToast } from "@chakra-ui/react";
import api from "api";
import { useUserInfoStore } from "store/userInfoStore";

const { ToastContainer, toast } = createStandaloneToast();

interface IFollow {
  isFollow?: boolean;
  id: string;
  variant?: string;
}

export const Follow = (props: IFollow) => {
  const [followed, setFollowed] = useState<any>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { id, address } = useUserInfoStore((state) => ({
    id: state.id,
    address: state.address,
  }));

  console.log(props);

  const handleFollow = async () => {
    setLoading(true);
    if (followed) {
      const res: any = await api.post(`/api/follow/unfollow`, {
        followee_id: props.id,
      });
      if (res) {
        setFollowed(false);
        // toast({
        //   title: 'Successfully Unfollowed!',
        //   status: 'success',
        //   variant: 'subtle',
        //   duration: 3000,
        //   isClosable: true,
        //   position: 'top-right'
        // })
      }
      setLoading(false);
    } else {
      const res: any = await api.post(`/api/follow`, {
        followee_id: props.id,
      });
      console.log(res);
      if (res) {
        setFollowed(true);
        // toast({
        //   title: 'Successfully Followed!',
        //   status: 'success',
        //   variant: 'subtle',
        //   duration: 3000,
        //   isClosable: true,
        //   position: 'top-right'
        // })
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    setFollowed(props.isFollow);
  }, [props]);

  return (
    <>
      {id != props.id ? (
        <div>
          <Button
            variant={props.variant ? props.variant : "blackPrimary"}
            loadingText={followed ? "Following" : "Follow"}
            isLoading={loading}
            borderRadius={"20px"}
            className="flex items-center ml-[auto]"
            border="none"
            onClick={(e) => {
              e.stopPropagation();
              handleFollow();
            }}
          >
            {followed ? (
              <div className="flex gap-1 items-center">
                <div
                  className={`h-5 w-5 ${
                    props.variant ? "bg-black" : "bg-green"
                  } flex items-center justify-center rounded-[50%]`}
                >
                  <CheckOutlined
                    style={{
                      color: props.variant ? "#D5F95F" : "#000",
                      fontSize: "12px",
                      fontWeight: 600,
                    }}
                  />
                </div>
                Following
              </div>
            ) : (
              <>
                <div className="flex gap-1 items-center">
                  <div
                    className={`h-5 w-5 ${
                      props.variant ? "bg-black" : "bg-green"
                    } flex items-center justify-center rounded-[50%]`}
                  >
                    <PlusOutlined
                      style={{
                        color: props.variant ? "#D5F95F" : "#000",
                        fontSize: "12px",
                        fontWeight: 600,
                      }}
                    />
                  </div>
                  Follow
                </div>
              </>
            )}
          </Button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
