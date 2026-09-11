import { db } from "@repo/db";
import z from "zod";
import { passwordSchema, codeSchema } from "../../shared/auth.js";

export const login = z.object({
  email: z.email(),
  password: passwordSchema,
  code: codeSchema,
});

export type Login = z.infer<typeof login>;

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  session: db.AuthSessions;
  user: db.Users;
};
