import { checkSession } from "@/lib/check-session"

export default async function Dashboard() {
  const session = await checkSession()
  const userId = session?.user?.id as string

  console.log(userId)

  return (
    <div className="w-full min-h-screen gap-[20px] flex flex-col justify-center items-center">
      <h1> Dashboard </h1>
    </div>
  )
}