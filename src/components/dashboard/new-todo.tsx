"use client"

import { Button } from "@/components/ui/button"
import { useCreateTodo, useDeleteTodo, useTodos, useUpdateTodo } from "@/data/db-hooks/todo-hooks"
import { InsertTodo } from "@/data/db-schemas/todo-schema"

export function NewTodo({ userId }: { userId: string }){
  const { mutate, isPending } = useCreateTodo()

  const randomId = Math.floor(Math.random() * 1000)

  return (
    <Button disabled={isPending} onClick={() => mutate({ title: `Todo - ${randomId}`, userId })}>
      Create Todo {isPending && <span className="ml-2">⏳</span>}
    </Button>
  )
}

export function ListTodos({ userId }: { userId: string }){
  const { data, isLoading, isError, error } = useTodos(userId)
  const { mutate, isPending } = useDeleteTodo()
  const { mutate: updateMutate, isPending: isPendingUpdate } = useUpdateTodo()

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div> {error.message} </div>

  function handleDelete(id: number) {
    mutate({ id, userId })
  }

  function handleUpdate(id: number, updates: Partial<InsertTodo>) {
    updateMutate({ id, userId, updates })
  }

  return <div>
    <h1>Todos</h1>
    <ul>
      {data?.map((todo) => (
        <li key={todo.id} className="p-[10px] flex gap-[20px] bg-neutral-100 border border-neutral-400 w-[400px]">
          <Button
            disabled={isPending}
            className="bg-red-500"
            onClick={() => handleDelete(todo.id)}>
            {isPending ? <span className="ml-2">⏳</span> : <span>Delete</span>}
          </Button>

          <Button
            disabled={isPendingUpdate}
            className="bg-green-600"
            onClick={() => handleUpdate(todo.id, { completed: !todo.completed })}>
            {isPendingUpdate ? <span className="ml-2">⏳</span> : <span>Complete</span>}
          </Button>

          <span>{todo.title}</span>
          <span>{todo.completed ? "✅" : "❌"}</span>
        </li>
      ))}
    </ul>
  </div>
}
