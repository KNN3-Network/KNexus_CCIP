export interface INftCard {
  type?: string;
  showImgHoverIcon?: boolean;
  image?: string;
  status?: number;
  id: string;
  name: string;
  like_count: number;
  price?: number;
  control_img: string;
  collection_image: string;
  thumbnail_image: string;
  thumbnail: string;
  sale_count?: number;
  used_count?: number;
  collection_id?: string;
  updated_at?: string;
  user_id?: string;
  created_by?: string;
  kind?: number;
  style_key?: string;
  description?: string;
  collection?: any;
  campaign_id?: any;
  user: {
    name: string;
    image: string;
    num: string;
  };
  like: string[] | [];
  boxId: string;
}

export enum SortBy {
  Likes = 1,
  Newest,
  Hottest,
}

const arr1 = ["1:1", "16:9", "4:3"] as const;

type TupleArr<T extends ReadonlyArray<unknown>> = T[number][];

export type Size = TupleArr<typeof arr1>;
