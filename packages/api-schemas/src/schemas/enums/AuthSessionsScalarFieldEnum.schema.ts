import * as z from 'zod';

export const AuthSessionsScalarFieldEnumSchema = z.enum(['id', 'user_id', 'refresh_token_hash', 'last_seen_at', 'created_at', 'browser', 'os', 'device', 'cpu', 'ip', 'expiry_at'])

export type AuthSessionsScalarFieldEnum = z.infer<typeof AuthSessionsScalarFieldEnumSchema>;