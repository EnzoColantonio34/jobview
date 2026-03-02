import {
  request,
  hashPassword,
  getStoredRefreshToken,
  type UserResponse,
} from "./common";

export interface AuthResponse {
  message: string;
  access_token: string;
  refresh_token: string;
  user: UserResponse;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  phoneNumber?: string;
}

export interface LoginPayload {
  usernameOrEmail: string;
  password: string;
}

export interface CheckAvailabilityPayload {
  email?: string;
  username?: string;
}

export const authApi = {
  async register(payload: RegisterPayload): Promise<AuthResponse> {
    const hashedPassword = await hashPassword(payload.password);
    return request<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ ...payload, password: hashedPassword }),
    });
  },

  async login(payload: LoginPayload): Promise<AuthResponse> {
    const hashedPassword = await hashPassword(payload.password);
    return request<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ ...payload, password: hashedPassword }),
    });
  },

  logout(): Promise<{ message: string }> {
    return request<{ message: string }>("/auth/logout", {
      method: "POST",
    });
  },

  refresh(): Promise<{ access_token: string }> {
    const refreshToken = getStoredRefreshToken();
    return request<{ access_token: string }>("/auth/refresh", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
  },

  checkAvailability(
    params: CheckAvailabilityPayload
  ): Promise<{ available: boolean }> {
    const qs = new URLSearchParams();
    if (params.email) qs.set("email", params.email);
    if (params.username) qs.set("username", params.username);
    return request<{ available: boolean }>(
      `/auth/check-availability?${qs.toString()}`,
      { method: "GET" }
    );
  },
};
