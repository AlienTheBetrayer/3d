import z from "zod";

export const envSchema = z.object({
  DATABASE_DIRECT_URL: z.string(),
  DATABASE_URL: z.string(),
  DATABASE_SECRET_KEY: z.string(),

  ACCESS_TOKEN_SECRET: z.string(),
  REFRESH_TOKEN_SECRET: z.string(),

  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  DISCORD_CLIENT_ID: z.string(),
  DISCORD_CLIENT_SECRET: z.string(),
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),

  GMAIL_APP_PASSWORD: z.string(),

  PORT: z.string(),
});

export type EnvSchema = z.infer<typeof envSchema>;
