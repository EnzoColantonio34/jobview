"use client"

import { useState } from "react"
import { THEME_TEMPLATES } from "@/config/theme-templates"
import { CalendarHeader } from "@/components/calendar/calendar-header"
import { CalendarGrid, type Interview } from "@/components/calendar/calendar-grid"
import { UpcomingInterviewsList } from "@/components/calendar/upcoming-interviews-list"

export function InterviewCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0))
  const [interviews, setInterviews] = useState<Interview[]>([
    {
      id: "1",
      date: "2025-01-15",
      time: "10:00",
      company: "Tech Corp",
      position: "Senior Developer",
    },
    {
      id: "2",
      date: "2025-01-20",
      time: "14:30",
      company: "StartUp Inc",
      position: "Full Stack Dev",
    },
  ])

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const handleDeleteInterview = (id: string) => {
    setInterviews(interviews.filter((i) => i.id !== id))
  }

  const handleAddInterview = () => {
    // TODO: Implement add interview functionality
    console.log("Add interview")
  }

  return (
    <div className={`space-y-6 rounded-lg border border-border bg-card p-6 ${THEME_TEMPLATES.animation.fadeIn}`}>
      <CalendarHeader
        currentDate={currentDate}
        onPreviousMonth={handlePreviousMonth}
        onNextMonth={handleNextMonth}
      />

      <CalendarGrid currentDate={currentDate} interviews={interviews} />

      <UpcomingInterviewsList
        interviews={interviews}
        onDelete={handleDeleteInterview}
        onAdd={handleAddInterview}
      />
    </div>
  )
}
