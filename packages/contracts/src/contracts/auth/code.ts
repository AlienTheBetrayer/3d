import { db } from "@repo/db";
import z from "zod";

export const code = z.object({
  email: z.email(),
  type: z.enum(db.verification_code_type.enumValues),
  action: z.enum(["login", "connect"]).optional(),
});

export type Code = z.infer<typeof code>;

export type CodeResponse = boolean;
