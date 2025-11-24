"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Bell, Globe, CreditCard } from "lucide-react"
import { AccountSecuritySettings } from "./account-security-settings"
import { NotificationsSettings } from "./notifications-settings"
import { LanguageSettings } from "./language-settings"
import { BillingSettings } from "./billing-settings"

export function Settings() {
  const [activeTab, setActiveTab] = useState("account")

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Paramètres
        </h1>
        <p className="text-muted-foreground mt-2">
          Gérez votre compte, vos préférences et vos paramètres
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="account" className="gap-2">
            <Shield className="h-4 w-4" />
            Compte
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="language" className="gap-2">
            <Globe className="h-4 w-4" />
            Langue
          </TabsTrigger>
          <TabsTrigger value="billing" className="gap-2">
            <CreditCard className="h-4 w-4" />
            Facturation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <AccountSecuritySettings />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationsSettings />
        </TabsContent>

        <TabsContent value="language">
          <LanguageSettings />
        </TabsContent>

        <TabsContent value="billing">
          <BillingSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}
