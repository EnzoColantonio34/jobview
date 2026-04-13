import { Card } from "@/components/ui/card"
import { THEME_TEMPLATES } from "@/config/theme-templates"
import { useTranslation } from "react-i18next"
import { deriveCompanyStatus } from "@/lib/company-utils"
import type { CompanyResponse } from "@/lib/api-client"

interface CompanySummaryProps {
  companies: CompanyResponse[]
}

export function CompanySummary({ companies }: CompanySummaryProps) {
  const { t } = useTranslation()
  const totalCompanies = companies.length
  const statuses = companies.map(deriveCompanyStatus)
  const interviewCount = statuses.filter((s) => s === "interview").length
  const offerCount = statuses.filter((s) => s === "offer").length
  const rejectedCount = statuses.filter((s) => s === "rejected").length

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4">
      <Card className={`${THEME_TEMPLATES.card.base} p-4 text-center`}>
        <p className={THEME_TEMPLATES.text.muted}>{t("company.total")}</p>
        <p className={`mt-1 text-2xl font-bold ${THEME_TEMPLATES.text.heading}`}>{totalCompanies}</p>
      </Card>
      <Card className={`${THEME_TEMPLATES.card.base} p-4 text-center`}>
        <p className={THEME_TEMPLATES.text.muted}>{t("company.interviews")}</p>
        <p className="mt-1 text-2xl font-bold text-primary">{interviewCount}</p>
      </Card>
      <Card className={`${THEME_TEMPLATES.card.base} p-4 text-center`}>
        <p className={THEME_TEMPLATES.text.muted}>{t("company.offers")}</p>
        <p className="mt-1 text-2xl font-bold text-green-600">{offerCount}</p>
      </Card>
      <Card className={`${THEME_TEMPLATES.card.base} p-4 text-center`}>
        <p className={THEME_TEMPLATES.text.muted}>{t("company.rejected")}</p>
        <p className="mt-1 text-2xl font-bold text-destructive">{rejectedCount}</p>
      </Card>
    </div>
  )
}
