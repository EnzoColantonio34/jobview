"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

import { useAuth } from "@/providers/auth-provider";
import { LoginForm } from "@/components/auth/login-form";
import { RegisterForm } from "@/components/auth/register-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

export default function AuthPage() {
  const { t } = useTranslation();
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      if (user?.hasCompletedContext === false) {
        router.replace("/onboarding");
        return;
      }

      router.replace("/");
    }
  }, [isLoading, isAuthenticated, user, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Spinner className="h-6 w-6 text-primary" />
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <div className="w-full max-w-md relative animate-fade-in">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3 mb-8 animate-slide-in-up">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary shadow-lg animate-glow">
            <span className="text-2xl font-bold text-primary-foreground">J</span>
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">JobView</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {t("auth.subtitle")}
            </p>
          </div>
        </div>

        {/* Auth card */}
        <Card className="border-border/50 shadow-xl backdrop-blur-sm">
          <Tabs defaultValue="login" className="w-full">
            <CardHeader className="pb-4">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="login">{t("auth.loginTab")}</TabsTrigger>
                <TabsTrigger value="register">
                  {t("auth.registerTab")}
                </TabsTrigger>
              </TabsList>
            </CardHeader>

            <CardContent>
              <TabsContent value="login" className="mt-0">
                <div className="space-y-2 mb-4">
                  <CardTitle className="text-lg text-center">
                    {t("auth.loginTitle")}
                  </CardTitle>
                  <CardDescription className="text-center">
                    {t("auth.loginDescription")}
                  </CardDescription>
                </div>
                <LoginForm />
              </TabsContent>

              <TabsContent value="register" className="mt-0">
                <div className="space-y-2 mb-4">
                  <CardTitle className="text-lg text-center">
                    {t("auth.registerTitle")}
                  </CardTitle>
                  <CardDescription className="text-center">
                    {t("auth.registerDescription")}
                  </CardDescription>
                </div>
                <RegisterForm />
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          {t("auth.footer")}
        </p>
      </div>
    </div>
  );
}
