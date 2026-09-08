import * as z from 'zod';

export const ConnectionsGroupScalarFieldEnumSchema = z.enum(['id', 'title', 'emoji', 'edited_at', 'created_at', 'owner_user_id', 'last_connected_at'])

export type ConnectionsGroupScalarFieldEnum = z.infer<typeof ConnectionsGroupScalarFieldEnumSchema>;