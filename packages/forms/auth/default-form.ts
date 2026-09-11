import z from 'zod';
import { contracts, shared } from '../contracts/src/index.js';

export const defaultForm = useZodForm(contracts.auth.login.request, {
  defaultValues: {
    email: '',
    password: '',
    remember: false,
  },
});

export type DefaultForm = z.infer<typeof defaultForm>;

// export type CreateResponse = {
//   user: Users;
// };
