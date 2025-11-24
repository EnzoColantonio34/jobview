"use client"

import { Button } from "@/components/ui/button"
import { useTheme } from "@/providers/theme-provider"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
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
  )
}
