import * as z from 'zod';

export const connections_groupSchema = z.object({
  id: z.string(),
  title: z.string(),
  emoji: z.string(),
  edited_at: z.date().nullish(),
  created_at: z.date(),
  owner_user_id: z.string(),
  last_connected_at: z.date().nullish(),
});

export type connections_groupType = z.infer<typeof connections_groupSchema>;
