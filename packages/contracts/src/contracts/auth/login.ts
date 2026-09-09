import z from "zod";
import { shared } from "../../index.js";
import { AuthSessions, Users } from "@repo/db";

export const login = z.object({
  email: z.email(),
  password: shared.auth.passwordSchema,
  code: shared.auth.codeSchema,
});

export type Login = z.infer<typeof login>;

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  session: AuthSessions;
  user: Users;
};
