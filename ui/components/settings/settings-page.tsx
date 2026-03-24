"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Bell, Globe, CreditCard } from "lucide-react"
import { AccountSecuritySettings } from "./account-security-settings"
import { NotificationsSettings } from "./notifications-settings"
import { LanguageSettings } from "./language-settings"
import { BillingSettings } from "./billing-settings"
import { useTranslation } from "react-i18next"

export function Settings() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState("account")

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {t("settings.title")}
        </h1>
        <p className="text-muted-foreground mt-2">
          {t("settings.description")}
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="account" className="gap-2">
            <Shield className="h-4 w-4" />
            {t("settings.menu.account")}
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            {t("settings.menu.notifications")}
          </TabsTrigger>
          <TabsTrigger value="language" className="gap-2">
            <Globe className="h-4 w-4" />
            {t("settings.menu.language")}
          </TabsTrigger>
          <TabsTrigger value="billing" className="gap-2">
            <CreditCard className="h-4 w-4" />
            {t("settings.menu.billing")}
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
