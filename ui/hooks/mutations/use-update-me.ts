import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import {
  usersApi,
  clearAuthData,
  ApiError,
  type UpdateUserPayload,
} from "@/lib/api-client";
import { useAuth } from "@/providers/auth-provider";
import { queryKeys } from "../queries/query-keys";

/**
 * PATCH /users/me 
 */
export function useUpdateMe() {
  const queryClient = useQueryClient();
  const { setUser } = useAuth();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: (payload: UpdateUserPayload) => usersApi.updateMe(payload),
    onSuccess: (updatedUser) => {
      setUser(updatedUser);
      queryClient.setQueryData(queryKeys.users.me(), updatedUser);
    },
    onError: (err) => {
      const message =
        err instanceof ApiError ? err.message : t("common.genericError");
      toast.error(message);
    },
  });
}

/**
 * DELETE /users/me
 */
export function useDeleteMe() {
  const queryClient = useQueryClient();
  const { logout } = useAuth();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: () => usersApi.deleteMe(),
    onSuccess: async () => {
      toast.success(t("settings.account.deleteSuccess"));
      await logout();
      clearAuthData();
      queryClient.clear();
    },
    onError: (err) => {
      const message =
        err instanceof ApiError
          ? err.message
          : t("settings.account.deleteError");
      toast.error(message);
    },
  });
}
