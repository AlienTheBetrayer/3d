import { db } from "@repo/db";
import z from "zod";

export const get = z.object({
  userId: z.nanoid(),
});

export type Get = z.infer<typeof get>;

export type GetResponse = {
  user: db.Users | null;
};
