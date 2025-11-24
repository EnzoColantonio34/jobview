"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { THEME_TEMPLATES } from "@/config/theme-templates"
import { CompanySearchBar } from "@/components/directory/company-search-bar"
import { CompanyCard } from "@/components/directory/company-card"
import { CompanySummary } from "@/components/directory/company-summary"
import { type Company, filterCompaniesByName } from "@/lib/company-utils"

export function CompanyDirectory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [companies, setCompanies] = useState<Company[]>([
    {
      id: "1",
      name: "Tech Corp",
      website: "techcorp.com",
      position: "Senior Developer",
      contactDate: "2025-01-10",
      status: "interview",
    },
    {
      id: "2",
      name: "StartUp Inc",
      website: "startupinc.io",
      position: "Full Stack Developer",
      contactDate: "2025-01-05",
      status: "contacted",
    },
    {
      id: "3",
      name: "Digital Solutions",
      website: "digitalsolutions.com",
      position: "React Developer",
      contactDate: "2024-12-28",
      status: "rejected",
    },
    {
      id: "4",
      name: "Cloud Systems",
      website: "cloudsystems.io",
      position: "DevOps Engineer",
      contactDate: "2025-01-15",
      status: "offer",
    },
  ])

  const filteredCompanies = filterCompaniesByName(companies, searchTerm)

  const handleDeleteCompany = (id: string) => {
    setCompanies(companies.filter((c) => c.id !== id))
  }

  const handleAddCompany = () => {
    // TODO: Implement add company functionality
    console.log("Add company")
  }

  const handleMessageCompany = (id: string) => {
    // TODO: Implement message company functionality
    console.log("Message company:", id)
  }

  return (
    <div className={`space-y-6 ${THEME_TEMPLATES.animation.fadeIn}`}>
      <CompanySearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} onAdd={handleAddCompany} />

      <div className="space-y-3">
        {filteredCompanies.length === 0 ? (
          <Card className={`${THEME_TEMPLATES.card.base} p-8 text-center`}>
            <p className={THEME_TEMPLATES.text.muted}>Aucune entreprise trouvée</p>
          </Card>
        ) : (
          filteredCompanies.map((company) => (
            <CompanyCard
              key={company.id}
              company={company}
              onDelete={handleDeleteCompany}
              onMessage={handleMessageCompany}
            />
          ))
        )}
      </div>

      <CompanySummary companies={companies} />
    </div>
  )
}
