"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface UserAvatarProps {
  firstName?: string | null
  lastName?: string | null
  username: string
  /** Tailwind size class applied to the Avatar root, e.g. "h-10 w-10" */
  className?: string
  /** Extra classes for the fallback circle */
  fallbackClassName?: string
}

/**
 * Displays the user's initials on a gradient background matching the app theme.
 */
export function UserAvatar({
  firstName,
  lastName,
  username,
  className,
  fallbackClassName,
}: UserAvatarProps) {
  const initials = getInitials(firstName, lastName, username)

  return (
    <Avatar className={cn("h-10 w-10", className)}>
      <AvatarFallback
        className={cn(
          "bg-gradient-to-br from-primary to-secondary text-primary-foreground font-semibold",
          fallbackClassName,
        )}
      >
        {initials}
      </AvatarFallback>
    </Avatar>
  )
}

function getInitials(
  firstName?: string | null,
  lastName?: string | null,
  username?: string,
): string {
  if (firstName && lastName) {
    return `${firstName[0]}${lastName[0]}`.toUpperCase()
  }
  if (firstName) {
    return firstName[0].toUpperCase()
  }
  if (username && username.length >= 2) {
    return `${username[0]}${username[1]}`.toUpperCase()
  }
  return username?.[0]?.toUpperCase() ?? "?"
}
