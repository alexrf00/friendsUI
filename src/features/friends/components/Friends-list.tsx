"use client"

import { useState, useEffect } from "react"
import { getFriends, deleteFriend } from "@/lib/api"
import type { Friend } from "@/lib/types"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/sonner"


export function FriendsList() {
  const [friends, setFriends] = useState<Friend[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadFriends = async () => {
      try {
        const data = await getFriends()
        setFriends(data)
      } catch {
        toast.error('Failed to load friends', {
          description: 'Please try again later.',
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadFriends()
  })

  const handleDelete = async (id: string) => {
    try {
      await deleteFriend(id)
      setFriends(friends.filter((friend) => friend.id !== id))
      toast.success('success',{
        description: 'Friend deleted successfully',
      })
    } catch {
      toast.error("Error", {
        description: "Failed to delete friend",
      })
    }
  }

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>
  }

  if (friends.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-slate-500 mb-4">You haven&apos;t added any friends yet.</p>
        <Button asChild>
          <Link href="/friends/new">Add Your First Friend</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {friends.map((friend) => (
        <Card key={friend.id}>
          <CardHeader>
            <CardTitle>{friend.name}</CardTitle>
            <CardDescription>{friend.email}</CardDescription>
          </CardHeader>
          <CardContent>
            {friend.phone && <p className="text-sm">📞 {friend.phone}</p>}
            {friend.birthday && <p className="text-sm">🎂 {new Date(friend.birthday).toLocaleDateString()}</p>}
            {friend.notes && <p className="text-sm mt-2">{friend.notes}</p>}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button asChild variant="outline" size="sm">
              <Link href={`/friends/${friend.id}/edit`}>
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </Link>
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete {friend.name} from your friends list.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDelete(friend.id)} className="bg-red-500 hover:bg-red-600">
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
