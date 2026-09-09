import "dotenv/config";
import { defineConfig } from "drizzle-kit";
export default defineConfig({
    dialect: "postgresql",
    schema: "./src/schema.ts",
    out: "./drizzle",
    casing: "snake_case",
    dbCredentials: {
        url: process.env.DATABASE_DIRECT_URL,
    },
});
//# sourceMappingURL=drizzle.config.js.map