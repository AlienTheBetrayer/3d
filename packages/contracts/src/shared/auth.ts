import z from "zod";

/**
 * variables
 */
export const password = {
  length: {
    min: 8,
    max: 128,
  },
};
export const code = { expiryMs: 5 * 60 * 1000, length: 6 };
export const accessToken = { expiryMs: 15 * 60 * 1000 };
export const refreshToken = { expiryMs: 30 * 24 * 60 * 60 * 1000 };

/**
 * schemas
 */
export const passwordSchema = z
  .string()
  .min(password.length.min, `Password must be at least ${password.length.min} characters`)
  .max(password.length.max, `Password must be at most ${password.length.max} characters`);

export const codeSchema = z.string().length(code.length, `Code must be ${code.length} characters long`);

export const tokenPayloadSchema = z.object({
  sessionId: z.nanoid(),
  userId: z.nanoid(),
});

export type TokenPayload = z.infer<typeof tokenPayloadSchema>;
