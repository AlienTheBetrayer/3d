import { db } from "@repo/db";
import z from "zod";

export const edit = z.object({
  userId: z.nanoid(),
  status: z.string().optional(),
  emoji: z.string().optional(),
  color: z.hex().optional(),
});

export type Edit = z.infer<typeof edit>;

export type EditResponse = {
  user: db.Users;
};
