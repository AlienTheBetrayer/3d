import { connections_group } from '@repo/db/schema';
import { createSelectSchema } from 'drizzle-zod';
import * as z from 'zod';

export const connections_groupSchema = createSelectSchema(connections_group);

export type connections_groupType = z.infer<typeof connections_groupSchema>;
