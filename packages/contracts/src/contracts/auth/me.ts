import { AuthSessions, Users } from '@repo/db';
import z from 'zod';

export const me = z.void();

export type Me = z.infer<typeof me>;

export type MeResponse = {
  user: Users;
  session: AuthSessions;
};
