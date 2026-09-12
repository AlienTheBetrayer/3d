import { db } from '@repo/db';
import z from 'zod';
import { login } from '../auth/login.js';

export const add = login.extend({
  groupId: z.nanoid(),
  connectionId: z.nanoid().optional(),
});

export type Add = z.infer<typeof add>;

export type AddResponse = {
  connection: db.Connections;
  user: db.Users;
};
