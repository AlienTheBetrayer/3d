import * as z from 'zod';

export const UsersScalarFieldEnumSchema = z.enum(['id', 'email', 'username', 'password', 'deleted_at', 'edited_at', 'created_at', 'color', 'image_url', 'emoji', 'status'])

export type UsersScalarFieldEnum = z.infer<typeof UsersScalarFieldEnumSchema>;