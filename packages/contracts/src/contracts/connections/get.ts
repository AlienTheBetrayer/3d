import { db } from "@repo/db";
import z from "zod";

export const get = z.void();

export type Get = z.infer<typeof get>;

export type GetResponse = {
  groups: (db.ConnectionsGroup & {
    connections: (db.Connections & {
      users: db.Users;
    })[];
  })[];
};
