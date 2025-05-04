import { sql } from "drizzle-orm";
import { text, integer } from "drizzle-orm/sqlite-core";
import { sqliteTable } from "drizzle-orm/sqlite-core";
import { users } from "./user-schema";

export const todos = sqliteTable("todos", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  user_id: text("user_id").references(() => users.id).notNull(),
  completed: integer("completed", { mode: "boolean" }).notNull().default(false),
  createdAt: text('timestamp').notNull().default(sql`(current_timestamp)`)
});

export type InsertTodo = typeof todos.$inferInsert
export type SelectTodo = typeof todos.$inferSelect
