import { Card } from "@/components/ui/card"
import { THEME_TEMPLATES } from "@/config/theme-templates"
import type { Company } from "@/lib/company-utils"

interface CompanySummaryProps {
  companies: Company[]
}

export function CompanySummary({ companies }: CompanySummaryProps) {
  const totalCompanies = companies.length
  const interviewCount = companies.filter((c) => c.status === "interview").length
  const offerCount = companies.filter((c) => c.status === "offer").length
  const rejectedCount = companies.filter((c) => c.status === "rejected").length

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4">
      <Card className={`${THEME_TEMPLATES.card.base} p-4 text-center`}>
        <p className={THEME_TEMPLATES.text.muted}>Total</p>
        <p className={`mt-1 text-2xl font-bold ${THEME_TEMPLATES.text.heading}`}>{totalCompanies}</p>
      </Card>
      <Card className={`${THEME_TEMPLATES.card.base} p-4 text-center`}>
        <p className={THEME_TEMPLATES.text.muted}>Entretiens</p>
        <p className="mt-1 text-2xl font-bold text-primary">{interviewCount}</p>
      </Card>
      <Card className={`${THEME_TEMPLATES.card.base} p-4 text-center`}>
        <p className={THEME_TEMPLATES.text.muted}>Offres</p>
        <p className="mt-1 text-2xl font-bold text-green-600">{offerCount}</p>
      </Card>
      <Card className={`${THEME_TEMPLATES.card.base} p-4 text-center`}>
        <p className={THEME_TEMPLATES.text.muted}>Rejetés</p>
        <p className="mt-1 text-2xl font-bold text-destructive">{rejectedCount}</p>
      </Card>
    </div>
  )
}
