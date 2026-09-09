import z from 'zod';
import { shared } from '../../index.js';
import { Connections, ConnectionsGroup } from '@repo/db';

export const create = z.object({
  groupId: z.nanoid().optional(),
  connectionId: z.nanoid().optional(),
  title: shared.connectionGroups.title,
  emoji: shared.connectionGroups.emoji,
});

export type Create = z.infer<typeof create>;

export type CreateResponse = {
  group: ConnectionsGroup;
  connection: Connections;
};
