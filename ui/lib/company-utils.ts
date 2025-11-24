export type CompanyStatus = "contacted" | "interview" | "rejected" | "offer"

export interface Company {
  id: string
  name: string
  website: string
  position: string
  contactDate: string
  status: CompanyStatus
}

export function getStatusColor(status: CompanyStatus): string {
  switch (status) {
    case "interview":
      return "bg-primary/10 text-primary border-primary/30"
    case "offer":
      return "bg-green-100 text-green-700 border-green-300"
    case "rejected":
      return "bg-destructive/10 text-destructive border-destructive/30"
    case "contacted":
    default:
      return "bg-secondary/10 text-secondary border-secondary/30"
  }
}

export function getStatusLabel(status: CompanyStatus): string {
  switch (status) {
    case "interview":
      return "Entretien"
    case "offer":
      return "Offre"
    case "rejected":
      return "Rejeté"
    case "contacted":
    default:
      return "Contacté"
  }
}

export function filterCompaniesByName(companies: Company[], searchTerm: string): Company[] {
  return companies.filter((company) => company.name.toLowerCase().includes(searchTerm.toLowerCase()))
}
