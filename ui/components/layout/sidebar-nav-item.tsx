import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { NavItem } from "./nav-items.config"

interface SidebarNavItemProps {
  item: NavItem
  isActive: boolean
  onClick: () => void
}

export function SidebarNavItem({ item, isActive, onClick }: SidebarNavItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200",
        isActive
          ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-md"
          : "text-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      <span className="relative z-10">{item.icon}</span>
      <span className="relative z-10 flex-1 text-left">{item.label}</span>
      {isActive && <ChevronRight className="h-4 w-4 opacity-70" />}
    </button>
  )
}
