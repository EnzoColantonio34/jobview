"use client"

import { Button } from "@/components/ui/button"
import { useTheme } from "@/providers/theme-provider"
import { Moon, Sun } from "lucide-react"

export function AppHeader() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="animate-slide-in-up border-b border-border bg-card">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Logo and App Title */}
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
            <span className="text-lg font-bold text-primary-foreground">J</span>
          </div>
          <h1 className="text-xl font-bold text-foreground">JobView</h1>
        </div>

        {/* Theme Toggle and User Profile */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-10 w-10 rounded-full hover:bg-muted transition-all duration-200"
            aria-label="Toggle dark mode"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5 text-muted-foreground hover:text-foreground" />
            ) : (
              <Sun className="h-5 w-5 text-muted-foreground hover:text-foreground" />
            )}
          </Button>

          {/* User Profile Menu */}
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-muted">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-semibold text-primary-foreground">
              JP
            </div>
          </Button>
        </div>
      </div>
    </header>
  )
}
