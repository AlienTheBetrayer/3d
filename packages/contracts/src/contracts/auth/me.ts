import { db } from "@repo/db";
import z from "zod";

export const me = z.void();

export type Me = z.infer<typeof me>;

export type MeResponse = {
  user: db.Users;
  session: db.AuthSessions;
};
