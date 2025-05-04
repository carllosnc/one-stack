import { NewTodo, ListTodos } from "@/components/dashboard/new-todo"
import { checkSession } from "@/lib/check-session"

export default async function Dashboard() {
  const session = await checkSession()
  const userId = session?.user?.id as string

  return (
    <div className="w-full min-h-screen gap-[20px] flex flex-col justify-center items-center">
      <NewTodo userId={userId} />
      <hr className="border-black w-full" />
      <ListTodos userId={userId} />
    </div>
  )
}