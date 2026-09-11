import z from "zod";

/**
 * schemas
 */
export const connectionGroups = {
  title: z.string().min(1).max(128),
  emoji: z.emoji(),
};
