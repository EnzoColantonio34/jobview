"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageSquare, Calendar, BarChart3, Users, Download, Menu, X, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  id: string
  label: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  { id: "chat", label: "Chat LLM", icon: <MessageSquare className="h-5 w-5" /> },
  { id: "calendar", label: "Calendrier", icon: <Calendar className="h-5 w-5" /> },
  { id: "interviews", label: "Entretiens", icon: <BarChart3 className="h-5 w-5" /> },
  { id: "directory", label: "Annuaire", icon: <Users className="h-5 w-5" /> },
  { id: "cv", label: "Télécharger mon CV", icon: <Download className="h-5 w-5" /> },
]

interface AppSidebarProps {
  activeTab: string
  onTabChange: (tabId: string) => void
}

export function AppSidebar({ activeTab, onTabChange }: AppSidebarProps) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="absolute left-4 top-20 z-40 md:hidden">
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="h-10 w-10">
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "border-r border-border bg-sidebar transition-all duration-300 ease-out",
          "fixed inset-y-0 left-0 top-16 z-30 w-64 transform md:relative md:top-0",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        <nav className="space-y-2 p-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onTabChange(item.id)
                setIsOpen(false)
              }}
              className={cn(
                "group relative flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200",
                activeTab === item.id
                  ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-md"
                  : "text-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <span className="relative z-10">{item.icon}</span>
              <span className="relative z-10 flex-1 text-left">{item.label}</span>
              {activeTab === item.id && <ChevronRight className="h-4 w-4 opacity-70" />}
            </button>
          ))}
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && <div className="fixed inset-0 top-16 z-20 bg-black/50 md:hidden" onClick={() => setIsOpen(false)} />}
    </>
  )
}
