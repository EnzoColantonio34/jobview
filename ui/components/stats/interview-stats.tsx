"use client"

import { THEME_TEMPLATES } from "@/config/theme-templates"
import { StatCard } from "@/components/stats/stat-card"
import { CVLineChart } from "@/components/ui/cv-line-chart"
import { InterviewPieChart } from "@/components/ui/interview-pie-chart"
import { StatusBarChart } from "@/components/stats/status-bar-chart"
import { cvData, interviewsData, statusData, statsOverview } from "@/lib/stats-data"

export function InterviewStats() {
  return (
    <div className={`space-y-6 ${THEME_TEMPLATES.animation.fadeIn}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="CV Envoyés"
          value={statsOverview.cvSent}
          change={statsOverview.cvSentChange}
          gradient="primary-secondary"
        />
        <StatCard
          title="Entretiens"
          value={statsOverview.interviews}
          change={statsOverview.interviewsChange}
          gradient="secondary-primary"
        />
        <StatCard
          title="Taux de réponse"
          value={statsOverview.responseRate}
          change={statsOverview.responseRateChange}
          gradient="accent-primary"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CVLineChart data={cvData} />
        <InterviewPieChart data={interviewsData} />
        <StatusBarChart data={statusData} />
      </div>
    </div>
  )
}
