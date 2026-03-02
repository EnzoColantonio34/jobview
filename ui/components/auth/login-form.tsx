"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { toast } from "sonner";

import { useLogin } from "@/hooks/mutations";
import { loginSchema, type LoginFormValues } from "@/lib/auth-schemas";
import { ApiError } from "@/lib/api-client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

export function LoginForm() {
  const { t } = useTranslation();
  const loginMutation = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      usernameOrEmail: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    loginMutation.mutate(values, {
      onError: (err) => {
        const message =
          err instanceof ApiError
            ? err.message
            : t("auth.errors.generic");
        toast.error(message);
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="usernameOrEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("auth.fields.usernameOrEmail")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("auth.placeholders.usernameOrEmail")}
                  autoComplete="username"
                  {...field}
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.usernameOrEmail?.message &&
                  t(form.formState.errors.usernameOrEmail.message)}
              </FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("auth.fields.password")}</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder={t("auth.placeholders.password")}
                    autoComplete="current-password"
                    className="pr-10"
                    {...field}
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage>
                {form.formState.errors.password?.message &&
                  t(form.formState.errors.password.message)}
              </FormMessage>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 transition-opacity"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? (
            <Spinner className="mr-2" />
          ) : (
            <LogIn className="mr-2 h-4 w-4" />
          )}
          {t("auth.loginButton")}
        </Button>
      </form>
    </Form>
  );
}
