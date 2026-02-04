'use client'
import { useState, useEffect } from "react";
import { apiClient } from "@/lib/api-client";

export interface AdminAnalytics {
  users: number;
  institutions: number;
  wallets: number;
  apiCalls: {
    total: number;
    successful: number;
  };
}

export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: "user" | "institution" | "admin";
  createdAt: string;
  status?: string;
}

export interface AdminInstitution {
  _id: string;
  name: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "DEACTIVATED";
  plan?: {
    name: string;
  };
  createdAt: string;
}

export interface AdminPlan {
  _id: string;
  name: string;
  price: number;
  creditsPerMonth: number;
  features: string[];
}

export function useAdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<{
    analytics: AdminAnalytics | null;
    users: AdminUser[];
    institutions: AdminInstitution[];
    plans: AdminPlan[];
  }>({
    analytics: null,
    users: [],
    institutions: [],
    plans: [],
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [analyticsRes, usersRes, institutionsRes, plansRes] = await Promise.all([
        apiClient<{ data: AdminAnalytics }>("/api/v1/admin/analytics"),
        apiClient<{ data: { users: AdminUser[] } }>("/api/v1/admin/users"),
        apiClient<{ data: { institutions: AdminInstitution[] } }>("/api/v1/admin/institutions"),
        apiClient<{ data: { plans: AdminPlan[] } }>("/api/v1/admin/plans"),
      ]);

      setData({
        analytics: analyticsRes.data,
        users: usersRes.data.users || [],
        institutions: institutionsRes.data.institutions || [],
        plans: plansRes.data.plans || [],
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { ...data, loading, error, refresh: fetchData };
}
