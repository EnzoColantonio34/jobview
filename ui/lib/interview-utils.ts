import type { InterviewResponse } from "@/lib/api-client"

export interface UIInterview {
  id: number
  date: string
  time: string
  company: string
  position: string
  raw: InterviewResponse
}

export function mapInterviewToUI(i: InterviewResponse): UIInterview | null {
  if (!i.interviewDate) return null
  const d = new Date(i.interviewDate)
  if (Number.isNaN(d.getTime())) return null

  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")

  return {
    id: i.id,
    date: `${year}-${month}-${day}`,
    time: d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
    company: i.company?.name ?? "—",
    position: i.label,
    raw: i,
  }
}

export function normalizeState(state: string | null | undefined): string {
  if (!state) return "Autre"
  return state.trim() || "Autre"
}

export function groupByState(
  interviews: InterviewResponse[],
): { name: string; value: number }[] {
  const counts = new Map<string, number>()
  for (const i of interviews) {
    const key = normalizeState(i.state)
    counts.set(key, (counts.get(key) ?? 0) + 1)
  }
  return Array.from(counts.entries()).map(([name, value]) => ({ name, value }))
}
