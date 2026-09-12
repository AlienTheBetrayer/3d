import { shared } from "@repo/contracts";
import z from "zod";

export const login = z.object({
  email: z.email(),
  password: shared.passwordSchema,
  remember: z.boolean().default(false),
});

export type Login = z.infer<typeof login>;
