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
  success?: boolean;
  status?: string;
  message: string;
  data: Record<string, any>;
}

export interface SignupOtpResponse extends AuthResponse {
  data: {
    userId: string;
  };
}

export interface LoginResponse extends AuthResponse {
  data: {
    user: User;
    token?: string;
  };
}

export interface VerifyEmailResponse extends AuthResponse {
  data: {
    token?: string;
    user: User;
  };
}

export interface ForgotPasswordResponse extends AuthResponse {}

export interface VerifyResetOtpResponse extends AuthResponse {
  data: {
    resetToken: string;
  };
}

export interface NotificationSubscribeResponse extends AuthResponse {}

export const authService = {
  async registerUser(data: Record<string, unknown>): Promise<SignupOtpResponse> {
    return apiClient<SignupOtpResponse>("/api/v1/user", {
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

  async login(data: Record<string, unknown>): Promise<LoginResponse> {
    return apiClient<LoginResponse>("/api/v1/user/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async verifyEmailOtp(data: Record<string, unknown>): Promise<VerifyEmailResponse> {
    return apiClient<VerifyEmailResponse>("/api/v1/user/verify-email", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async forgotPassword(data: Record<string, unknown>): Promise<ForgotPasswordResponse> {
    return apiClient<ForgotPasswordResponse>("/api/v1/user/forgot-password", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async verifyResetOtp(data: Record<string, unknown>): Promise<VerifyResetOtpResponse> {
    return apiClient<VerifyResetOtpResponse>("/api/v1/user/verify-reset-otp", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async resetPassword(data: Record<string, unknown>): Promise<AuthResponse> {
    return apiClient<AuthResponse>("/api/v1/user/reset-password", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async subscribeToNotifications(data: Record<string, unknown>): Promise<NotificationSubscribeResponse> {
    return apiClient<NotificationSubscribeResponse>("/api/v1/notifications/subscribe", {
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
