import { Users } from "@repo/db";
import z from "zod";

export const delete_ = z.object({
  userId: z.nanoid(),
});

export type Delete = z.infer<typeof delete_>;

export type DeleteResponse = {
  user: Users;
};
