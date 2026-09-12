import { config } from "@repo/config";
import z from "zod";

/**
 * schemas
 */
export const passwordSchema = z
  .string()
  .min(config.auth.password.length.min, `Password must be at least ${config.auth.password.length.min} characters`)
  .max(config.auth.password.length.max, `Password must be at most ${config.auth.password.length.max} characters`);

export const codeSchema = z
  .string()
  .length(config.auth.code.length, `Code must be ${config.auth.code.length} characters long`);

export const tokenPayloadSchema = z.object({
  sessionId: z.nanoid(),
  userId: z.nanoid(),
});

/**
 * types
 */
export type TokenPayload = z.infer<typeof tokenPayloadSchema>;
