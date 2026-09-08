import * as z from 'zod';

export const ConnectionsScalarFieldEnumSchema = z.enum(['id', 'created_at', 'group_id', 'user_id'])

export type ConnectionsScalarFieldEnum = z.infer<typeof ConnectionsScalarFieldEnumSchema>;