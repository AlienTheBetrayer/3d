import { Connections, Users } from "@repo/db";
import z from "zod";

export const add = z.object({
  groupId: z.nanoid(),
  connectionId: z.nanoid().optional(),
});

export type Add = z.infer<typeof add>;

export type AddResponse = {
  connection: Connections;
  user: Users;
};
