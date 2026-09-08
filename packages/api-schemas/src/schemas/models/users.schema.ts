import * as z from 'zod';

export const usersSchema = z.object({
  id: z.string(),
  email: z.string(),
  username: z.string(),
  password: z.string().nullish(),
  deleted_at: z.date().nullish(),
  edited_at: z.date().nullish(),
  created_at: z.date(),
  color: z.string(),
  image_url: z.string(),
  emoji: z.string().nullish(),
  status: z.string().nullish(),
});

export type usersType = z.infer<typeof usersSchema>;
