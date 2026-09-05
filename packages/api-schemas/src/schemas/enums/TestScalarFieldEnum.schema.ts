import * as z from 'zod';

export const TestScalarFieldEnumSchema = z.enum(['id', 'created_at', 'text']);

export type TestScalarFieldEnum = z.infer<typeof TestScalarFieldEnumSchema>;
