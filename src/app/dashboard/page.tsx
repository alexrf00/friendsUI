import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { FriendsList } from "@/features/friends/components/Friends-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { UserPlus } from "lucide-react"
import { DashboardHeader } from "@/shared/components/Dashboard-header"

export default async function DashboardPage() {
  const session = await getSession()

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader user={session} />

      <main className="flex-1 container max-w-5xl py-10 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Friends</h1>
          <Button asChild className="gap-2">
            <Link href="/friends/new">
              <UserPlus className="h-4 w-4" />
              Add Friend
            </Link>
          </Button>
        </div>

        <FriendsList />
      </main>
    </div>
  )
}
