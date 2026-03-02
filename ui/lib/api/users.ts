import { request, hashPassword, type UserResponse } from "./common";

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
