"use client"

import { useMemo, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useTranslation } from "react-i18next"
import { THEME_TEMPLATES } from "@/config/theme-templates"
import { CalendarHeader } from "@/components/calendar/calendar-header"
import { CalendarGrid } from "@/components/calendar/calendar-grid"
import { UpcomingInterviewsList } from "@/components/calendar/upcoming-interviews-list"
import { AddInterviewDialog } from "@/components/calendar/add-interview-dialog"
import { Button } from "@/components/ui/button"
import { ApiError, interviewsApi } from "@/lib/api-client"
import { mapInterviewToUI, type UIInterview } from "@/lib/interview-utils"

export function InterviewCalendar() {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const [currentDate, setCurrentDate] = useState(() => new Date())
  const [addOpen, setAddOpen] = useState(false)

  const interviewsQuery = useQuery({
    queryKey: ["interviews"],
    queryFn: interviewsApi.list,
  })

  const uiInterviews = useMemo<UIInterview[]>(() => {
    return (interviewsQuery.data ?? [])
      .map(mapInterviewToUI)
      .filter((i): i is UIInterview => i !== null)
  }, [interviewsQuery.data])

  const deleteMutation = useMutation({
    mutationFn: (id: number) => interviewsApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interviews"] })
      queryClient.invalidateQueries({ queryKey: ["companies"] })
      toast.success(t("upcomingInterviews.deleteSuccess", "Entretien supprimé"))
    },
    onError: (err) => {
      toast.error(err instanceof ApiError ? err.message : t("common.genericError", "Erreur"))
    },
  })

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const handleDeleteInterview = (id: number) => {
    if (typeof window !== "undefined" && !window.confirm(t("upcomingInterviews.confirmDelete", "Supprimer cet entretien ?"))) {
      return
    }
    deleteMutation.mutate(id)
  }

  return (
    <div className={`space-y-6 rounded-lg border border-border bg-card p-6 ${THEME_TEMPLATES.animation.fadeIn}`}>
      <CalendarHeader
        currentDate={currentDate}
        onPreviousMonth={handlePreviousMonth}
        onNextMonth={handleNextMonth}
      />

      {interviewsQuery.isLoading ? (
        <p className={THEME_TEMPLATES.text.muted}>{t("common.loading", "Chargement…")}</p>
      ) : interviewsQuery.isError ? (
        <div className="flex flex-col items-start gap-2">
          <p className="text-destructive">
            {interviewsQuery.error instanceof ApiError
              ? interviewsQuery.error.message
              : t("common.genericError", "Erreur de chargement")}
          </p>
          <Button size="sm" variant="outline" onClick={() => interviewsQuery.refetch()}>
            {t("common.retry", "Réessayer")}
          </Button>
        </div>
      ) : (
        <>
          <CalendarGrid currentDate={currentDate} interviews={uiInterviews} />
          <UpcomingInterviewsList
            interviews={uiInterviews}
            onDelete={handleDeleteInterview}
            onAdd={() => setAddOpen(true)}
          />
        </>
      )}

      <AddInterviewDialog open={addOpen} onOpenChange={setAddOpen} />
    </div>
  )
}
