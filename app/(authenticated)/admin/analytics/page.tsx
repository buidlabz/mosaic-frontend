"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAdminDashboard } from "@/hooks/use-admin-dashboard"
import { Skeleton } from "@/components/ui/skeleton"
import { IconChartBar, IconUsers, IconBuilding, IconActivity, IconArrowUpRight } from "@tabler/icons-react"

export default function AdminAnalyticsPage() {
  const { analytics, loading, error } = useAdminDashboard();

  if (loading) return <div className="p-6 space-y-6"><Skeleton className="h-10 w-48 bg-zinc-900" /><Skeleton className="h-96 bg-zinc-900" /></div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Platform Analytics</h1>
        <p className="text-zinc-400">Deep dive into platform usage and growth metrics.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
         <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl space-y-2">
            <p className="text-xs text-zinc-500 uppercase font-black">User Growth</p>
            <div className="flex items-center justify-between">
               <h3 className="text-3xl font-bold text-white">{analytics?.users}</h3>
               <span className="text-[#00FF00] text-xs flex items-center bg-[#00FF00]/10 px-2 py-0.5 rounded">
                  +12% <IconArrowUpRight size={12} className="ml-1" />
               </span>
            </div>
         </div>
         <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl space-y-2">
            <p className="text-xs text-zinc-500 uppercase font-black">Partner Growth</p>
            <div className="flex items-center justify-between">
               <h3 className="text-3xl font-bold text-white">{analytics?.institutions}</h3>
               <span className="text-[#00FF00] text-xs flex items-center bg-[#00FF00]/10 px-2 py-0.5 rounded">
                  +5% <IconArrowUpRight size={12} className="ml-1" />
               </span>
            </div>
         </div>
         <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl space-y-2">
            <p className="text-xs text-zinc-500 uppercase font-black">API Success Rate</p>
            <div className="flex items-center justify-between">
               <h3 className="text-3xl font-bold text-white">
                  {analytics?.apiCalls?.total ? Math.round((analytics.apiCalls.successful / analytics.apiCalls.total) * 100) : 0}%
               </h3>
               <IconActivity className="text-[#00FF00]" size={20} />
            </div>
         </div>
         <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl space-y-2">
            <p className="text-xs text-zinc-500 uppercase font-black">Wallet Connections</p>
            <div className="flex items-center justify-between">
               <h3 className="text-3xl font-bold text-white">{analytics?.wallets}</h3>
               <IconArrowUpRight className="text-zinc-700" size={20} />
            </div>
         </div>
      </div>

      <Card className="bg-zinc-900 border-zinc-800">
         <CardHeader>
            <CardTitle className="text-white">API Usage History</CardTitle>
            <CardDescription>Historical data for the last 30 days is currently being aggregated.</CardDescription>
         </CardHeader>
         <CardContent className="h-[300px] flex items-center justify-center text-zinc-500 italic">
            Chart data will appear here once the time-series endpoint is integrated.
         </CardContent>
      </Card>
    </div>
  )
}
