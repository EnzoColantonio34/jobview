export const API_BASE = process.env.NEXT_PUBLIC_API_URL;


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

export function storeAuthData(data: {
  access_token: string;
  refresh_token: string;
  user: UserResponse;
}): void {
  localStorage.setItem(TOKEN_KEY, data.access_token);
  localStorage.setItem(REFRESH_KEY, data.refresh_token);
  localStorage.setItem(USER_KEY, JSON.stringify(data.user));
}

export function updateStoredUser(user: UserResponse): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearAuthData(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(USER_KEY);
}

export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

/** Mutex to avoid multiple concurrent refresh calls */
let refreshPromise: Promise<string> | null = null;

async function refreshAccessToken(): Promise<string> {
  const refreshToken = getStoredRefreshToken();
  if (!refreshToken) throw new ApiError(401, "No refresh token");

  const res = await fetch(`${API_BASE}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  if (!res.ok) throw new ApiError(res.status, "Refresh failed");

  const data = (await res.json()) as { access_token: string };
  localStorage.setItem(TOKEN_KEY, data.access_token);
  return data.access_token;
}

async function doFetch(
  endpoint: string,
  options: RequestInit,
  token: string | null
): Promise<Response> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    return await fetch(`${API_BASE}${endpoint}`, { ...options, headers });
  } catch {
    throw new ApiError(
      0,
      "Impossible de contacter le serveur. Vérifiez que le backend est lancé."
    );
  }
}

async function parseErrorResponse(res: Response): Promise<ApiError> {
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
  return new ApiError(res.status, msg, errorData);
}

/** Endpoints that must NOT trigger a silent refresh (to avoid loops) */
const AUTH_ENDPOINTS = ["/auth/login", "/auth/register", "/auth/refresh"];

export async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getStoredAccessToken();
  let res = await doFetch(endpoint, options, token);

  if (res.status === 401 && !AUTH_ENDPOINTS.includes(endpoint)) {
    try {
      if (!refreshPromise) {
        refreshPromise = refreshAccessToken();
      }
      const newToken = await refreshPromise;
      refreshPromise = null;

      res = await doFetch(endpoint, options, newToken);
    } catch {
      refreshPromise = null;
      clearAuthData();
      throw new ApiError(401, "Session expirée. Veuillez vous reconnecter.");
    }
  }

  if (!res.ok) {
    throw await parseErrorResponse(res);
  }

  return res.json() as Promise<T>;
}

/**
 * Like `request`, but sends a FormData body (multipart/form-data).
 * Does NOT set Content-Type so the browser adds the boundary automatically.
 */
export async function requestUpload<T>(
  endpoint: string,
  formData: FormData
): Promise<T> {
  const token = getStoredAccessToken();

  const doUpload = async (t: string | null) => {
    const headers: Record<string, string> = {};
    if (t) headers["Authorization"] = `Bearer ${t}`;
    return fetch(`${API_BASE}${endpoint}`, {
      method: "POST",
      headers,
      body: formData,
    });
  };

  let res = await doUpload(token);

  if (res.status === 401) {
    try {
      if (!refreshPromise) {
        refreshPromise = refreshAccessToken();
      }
      const newToken = await refreshPromise;
      refreshPromise = null;
      res = await doUpload(newToken);
    } catch {
      refreshPromise = null;
      clearAuthData();
      throw new ApiError(401, "Session expirée. Veuillez vous reconnecter.");
    }
  }

  if (!res.ok) {
    throw await parseErrorResponse(res);
  }

  return res.json() as Promise<T>;
}
