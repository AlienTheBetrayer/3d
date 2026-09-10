import { relations } from "drizzle-orm";
import { users, auth_sessions, connections, connections_group } from "./tables.js";

export const usersRelations = relations(users, ({ many }) => ({
  auth_sessions: many(auth_sessions),
  connections: many(connections),
  connections_group: many(connections_group),
}));

export const authSessionsRelations = relations(auth_sessions, ({ one }) => ({
  users: one(users, { fields: [auth_sessions.user_id], references: [users.id] }),
}));

export const connectionsGroupRelations = relations(connections_group, ({ one, many }) => ({
  users: one(users, { fields: [connections_group.owner_user_id], references: [users.id] }),
  connections: many(connections),
}));

export const connectionsRelations = relations(connections, ({ one }) => ({
  connections_group: one(connections_group, {
    fields: [connections.group_id],
    references: [connections_group.id],
  }),
  users: one(users, { fields: [connections.user_id], references: [users.id] }),
}));
