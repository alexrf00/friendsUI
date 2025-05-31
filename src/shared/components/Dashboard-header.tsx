"use client"

import { Button } from "@/components/ui/button"
import { logout } from "@/lib/auth"
import { useRouter } from "next/navigation"
import Link from "next/link"
import type { Session, User } from "@/lib/types"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface DashboardHeaderProps {
  session: Session
}

export function DashboardHeader({ session }: DashboardHeaderProps) {
  if(!session){
    return null;
  }
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push("/")
    router.refresh()
  }

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/dashboard" className="font-semibold">
          Friend Manager
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  {session.user.email?.charAt(0).toUpperCase() || session?.user?.email.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{session?.user?.name}</p>
                <p className="text-xs leading-none text-muted-foreground">{session?.user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
