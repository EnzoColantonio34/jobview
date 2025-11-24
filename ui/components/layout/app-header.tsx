import { AppLogo } from "./app-logo"
import { ThemeToggle } from "./theme-toggle"
import { UserProfile } from "./user-profile"

export function AppHeader() {
  return (
    <header className="animate-slide-in-up border-b border-border bg-card">
      <div className="flex h-16 items-center justify-between px-6">
        <AppLogo />
        
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <UserProfile />
        </div>
      </div>
    </header>
  )
}
