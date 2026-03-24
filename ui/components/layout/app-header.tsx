import { AppLogo } from "./app-logo"
import { ThemeToggle } from "./theme-toggle"
import { UserProfile } from "./user-profile"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

interface AppHeaderProps {
  sidebarOpen: boolean
  onToggleSidebar: () => void
}

export function AppHeader({ sidebarOpen, onToggleSidebar }: AppHeaderProps) {
  return (
    <header className="animate-slide-in-up border-b border-border bg-card">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Bouton burger/croix en mobile uniquement */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={onToggleSidebar} className="h-10 w-10">
            <div className="relative w-5 h-5">
              <Menu className={`absolute inset-0 transition-all duration-300 ${
                sidebarOpen ? 'rotate-90 opacity-0 scale-0' : 'rotate-0 opacity-100 scale-100'
              }`} />
              <X className={`absolute inset-0 transition-all duration-300 ${
                sidebarOpen ? 'rotate-0 opacity-100 scale-100' : '-rotate-90 opacity-0 scale-0'
              }`} />
            </div>
          </Button>
        </div>
        
        {/* Logo centré en mobile, à gauche en desktop */}
        <div className="absolute left-1/2 -translate-x-1/2 md:relative md:left-0 md:translate-x-0">
          <AppLogo />
        </div>
        
        <div className="flex items-center gap-3 ml-auto">
          <ThemeToggle />
          <UserProfile />
        </div>
      </div>
    </header>
  )
}
