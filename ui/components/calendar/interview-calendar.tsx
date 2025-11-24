"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Trash2, Plus } from "lucide-react"
import { THEME_TEMPLATES } from "@/config/theme-templates"

interface Interview {
  id: string
  date: string
  time: string
  company: string
  position: string
}

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

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const monthName = currentDate.toLocaleDateString("fr-FR", {
    month: "long",
    year: "numeric",
  })

  const days = []
  const daysInMonth = getDaysInMonth(currentDate)
  const firstDay = getFirstDayOfMonth(currentDate)

  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  return (
    <div className={`space-y-6 rounded-lg border border-border bg-card p-6 ${THEME_TEMPLATES.animation.fadeIn}`}>
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <h2 className={`text-2xl font-bold ${THEME_TEMPLATES.text.heading}`}>{monthName}</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
            className={THEME_TEMPLATES.transition.smooth}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
            className={THEME_TEMPLATES.transition.smooth}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="space-y-4">
        {/* Days of week */}
        <div className="grid grid-cols-7 gap-2">
          {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day) => (
            <div key={day} className={`text-center text-sm font-semibold ${THEME_TEMPLATES.text.muted}`}>
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => {
            const dateStr = day
              ? `2025-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
              : ""
            const dayInterviews = interviews.filter((i) => i.date === dateStr)

            return (
              <div
                key={index}
                className={`min-h-20 rounded-lg border p-2 text-sm transition-all duration-200 ${
                  day
                    ? "border-border bg-muted hover:bg-muted/80 hover:shadow-md cursor-pointer"
                    : "border-transparent bg-transparent"
                }`}
              >
                {day && (
                  <>
                    <div className={`font-semibold ${THEME_TEMPLATES.text.heading}`}>{day}</div>
                    <div className="mt-1 space-y-1">
                      {dayInterviews.map((interview) => (
                        <div
                          key={interview.id}
                          className="truncate rounded bg-gradient-to-r from-primary/80 to-secondary/80 px-1 py-0.5 text-xs text-primary-foreground font-medium shadow-sm"
                        >
                          {interview.company}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Upcoming Interviews List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className={`font-semibold ${THEME_TEMPLATES.text.subheading}`}>Mes entretiens</h3>
          <Button size="sm" className="gap-1 bg-gradient-to-r from-primary to-secondary">
            <Plus className="h-4 w-4" />
            Ajouter
          </Button>
        </div>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {interviews.length === 0 ? (
            <p className={THEME_TEMPLATES.text.muted}>Aucun entretien prévu</p>
          ) : (
            interviews.map((interview) => (
              <div
                key={interview.id}
                className={`flex items-center justify-between rounded-lg border border-border bg-muted p-3 ${THEME_TEMPLATES.transition.smooth} hover:shadow-md`}
              >
                <div>
                  <p className={`font-medium ${THEME_TEMPLATES.text.body}`}>{interview.company}</p>
                  <p className={THEME_TEMPLATES.text.small}>
                    {interview.date} à {interview.time} - {interview.position}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setInterviews(interviews.filter((i) => i.id !== interview.id))}
                  className="hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
