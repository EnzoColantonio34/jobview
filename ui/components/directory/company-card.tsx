import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, Trash2 } from "lucide-react"
import { THEME_TEMPLATES } from "@/config/theme-templates"
import { type Company, getStatusColor, getStatusLabel } from "@/lib/company-utils"

interface CompanyCardProps {
  company: Company
  onDelete: (id: string) => void
  onMessage?: (id: string) => void
}

export function CompanyCard({ company, onDelete, onMessage }: CompanyCardProps) {
  return (
    <Card className={`${THEME_TEMPLATES.card.interactive} p-4 ${THEME_TEMPLATES.animation.slideInLeft}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h3 className={`font-semibold ${THEME_TEMPLATES.text.body}`}>{company.name}</h3>
            <span
              className={`inline-block rounded-full px-3 py-1 text-xs font-medium border ${getStatusColor(
                company.status,
              )}`}
            >
              {getStatusLabel(company.status)}
            </span>
          </div>
          <p className={`mt-1 text-sm ${THEME_TEMPLATES.text.body}`}>{company.position}</p>
          <p className={`${THEME_TEMPLATES.text.small}`}>
            Website: {company.website} • Contacté le {company.contactDate}
          </p>
        </div>
        <div className="flex gap-2">
          {onMessage && (
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 hover:bg-muted"
              onClick={() => onMessage(company.id)}
            >
              <MessageCircle className="h-4 w-4 text-primary" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 hover:bg-muted"
            onClick={() => onDelete(company.id)}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
