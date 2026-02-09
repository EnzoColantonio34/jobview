const API_BASE = "http://localhost:3001/api/v1";

// ── Types mirroring backend DTOs ──

export interface AuthResponse {
  message: string;
  access_token: string;
  refresh_token: string;
  user: UserResponse;
}

export interface UserResponse {
  userId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  birthDate: string;
  phoneNumber: string;
  createdAt: string;
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

// ── SHA-256 password hashing ──
// Le mot de passe est hashé côté client avant envoi pour ne jamais transiter en clair.

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

// ── Token helpers ──

const TOKEN_KEY = "jobview_access_token";
const REFRESH_KEY = "jobview_refresh_token";
const USER_KEY = "jobview_user";

export function getStoredAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(REFRESH_KEY);
}

export function getStoredUser(): UserResponse | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function storeAuthData(data: AuthResponse): void {
  localStorage.setItem(TOKEN_KEY, data.access_token);
  localStorage.setItem(REFRESH_KEY, data.refresh_token);
  localStorage.setItem(USER_KEY, JSON.stringify(data.user));
}

export function clearAuthData(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(USER_KEY);
}

// ── API Error ──

export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(status: number, message: string, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

// ── Fetch wrapper ──

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getStoredAccessToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  let res: Response;
  try {
    res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
    });
  } catch (err) {
    throw new ApiError(0, "Impossible de contacter le serveur. Vérifiez que le backend est lancé.");
  }

  if (!res.ok) {
    let errorData: unknown;
    try {
      errorData = await res.json();
    } catch {
      errorData = null;
    }
    const msg =
      errorData && typeof errorData === "object" && "message" in errorData
        ? String((errorData as { message: string }).message)
        : `HTTP ${res.status}`;
    throw new ApiError(res.status, msg, errorData);
  }

  return res.json() as Promise<T>;
}

// ── Auth API ──

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
