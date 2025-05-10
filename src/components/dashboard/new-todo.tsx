"use client"

import { Button } from "@/components/ui/button"
import { useCreateTodo, useDeleteTodo, useTodos, useUpdateTodo } from "@/data/db-hooks/todo-hooks"
import { InsertTodo } from "@/data/db-schemas/todo-schema"
import { TrashIcon } from "lucide-react"

export function NewTodo({ userId }: { userId: string }){
  const { mutate, isPending } = useCreateTodo()

  const randomId = Math.floor(Math.random() * 1000)

  return (
    <Button className="mb-[20px]" disabled={isPending} onClick={() => mutate({ title: `Todo - ${randomId}`, userId })}>
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

  return <div className="flex flex-col gap-[20px]">
    <span>
      {data?.length ? `Todos: ${data.length}` : "No todos"}
    </span>

    <ul className="flex flex-col gap-[10px]">
      {data?.map((todo) => (
        <li key={todo.id} className="flex items-center gap-[20px]">
          <Button
            size="icon"
            disabled={isPending}
            onClick={() => handleDelete(todo.id)}>
            {isPending ? <span className="ml-2">⏳</span> : <span><TrashIcon /></span>}
          </Button>

          <input
            type="checkbox"
            checked={todo.completed}
            disabled={isPendingUpdate}
            onChange={() => handleUpdate(todo.id, { completed: !todo.completed })}
            className="w-5 h-5 cursor-pointer"
          />

          <span>{todo.title}</span>
          <span>{todo.completed ? "✅" : "❌"}</span>
        </li>
      ))}
    </ul>
  </div>
}
