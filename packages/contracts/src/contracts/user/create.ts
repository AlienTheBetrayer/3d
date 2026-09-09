import z from "zod";
import { shared } from "../../index.js";
import { Users } from "@repo/db";

export const create = z.object({
  userId: z.nanoid().optional(),
  email: z.email("Please enter a valid email address."),
  username: z.string().optional(),
  password: shared.auth.passwordSchema.nullable(),
});

export type Create = z.infer<typeof create>;

export type CreateResponse = {
  user: Users;
};
