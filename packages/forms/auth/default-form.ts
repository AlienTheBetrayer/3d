import z from "zod";

export const defaultForm = z.object({
  email: z.email(),
  password: z.string(),
  remember: z.boolean().default(false),
});

export type DefaultForm = z.infer<typeof defaultForm>;
