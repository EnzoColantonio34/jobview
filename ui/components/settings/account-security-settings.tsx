"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Camera, Mail, Lock, Trash2 } from "lucide-react"
import { useTranslation } from "react-i18next"

export function AccountSecuritySettings() {
  const { t } = useTranslation()
  const [email, setEmail] = useState("enzo.colantonio@example.com")
  const [isEditingEmail, setIsEditingEmail] = useState(false)

  return (
    <div className="space-y-6">
      {/* Avatar / Profile picture */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5 text-primary" />
            {t("settings.account.profilePictureTitle")}
          </CardTitle>
          <CardDescription>
            {t("settings.account.profilePictureDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src="" />
              <AvatarFallback className="text-2xl bg-gradient-to-br from-primary to-secondary text-primary-foreground">
                EC
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <Button variant="outline">{t("settings.account.changeAvatar")}</Button>
              <p className="text-xs text-muted-foreground">
                {t("settings.account.avatarInfo")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Email */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-primary" />
            {t("settings.account.emailTitle")}
          </CardTitle>
          <CardDescription>
            {t("settings.account.emailDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isEditingEmail ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">{t("settings.account.newEmailLabel")}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={() => setIsEditingEmail(false)}>
                  {t("settings.account.save")}
                </Button>
                <Button variant="outline" onClick={() => setIsEditingEmail(false)}>
                  {t("settings.account.cancel")}
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{email}</p>
                <p className="text-xs text-muted-foreground">{t("settings.account.currentEmailInfo")}</p>
              </div>
              <Button variant="outline" onClick={() => setIsEditingEmail(true)}>
                {t("settings.account.edit")}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Mot de passe */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" />
            {t("settings.account.passwordTitle")}
          </CardTitle>
          <CardDescription>
            {t("settings.account.passwordDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline">{t("settings.account.changePassword")}</Button>
        </CardContent>
      </Card>

      {/* Suppression du compte */}
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <Trash2 className="h-5 w-5" />
            {t("settings.account.dangerZoneTitle")}
          </CardTitle>
          <CardDescription>
            {t("settings.account.dangerZoneDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                {t("settings.account.deleteAccount")}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t("settings.account.deleteConfirmTitle")}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t("settings.account.deleteConfirmDescription")}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t("settings.account.cancel")}</AlertDialogCancel>
                <AlertDialogAction className="bg-destructive hover:bg-destructive/90">
                  {t("settings.account.confirmDelete")}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  )
}
