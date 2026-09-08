import * as z from 'zod';

export const connectionsSchema = z.object({
  id: z.string(),
  created_at: z.date(),
  group_id: z.string(),
  user_id: z.string(),
});

export type connectionsType = z.infer<typeof connectionsSchema>;
