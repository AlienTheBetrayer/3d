import { foreignKey, jsonb, pgTable, primaryKey, text } from "drizzle-orm/pg-core";
import { verification_code_type } from "./enums.js";
import { timestamptz } from "./misc.js";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique("users_email_key"),
  username: text("username").notNull().unique("users_username_key"),
  password: text("password"),
  deleted_at: timestamptz("deleted_at"),
  edited_at: timestamptz("edited_at"),
  created_at: timestamptz("created_at").notNull().defaultNow(),
  color: text("color").notNull(),
  image_url: text("image_url").notNull(),
  emoji: text("emoji"),
  status: text("status"),
});

export const auth_sessions = pgTable(
  "auth_sessions",
  {
    id: text("id").notNull(),
    user_id: text("user_id").notNull(),
    refresh_token_hash: text("refresh_token_hash").notNull(),
    last_seen_at: timestamptz("last_seen_at").defaultNow(),
    created_at: timestamptz("created_at").notNull().defaultNow(),
    browser: jsonb("browser"),
    os: jsonb("os"),
    device: jsonb("device"),
    cpu: jsonb("cpu"),
    ip: text("ip"),
    expiry_at: timestamptz("expiry_at").notNull(),
  },
  (t) => [
    primaryKey({ columns: [t.id], name: "auth_session_pkey" }),
    foreignKey({
      columns: [t.user_id],
      foreignColumns: [users.id],
      name: "auth_session_user_id_fkey",
    })
      .onUpdate("no action")
      .onDelete("cascade"),
  ],
);

export const connections_group = pgTable(
  "connections_group",
  {
    id: text("id").notNull(),
    title: text("title").notNull(),
    emoji: text("emoji").notNull(),
    edited_at: timestamptz("edited_at"),
    created_at: timestamptz("created_at").notNull().defaultNow(),
    owner_user_id: text("owner_user_id").notNull(),
    last_connected_at: timestamptz("last_connected_at"),
  },
  (t) => [
    primaryKey({ columns: [t.id], name: "connected_sessions_group_pkey" }),
    foreignKey({
      columns: [t.owner_user_id],
      foreignColumns: [users.id],
      name: "connected_sessions_group_owner_user_id_fkey",
    })
      .onUpdate("no action")
      .onDelete("cascade"),
  ],
);

export const connections = pgTable(
  "connections",
  {
    id: text("id").notNull(),
    created_at: timestamptz("created_at").notNull().defaultNow(),
    group_id: text("group_id").notNull(),
    user_id: text("user_id").notNull(),
  },
  (t) => [
    primaryKey({ columns: [t.id], name: "connected_sessions_pkey" }),
    foreignKey({
      columns: [t.group_id],
      foreignColumns: [connections_group.id],
      name: "connected_sessions_group_id_fkey",
    })
      .onUpdate("no action")
      .onDelete("cascade"),
    foreignKey({
      columns: [t.user_id],
      foreignColumns: [users.id],
      name: "connected_sessions_user_id_fkey",
    })
      .onUpdate("no action")
      .onDelete("cascade"),
  ],
);

export const verification_codes = pgTable(
  "verification_codes",
  {
    id: text("id").notNull(),
    email: text("email").notNull(),
    code: text("code").notNull(),
    expiry_at: timestamptz("expiry_at").notNull(),
    created_at: timestamptz("created_at").notNull().defaultNow(),
    type: verification_code_type("type").notNull(),
  },
  (t) => [primaryKey({ columns: [t.id], name: "confirmation_codes_pkey" })],
);
