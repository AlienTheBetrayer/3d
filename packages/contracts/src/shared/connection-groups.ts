import z from "zod";

/**
 * schemas
 */
export const title = z.string().min(1).max(128);
export const emoji = z.emoji();
