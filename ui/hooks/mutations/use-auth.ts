import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/providers/auth-provider";
import { type LoginPayload, type RegisterPayload } from "@/lib/api-client";

/**
 * POST /auth/login
 */
export function useLogin() {
  const { login } = useAuth();

  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
  });
}

/**
 * POST /auth/register
 */
export function useRegister() {
  const { register: registerUser } = useAuth();

  return useMutation({
    mutationFn: (payload: RegisterPayload) => registerUser(payload),
  });
}

/**
 * POST /auth/logout
 */
export function useLogout() {
  const queryClient = useQueryClient();
  const { logout } = useAuth();

  return useMutation({
    mutationFn: () => logout(),
    onSettled: () => {
      queryClient.clear();
    },
  });
}
