import { Connections } from '@repo/db';
import z from 'zod';

export const delete_ = z.object({ connectionId: z.nanoid() });

export type Delete = z.infer<typeof delete_>;

export type DeleteResponse = {
  connection: Connections;
};
