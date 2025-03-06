import { db } from "./drizzle";
import { todos } from "./schema";
import { eq } from "drizzle-orm";

export async function addTodoAction(formData: FormData) {
  const todo: typeof todos.$inferInsert = {
    content: formData.get("content") as string,
  };
  const inserted = await db.insert(todos).values(todo).returning();

  return inserted[0];
}

export async function deleteTodoAction(formData: FormData) {
  const id = parseInt(formData.get("id") as string);
  const deleted = await db.delete(todos).where(eq(todos.id, id)).returning();

  return deleted[0];
}
