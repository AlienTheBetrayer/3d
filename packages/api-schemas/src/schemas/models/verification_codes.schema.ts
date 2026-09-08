import * as z from 'zod';
import { verification_code_typeSchema } from '../enums/verification_code_type.schema.js';

export const verification_codesSchema = z.object({
  id: z.string(),
  email: z.string(),
  code: z.string(),
  expiry_at: z.date(),
  created_at: z.date(),
  type: verification_code_typeSchema,
});

export type verification_codesType = z.infer<typeof verification_codesSchema>;
