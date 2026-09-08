import { verification_codes } from '@repo/db/schema';
import { createSelectSchema } from 'drizzle-zod';
import * as z from 'zod';

export const verification_codesSchema = createSelectSchema(verification_codes);

export type verification_codesType = z.infer<typeof verification_codesSchema>;
