import { auth } from "@/auth"

async function UserAvatar() {
  const session = await auth()

  if (!session?.user) return null

  return (
    <div>
      {session.user.name}
    </div>
  )
}

export default async function Home() {
  return (
    <div>
      <UserAvatar />
      hello world!!!
    </div>
  )
}
