"use client"

import { useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Mail, Lock, Trash2, Loader2 } from "lucide-react"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"
import { useAuth } from "@/providers/auth-provider"
import { useUpdateMe, useDeleteMe } from "@/hooks/mutations"

export function AccountSecuritySettings() {
  const { t } = useTranslation()
  const { user } = useAuth()
  const updateMe = useUpdateMe()
  const deleteMe = useDeleteMe()
  const [email, setEmail] = useState(user?.email ?? "")
  const [isEditingEmail, setIsEditingEmail] = useState(false)
  const [isEditingPassword, setIsEditingPassword] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  function handleSaveEmail() {
    if (!email || email === user?.email) {
      setIsEditingEmail(false)
      return
    }

    updateMe.mutate(
      { email },
      {
        onSuccess: () => {
          toast.success(t("settings.account.emailUpdateSuccess"))
          setIsEditingEmail(false)
        },
      }
    )
  }

  function handleCancelEmail() {
    setEmail(user?.email ?? "")
    setIsEditingEmail(false)
  }

  function handleSavePassword() {
    if (newPassword !== confirmPassword) {
      toast.error(t("settings.account.passwordMismatch"))
      return
    }

    updateMe.mutate(
      { password: newPassword },
      {
        onSuccess: () => {
          toast.success(t("settings.account.passwordUpdateSuccess"))
          setNewPassword("")
          setConfirmPassword("")
          setIsEditingPassword(false)
        },
      }
    )
  }

  function handleCancelPassword() {
    setNewPassword("")
    setConfirmPassword("")
    setIsEditingPassword(false)
  }

  function handleDeleteAccount() {
    deleteMe.mutate()
  }

  return (
    <div className="space-y-6">
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
                  disabled={updateMe.isPending}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSaveEmail} disabled={updateMe.isPending}>
                  {updateMe.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {updateMe.isPending ? t("settings.account.saving") : t("settings.account.save")}
                </Button>
                <Button variant="outline" onClick={handleCancelEmail} disabled={updateMe.isPending}>
                  {t("settings.account.cancel")}
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{user?.email ?? "—"}</p>
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
          {isEditingPassword ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="new-password">{t("settings.account.newPasswordLabel")}</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-2"
                  disabled={updateMe.isPending}
                />
              </div>
              <div>
                <Label htmlFor="confirm-password">{t("settings.account.confirmPasswordLabel")}</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-2"
                  disabled={updateMe.isPending}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSavePassword} disabled={updateMe.isPending || !newPassword}>
                  {updateMe.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {updateMe.isPending ? t("settings.account.saving") : t("settings.account.save")}
                </Button>
                <Button variant="outline" onClick={handleCancelPassword} disabled={updateMe.isPending}>
                  {t("settings.account.cancel")}
                </Button>
              </div>
            </div>
          ) : (
            <Button variant="outline" onClick={() => setIsEditingPassword(true)}>
              {t("settings.account.changePassword")}
            </Button>
          )}
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
              <Button variant="destructive" disabled={deleteMe.isPending}>
                {deleteMe.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {deleteMe.isPending ? t("settings.account.deleting") : t("settings.account.deleteAccount")}
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
                <AlertDialogAction
                  className="bg-destructive hover:bg-destructive/90"
                  onClick={handleDeleteAccount}
                >
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
