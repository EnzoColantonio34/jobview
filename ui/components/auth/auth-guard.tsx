"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";
import { Spinner } from "@/components/ui/spinner";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const mustRedirectToOnboarding =
    isAuthenticated && user?.hasCompletedContext === false && pathname !== "/onboarding";
  const mustRedirectToHome =
    isAuthenticated && user?.hasCompletedContext === true && pathname === "/onboarding";

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!isAuthenticated) {
      router.replace("/auth");
      return;
    }

    if (mustRedirectToOnboarding) {
      router.replace("/onboarding");
      return;
    }

    if (mustRedirectToHome) {
      router.replace("/");
    }
  }, [
    isLoading,
    isAuthenticated,
    mustRedirectToOnboarding,
    mustRedirectToHome,
    router,
  ]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4 animate-fade-in">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary animate-glow">
            <span className="text-2xl font-bold text-primary-foreground">J</span>
          </div>
          <Spinner className="h-6 w-6 text-primary" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (mustRedirectToOnboarding) {
    return null;
  }

  if (mustRedirectToHome) {
    return null;
  }

  return <>{children}</>;
}
