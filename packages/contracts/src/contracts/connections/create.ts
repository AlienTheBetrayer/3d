import { Connections } from "@repo/db";
import z from "zod";

export const create = z.object({
  groupId: z.nanoid(),
  connectionId: z.nanoid().optional(),
  userId: z.nanoid(),
});

export type Create = z.infer<typeof create>;

export type CreateResponse = {
  connection: Connections;
};
