import { Card } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { THEME_TEMPLATES } from "@/config/theme-templates"
import { COLORS } from "@/config/colors"
import { useTranslation } from "react-i18next"
import type { CVData } from "@/lib/stats-data"

interface CVLineChartProps {
  data: CVData[]
}

export function CVLineChart({ data }: CVLineChartProps) {
  const { t } = useTranslation()

  return (
    <Card className={`${THEME_TEMPLATES.card.base} p-6 ${THEME_TEMPLATES.animation.slideInUp}`}>
      <h3 className={`mb-4 ${THEME_TEMPLATES.text.subheading}`}>{t("stats.cvSentAndResponses")}</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="month" stroke="var(--muted-foreground)" />
          <YAxis stroke="var(--muted-foreground)" />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "0.625rem",
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="sent"
            stroke={COLORS.primary.violet}
            strokeWidth={2}
            dot={{ fill: COLORS.primary.violet }}
            name={t("stats.cvSent")}
          />
          <Line
            type="monotone"
            dataKey="responses"
            stroke={COLORS.primary.pink}
            strokeWidth={2}
            dot={{ fill: COLORS.primary.pink }}
            name={t("stats.responses")}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}
