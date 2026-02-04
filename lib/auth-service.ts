import { apiClient } from "./api-client";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin" | "institution";
  phone?: string;
  createdAt: string;
}

export interface AuthResponse {
  status: string;
  message: string;
  data: {
    user: User;
    token?: {
      accessToken: string;
      refreshToken: string;
    };
  };
}

export const authService = {
  async registerUser(data: Record<string, unknown>): Promise<AuthResponse> {
    return apiClient<AuthResponse>("/api/v1/user", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async registerInstitution(data: Record<string, unknown>): Promise<AuthResponse> {
    return apiClient<AuthResponse>("/api/v1/institution/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async login(data: Record<string, unknown>): Promise<AuthResponse> {
    return apiClient<AuthResponse>("/api/v1/user/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async logout(): Promise<void> {
    await apiClient("/api/v1/user/logout", {
      method: "GET",
    });
  },

  async getCurrentUser(): Promise<AuthResponse> {
    return apiClient<AuthResponse>("/api/v1/user", {
        method: "GET"
    });
  }
};
