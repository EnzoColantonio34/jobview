"use client"

import { useState, type FormEvent } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useTranslation } from "react-i18next"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  ApiError,
  companiesApi,
  interviewsApi,
  type CreateInterviewPayload,
} from "@/lib/api-client"

interface AddInterviewDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddInterviewDialog({ open, onOpenChange }: AddInterviewDialogProps) {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const [label, setLabel] = useState("")
  const [companyId, setCompanyId] = useState<string>("")
  const [interviewDate, setInterviewDate] = useState("")
  const [state, setState] = useState("")

  const companiesQuery = useQuery({
    queryKey: ["companies"],
    queryFn: companiesApi.list,
    enabled: open,
  })

  const createMutation = useMutation({
    mutationFn: (payload: CreateInterviewPayload) => interviewsApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interviews"] })
      queryClient.invalidateQueries({ queryKey: ["companies"] })
      toast.success(t("upcomingInterviews.addSuccess", "Entretien ajouté"))
      setLabel("")
      setCompanyId("")
      setInterviewDate("")
      setState("")
      onOpenChange(false)
    },
    onError: (err) => {
      toast.error(err instanceof ApiError ? err.message : t("common.genericError", "Erreur"))
    },
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const numericId = Number(companyId)
    if (!label.trim() || !companyId || Number.isNaN(numericId) || numericId <= 0) return
    createMutation.mutate({
      label: label.trim(),
      companyId: numericId,
      interviewDate: interviewDate ? new Date(interviewDate).toISOString() : undefined,
      state: state.trim() || undefined,
    })
  }

  const companies = companiesQuery.data ?? []

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("upcomingInterviews.add", "Ajouter un entretien")}</DialogTitle>
          <DialogDescription>
            {t("upcomingInterviews.addDescription", "Planifiez un entretien pour une entreprise existante.")}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="label">{t("upcomingInterviews.label", "Poste / intitulé")}</Label>
            <Input
              id="label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              maxLength={50}
              required
              placeholder="Ex: Développeur Full Stack"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyId">{t("upcomingInterviews.company", "Entreprise")}</Label>
            <select
              id="companyId"
              value={companyId}
              onChange={(e) => setCompanyId(e.target.value)}
              required
              disabled={companiesQuery.isLoading}
              className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none"
            >
              <option value="">
                {companiesQuery.isLoading
                  ? t("common.loading", "Chargement…")
                  : t("upcomingInterviews.pickCompany", "— Sélectionner —")}
              </option>
              {companies.map((c) => (
                <option key={c.companyId} value={String(c.companyId)}>
                  {c.name}
                </option>
              ))}
            </select>
            {!companiesQuery.isLoading && companies.length === 0 && (
              <p className="text-xs text-muted-foreground">
                {t("upcomingInterviews.noCompanyHint", "Ajoutez d'abord une entreprise dans l'Annuaire.")}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="interviewDate">{t("upcomingInterviews.date", "Date et heure")}</Label>
            <Input
              id="interviewDate"
              type="datetime-local"
              value={interviewDate}
              onChange={(e) => setInterviewDate(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">{t("upcomingInterviews.state", "Statut (optionnel)")}</Label>
            <Input
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              maxLength={50}
              placeholder="Ex: Téléphone, Technique, Accepté…"
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={createMutation.isPending}
            >
              {t("common.cancel", "Annuler")}
            </Button>
            <Button
              type="submit"
              disabled={createMutation.isPending || !label.trim() || !companyId}
            >
              {createMutation.isPending
                ? t("common.saving", "Enregistrement…")
                : t("common.save", "Enregistrer")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
