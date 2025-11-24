"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, Settings, LogOut } from "lucide-react"

interface UserProfileProps {
  initials?: string
}

export function UserProfile({ initials = "EC" }: UserProfileProps) {
  const router = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-sidebar-accent">
          <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-semibold text-primary-foreground">
            {initials}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem 
          className="cursor-pointer hover:bg-muted focus:bg-muted hover:text-foreground focus:text-foreground"
          onClick={() => router.push("/profile")}
        >
          <User />
          Mon profil
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="cursor-pointer hover:bg-muted focus:bg-muted hover:text-foreground focus:text-foreground"
          onClick={() => router.push("/settings")}
        >
          <Settings />
          Paramètres
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          variant="destructive" 
          className="cursor-pointer"
          onClick={() => {
            // Logique de déconnexion
            console.log("Déconnexion")
          }}
        >
          <LogOut />
          Se déconnecter
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
