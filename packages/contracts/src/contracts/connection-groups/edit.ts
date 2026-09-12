import { db } from "@repo/db";
import z from "zod";
import { title } from "../../shared/connection-groups.js";

export const edit = z.object({
  groupId: z.nanoid(),
  title: title,
  emoji: z.emoji(),
});

export type Edit = z.infer<typeof edit>;

export type EditResponse = {
  group: db.ConnectionsGroup;
};
