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
  _id?: string;
  walletId: {
    id: string;
    address: string;
    chain: string;
    nickname?: string;
  };
  scoreStatus: "available" | "unsupported" | "error";
  score: number | null;
  breakdown: Record<string, unknown> | null;
  provider: string;
  lastUpdated: string | null;
  history: Array<{
    score: number;
    timestamp: string;
    provider: string;
    breakdown?: Record<string, unknown> | null;
    grade?: string | null;
    riskTier?: string | null;
  }>;
  grade: string | null;
  riskTier: string | null;
  maxScore: number | null;
  penalties: string[];
  reasoning: string[];
  positivePoints: number | null;
  penaltyPoints: number | null;
  algorithmVersion: string | null;
  message?: string | null;
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

type ScoreHistoryResponseData =
  | CreditScore[]
  | CreditScore
  | {
      scores?: CreditScore[];
    };

function hasScoresArray(data: ScoreHistoryResponseData): data is { scores?: CreditScore[] } {
  return typeof data === "object" && data !== null && "scores" in data;
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
        apiClient<{ data: ScoreHistoryResponseData }>("/api/v1/client/score/history"),
        apiClient<{ data: { wallets: Wallet[] } }>("/api/v1/client/wallet"),
        apiClient<{ data: { plan: Plan } }>("/api/v1/user/subscription"),
        apiClient<{ data: { requests: AccessRequest[] } }>("/api/v1/client/access/requests"),
      ]);

      const normalizedScores = Array.isArray(scoresRes.data)
        ? scoresRes.data
        : hasScoresArray(scoresRes.data)
          ? scoresRes.data.scores ?? []
          : scoresRes.data
            ? [scoresRes.data]
            : [];

      setData({
        scores: normalizedScores,
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
