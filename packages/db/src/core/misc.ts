import { timestamp } from "drizzle-orm/pg-core";

export const timestamptz = (name: string) => timestamp(name, { withTimezone: true, precision: 6, mode: "date" });
