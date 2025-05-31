"use server"

import { cookies } from "next/headers"
import type { Friend } from "./types"

// Base URL for the Rails API
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"

// Helper to get the auth token
async function getAuthToken() {
  return (await cookies()).get("auth_token")?.value
}

// Get all friends
export async function getFriends(): Promise<Friend[]> {
  const token = await getAuthToken()

  if (!token) {
    throw new Error("Not authenticated")
  }

  const response = await fetch(`${API_URL}/friends`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error("Failed to fetch friends")
  }

  return response.json()
}

// Get a single friend
export async function getFriend(id: string): Promise<Friend> {
  const token = getAuthToken()

  if (!token) {
    throw new Error("Not authenticated")
  }

  const response = await fetch(`${API_URL}/friends/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error("Failed to fetch friend")
  }

  return response.json()
}

// Create a new friend
export async function createFriend(friendData: Partial<Friend>): Promise<Friend> {
  const token = await getAuthToken()

  if (!token) {
    throw new Error("Not authenticated")
  }

  const response = await fetch(`${API_URL}/friends`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ friend: friendData }),
  })

  if (!response.ok) {
    throw new Error("Failed to create friend")
  }

  return response.json()
}

// Update a friend
export async function updateFriend(id: string, friendData: Partial<Friend>): Promise<Friend> {
  const token = getAuthToken()

  if (!token) {
    throw new Error("Not authenticated")
  }

  const response = await fetch(`${API_URL}/friends/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ friend: friendData }),
  })

  if (!response.ok) {
    throw new Error("Failed to update friend")
  }

  return response.json()
}

// Delete a friend
export async function deleteFriend(id: string): Promise<void> {
  const token = getAuthToken()

  if (!token) {
    throw new Error("Not authenticated")
  }

  const response = await fetch(`${API_URL}/friends/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to delete friend")
  }
}
