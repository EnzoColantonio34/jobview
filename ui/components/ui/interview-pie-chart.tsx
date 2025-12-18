import { Card } from "@/components/ui/card"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"
import { THEME_TEMPLATES } from "@/config/theme-templates"
import { COLORS } from "@/config/colors"
import { useTranslation } from "react-i18next"
import type { InterviewTypeData } from "@/lib/stats-data"

interface InterviewPieChartProps {
  data: InterviewTypeData[]
}

const CHART_COLORS = [COLORS.primary.violet, COLORS.primary.pink, COLORS.primary.indigo]

export function InterviewPieChart({ data }: InterviewPieChartProps) {
  const { t } = useTranslation()

  return (
    <Card className={`${THEME_TEMPLATES.card.base} p-6 ${THEME_TEMPLATES.animation.slideInUp}`}>
      <h3 className={`mb-4 ${THEME_TEMPLATES.text.subheading}`}>{t("stats.typesOfInterviews")}</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data as any}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  )
}
