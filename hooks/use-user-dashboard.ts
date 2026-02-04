'use client'
import { useState, useEffect } from "react";
import { apiClient } from "@/lib/api-client";

export interface Wallet {
  _id: string;
  address: string;
  chain: string;
  nickname?: string;
}

export interface CreditScore {
  walletId: string;
  address: string;
  score: number;
  breakdown: Record<string, unknown>;
  updatedAt: string;
}

export interface Plan {
  _id: string;
  name: string;
  type: string;
  price: number;
  walletLimit: number;
  features: string[];
}

export interface AccessRequest {
  _id: string;
  institution: {
    _id: string;
    name: string;
  };
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
}

export function useUserDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<{
    scores: CreditScore[];
    wallets: Wallet[];
    subscription: Plan | null;
    accessRequests: AccessRequest[];
  }>({
    scores: [],
    wallets: [],
    subscription: null,
    accessRequests: [],
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [scoresRes, walletsRes, subRes, requestsRes] = await Promise.all([
        apiClient<{ data: { scores: CreditScore[] } }>("/api/v1/client/score"),
        apiClient<{ data: { wallets: Wallet[] } }>("/api/v1/client/wallet"),
        apiClient<{ data: { plan: Plan } }>("/api/v1/user/subscription"),
        apiClient<{ data: { requests: AccessRequest[] } }>("/api/v1/client/access/requests"),
      ]);

      setData({
        scores: scoresRes.data.scores,
        wallets: walletsRes.data.wallets,
        subscription: subRes.data.plan,
        accessRequests: requestsRes.data.requests || [],
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
