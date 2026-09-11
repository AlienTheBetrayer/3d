import { db } from "@repo/db";
import z from "zod";
import { connectionGroups } from "../../shared/connection-groups.js";

export const edit = z.object({
  groupId: z.nanoid(),
  emoji: connectionGroups.emoji,
  title: connectionGroups.title,
});

export type Edit = z.infer<typeof edit>;

export type EditResponse = {
  group: db.ConnectionsGroup;
};
