import { AuthSessions } from "@repo/db";
import z from "zod";

export const logout = z.void();

export type Logout = z.infer<typeof logout>;

export type LogoutResponse = {
  session: AuthSessions | null;
};
