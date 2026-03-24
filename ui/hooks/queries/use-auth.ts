import { useQuery } from "@tanstack/react-query";
import { authApi, type CheckAvailabilityPayload } from "@/lib/api-client";
import { queryKeys } from "./query-keys";

/**
 * GET /auth/check-availability
 */
export function useAuthAvailability(
  params: CheckAvailabilityPayload,
  enabled = true
) {
  return useQuery({
    queryKey: queryKeys.auth.availability(params),
    queryFn: () => authApi.checkAvailability(params),
    enabled: enabled && !!(params.email || params.username),
    staleTime: 0,
  });
}
