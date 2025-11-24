import { THEME_TEMPLATES } from "@/config/theme-templates"
import { DAYS_OF_WEEK, getDaysInMonth, getFirstDayOfMonth, formatDateString } from "@/lib/calendar-utils"

export interface Interview {
  id: string
  date: string
  time: string
  company: string
  position: string
}

interface CalendarGridProps {
  currentDate: Date
  interviews: Interview[]
}

export function CalendarGrid({ currentDate, interviews }: CalendarGridProps) {
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
    <div className="space-y-4">
      {/* Days of week */}
      <div className="grid grid-cols-7 gap-2">
        {DAYS_OF_WEEK.map((day) => (
          <div key={day} className={`text-center text-sm font-semibold ${THEME_TEMPLATES.text.muted}`}>
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days grid */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => {
          const dateStr = day
            ? formatDateString(currentDate.getFullYear(), currentDate.getMonth(), day)
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
  )
}
