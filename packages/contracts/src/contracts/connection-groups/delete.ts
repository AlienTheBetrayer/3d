import { db } from "@repo/db";
import z from "zod";

export const delete_ = z.object({
  groupId: z.nanoid(),
});

export type Delete = z.infer<typeof delete_>;

export type DeleteResponse = {
  group: db.ConnectionsGroup;
};
