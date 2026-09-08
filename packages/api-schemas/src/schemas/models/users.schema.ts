import { users } from '@repo/db/schema';
import { createSelectSchema } from 'drizzle-zod';
import * as z from 'zod';

export const usersSchema = createSelectSchema(users);

export type usersType = z.infer<typeof usersSchema>;
