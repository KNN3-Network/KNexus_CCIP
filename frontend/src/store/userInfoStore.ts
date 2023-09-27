import { type UserInfoInput } from "lib/schemas/userInfo";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserInfoStoreActions = {
  setUserStoreInfo: (userInfo: UserInfoInput) => void;
  setLikeRefresh: (likeRefresh: boolean) => void;
  clearUserInfo: () => void;
};

const userInfoInitialState: UserInfoInput = {
  id: "",
  num: 0,
  address: "",
  name: null,
  description: null,
  coupon: 0,
  image: null,
  created_at: "",
  updated_at: "",
  owners: 0,
  items: 0,
  total: 0,
  likeRefresh: false,
  follow_follower_followee: [],
  is_wait_list: 0,
};

export const useUserInfoStore = create<UserInfoInput & UserInfoStoreActions>()(
  persist(
    (set, _) => ({
      ...userInfoInitialState,
      setUserStoreInfo: (userInfo: UserInfoInput) => {
        set({ ...userInfo });
      },
      setLikeRefresh: (likeRefresh: boolean) => {
        set({ likeRefresh });
      },
      clearUserInfo: () => {
        set(userInfoInitialState);
      },
    }),
    {
      name: "useUserInfoStore",
    },
  ),
);
