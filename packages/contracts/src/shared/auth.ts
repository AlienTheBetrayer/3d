import z from 'zod';

/**
 * variables
 */
export const passwordLength = { min: 8, max: 128 };
export const codeLength = { length: 6 };

/**
 * schemas
 */
export const passwordSchema = z
  .string()
  .min(passwordLength.min, `Password must be at least ${passwordLength.min} characters`)
  .max(passwordLength.max, `Password must be at most ${passwordLength.max} characters`);

export const codeSchema = z.string().length(codeLength.length, `Code must be ${codeLength.length} characters long`);
