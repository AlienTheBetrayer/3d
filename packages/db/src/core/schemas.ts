import { createSelectSchema } from "drizzle-zod";
import { auth_sessions, connections, connections_group, users, verification_codes } from "./tables.js";

export const usersSchema = createSelectSchema(users);
export const auth_sessionsSchema = createSelectSchema(auth_sessions);
export const connections_groupSchema = createSelectSchema(connections_group);
export const connectionsSchema = createSelectSchema(connections);
export const verification_codesSchema = createSelectSchema(verification_codes);
