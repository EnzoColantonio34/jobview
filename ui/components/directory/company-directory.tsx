"use client"

import { useMemo, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { THEME_TEMPLATES } from "@/config/theme-templates"
import { CompanySearchBar } from "@/components/directory/company-search-bar"
import { CompanyCard } from "@/components/directory/company-card"
import { CompanySummary } from "@/components/directory/company-summary"
import { AddCompanyDialog } from "@/components/directory/add-company-dialog"
import { useTranslation } from "react-i18next"
import { filterCompanies } from "@/lib/company-utils"
import { ApiError, companiesApi } from "@/lib/api-client"

export function CompanyDirectory() {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const [searchTerm, setSearchTerm] = useState("")
  const [addOpen, setAddOpen] = useState(false)

  const companiesQuery = useQuery({
    queryKey: ["companies"],
    queryFn: companiesApi.list,
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => companiesApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] })
      queryClient.invalidateQueries({ queryKey: ["interviews"] })
      toast.success(t("company.deleteSuccess", "Entreprise supprimée"))
    },
    onError: (err) => {
      toast.error(err instanceof ApiError ? err.message : t("common.genericError", "Erreur"))
    },
  })

  const companies = companiesQuery.data ?? []
  const filteredCompanies = useMemo(
    () => filterCompanies(companies, searchTerm),
    [companies, searchTerm],
  )

  const handleDeleteCompany = (id: number) => {
    if (typeof window !== "undefined" && !window.confirm(t("company.confirmDelete", "Supprimer cette entreprise ?"))) {
      return
    }
    deleteMutation.mutate(id)
  }

  return (
    <div className={`space-y-6 ${THEME_TEMPLATES.animation.fadeIn}`}>
      <CompanySearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAdd={() => setAddOpen(true)}
      />

      {companiesQuery.isLoading ? (
        <Card className={`${THEME_TEMPLATES.card.base} p-8 text-center`}>
          <p className={THEME_TEMPLATES.text.muted}>{t("common.loading", "Chargement…")}</p>
        </Card>
      ) : companiesQuery.isError ? (
        <Card className={`${THEME_TEMPLATES.card.base} p-8 text-center space-y-3`}>
          <p className="text-destructive">
            {companiesQuery.error instanceof ApiError
              ? companiesQuery.error.message
              : t("common.genericError", "Erreur de chargement")}
          </p>
          <Button size="sm" variant="outline" onClick={() => companiesQuery.refetch()}>
            {t("common.retry", "Réessayer")}
          </Button>
        </Card>
      ) : (
        <>
          <div className="space-y-3">
            {filteredCompanies.length === 0 ? (
              <Card className={`${THEME_TEMPLATES.card.base} p-8 text-center`}>
                <p className={THEME_TEMPLATES.text.muted}>{t("company.noCompaniesFound")}</p>
              </Card>
            ) : (
              filteredCompanies.map((company) => (
                <CompanyCard
                  key={company.companyId}
                  company={company}
                  onDelete={handleDeleteCompany}
                />
              ))
            )}
          </div>

          <CompanySummary companies={companies} />
        </>
      )}

      <AddCompanyDialog open={addOpen} onOpenChange={setAddOpen} />
    </div>
  )
}
