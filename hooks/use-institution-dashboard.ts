'use client'
import { useState, useEffect } from "react";
import { apiClient } from "@/lib/api-client";

export interface AnalyticsData {
  totalCalls: number;
  successCount: number;
  failedCount: number;
  remainingCredits: number;
  usageByEndpoint: Record<string, number>;
}

export interface InstitutionProfile {
  _id?: string;
  name: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "DEACTIVATED";
  plan?: {
    _id: string;
    name: string;
    price: number;
  };
  credits: number;
  metadata: Record<string, unknown>;
}

export interface AccessibleClient {
  userId: string;
  name: string;
  email: string;
}

export interface APIKey {
  [x: string]: string | undefined | boolean;
  _id: string;
  prefix: string;
  key?: string; 
  name: string;
  isActive: boolean;
  lastUsed?: string;
  createdAt: string;
}

export function useInstitutionDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<{
    profile: InstitutionProfile | null;
    analytics: AnalyticsData | null;
    clients: AccessibleClient[];
    keys: APIKey[];
  }>({
    profile: null,
    analytics: null,
    clients: [],
    keys: [],
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [profileRes, analyticsRes, clientsRes, keysRes] = await Promise.all([
        apiClient<{ data: { institution: InstitutionProfile } }>("/api/v1/institution/profile"),
        apiClient<{ data: AnalyticsData }>("/api/v1/institution/stats"),
        apiClient<{ data: { clients: AccessibleClient[] } }>("/api/v1/institution/access/clients"),
        apiClient<{ data: { keys: APIKey[] } }>("/api/v1/institution/keys"),
      ]);

      setData({
        profile: profileRes.data.institution,
        analytics: analyticsRes.data,
        clients: clientsRes.data.clients || [],
        keys: keysRes.data.keys || [],
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
