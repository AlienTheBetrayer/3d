import { Users } from '@repo/db';
import { login } from './login.js';
import z from 'zod';

export const signup = login;

export type Signup = z.infer<typeof signup>;

export type SignupResponse = {
  user: Users;
};
