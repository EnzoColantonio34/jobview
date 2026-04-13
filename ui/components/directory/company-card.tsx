import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, Mail, Phone, MapPin } from "lucide-react"
import { THEME_TEMPLATES } from "@/config/theme-templates"
import { useTranslation } from "react-i18next"
import {
  deriveCompanyStatus,
  formatContactDate,
  getStatusColor,
  getStatusLabelKey,
} from "@/lib/company-utils"
import type { CompanyResponse } from "@/lib/api-client"

interface CompanyCardProps {
  company: CompanyResponse
  onDelete: (id: number) => void
}

export function CompanyCard({ company, onDelete }: CompanyCardProps) {
  const { t } = useTranslation()
  const status = deriveCompanyStatus(company)

  const locationParts = [company.address, company.city, company.zipCode].filter(Boolean)
  const location = locationParts.join(" · ")

  return (
    <Card className={`${THEME_TEMPLATES.card.interactive} p-4 ${THEME_TEMPLATES.animation.slideInLeft}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-3">
            <h3 className={`font-semibold ${THEME_TEMPLATES.text.body}`}>{company.name}</h3>
            <span
              className={`inline-block rounded-full px-3 py-1 text-xs font-medium border ${getStatusColor(status)}`}
            >
              {t(getStatusLabelKey(status))}
            </span>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
            {company.email && (
              <span className="inline-flex items-center gap-1">
                <Mail className="h-3.5 w-3.5" />
                {company.email}
              </span>
            )}
            {company.phoneNumber && (
              <span className="inline-flex items-center gap-1">
                <Phone className="h-3.5 w-3.5" />
                {company.phoneNumber}
              </span>
            )}
            {location && (
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {location}
              </span>
            )}
          </div>

          <p className={THEME_TEMPLATES.text.small}>
            {t("company.contactedOn")} {formatContactDate(company.createdAt)}
            {company.interviews && company.interviews.length > 0 && (
              <> · {company.interviews.length} {t("company.interviews")}</>
            )}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 hover:bg-muted"
            onClick={() => onDelete(company.companyId)}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
