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
import { useTranslation } from "react-i18next"
import { useAuth } from "@/providers/auth-provider"

interface UserProfileProps {
  initials?: string
}

export function UserProfile({ initials }: UserProfileProps) {
  const router = useRouter()
  const { t } = useTranslation()
  const { user, logout } = useAuth()

  const displayInitials = initials || (
    user
      ? `${(user.firstName?.[0] || user.username[0]).toUpperCase()}${(user.lastName?.[0] || user.username[1] || "").toUpperCase()}`
      : "??"
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-sidebar-accent">
          <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-semibold text-primary-foreground">
            {displayInitials}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem 
          className="cursor-pointer hover:bg-muted focus:bg-muted hover:text-foreground focus:text-foreground"
          onClick={() => router.push("/profile")}
        >
          <User />
          {t("userMenu.profile")}
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="cursor-pointer hover:bg-muted focus:bg-muted hover:text-foreground focus:text-foreground"
          onClick={() => router.push("/settings")}
        >
          <Settings />
          {t("userMenu.settings")}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          variant="destructive" 
          className="cursor-pointer"
          onClick={async () => {
            await logout()
            router.push("/auth")
          }}
        >
          <LogOut />
          {t("userMenu.logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
