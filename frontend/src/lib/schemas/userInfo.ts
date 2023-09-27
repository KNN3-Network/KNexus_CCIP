import z from "zod";

export const userInfoSchema = z.object({
  id: z.string(),
  num: z.number(),
  address: z.string(),
  name: z.string().nullable(),
  description: z.string().nullable(),
  coupon: z.number(),
  image: z.string().nullable(),
  created_at: z.string().pipe(z.coerce.date()),
  updated_at: z.string().pipe(z.coerce.date()),
  owners: z.number(),
  items: z.number(),
  total: z.number(),
  is_wait_list: z.number(),
  likeRefresh: z.boolean(),
  follow_follower_followee: z.array(z.string()),
});

export type UserInfo = z.infer<typeof userInfoSchema>;

export type UserInfoInput = z.input<typeof userInfoSchema>;
