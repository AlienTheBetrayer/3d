import { Connections } from "@repo/db";
import z from "zod";
import { shared } from "../../index.js";
import { auth } from "../index.js";

export const login = z.object({
  connectionId: z.nanoid(),
  code: shared.auth.codeSchema.optional(),
});

export type Login = z.infer<typeof login>;

export type LoginResponse = auth.LoginResponse & {
  connection: Connections;
};
