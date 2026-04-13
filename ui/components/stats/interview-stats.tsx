"use client"

import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { THEME_TEMPLATES } from "@/config/theme-templates"
import { StatCard } from "@/components/stats/stat-card"
import { CVLineChart } from "@/components/ui/cv-line-chart"
import { InterviewPieChart } from "@/components/ui/interview-pie-chart"
import { StatusBarChart } from "@/components/stats/status-bar-chart"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useTranslation } from "react-i18next"
import { ApiError, companiesApi, interviewsApi } from "@/lib/api-client"
import { computeStats } from "@/lib/stats-data"

export function InterviewStats() {
  const { t } = useTranslation()

  const companiesQuery = useQuery({
    queryKey: ["companies"],
    queryFn: companiesApi.list,
  })
  const interviewsQuery = useQuery({
    queryKey: ["interviews"],
    queryFn: interviewsApi.list,
  })

  const isLoading = companiesQuery.isLoading || interviewsQuery.isLoading
  const error = companiesQuery.error ?? interviewsQuery.error

  const stats = useMemo(
    () => computeStats(companiesQuery.data ?? [], interviewsQuery.data ?? []),
    [companiesQuery.data, interviewsQuery.data],
  )

  if (isLoading) {
    return (
      <Card className={`${THEME_TEMPLATES.card.base} p-8 text-center`}>
        <p className={THEME_TEMPLATES.text.muted}>{t("common.loading", "Chargement…")}</p>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className={`${THEME_TEMPLATES.card.base} p-8 text-center space-y-3`}>
        <p className="text-destructive">
          {error instanceof ApiError ? error.message : t("common.genericError", "Erreur de chargement")}
        </p>
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            companiesQuery.refetch()
            interviewsQuery.refetch()
          }}
        >
          {t("common.retry", "Réessayer")}
        </Button>
      </Card>
    )
  }

  return (
    <div className={`space-y-6 ${THEME_TEMPLATES.animation.fadeIn}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title={t("stats.cvSent")}
          value={stats.overview.cvSent}
          change={stats.overview.cvSentChange}
          gradient="primary-secondary"
        />
        <StatCard
          title={t("stats.interviews")}
          value={stats.overview.interviews}
          change={stats.overview.interviewsChange}
          gradient="secondary-primary"
        />
        <StatCard
          title={t("stats.responseRate")}
          value={stats.overview.responseRate}
          change={stats.overview.responseRateChange}
          gradient="accent-primary"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CVLineChart data={stats.cvData} />
        <InterviewPieChart data={stats.interviewsData} />
        <StatusBarChart data={stats.statusData} />
      </div>
    </div>
  )
}
