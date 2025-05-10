import { checkSession } from "@/lib/check-session"
import { ListTodos, NewTodo } from "@/components/dashboard/new-todo"

export default async function Dashboard() {
  const session = await checkSession()
  const userId = session?.user?.id as string

  console.log(userId)

  return (
    <div className="w-full min-h-screen p-[20px]">
      <NewTodo userId={userId} />
      <ListTodos userId={userId} />
    </div>
  )
}
