import { InferSelectModel } from "drizzle-orm";
import { users, auth_sessions, connections_group, connections, verification_codes } from "./tables.js";

export type Users = InferSelectModel<typeof users>;
export type AuthSessions = InferSelectModel<typeof auth_sessions>;
export type ConnectionsGroup = InferSelectModel<typeof connections_group>;
export type Connections = InferSelectModel<typeof connections>;
export type VerificationCodes = InferSelectModel<typeof verification_codes>;
