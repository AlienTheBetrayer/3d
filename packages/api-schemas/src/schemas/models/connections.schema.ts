import { connections } from '@repo/db/schema';
import { createSelectSchema } from 'drizzle-zod';
import * as z from 'zod';

export const connectionsSchema = createSelectSchema(connections);

export type connectionsType = z.infer<typeof connectionsSchema>;
