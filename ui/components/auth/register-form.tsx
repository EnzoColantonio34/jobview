"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import {
  Eye,
  EyeOff,
  UserPlus,
  Check,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { toast } from "sonner";

import { useRegister } from "@/hooks/mutations";
import { useAuthAvailability } from "@/hooks/queries";
import {
  registerSchema,
  type RegisterFormValues,
  getPasswordStrength,
} from "@/lib/auth-schemas";
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

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

export function RegisterForm() {
  const { t } = useTranslation();
  const registerMutation = useRegister();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOptional, setShowOptional] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
    },
    mode: "onChange",
  });

  const strengthColors = [
    "bg-destructive",
    "bg-destructive",
    "bg-orange-500",
    "bg-primary",
    "bg-green-500",
  ];

  const watchUsername = form.watch("username");
  const watchEmail = form.watch("email");
  const watchPassword = form.watch("password");
  const debouncedUsername = useDebounce(watchUsername, 500);
  const debouncedEmail = useDebounce(watchEmail, 500);
  const passwordStrength = getPasswordStrength(watchPassword || "");

  const usernameQuery = useAuthAvailability(
    { username: debouncedUsername },
    !!debouncedUsername && debouncedUsername.length >= 3
  );

  const emailQuery = useAuthAvailability(
    { email: debouncedEmail },
    !!debouncedEmail && debouncedEmail.includes("@")
  );

  const usernameAvailable = usernameQuery.data?.available ?? null;
  const emailAvailable = emailQuery.data?.available ?? null;
  const checkingUsername = usernameQuery.isFetching;
  const checkingEmail = emailQuery.isFetching;
  const onSubmit = async (values: RegisterFormValues) => {
    const { confirmPassword, ...payload } = values;
    const cleanPayload = Object.fromEntries(
      Object.entries(payload).filter(([, v]) => v !== "" && v !== undefined)
    );
    try {
      await registerMutation.mutateAsync(cleanPayload as typeof payload);
      router.push("/onboarding");
    } catch (err) {
      const message =
        err instanceof ApiError ? err.message : t("auth.errors.generic");
      toast.error(message);
    }
  };

  const AvailabilityIndicator = ({
    available,
    checking,
  }: {
    available: boolean | null;
    checking: boolean;
  }) => {
    if (checking)
      return <Spinner className="h-4 w-4 text-muted-foreground" />;
    if (available === null) return null;
    return available ? (
      <Check className="h-4 w-4 text-green-500" />
    ) : (
      <X className="h-4 w-4 text-destructive" />
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Username */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("auth.fields.username")}</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder={t("auth.placeholders.username")}
                    autoComplete="username"
                    className="pr-10"
                    {...field}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <AvailabilityIndicator
                      available={usernameAvailable}
                      checking={checkingUsername}
                    />
                  </div>
                </div>
              </FormControl>
              {usernameAvailable === false && (
                <p className="text-sm text-destructive">
                  {t("auth.errors.usernameTaken")}
                </p>
              )}
              <FormMessage>
                {form.formState.errors.username?.message &&
                  t(form.formState.errors.username.message)}
              </FormMessage>
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("auth.fields.email")}</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type="email"
                    placeholder={t("auth.placeholders.email")}
                    autoComplete="email"
                    className="pr-10"
                    {...field}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <AvailabilityIndicator
                      available={emailAvailable}
                      checking={checkingEmail}
                    />
                  </div>
                </div>
              </FormControl>
              {emailAvailable === false && (
                <p className="text-sm text-destructive">
                  {t("auth.errors.emailTaken")}
                </p>
              )}
              <FormMessage>
                {form.formState.errors.email?.message &&
                  t(form.formState.errors.email.message)}
              </FormMessage>
            </FormItem>
          )}
        />

        {/* Password */}
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
                    autoComplete="new-password"
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
              {/* Password strength bar */}
              {watchPassword && watchPassword.length > 0 && (
                <div className="space-y-1">
                  <div className="flex gap-1">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-colors ${
                          i < passwordStrength.score
                            ? strengthColors[passwordStrength.score]
                            : "bg-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {t(passwordStrength.label)}
                  </p>
                </div>
              )}
              <FormMessage>
                {form.formState.errors.password?.message &&
                  t(form.formState.errors.password.message)}
              </FormMessage>
            </FormItem>
          )}
        />

        {/* Confirm Password */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("auth.fields.confirmPassword")}</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder={t("auth.placeholders.confirmPassword")}
                    autoComplete="new-password"
                    className="pr-10"
                    {...field}
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage>
                {form.formState.errors.confirmPassword?.message &&
                  t(form.formState.errors.confirmPassword.message)}
              </FormMessage>
            </FormItem>
          )}
        />

        {/* Optional fields toggle */}
        <button
          type="button"
          onClick={() => setShowOptional(!showOptional)}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors w-full"
        >
          {showOptional ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
          {t("auth.optionalFields")}
        </button>

        {showOptional && (
          <div className="space-y-4 animate-slide-in-up">
            <div className="grid grid-cols-2 gap-3">
              {/* First Name */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("auth.fields.firstName")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("auth.placeholders.firstName")}
                        autoComplete="given-name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.firstName?.message &&
                        t(form.formState.errors.firstName.message)}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* Last Name */}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("auth.fields.lastName")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("auth.placeholders.lastName")}
                        autoComplete="family-name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.lastName?.message &&
                        t(form.formState.errors.lastName.message)}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>

            {/* Phone Number */}
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("auth.fields.phoneNumber")}</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder={t("auth.placeholders.phoneNumber")}
                      autoComplete="tel"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.phoneNumber?.message &&
                      t(form.formState.errors.phoneNumber.message)}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
        )}

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 transition-opacity"
          disabled={registerMutation.isPending}
        >
          {registerMutation.isPending ? (
            <Spinner className="mr-2" />
          ) : (
            <UserPlus className="mr-2 h-4 w-4" />
          )}
          {t("auth.registerButton")}
        </Button>
      </form>
    </Form>
  );
}
