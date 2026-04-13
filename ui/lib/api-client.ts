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
  hasCompletedContext?: boolean;
}

export interface UserContextResponse {
  industry: string;
  degree: string;
  experienceYears: string;
  careerSummary: string;
  location: string;
  mobilityType: string;
  specialSituationNote?: string;
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

export interface UpdateUserPayload {
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  password?: string;
  birthDate?: string;
  phoneNumber?: string;
}

export interface CheckUserAvailabilityPayload {
  email?: string;
  username?: string;
}

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

export function storeUser(user: UserResponse): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function updateStoredUser(user: UserResponse): void {
  storeUser(user);
}

export function storeAccessToken(token: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
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
  options: RequestInit = {},
  skipAuthRefresh = false
): Promise<T> {
  const token = getStoredAccessToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token && !headers["Authorization"]) {
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
    if (res.status === 401 && !skipAuthRefresh && endpoint !== "/auth/refresh") {
      const refreshed = await tryRefreshAccessToken();
      if (refreshed) {
        return request<T>(endpoint, options, true);
      }
      clearAuthData();
    }

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

async function tryRefreshAccessToken(): Promise<boolean> {
  const refreshToken = getStoredRefreshToken();
  if (!refreshToken) return false;

  try {
    const data = await request<{ access_token: string }>(
      "/auth/refresh",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      },
      true
    );

    storeAccessToken(data.access_token);
    return true;
  } catch {
    return false;
  }
}

export interface SaveUserContextPayload {
  industry: string;
  degree: string;
  experienceYears: string;
  careerSummary: string;
  location: string;
  mobilityType: string;
  specialSituationNote?: string;
}

export const userContextsApi = {
  getMine(): Promise<UserContextResponse> {
    return request<UserContextResponse>("/user-contexts", {
      method: "GET",
    });
  },

  save(payload: SaveUserContextPayload): Promise<UserContextResponse> {
    return request<UserContextResponse>("/user-contexts", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }
};

// ── Companies & Interviews ──

export interface CompanyResponse {
  companyId: number;
  name: string;
  city: string | null;
  zipCode: string | null;
  address: string | null;
  addressExtra: string | null;
  email: string | null;
  phoneNumber: string | null;
  deletedAt: string | null;
  createdAt: string;
  interviews: InterviewResponse[];
}

export interface InterviewResponse {
  id: number;
  label: string;
  state: string | null;
  emailSentDate: string | null;
  interviewDate: string | null;
  remindDate: string | null;
  company: CompanyResponse;
}

export interface CreateCompanyPayload {
  name: string;
  city?: string;
  zipCode?: string;
  address?: string;
  addressExtra?: string;
  email?: string;
  phoneNumber?: string;
}

export type UpdateCompanyPayload = Partial<CreateCompanyPayload>;

export interface CreateInterviewPayload {
  label: string;
  companyId: number;
  state?: string;
  emailSentDate?: string;
  interviewDate?: string;
  remindDate?: string;
}

export const companiesApi = {
  list(): Promise<CompanyResponse[]> {
    return request<CompanyResponse[]>("/companies", { method: "GET" });
  },

  create(payload: CreateCompanyPayload): Promise<CompanyResponse> {
    return request<CompanyResponse>("/companies", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  update(id: number, payload: UpdateCompanyPayload): Promise<CompanyResponse> {
    return request<CompanyResponse>(`/companies/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },

  remove(id: number): Promise<{ message: string }> {
    return request<{ message: string }>(`/companies/${id}`, {
      method: "DELETE",
    });
  },
};

export const interviewsApi = {
  list(): Promise<InterviewResponse[]> {
    return request<InterviewResponse[]>("/interviews", { method: "GET" });
  },

  create(payload: CreateInterviewPayload): Promise<InterviewResponse> {
    return request<InterviewResponse>("/interviews", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  remove(id: number): Promise<{ message: string }> {
    return request<{ message: string }>(`/interviews/${id}`, {
      method: "DELETE",
    });
  },
};

// ── Chat (LLM) API ──

export interface StartChatResponse {
  chatId: string;
  firstMessage: string;
}

export interface ContinueChatResponse {
  text: string;
}

export const chatApi = {
  start(jobTitle: string): Promise<StartChatResponse> {
    return request<StartChatResponse>("/chat", {
      method: "POST",
      body: JSON.stringify({ jobTitle }),
    });
  },

  sendMessage(chatId: string, message: string): Promise<ContinueChatResponse> {
    return request<ContinueChatResponse>(`/chat/${chatId}/new-message`, {
      method: "POST",
      body: JSON.stringify({ message }),
    });
  },
};

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

  async refresh(): Promise<{ access_token: string }> {
    const refreshToken = getStoredRefreshToken();
    const data = await request<{ access_token: string }>("/auth/refresh", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    }, true);

    storeAccessToken(data.access_token);
    return data;
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

export const usersApi = {
  getMe(): Promise<UserResponse> {
    return request<UserResponse>("/users/me", { method: "GET" });
  },

  async updateMe(payload: UpdateUserPayload): Promise<UserResponse> {
    const body = { ...payload };

    if (body.password) {
      body.password = await hashPassword(body.password);
    }

    return request<UserResponse>("/users/me", {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  },

  deleteMe(): Promise<{ message: string }> {
    return request<{ message: string }>("/users/me", {
      method: "DELETE",
    });
  },

  checkAvailability(
    params: CheckUserAvailabilityPayload
  ): Promise<{ available: boolean }> {
    const qs = new URLSearchParams();
    if (params.email) qs.set("email", params.email);
    if (params.username) qs.set("username", params.username);
    return request<{ available: boolean }>(
      `/users/check-availability?${qs.toString()}`,
      { method: "GET" }
    );
  },
};
