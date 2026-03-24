"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Mail, Bell, MessageSquare } from "lucide-react"
import { useTranslation } from "react-i18next"

export function NotificationsSettings() {

  const { t } = useTranslation()
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(false)
  const [inAppNotifications, setInAppNotifications] = useState(true)

  return (
    <div className="space-y-6">
      {/* Notifications Email */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            {t("settings.notifications.emailTitle")}
          </CardTitle>
          <CardDescription>
            {t("settings.notifications.emailDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="email-notif">{t("settings.notifications.emailLabel")}</Label>
              <p className="text-sm text-muted-foreground">
                {t("settings.notifications.emailInfo")}
              </p>
            </div>
            <Switch
              id="email-notif"
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>
        </CardContent>
      </Card>

      {/* Notifications Push Web */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            {t("settings.notifications.pushTitle")}
          </CardTitle>
          <CardDescription>
            {t("settings.notifications.pushDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="push-notif">{t("settings.notifications.pushLabel")}</Label>
              <p className="text-sm text-muted-foreground">
                {t("settings.notifications.pushInfo")}
              </p>
            </div>
            <Switch
              id="push-notif"
              checked={pushNotifications}
              onCheckedChange={setPushNotifications}
            />
          </div>
        </CardContent>
      </Card>

      {/* Notifications In-App */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            {t("settings.notifications.inAppTitle")}
          </CardTitle>
          <CardDescription>
            {t("settings.notifications.inAppDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="inapp-notif">{t("settings.notifications.inAppLabel")}</Label>
              <p className="text-sm text-muted-foreground">
                {t("settings.notifications.inAppInfo")}
              </p>
            </div>
            <Switch
              id="inapp-notif"
              checked={inAppNotifications}
              onCheckedChange={setInAppNotifications}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
