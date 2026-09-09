import { verification_code_type } from "@repo/db";
import z from "zod";

export const code = z.object({
  email: z.email(),
  type: verification_code_type,
  action: z.enum(["login", "connect"]).optional(),
});

export type Code = z.infer<typeof code>;

export type CodeResponse = boolean;
