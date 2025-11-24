"use client"

import { Card } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"
import { THEME_TEMPLATES } from "@/config/theme-templates"
import { COLORS } from "@/config/colors"

const cvData = [
  { month: "Jan", sent: 12, responses: 4 },
  { month: "Fév", sent: 19, responses: 6 },
  { month: "Mar", sent: 15, responses: 5 },
  { month: "Avr", sent: 22, responses: 8 },
  { month: "Mai", sent: 18, responses: 7 },
  { month: "Jun", sent: 25, responses: 10 },
]

const interviewsData = [
  { name: "Téléphone", value: 8 },
  { name: "Entretien", value: 12 },
  { name: "Rejeté", value: 5 },
]

const statusData = [
  { name: "En attente", value: 15 },
  { name: "Accepté", value: 3 },
  { name: "Décliné", value: 2 },
]

const CHART_COLORS = [COLORS.primary.violet, COLORS.primary.pink, COLORS.primary.indigo]

export function InterviewStats() {
  return (
    <div className={`space-y-6 ${THEME_TEMPLATES.animation.fadeIn}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className={`${THEME_TEMPLATES.card.elevated} p-6`}>
          <div className={THEME_TEMPLATES.text.muted}>CV Envoyés</div>
          <div className="mt-2 text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            111
          </div>
          <p className={`mt-1 ${THEME_TEMPLATES.text.small}`}>+12 ce mois</p>
        </Card>

        <Card className={`${THEME_TEMPLATES.card.elevated} p-6`}>
          <div className={THEME_TEMPLATES.text.muted}>Entretiens</div>
          <div className="mt-2 text-3xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
            20
          </div>
          <p className={`mt-1 ${THEME_TEMPLATES.text.small}`}>+3 ce mois</p>
        </Card>

        <Card className={`${THEME_TEMPLATES.card.elevated} p-6`}>
          <div className={THEME_TEMPLATES.text.muted}>Taux de réponse</div>
          <div className="mt-2 text-3xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
            18%
          </div>
          <p className={`mt-1 ${THEME_TEMPLATES.text.small}`}>Stable</p>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart - CV Sent */}
        <Card className={`${THEME_TEMPLATES.card.base} p-6 ${THEME_TEMPLATES.animation.slideInUp}`}>
          <h3 className={`mb-4 ${THEME_TEMPLATES.text.subheading}`}>CV Envoyés & Réponses</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={cvData}>
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
                name="Envoyés"
              />
              <Line
                type="monotone"
                dataKey="responses"
                stroke={COLORS.primary.pink}
                strokeWidth={2}
                dot={{ fill: COLORS.primary.pink }}
                name="Réponses"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Pie Chart - Interview Types */}
        <Card className={`${THEME_TEMPLATES.card.base} p-6 ${THEME_TEMPLATES.animation.slideInUp}`}>
          <h3 className={`mb-4 ${THEME_TEMPLATES.text.subheading}`}>Types d'Entretiens</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={interviewsData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {interviewsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Bar Chart - Status */}
        <Card className={`${THEME_TEMPLATES.card.base} p-6 lg:col-span-2 ${THEME_TEMPLATES.animation.slideInUp}`}>
          <h3 className={`mb-4 ${THEME_TEMPLATES.text.subheading}`}>État des Candidatures</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={statusData}>
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
      </div>
    </div>
  )
}
