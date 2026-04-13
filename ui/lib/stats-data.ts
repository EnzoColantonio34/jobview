import type { CompanyResponse, InterviewResponse } from "@/lib/api-client"
import { groupByState } from "@/lib/interview-utils"

export interface CVData {
  month: string
  sent: number
  responses: number
}

export interface InterviewTypeData {
  name: string
  value: number
}

export interface StatusData {
  name: string
  value: number
}

export interface StatsOverview {
  cvSent: number
  cvSentChange: string
  interviews: number
  interviewsChange: string
  responseRate: string
  responseRateChange: string
}

export interface ComputedStats {
  overview: StatsOverview
  cvData: CVData[]
  interviewsData: InterviewTypeData[]
  statusData: StatusData[]
}

interface MonthBucket {
  year: number
  month: number
  label: string
}

function buildSixMonthWindow(now: Date): MonthBucket[] {
  const buckets: MonthBucket[] = []
  for (let offset = 5; offset >= 0; offset--) {
    const d = new Date(now.getFullYear(), now.getMonth() - offset, 1)
    buckets.push({
      year: d.getFullYear(),
      month: d.getMonth(),
      label: d.toLocaleDateString("fr-FR", { month: "short" }),
    })
  }
  return buckets
}

function inBucket(iso: string | null | undefined, bucket: MonthBucket): boolean {
  if (!iso) return false
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return false
  return d.getFullYear() === bucket.year && d.getMonth() === bucket.month
}

function inCurrentMonth(iso: string | null | undefined, now: Date): boolean {
  if (!iso) return false
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return false
  return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth()
}

export function computeStats(
  companies: CompanyResponse[],
  interviews: InterviewResponse[],
  now: Date = new Date(),
): ComputedStats {
  const cvSent = companies.length
  const scheduledInterviews = interviews.filter((i) => !!i.interviewDate)
  const interviewsCount = scheduledInterviews.length
  const responseRatePct =
    cvSent === 0 ? 0 : Math.round((interviewsCount / cvSent) * 100)

  const cvThisMonth = companies.filter((c) => inCurrentMonth(c.createdAt, now)).length
  const interviewsThisMonth = scheduledInterviews.filter((i) =>
    inCurrentMonth(i.interviewDate, now),
  ).length

  const buckets = buildSixMonthWindow(now)
  const cvData: CVData[] = buckets.map((b) => ({
    month: b.label,
    sent: companies.filter((c) => inBucket(c.createdAt, b)).length,
    responses: interviews.filter((i) =>
      inBucket(i.emailSentDate ?? i.interviewDate, b),
    ).length,
  }))

  const interviewsData: InterviewTypeData[] = groupByState(interviews)
  const statusData: StatusData[] = interviewsData

  const overview: StatsOverview = {
    cvSent,
    cvSentChange: `+${cvThisMonth} ce mois`,
    interviews: interviewsCount,
    interviewsChange: `+${interviewsThisMonth} ce mois`,
    responseRate: `${responseRatePct}%`,
    responseRateChange: cvSent === 0 ? "—" : "",
  }

  return { overview, cvData, interviewsData, statusData }
}
