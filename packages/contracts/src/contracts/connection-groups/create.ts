import { db } from "@repo/db";
import z from "zod";
import { title } from "../../shared/connection-groups.js";

export const create = z.object({
  groupId: z.nanoid().optional(),
  connectionId: z.nanoid().optional(),
  title: title,
  emoji: z.emoji(),
});

export type Create = z.infer<typeof create>;

export type CreateResponse = {
  group: db.ConnectionsGroup;
  connection: db.Connections;
};
