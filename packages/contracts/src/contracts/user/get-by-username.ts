import z from "zod";
import { user } from "../index.js";

export const getByUsername = z.object({
  username: z.string(),
});

export type getByUsername = z.infer<typeof getByUsername>;

export type GetByUsernameResponse = user.GetRseponse;
