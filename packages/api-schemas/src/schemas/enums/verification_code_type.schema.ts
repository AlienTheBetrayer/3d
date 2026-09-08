import * as z from 'zod';

export const verification_code_typeSchema = z.enum(['login', 'signup', 'forgot_password', 'owner_connect'])

export type verification_code_type = z.infer<typeof verification_code_typeSchema>;