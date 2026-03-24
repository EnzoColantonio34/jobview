"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CreditCard, DollarSign, Pause, X } from "lucide-react"
import { useTranslation } from "react-i18next"

export function BillingSettings() {
  const { t } = useTranslation()

  return (
    <div className="space-y-6">
      {/* Plan actuel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            {t("settings.billing.currentPlanTitle")}
          </CardTitle>
          <CardDescription>
            {t("settings.billing.currentPlanDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold">Plan Pro</h3>
                <Badge className="bg-gradient-to-r from-primary to-secondary">{t("settings.billing.currentPlanStatus")}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {t("settings.billing.currentPlanPrice")}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Prochain renouvellement : 24 décembre 2025
              </p>
            </div>
            <Button variant="outline">{t("settings.billing.changePlan")}</Button>
          </div>
        </CardContent>
      </Card>

      {/* Méthode de paiement */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            {t("settings.billing.paymentMethodTitle")}
          </CardTitle>
          <CardDescription>
            {t("settings.billing.paymentMethodDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center h-10 w-10 rounded-md bg-muted">
                <CreditCard className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium">Visa se terminant par 4242</p>
                <p className="text-xs text-muted-foreground">Expire 12/2026</p>
              </div>
            </div>
            <Button variant="outline" size="sm">{t("settings.billing.paymentMethodEdit")}</Button>
          </div>
          <Button variant="outline" className="w-full">
            {t("settings.billing.paymentMethodAdd")}
          </Button>
        </CardContent>
      </Card>

      {/* Gérer les abonnements */}
      <Card>
        <CardHeader>
          <CardTitle>{t("settings.billing.manageSubscriptionsTitle")}</CardTitle>
          <CardDescription>
            {t("settings.billing.manageSubscriptionsDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start gap-2">
              <Pause className="h-4 w-4" />
              {t("settings.billing.pauseSubscription")}
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2 text-destructive hover:text-destructive">
              <X className="h-4 w-4" />
              {t("settings.billing.cancelSubscription")}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Historique de facturation */}
      <Card>
        <CardHeader>
          <CardTitle>{t("settings.billing.billingHistoryTitle")}</CardTitle>
          <CardDescription>
            {t("settings.billing.billingHistoryDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { date: "24 novembre 2025", amount: "29,99€", status: "Payé" },
              { date: "24 octobre 2025", amount: "29,99€", status: "Payé" },
              { date: "24 septembre 2025", amount: "29,99€", status: "Payé" },
            ].map((invoice, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="text-sm font-medium">{invoice.date}</p>
                  <p className="text-xs text-muted-foreground">{invoice.amount}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {invoice.status}
                  </Badge>
                  <Button variant="ghost" size="sm">{t("settings.billing.download")}</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
