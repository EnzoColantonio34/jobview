import { Button } from "@/components/ui/button"
import { Trash2, Plus } from "lucide-react"
import { THEME_TEMPLATES } from "@/config/theme-templates"
import type { Interview } from "@/components/calendar/calendar-grid"

interface UpcomingInterviewsListProps {
  interviews: Interview[]
  onDelete: (id: string) => void
  onAdd: () => void
}

export function UpcomingInterviewsList({ interviews, onDelete, onAdd }: UpcomingInterviewsListProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className={`font-semibold ${THEME_TEMPLATES.text.subheading}`}>Mes entretiens</h3>
        <Button size="sm" className="gap-1 bg-gradient-to-r from-primary to-secondary" onClick={onAdd}>
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
                onClick={() => onDelete(interview.id)}
                className="hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
