import { db } from "@repo/db";
import z from "zod";
import { contracts } from "../../index.js";

export const add = contracts.auth.login.extend({
  groupId: z.nanoid(),
  connectionId: z.nanoid().optional(),
});

export type Add = z.infer<typeof add>;

export type AddResponse = {
  connection: db.Connections;
  user: db.Users;
};
