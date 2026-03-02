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
import { Settings, LogOut } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useAuth } from "@/providers/auth-provider"
import { UserAvatar } from "@/components/shared/user-avatar"

export function UserProfile() {
  const router = useRouter()
  const { t } = useTranslation()
  const { user, logout } = useAuth()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-sidebar-accent p-0">
          <UserAvatar
            firstName={user?.firstName}
            lastName={user?.lastName}
            username={user?.username ?? "?"}
            className="h-10 w-10 text-sm"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
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
