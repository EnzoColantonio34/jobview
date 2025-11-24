"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Camera, Mail, Lock, Trash2 } from "lucide-react"

export function AccountSecuritySettings() {
  const [email, setEmail] = useState("enzo.colantonio@example.com")
  const [isEditingEmail, setIsEditingEmail] = useState(false)

  return (
    <div className="space-y-6">
      {/* Avatar / Photo de profil */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5 text-primary" />
            Photo de profil
          </CardTitle>
          <CardDescription>
            Changez votre avatar ou photo de profil
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
              <Button variant="outline">Changer l'avatar</Button>
              <p className="text-xs text-muted-foreground">
                JPG, PNG ou GIF. Max 5MB.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Email */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            Adresse email
          </CardTitle>
          <CardDescription>
            Modifiez votre adresse email
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isEditingEmail ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Nouvelle adresse email</Label>
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
                  Enregistrer
                </Button>
                <Button variant="outline" onClick={() => setIsEditingEmail(false)}>
                  Annuler
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{email}</p>
                <p className="text-xs text-muted-foreground">Votre adresse email actuelle</p>
              </div>
              <Button variant="outline" onClick={() => setIsEditingEmail(true)}>
                Modifier
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
            Mot de passe
          </CardTitle>
          <CardDescription>
            Modifiez votre mot de passe
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline">Changer le mot de passe</Button>
        </CardContent>
      </Card>

      {/* Suppression du compte */}
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <Trash2 className="h-5 w-5" />
            Zone de danger
          </CardTitle>
          <CardDescription>
            Supprimez définitivement votre compte
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                Supprimer mon compte
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Êtes-vous absolument sûr ?</AlertDialogTitle>
                <AlertDialogDescription>
                  Cette action est irréversible. Cela supprimera définitivement votre
                  compte et toutes vos données de nos serveurs.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction className="bg-destructive hover:bg-destructive/90">
                  Confirmer la suppression
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  )
}
