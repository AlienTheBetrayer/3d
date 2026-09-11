import z from "zod";
import { auth } from "../index.js";
import { db } from "@repo/db";
import { codeSchema } from "../../shared/auth.js";

export const login = z.object({
  connectionId: z.nanoid(),
  code: codeSchema.optional(),
});

export type Login = z.infer<typeof login>;

export type LoginResponse = auth.LoginResponse & {
  connection: db.Connections;
};
