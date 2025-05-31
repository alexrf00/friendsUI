"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import type { Session, User } from "./types"

// Base URL for the Rails API
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"

// Helper to get the current session
export async function getSession(): Promise<Session | null> {
  const token = (await cookies()).get("auth_token")?.value

  if (!token) {
    return null
  }

  try {
    const response = await fetch(`${API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      return null
    }

    const user = await response.json()
    return { user, token }
  } catch {
    return null
  }
}

// Login function
export async function login(email: string, password: string): Promise<User> {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    throw new Error("Login failed")
  }

  const data = await response.json()

  console.log("data: ",data);

  // Set the auth token in a cookie
  
  (await
        // Set the auth token in a cookie
        cookies()).set("auth_token", data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })

  return data.user
}

// Signup function
export async function signup(name: string, email: string, password: string): Promise<User> {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  })

  if (!response.ok) {
    throw new Error("Signup failed")
  }

  const data = await response.json()

  // Set the auth token in a cookie
  ;(await
        // Set the auth token in a cookie
        cookies()).set("auth_token", data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })

  return data.user
}

// Logout function
export async function logout(): Promise<void> {
  const token = (await cookies()).get("auth_token")?.value

  if (token) {
    try {
      await fetch(`${API_URL}/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    } catch {
      // Continue with logout even if the API call fails
    }
  }

  (await cookies()).delete("auth_token")
}

// Middleware to protect routes
export async function requireAuth() {
  const session = await getSession()

  if (!session) {
    redirect("/login")
  }

  return session
}
