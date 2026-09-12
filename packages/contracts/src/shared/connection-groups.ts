import { config } from "@repo/config";
import z from "zod";

/**
 * schemas
 */
export const title = z.string().min(config.connectionGroups.title.min).max(config.connectionGroups.title.max);
