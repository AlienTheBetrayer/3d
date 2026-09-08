import { auth_sessions } from '@repo/db/schema';
import { createSelectSchema } from 'drizzle-zod';
import * as z from 'zod';

export const auth_sessionsSchema = createSelectSchema(auth_sessions);

export type auth_sessionsType = z.infer<typeof auth_sessionsSchema>;
