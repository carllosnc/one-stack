import { db } from "@/database";
import { todos } from "@/data/db-schemas/todo-schema";
import { eq, desc, and } from "drizzle-orm";

export async function createTodo(title: string, userId: string) {
  return await db.insert(todos)
    .values({ title, user_id: userId })
    .returning();
}

export async function getTodos(userId: string) {
  return await db.select()
    .from(todos)
    .orderBy(desc(todos.id))
    .where(eq(todos.user_id, userId));
}

export async function getTodoById(id: number, userId: string) {
  return await db.select()
    .from(todos)
    .where(and(eq(todos.id, id), eq(todos.user_id, userId)))
    .limit(1);
}

export async function updateTodo(id: number, userId: string, updates: Partial<{ title: string; completed: boolean }>) {
  return await db.update(todos)
    .set(updates)
    .where(and(eq(todos.id, id), eq(todos.user_id, userId)))
    .returning();
}

export async function deleteTodo(id: number, userId: string) {
  return await db.delete(todos)
    .where(and(eq(todos.id, id), eq(todos.user_id, userId)))
    .returning();
}
