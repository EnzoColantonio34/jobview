"use client"

import { useState, type FormEvent } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
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
  type CreateCompanyPayload,
} from "@/lib/api-client"

interface AddCompanyDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const INITIAL = {
  name: "",
  email: "",
  phoneNumber: "",
  city: "",
  zipCode: "",
  address: "",
  addressExtra: "",
}

export function AddCompanyDialog({ open, onOpenChange }: AddCompanyDialogProps) {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const [form, setForm] = useState(INITIAL)

  const createMutation = useMutation({
    mutationFn: (payload: CreateCompanyPayload) => companiesApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] })
      toast.success(t("company.addSuccess", "Entreprise ajoutée"))
      setForm(INITIAL)
      onOpenChange(false)
    },
    onError: (err) => {
      toast.error(err instanceof ApiError ? err.message : t("common.genericError", "Erreur"))
    },
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!form.name.trim()) return
    const payload: CreateCompanyPayload = { name: form.name.trim() }
    if (form.email.trim()) payload.email = form.email.trim()
    if (form.phoneNumber.trim()) payload.phoneNumber = form.phoneNumber.trim()
    if (form.city.trim()) payload.city = form.city.trim()
    if (form.zipCode.trim()) payload.zipCode = form.zipCode.trim()
    if (form.address.trim()) payload.address = form.address.trim()
    if (form.addressExtra.trim()) payload.addressExtra = form.addressExtra.trim()
    createMutation.mutate(payload)
  }

  const bind = (key: keyof typeof INITIAL) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value })),
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("company.add", "Ajouter une entreprise")}</DialogTitle>
          <DialogDescription>
            {t("company.addDescription", "Les champs autres que le nom sont optionnels.")}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t("company.name", "Nom")} *</Label>
            <Input id="name" {...bind("name")} required maxLength={50} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="email">{t("company.email", "Email")}</Label>
              <Input id="email" type="email" {...bind("email")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">{t("company.phone", "Téléphone")}</Label>
              <Input id="phoneNumber" {...bind("phoneNumber")} placeholder="+33 6 12 34 56 78" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">{t("company.address", "Adresse")}</Label>
            <Input id="address" {...bind("address")} maxLength={50} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="addressExtra">{t("company.addressExtra", "Complément d'adresse")}</Label>
            <Input id="addressExtra" {...bind("addressExtra")} maxLength={50} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="zipCode">{t("company.zipCode", "Code postal")}</Label>
              <Input id="zipCode" {...bind("zipCode")} maxLength={10} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">{t("company.city", "Ville")}</Label>
              <Input id="city" {...bind("city")} maxLength={50} />
            </div>
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
            <Button type="submit" disabled={createMutation.isPending || !form.name.trim()}>
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
