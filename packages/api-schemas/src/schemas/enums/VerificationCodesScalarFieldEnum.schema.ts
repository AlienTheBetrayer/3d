import * as z from 'zod';

export const VerificationCodesScalarFieldEnumSchema = z.enum(['id', 'email', 'code', 'expiry_at', 'created_at', 'type'])

export type VerificationCodesScalarFieldEnum = z.infer<typeof VerificationCodesScalarFieldEnumSchema>;