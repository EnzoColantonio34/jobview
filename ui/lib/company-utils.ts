import type { CompanyResponse } from "@/lib/api-client"

export type CompanyStatus = "contacted" | "interview" | "rejected" | "offer"

export function deriveCompanyStatus(company: CompanyResponse): CompanyStatus {
  const interviews = company.interviews ?? []

  if (interviews.some((i) => i.state && /offer|offre|accept/i.test(i.state))) {
    return "offer"
  }
  if (interviews.some((i) => i.state && /reject|refus|declin/i.test(i.state))) {
    return "rejected"
  }
  if (interviews.some((i) => !!i.interviewDate)) {
    return "interview"
  }
  return "contacted"
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

export const COMPANY_STATUS_LABEL_KEYS = {
  contacted: "company.status.contacted",
  interview: "company.status.interview",
  rejected: "company.status.rejected",
  offer: "company.status.offer",
} as const

export function getStatusLabelKey(status: CompanyStatus) {
  return COMPANY_STATUS_LABEL_KEYS[status]
}

export function filterCompanies(
  companies: CompanyResponse[],
  searchTerm: string,
): CompanyResponse[] {
  const term = searchTerm.trim().toLowerCase()
  if (!term) return companies
  return companies.filter((c) => {
    const haystack = [c.name, c.email ?? "", c.city ?? ""]
      .join(" ")
      .toLowerCase()
    return haystack.includes(term)
  })
}

export function formatContactDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  } catch {
    return iso
  }
}
