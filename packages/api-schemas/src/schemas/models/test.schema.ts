import * as z from 'zod';

export const testSchema = z.object({
  id: z.string(),
  created_at: z.date(),
  text: z.string().nullish(),
});

export type testType = z.infer<typeof testSchema>;
