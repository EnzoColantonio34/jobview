import { useQuery } from "@tanstack/react-query";
import { usersApi, type CheckUserAvailabilityPayload } from "@/lib/api-client";
import { queryKeys } from "./query-keys";

/**
 * GET /users/me
 */
export function useMe(enabled = true) {
  return useQuery({
    queryKey: queryKeys.users.me(),
    queryFn: () => usersApi.getMe(),
    enabled,
  });
}

/**
 * GET /users/check-availability
 */
export function useUserAvailability(
  params: CheckUserAvailabilityPayload,
  enabled = true
) {
  return useQuery({
    queryKey: queryKeys.users.availability(params),
    queryFn: () => usersApi.checkAvailability(params),
    enabled: enabled && !!(params.email || params.username),
  });
}
