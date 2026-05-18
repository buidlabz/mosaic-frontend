"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  authService,
  InstitutionSignupPayload,
  User,
  UserSignupPayload,
} from "@/lib/auth-service";
import { clearAuthToken, storeAuthToken } from "@/lib/auth-session";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: Record<string, unknown>) => Promise<void>;
  registerUser: (data: UserSignupPayload) => Promise<{ userId: string; message: string }>;
  verifySignupOtp: (data: { userId: string; otp: string }) => Promise<void>;
  registerInstitution: (data: InstitutionSignupPayload) => Promise<void>;
  forgotPassword: (data: { email: string }) => Promise<string>;
  verifyResetOtp: (data: { email: string; otp: string }) => Promise<{ resetToken: string; message: string }>;
  resetPassword: (data: { resetToken: string; newPassword: string }) => Promise<string>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const refreshUser = useCallback(async () => {
    try {
      setLoading(true);
      // We'll try to get the profile. If it fails, user is not logged in.
      const response = await authService.getCurrentUser();
      setUser(response.data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      try {
        const response = await authService.getCurrentUser();
        if (!cancelled) {
          setUser(response.data.user);
        }
      } catch {
        if (!cancelled) {
          setUser(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const login = async (data: Record<string, unknown>) => {
    const response = await authService.login(data);
    if (response.data.token) {
      storeAuthToken(response.data.token);
    }
    setUser(response.data.user);
    
    // Redirect based on role
    const role = response.data.user.role;
    if (role === "admin") router.push("/admin");
    else if (role === "institution") router.push("/dashboard/institution");
    else router.push("/dashboard/user");
  };

  const registerUser = async (data: UserSignupPayload) => {
    const response = await authService.registerUser(data);
    return {
      userId: response.data.userId,
      message: response.message,
    };
  };

  const verifySignupOtp = async (data: { userId: string; otp: string }) => {
    const response = await authService.verifyEmailOtp(data);
    if (response.data.token) {
      storeAuthToken(response.data.token);
    }
    setUser(response.data.user);
  };

  const registerInstitution = async (data: InstitutionSignupPayload) => {
    await authService.registerInstitution(data);
    // Usually inst. registration leads to 'pending' state
    // We might want to show a success message or redirect to a 'waiting' page
    router.push("/login/institution?registered=true");
  };

  const forgotPassword = async (data: { email: string }) => {
    const response = await authService.forgotPassword(data);
    return response.message;
  };

  const verifyResetOtp = async (data: { email: string; otp: string }) => {
    const response = await authService.verifyResetOtp(data);
    return {
      resetToken: response.data.resetToken,
      message: response.message,
    };
  };

  const resetPassword = async (data: { resetToken: string; newPassword: string }) => {
    const response = await authService.resetPassword(data);
    return response.message;
  };

  const logout = async () => {
    await authService.logout();
    clearAuthToken();
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, registerUser, verifySignupOtp, registerInstitution, forgotPassword, verifyResetOtp, resetPassword, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
