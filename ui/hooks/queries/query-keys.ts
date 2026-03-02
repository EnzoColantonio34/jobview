export const queryKeys = {
  users: {
    all: ["users"] as const,
    me: () => [...queryKeys.users.all, "me"] as const,
    availability: (params: { email?: string; username?: string }) =>
      [...queryKeys.users.all, "availability", params] as const,
  },

  auth: {
    all: ["auth"] as const,
    availability: (params: { email?: string; username?: string }) =>
      [...queryKeys.auth.all, "availability", params] as const,
  },
} as const;
