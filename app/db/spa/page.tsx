"use client";

import { addTodoAction, deleteTodoAction } from "../actions";
import { db } from "../drizzle";
import { todos } from "../schema";

export const dynamic = "force-dynamic";

import { migrate } from "../migrate-offline";

import { useEffect, useState } from "react";

export default function Home() {
  const [todoList, setTodoList] = useState<(typeof todos.$inferSelect)[]>([]);

  useEffect(() => {
    const setupDatabase = async () => {
      await migrate();
      let todoList = await db.select().from(todos).orderBy(todos.createdAt);
      setTodoList(todoList);
    };

    setupDatabase();
  }, []);

  const handleAddTodoAction = async (formData: FormData) => {
    const newTodo = await addTodoAction(formData);
    setTodoList([...todoList, newTodo]);
  };

  const handleDeleteTodoAction = async (formData: FormData) => {
    const deleted = await deleteTodoAction(formData);
    setTodoList(todoList.filter((x) => x.id !== deleted.id));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <form action={handleAddTodoAction}>
        <input type="text" name="content" required />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {todoList.map((todo) => (
          <li key={todo.id}>
            <span style={{ marginRight: "10px" }}>{todo.content}</span>
            <form action={handleDeleteTodoAction} style={{ display: "inline" }}>
              <input type="hidden" value={todo.id} name="id" />
              <button type="submit">Delete</button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
