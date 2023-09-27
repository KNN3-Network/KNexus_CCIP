import { create } from "zustand";
import { persist } from "zustand/middleware";

export const usePidCommentStore: any = create<any>()(
  persist(
    (set, get) => ({
      commentData: {
        collection_id: "",
        content: "",
        created_at: "",
        id: "",
        like: [],
        like_count: 0,
        p_id: "",
        rating: null,
        reply_count: 0,
        updated_at: "",
        user: {
          name: "",
          image: "",
          address: "",
        },
        user_id: "",
      },
      setCommentData: (commentData: any) => {
        set({ commentData });
      },
    }),
    {
      name: "usePidCommentStore",
    },
  ),
);
