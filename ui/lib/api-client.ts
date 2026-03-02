export {
  // common
  API_BASE,
  ApiError,
  request,
  requestUpload,
  getStoredAccessToken,
  getStoredRefreshToken,
  getStoredUser,
  storeAuthData,
  updateStoredUser,
  clearAuthData,
  hashPassword,
  type UserResponse,
} from "./api/common";

export {
  // auth
  authApi,
  type AuthResponse,
  type RegisterPayload,
  type LoginPayload,
  type CheckAvailabilityPayload,
} from "./api/auth";

export {
  // users / account settings
  usersApi,
  type UpdateUserPayload,
  type CheckUserAvailabilityPayload,
} from "./api/users";
