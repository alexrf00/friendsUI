"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createFriend, updateFriend } from "@/lib/api"
import type { Friend } from "@/lib/types"
import { toast } from "@/components/ui/sonner"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface FriendFormProps {
  friend?: Friend
}

export function FriendForm({ friend }: FriendFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isEditing = !!friend

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    const friendData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      birthday: formData.get("birthday") as string,
      notes: formData.get("notes") as string,
    }

    try {
      if (isEditing && friend) {
        await updateFriend(friend.id, friendData)
        toast("Success", {
          description: "Friend updated successfully",
        })
      } else {
        await createFriend(friendData)
        toast("Success",{
          description: "Friend added successfully",
        })
      }
      router.push("/dashboard")
      router.refresh()
    } catch {
      setError(isEditing ? "Failed to update friend" : "Failed to add friend")
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" defaultValue={friend?.name || ""} required />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" defaultValue={friend?.email || ""} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" defaultValue={friend?.phone || ""} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="birthday">Birthday</Label>
          <Input
            id="birthday"
            name="birthday"
            type="date"
            defaultValue={friend?.birthday ? new Date(friend.birthday).toISOString().split("T")[0] : ""}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" name="notes" rows={3} defaultValue={friend?.notes || ""} />
        </div>
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (isEditing ? "Updating..." : "Adding...") : isEditing ? "Update Friend" : "Add Friend"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/dashboard")}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
