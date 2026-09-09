import { ConnectionsGroup } from '@repo/db';
import z from 'zod';
import { shared } from '../../index.js';

export const edit = z.object({
  groupId: z.nanoid(),
  title: shared.connectionGroups.title,
  emoji: shared.connectionGroups.emoji,
});

export type Edit = z.infer<typeof edit>;

export type EditResponse = {
  group: ConnectionsGroup;
};
