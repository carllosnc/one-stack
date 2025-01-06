import { checkSession } from "@/lib/check-session"

export default async function Dashboard() {
  await checkSession()

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  )
}