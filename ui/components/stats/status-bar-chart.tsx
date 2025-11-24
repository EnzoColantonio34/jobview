import { Card } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { THEME_TEMPLATES } from "@/config/theme-templates"
import { COLORS } from "@/config/colors"
import type { StatusData } from "@/lib/stats-data"

interface StatusBarChartProps {
  data: StatusData[]
}

export function StatusBarChart({ data }: StatusBarChartProps) {
  return (
    <Card className={`${THEME_TEMPLATES.card.base} p-6 lg:col-span-2 ${THEME_TEMPLATES.animation.slideInUp}`}>
      <h3 className={`mb-4 ${THEME_TEMPLATES.text.subheading}`}>État des Candidatures</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="name" stroke="var(--muted-foreground)" />
          <YAxis stroke="var(--muted-foreground)" />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "0.625rem",
            }}
          />
          <Bar dataKey="value" fill={COLORS.primary.violet} radius={8} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}
