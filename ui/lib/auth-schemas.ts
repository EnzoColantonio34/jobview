import { z } from "zod";

// Password regex: at least one uppercase, one lowercase, one digit, one special char
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

// French phone number regex
const frPhoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;

export const loginSchema = z.object({
  usernameOrEmail: z
    .string()
    .min(1, "auth.validation.usernameOrEmailRequired")
    .max(100, "auth.validation.usernameOrEmailMax"),
  password: z
    .string()
    .min(8, "auth.validation.passwordMin")
    .max(50, "auth.validation.passwordMax"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, "auth.validation.usernameMinLength")
      .max(50, "auth.validation.usernameMax"),
    email: z
      .string()
      .min(1, "auth.validation.emailRequired")
      .email("auth.validation.emailInvalid")
      .max(100, "auth.validation.emailMax"),
    password: z
      .string()
      .min(8, "auth.validation.passwordMin")
      .max(50, "auth.validation.passwordMax")
      .regex(passwordRegex, "auth.validation.passwordStrength"),
    confirmPassword: z.string().min(1, "auth.validation.confirmPasswordRequired"),
    firstName: z.string().max(50, "auth.validation.firstNameMax").optional().or(z.literal("")),
    lastName: z.string().max(50, "auth.validation.lastNameMax").optional().or(z.literal("")),
    phoneNumber: z
      .string()
      .regex(frPhoneRegex, "auth.validation.phoneInvalid")
      .optional()
      .or(z.literal("")),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "auth.validation.passwordsMismatch",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

// Password strength helper
export function getPasswordStrength(password: string): {
  score: number; // 0-4
  label: string; // i18n key
} {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[@$!%*?&]/.test(password)) score++;

  const labels = [
    "auth.passwordStrength.veryWeak",
    "auth.passwordStrength.weak",
    "auth.passwordStrength.fair",
    "auth.passwordStrength.strong",
    "auth.passwordStrength.veryStrong",
  ];

  return { score, label: labels[score] };
}
