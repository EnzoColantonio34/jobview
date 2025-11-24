"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Trash2, MessageCircle, Plus } from "lucide-react"
import { THEME_TEMPLATES } from "@/config/theme-templates"

interface Company {
  id: string
  name: string
  website: string
  position: string
  contactDate: string
  status: "contacted" | "interview" | "rejected" | "offer"
}

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

  const filteredCompanies = companies.filter((company) => company.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const getStatusColor = (status: Company["status"]) => {
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

  const getStatusLabel = (status: Company["status"]) => {
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

  return (
    <div className={`space-y-6 ${THEME_TEMPLATES.animation.fadeIn}`}>
      {/* Search Bar */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className={`absolute left-3 top-3 h-5 w-5 ${THEME_TEMPLATES.text.muted}`} />
          <input
            type="text"
            placeholder="Rechercher une entreprise..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-border bg-input pl-10 pr-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
          />
        </div>
        <Button className="gap-1 bg-gradient-to-r from-primary to-secondary">
          <Plus className="h-4 w-4" />
          Ajouter
        </Button>
      </div>

      {/* Companies List */}
      <div className="space-y-3">
        {filteredCompanies.length === 0 ? (
          <Card className={`${THEME_TEMPLATES.card.base} p-8 text-center`}>
            <p className={THEME_TEMPLATES.text.muted}>Aucune entreprise trouvée</p>
          </Card>
        ) : (
          filteredCompanies.map((company) => (
            <Card
              key={company.id}
              className={`${THEME_TEMPLATES.card.interactive} p-4 ${THEME_TEMPLATES.animation.slideInLeft}`}
            >
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
                  <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-muted">
                    <MessageCircle className="h-4 w-4 text-primary" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 hover:bg-muted"
                    onClick={() => setCompanies(companies.filter((c) => c.id !== company.id))}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4">
        <Card className={`${THEME_TEMPLATES.card.base} p-4 text-center`}>
          <p className={THEME_TEMPLATES.text.muted}>Total</p>
          <p className={`mt-1 text-2xl font-bold ${THEME_TEMPLATES.text.heading}`}>{companies.length}</p>
        </Card>
        <Card className={`${THEME_TEMPLATES.card.base} p-4 text-center`}>
          <p className={THEME_TEMPLATES.text.muted}>Entretiens</p>
          <p className="mt-1 text-2xl font-bold text-primary">
            {companies.filter((c) => c.status === "interview").length}
          </p>
        </Card>
        <Card className={`${THEME_TEMPLATES.card.base} p-4 text-center`}>
          <p className={THEME_TEMPLATES.text.muted}>Offres</p>
          <p className="mt-1 text-2xl font-bold text-green-600">
            {companies.filter((c) => c.status === "offer").length}
          </p>
        </Card>
        <Card className={`${THEME_TEMPLATES.card.base} p-4 text-center`}>
          <p className={THEME_TEMPLATES.text.muted}>Rejetés</p>
          <p className="mt-1 text-2xl font-bold text-destructive">
            {companies.filter((c) => c.status === "rejected").length}
          </p>
        </Card>
      </div>
    </div>
  )
}
