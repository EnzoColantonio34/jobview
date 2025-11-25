"use client"

import { useState } from "react"
import { AppHeader } from "@/components/layout/app-header"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { LLMChat } from "@/components/chat/llm-chat"
import { InterviewCalendar } from "@/components/calendar/interview-calendar"
import { InterviewStats } from "@/components/stats/interview-stats"
import { CompanyDirectory } from "@/components/directory/company-directory"

export default function Home() {
  const [activeTab, setActiveTab] = useState("chat")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const renderContent = () => {
    switch (activeTab) {
      case "chat":
        return <LLMChat />
      case "calendar":
        return <InterviewCalendar />
      case "interviews":
        return <InterviewStats />
      case "directory":
        return <CompanyDirectory />
      case "cv":
        return (
          <div className="rounded-lg border border-border bg-card p-8 text-center">
            <p className="text-muted-foreground">Fonctionnalité à venir</p>
          </div>
        )
      default:
        return <LLMChat />
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-1">
        <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 overflow-auto">
          <div className="h-full p-6 md:p-8">
            <div className="max-w-7xl h-full mx-auto">{renderContent()}</div>
          </div>
        </main>
      </div>
    </div>
  )
}
