"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { authService, User } from "@/lib/auth-service";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: any) => Promise<void>;
  registerUser: (data: any) => Promise<void>;
  registerInstitution: (data: any) => Promise<void>;
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
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initial load - we'll just check if we can get the profile
    refreshUser();
  }, [refreshUser]);

  const login = async (data: any) => {
    const response = await authService.login(data);
    setUser(response.data.user);
    
    // Redirect based on role
    const role = response.data.user.role;
    if (role === "admin") router.push("/admin");
    else if (role === "institution") router.push("/dashboard/institution");
    else router.push("/dashboard/user");
  };

  const registerUser = async (data: any) => {
    const response = await authService.registerUser(data);
    setUser(response.data.user);
    router.push("/dashboard/user");
  };

  const registerInstitution = async (data: any) => {
    await authService.registerInstitution(data);
    // Usually inst. registration leads to 'pending' state
    // We might want to show a success message or redirect to a 'waiting' page
    router.push("/login/institution?registered=true");
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, registerUser, registerInstitution, logout, refreshUser }}>
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
