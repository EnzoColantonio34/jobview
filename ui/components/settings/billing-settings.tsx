"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CreditCard, DollarSign, Pause, X } from "lucide-react"

export function BillingSettings() {
  return (
    <div className="space-y-6">
      {/* Plan actuel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            Plan actuel
          </CardTitle>
          <CardDescription>
            Gérez votre abonnement et votre plan
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold">Plan Pro</h3>
                <Badge className="bg-gradient-to-r from-primary to-secondary">Actif</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                29,99€ / mois
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Prochain renouvellement : 24 décembre 2025
              </p>
            </div>
            <Button variant="outline">Changer de plan</Button>
          </div>
        </CardContent>
      </Card>

      {/* Méthode de paiement */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            Méthode de paiement
          </CardTitle>
          <CardDescription>
            Gérez vos moyens de paiement
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
            <Button variant="outline" size="sm">Modifier</Button>
          </div>
          <Button variant="outline" className="w-full">
            Ajouter une méthode de paiement
          </Button>
        </CardContent>
      </Card>

      {/* Gérer les abonnements */}
      <Card>
        <CardHeader>
          <CardTitle>Gérer les abonnements</CardTitle>
          <CardDescription>
            Gérez vos abonnements actifs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start gap-2">
              <Pause className="h-4 w-4" />
              Mettre en pause mon abonnement
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2 text-destructive hover:text-destructive">
              <X className="h-4 w-4" />
              Résilier mon abonnement
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Historique de facturation */}
      <Card>
        <CardHeader>
          <CardTitle>Historique de facturation</CardTitle>
          <CardDescription>
            Consultez vos factures passées
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
                  <Button variant="ghost" size="sm">Télécharger</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
