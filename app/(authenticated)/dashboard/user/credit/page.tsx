"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useUserDashboard } from "@/hooks/use-user-dashboard"
import { Skeleton } from "@/components/ui/skeleton"
import { IconChartBar, IconInfoCircle } from "@tabler/icons-react"

export default function CreditScorePage() {
  const { scores, loading, error } = useUserDashboard();

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-10 w-48 bg-zinc-900" />
        <Skeleton className="h-64 w-full bg-zinc-900" />
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Credit Score Analysis</h1>
        <p className="text-zinc-400">Detailed breakdown of your blockchain creditworthiness.</p>
      </div>

      <div className="grid gap-6">
        {scores.length > 0 ? scores.map((score, index) => (
          <Card key={index} className="bg-zinc-900 border-zinc-800">
            <CardHeader>
               <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-zinc-200">Wallet: {score.walletId.address.slice(0, 6)}...{score.walletId.address.slice(-4)}</CardTitle>
                    <CardDescription>
                      {score.lastUpdated ? `Last updated: ${new Date(score.lastUpdated).toLocaleDateString()}` : score.message || "Score unavailable"}
                    </CardDescription>
                  </div>
                  <div className="h-12 w-12 rounded-full border-4 border-[#00FF00] flex items-center justify-center">
                    <span className="font-bold text-[#00FF00]">{score.score !== null ? Math.round(score.score) : "N/A"}</span>
                  </div>
               </div>
            </CardHeader>
            <CardContent>
               <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[#00FF00] bg-[#00FF00]/10 p-3 rounded-lg border border-[#00FF00]/20">
                    <IconInfoCircle size={18} />
                    <span className="text-sm font-medium">Your score is calculated based on transaction volume, asset holding, and activity history.</span>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 pt-4">
                    <div className="flex justify-between items-center p-3 bg-zinc-950 border border-zinc-800 rounded-lg">
                      <span className="text-zinc-400">Grade</span>
                      <span className="text-white font-medium">{score.grade ?? "N/A"}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-zinc-950 border border-zinc-800 rounded-lg">
                      <span className="text-zinc-400">Risk Tier</span>
                      <span className="text-white font-medium">{score.riskTier ?? "N/A"}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-zinc-950 border border-zinc-800 rounded-lg">
                      <span className="text-zinc-400">Positive Points</span>
                      <span className="text-white font-medium">{score.positivePoints ?? "N/A"}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-zinc-950 border border-zinc-800 rounded-lg">
                      <span className="text-zinc-400">Penalty Points</span>
                      <span className="text-white font-medium">{score.penaltyPoints ?? "N/A"}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-zinc-950 border border-zinc-800 rounded-lg">
                      <span className="text-zinc-400">Max Score</span>
                      <span className="text-white font-medium">{score.maxScore ?? "N/A"}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-zinc-950 border border-zinc-800 rounded-lg">
                      <span className="text-zinc-400">Algorithm</span>
                      <span className="text-white font-medium">{score.algorithmVersion ?? "N/A"}</span>
                    </div>
                    {score.breakdown && Object.entries(score.breakdown).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center p-3 bg-zinc-950 border border-zinc-800 rounded-lg">
                        <span className="text-zinc-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <span className="text-white font-medium">{String(value)}</span>
                      </div>
                    ))}
                  </div>

                  {(score.reasoning.length > 0 || score.penalties.length > 0) && (
                    <div className="grid md:grid-cols-2 gap-4 pt-2">
                      <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-lg space-y-2">
                        <p className="text-sm font-medium text-zinc-200">Reasoning</p>
                        {score.reasoning.length > 0 ? score.reasoning.map((item) => (
                          <p key={item} className="text-sm text-zinc-400">{item}</p>
                        )) : <p className="text-sm text-zinc-500">No reasoning available.</p>}
                      </div>
                      <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-lg space-y-2">
                        <p className="text-sm font-medium text-zinc-200">Penalties</p>
                        {score.penalties.length > 0 ? score.penalties.map((item) => (
                          <p key={item} className="text-sm text-zinc-400">{item}</p>
                        )) : <p className="text-sm text-zinc-500">No penalties applied.</p>}
                      </div>
                    </div>
                  )}
               </div>
            </CardContent>
          </Card>
        )) : (
          <Card className="bg-zinc-900 border-zinc-800 border-dashed py-12">
            <CardContent className="flex flex-col items-center justify-center text-center space-y-4">
              <IconChartBar size={48} className="text-zinc-700" />
              <div className="space-y-1">
                <p className="text-zinc-200 font-medium">No credit scores available</p>
                <p className="text-zinc-500 text-sm">Connect a wallet to start calculating your score.</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
