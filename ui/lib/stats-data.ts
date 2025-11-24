export interface CVData {
  month: string
  sent: number
  responses: number
}

export interface InterviewTypeData {
  name: string
  value: number
}

export interface StatusData {
  name: string
  value: number
}

export interface StatsOverview {
  cvSent: number
  cvSentChange: string
  interviews: number
  interviewsChange: string
  responseRate: string
  responseRateChange: string
}

// Mock data
export const cvData: CVData[] = [
  { month: "Jan", sent: 12, responses: 4 },
  { month: "Fév", sent: 19, responses: 6 },
  { month: "Mar", sent: 15, responses: 5 },
  { month: "Avr", sent: 22, responses: 8 },
  { month: "Mai", sent: 18, responses: 7 },
  { month: "Jun", sent: 25, responses: 10 },
]

export const interviewsData: InterviewTypeData[] = [
  { name: "Téléphone", value: 8 },
  { name: "Entretien", value: 12 },
  { name: "Rejeté", value: 5 },
]

export const statusData: StatusData[] = [
  { name: "En attente", value: 15 },
  { name: "Accepté", value: 3 },
  { name: "Décliné", value: 2 },
]

export const statsOverview: StatsOverview = {
  cvSent: 111,
  cvSentChange: "+12 ce mois",
  interviews: 20,
  interviewsChange: "+3 ce mois",
  responseRate: "18%",
  responseRateChange: "Stable",
}
