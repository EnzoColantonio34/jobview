"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Mail, Bell, MessageSquare } from "lucide-react"

export function NotificationsSettings() {
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
            Notifications email
          </CardTitle>
          <CardDescription>
            Recevez des notifications par email
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="email-notif">Activer les notifications email</Label>
              <p className="text-sm text-muted-foreground">
                Recevez des emails pour les événements importants
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
            Notifications push web
          </CardTitle>
          <CardDescription>
            Recevez des notifications dans votre navigateur
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="push-notif">Activer les notifications push</Label>
              <p className="text-sm text-muted-foreground">
                Soyez alerté en temps réel des nouveaux événements
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
            Notifications in-app
          </CardTitle>
          <CardDescription>
            Recevez des notifications dans l'application
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="inapp-notif">Activer les notifications in-app</Label>
              <p className="text-sm text-muted-foreground">
                Affichez des notifications dans l'interface
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
