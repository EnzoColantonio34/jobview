import { Card } from "@/components/ui/card"
import { THEME_TEMPLATES } from "@/config/theme-templates"

interface StatCardProps {
  title: string
  value: string | number
  change: string
  gradient: "primary-secondary" | "secondary-primary" | "accent-primary"
}

export function StatCard({ title, value, change, gradient }: StatCardProps) {
  const gradientClasses = {
    "primary-secondary": "from-primary to-secondary",
    "secondary-primary": "from-secondary to-primary",
    "accent-primary": "from-accent to-primary",
  }

  return (
    <Card className={`${THEME_TEMPLATES.card.elevated} p-6`}>
      <div className={THEME_TEMPLATES.text.muted}>{title}</div>
      <div
        className={`mt-2 text-3xl font-bold bg-gradient-to-r ${gradientClasses[gradient]} bg-clip-text text-transparent`}
      >
        {value}
      </div>
      <p className={`mt-1 ${THEME_TEMPLATES.text.small}`}>{change}</p>
    </Card>
  )
}
