import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { FriendForm } from "@/features/friends/components/Friend-form"
import { DashboardHeader } from "@/shared/components/Dashboard-header"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getFriend } from "@/lib/api"

type Params = Promise<{ id: string }>

export default async function EditFriendPage({ params }: { params: Params }) {
  const { id } = await params

  const session = await getSession()
  if (!session) {
    redirect("/login")
  }

  const friendObj = await getFriend(id)
  if (!friendObj) {
    redirect("/dashboard")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader session={session} />

      <main className="flex-1 container max-w-3xl py-10 px-4">
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to friends
          </Link>
          <h1 className="text-3xl font-bold mt-4">Edit Friend</h1>
        </div>

        <FriendForm friend={friendObj} />
      </main>
    </div>
  )
}