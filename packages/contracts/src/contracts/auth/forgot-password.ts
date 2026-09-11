import { db } from "@repo/db";
import { login } from "./login.js";
import z from "zod";

export const forgotPassword = login;

export type ForgotPassword = z.infer<typeof forgotPassword>;

export type ForgotPasswordResponse = {
  user: db.Users;
};
