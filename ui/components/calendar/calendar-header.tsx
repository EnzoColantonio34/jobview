import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { THEME_TEMPLATES } from "@/config/theme-templates"
import { formatMonthYear } from "@/lib/calendar-utils"

interface CalendarHeaderProps {
  currentDate: Date
  onPreviousMonth: () => void
  onNextMonth: () => void
}

export function CalendarHeader({ currentDate, onPreviousMonth, onNextMonth }: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h2 className={`text-2xl font-bold ${THEME_TEMPLATES.text.heading}`}>{formatMonthYear(currentDate)}</h2>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={onPreviousMonth}
          className={THEME_TEMPLATES.transition.smooth}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={onNextMonth}
          className={THEME_TEMPLATES.transition.smooth}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
