import { Button } from "@/components/ui/button"

interface UserProfileProps {
  initials?: string
}

export function UserProfile({ initials = "EC" }: UserProfileProps) {
  return (
    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-muted">
      <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-semibold text-primary-foreground">
        {initials}
      </div>
    </Button>
  )
}
