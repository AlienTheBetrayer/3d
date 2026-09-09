import { Connections, ConnectionsGroup, Users } from "@repo/db";
import z from "zod";

export const get = z.void();

export type Get = z.infer<typeof get>;

export type GetResponse = {
  groups: (ConnectionsGroup & {
    connections: (Connections & {
      users: Users;
    })[];
  })[];
};
