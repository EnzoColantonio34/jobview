"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { navItems } from "./nav-items.config"
import { MobileMenuButton } from "./mobile-menu-button"
import { SidebarNavItem } from "./sidebar-nav-item"
import { MobileOverlay } from "./mobile-overlay"

interface AppSidebarProps {
  activeTab: string
  onTabChange: (tabId: string) => void
}

export function AppSidebar({ activeTab, onTabChange }: AppSidebarProps) {
  const [isOpen, setIsOpen] = useState(true)

  const handleNavItemClick = (itemId: string) => {
    onTabChange(itemId)
    setIsOpen(false)
  }

  return (
    <>
      <MobileMenuButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />

      <aside
        className={cn(
          "border-r border-border bg-sidebar transition-all duration-300 ease-out",
          "fixed inset-y-0 left-0 top-16 z-30 w-64 transform md:relative md:top-0",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        <nav className="space-y-2 p-4">
          {navItems.map((item) => (
            <SidebarNavItem
              key={item.id}
              item={item}
              isActive={activeTab === item.id}
              onClick={() => handleNavItemClick(item.id)}
            />
          ))}
        </nav>
      </aside>

      <MobileOverlay isOpen={isOpen} onClick={() => setIsOpen(false)} />
    </>
  )
}
