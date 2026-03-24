import type React from "react"
import { MessageSquare, Calendar, BarChart3, Users, Download } from "lucide-react"

export interface NavItem {
  id: string
  label: string
  icon: React.ReactNode
}

export const navItems: NavItem[] = [
  { id: "chat", label: "Chat LLM", icon: <MessageSquare className="h-5 w-5" /> },
  { id: "calendar", label: "Calendrier", icon: <Calendar className="h-5 w-5" /> },
  { id: "interviews", label: "Entretiens", icon: <BarChart3 className="h-5 w-5" /> },
  { id: "directory", label: "Annuaire", icon: <Users className="h-5 w-5" /> },
  { id: "cv", label: "Télécharger mon CV", icon: <Download className="h-5 w-5" /> },
]
