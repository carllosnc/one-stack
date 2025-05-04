import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { users } from "./user-schema"; // Make sure to import your users table schema

export const profiles = sqliteTable("profiles", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  user_id: text("user_id").references(() => users.id).notNull(),
  nickname: text("nickname").notNull(),
});