import { pgEnum } from "drizzle-orm/pg-core";

export const verification_code_type = pgEnum("verification_code_type", [
  "login",
  "signup",
  "forgot_password",
  "owner_connect",
]);
