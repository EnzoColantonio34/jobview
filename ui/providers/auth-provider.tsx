"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import {
  authApi,
  userContextsApi,
  storeAuthData,
  updateStoredUser,
  storeUser,
  clearAuthData,
  getStoredAccessToken,
  getStoredUser,
  ApiError,
  type UserResponse,
  type RegisterPayload,
  type LoginPayload,
} from "@/lib/api-client";

interface AuthContextType {
  user: UserResponse | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: UserResponse) => void;
  markContextCompleted: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getStoredAccessToken();
    const storedUser = getStoredUser();

    if (!token || !storedUser) {
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    const hydrateUser = async () => {
      try {
        await authApi.refresh();

        let hasCompletedContext = storedUser.hasCompletedContext;
        try {
          await userContextsApi.getMine();
          hasCompletedContext = true;
        } catch (error) {
          if (error instanceof ApiError && error.status === 404) {
            hasCompletedContext = false;
          } else {
            throw error;
          }
        }

        if (!isMounted) return;
        setUser({
          ...storedUser,
          hasCompletedContext,
        });
      } catch {
        if (!isMounted) return;
        clearAuthData();
        setUser(null);
      } finally {
        if (!isMounted) return;
        setIsLoading(false);
      }
    };

    hydrateUser();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = useCallback(async (payload: LoginPayload) => {
    const data = await authApi.login(payload);
    storeAuthData(data);
    setUser(data.user);
  }, []);

  const register = useCallback(async (payload: RegisterPayload) => {
    const data = await authApi.register(payload);
    storeAuthData(data);
    setUser(data.user);
  }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      // Even if backend call fails, clear local data
    } finally {
      clearAuthData();
      setUser(null);
    }
  }, []);

  const handleSetUser = useCallback((updatedUser: UserResponse) => {
    updateStoredUser(updatedUser);
    setUser(updatedUser);
  }, []);

  const markContextCompleted = useCallback(() => {
    setUser((currentUser) => {
      if (!currentUser) {
        return currentUser;
      }

      const updatedUser = {
        ...currentUser,
        hasCompletedContext: true,
      };
      storeUser(updatedUser);
      return updatedUser;
    });
  }, []);

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      logout,
      setUser: handleSetUser,
      markContextCompleted,
    }),
    [
      user,
      isLoading,
      login,
      register,
      logout,
      handleSetUser,
      markContextCompleted,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
