import z from 'zod';

export const envSchema = z.object({
  DATABASE_DIRECT_URL: z.string(),
  DATABASE_SECRET_KEY: z.string(),
  PORT: z.string(),
});

export type EnvSchema = z.infer<typeof envSchema>;
