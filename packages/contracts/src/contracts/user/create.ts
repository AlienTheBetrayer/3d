import { db } from "@repo/db";
import z from "zod";
import { passwordSchema } from "../../shared/auth.js";

export const create = z.object({
  userId: z.nanoid().optional(),
  email: z.email("Please enter a valid email address."),
  username: z.string().optional(),
  password: passwordSchema.nullable(),
});

export type Create = z.infer<typeof create>;

export type CreateResponse = {
  user: db.Users;
};
