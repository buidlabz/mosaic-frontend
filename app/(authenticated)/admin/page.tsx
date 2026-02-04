"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { useAdminDashboard } from "@/hooks/use-admin-dashboard"
import { Skeleton } from "@/components/ui/skeleton"
import { IconUsers, IconBuilding, IconWallet, IconActivity } from "@tabler/icons-react"
import Link from "next/link"

const COLORS = ['#00FF00', '#008800', '#FFFFFF'];

export default function AdminDashboard() {
  const { analytics, loading, error } = useAdminDashboard();

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-10 w-48 bg-zinc-900" />
        <div className="grid md:grid-cols-4 gap-6">
          <Skeleton className="h-32 bg-zinc-900" />
          <Skeleton className="h-32 bg-zinc-900" />
          <Skeleton className="h-32 bg-zinc-900" />
          <Skeleton className="h-32 bg-zinc-900" />
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <Skeleton className="h-64 col-span-2 bg-zinc-900" />
          <Skeleton className="h-64 bg-zinc-900" />
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  const userTypeData = [
    { name: 'Users', value: analytics?.users || 0 },
    { name: 'Institutions', value: analytics?.institutions || 0 },
  ];

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-3xl font-bold tracking-tight text-white">Mosaic Admin Panel</h1>
           <p className="text-zinc-400">Oversee platform operations and users.</p>
        </div>
        <Link href="/admin/analytics">
           <Button variant="outline" className="border-zinc-800 text-zinc-400 hover:text-white">Full Report</Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <Card className="bg-zinc-900 border-zinc-800">
           <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                 <IconUsers size={14} /> Total Users
              </CardDescription>
              <CardTitle className="text-4xl text-white">{analytics?.users || 0}</CardTitle>
           </CardHeader>
           <CardContent>
              <Link href="/admin/users" className="text-xs text-[#00FF00] hover:underline">Manage All Accounts</Link>
           </CardContent>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800">
           <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                 <IconBuilding size={14} /> Institutions
              </CardDescription>
              <CardTitle className="text-4xl text-white">{analytics?.institutions || 0}</CardTitle>
           </CardHeader>
           <CardContent>
              <Link href="/admin/institutions" className="text-xs text-[#00FF00] hover:underline">Approval Queue</Link>
           </CardContent>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800">
           <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                 <IconWallet size={14} /> Connected Wallets
              </CardDescription>
              <CardTitle className="text-4xl text-white">{analytics?.wallets || 0}</CardTitle>
           </CardHeader>
           <CardContent>
              <div className="text-xs text-zinc-500">Across all chains</div>
           </CardContent>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800">
           <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                 <IconActivity size={14} /> API Success
              </CardDescription>
              <CardTitle className="text-4xl text-[#00FF00]">
                 {analytics?.apiCalls?.total ? Math.round((analytics.apiCalls.successful / analytics.apiCalls.total) * 100) : 0}%
              </CardTitle>
           </CardHeader>
           <CardContent>
              <div className="text-xs text-zinc-500">{analytics?.apiCalls?.total || 0} Total Requests</div>
           </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <Card className="bg-zinc-900 border-zinc-800 md:col-span-2">
           <CardHeader>
              <CardTitle className="text-white">Platform Health</CardTitle>
              <CardDescription>Real-time scoring engine performance metrics</CardDescription>
           </CardHeader>
           <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-lg">
                    <p className="text-xs text-zinc-500 uppercase font-bold mb-1">Total API Volume</p>
                    <p className="text-2xl font-bold text-white">{analytics?.apiCalls?.total || 0}</p>
                 </div>
                 <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-lg">
                    <p className="text-xs text-zinc-500 uppercase font-bold mb-1">Succesful Calls</p>
                    <p className="text-2xl font-bold text-[#00FF00]">{analytics?.apiCalls?.successful || 0}</p>
                 </div>
              </div>
              <div className="h-2 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
                 <div 
                    className="h-full bg-[#00FF00] transition-all" 
                    style={{ width: `${analytics?.apiCalls?.total ? (analytics.apiCalls.successful / analytics.apiCalls.total) * 100 : 0}%` }}
                 />
              </div>
           </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
           <CardHeader>
              <CardTitle className="text-white">Entity Distribution</CardTitle>
              <CardDescription>Retail vs Institutional Entities</CardDescription>
           </CardHeader>
           <CardContent className="h-[200px] w-full">
              <ChartContainer config={{ 
                  users: { label: "Users", color: "#00FF00" },
                  institutions: { label: "Institutions", color: "#008800" }
               }} className="h-full w-full">
                  <PieChart>
                    <Pie
                      data={userTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {userTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
              </ChartContainer>
              <div className="flex justify-center gap-4 text-xs mt-4">
                 <div className="flex items-center gap-1.5 text-zinc-400">
                    <div className="h-2 w-2 rounded-full bg-[#00FF00]" /> Users
                 </div>
                 <div className="flex items-center gap-1.5 text-zinc-400">
                    <div className="h-2 w-2 rounded-full bg-[#008800]" /> Institutions
                 </div>
              </div>
           </CardContent>
        </Card>
      </div>
    </div>
  )
}
