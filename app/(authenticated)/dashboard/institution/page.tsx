"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useInstitutionDashboard } from "@/hooks/use-institution-dashboard"
import { Skeleton } from "@/components/ui/skeleton"
import { IconUpload, IconCode, IconChartBar, IconUsers, IconCreditCard } from "@tabler/icons-react"
import Link from "next/link"

export default function InstitutionDashboard() {
  const { profile, analytics, clients, keys, loading, error } = useInstitutionDashboard();

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-10 w-48 bg-zinc-900" />
        <div className="grid md:grid-cols-3 gap-6">
          <Skeleton className="h-32 bg-zinc-900" />
          <Skeleton className="h-32 bg-zinc-900" />
          <Skeleton className="h-32 bg-zinc-900" />
        </div>
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
         <h1 className="text-3xl font-bold tracking-tight text-white">Institution Control Panel</h1>
         <p className="text-zinc-400">Manage bulk credit scoring and enterprise swaps for {profile?.name}.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-zinc-900 border-zinc-800">
           <CardHeader className="pb-2">
              <CardDescription>Total API Calls</CardDescription>
              <CardTitle className="text-4xl text-white">{analytics?.totalCalls || 0}</CardTitle>
           </CardHeader>
           <CardContent>
              <div className="text-sm text-[#00FF00]">{analytics?.successCount || 0} Successful</div>
           </CardContent>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800">
           <CardHeader className="pb-2">
              <CardDescription>Remaining Credits</CardDescription>
              <CardTitle className="text-4xl text-white">{analytics?.remainingCredits || 0}</CardTitle>
           </CardHeader>
           <CardContent>
              <div className="text-sm text-zinc-500">Replenish via Payments</div>
           </CardContent>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800">
           <CardHeader className="pb-2">
              <CardDescription>Active API Keys</CardDescription>
              <CardTitle className="text-4xl text-white">{keys.length}</CardTitle>
           </CardHeader>
           <CardContent>
              <div className="text-sm text-[#00FF00]">{keys.filter(k => k.isActive).length} Active Channels</div>
           </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="bg-zinc-900 border-zinc-800">
           <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
              <CardDescription>Analyze Multiple Wallets or Manage Integrations</CardDescription>
           </CardHeader>
           <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Link href="/dashboard/institution/scoring">
                  <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-lg hover:bg-zinc-800/50 transition-colors text-center group cursor-pointer">
                    <IconUpload className="mx-auto mb-2 text-zinc-500 group-hover:text-[#00FF00]" />
                    <span className="text-sm text-zinc-300">Bulk Scoring</span>
                  </div>
                </Link>
                <Link href="/dashboard/institution/api">
                  <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-lg hover:bg-zinc-800/50 transition-colors text-center group cursor-pointer">
                    <IconCode className="mx-auto mb-2 text-zinc-500 group-hover:text-[#00FF00]" />
                    <span className="text-sm text-zinc-300">API Keys</span>
                  </div>
                </Link>
              </div>
           </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
           <CardHeader>
              <CardTitle className="text-white">Active Plan</CardTitle>
              <CardDescription>Current subscription and status</CardDescription>
           </CardHeader>
           <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-zinc-950 border border-zinc-800 rounded-lg">
                <div>
                   <p className="text-xs text-zinc-500 uppercase font-bold">Status</p>
                   <p className={`text-sm font-medium ${profile?.status === 'APPROVED' ? 'text-[#00FF00]' : 'text-yellow-500'}`}>{profile?.status}</p>
                </div>
                <div>
                   <p className="text-xs text-zinc-500 uppercase font-bold">Current Plan</p>
                   <p className="text-sm font-medium text-white capitalize">{profile?.plan?.name || "Free"}</p>
                </div>
              </div>
              <Link href="/dashboard/institution/payments">
                <Button variant="outline" className="w-full border-zinc-700 hover:bg-zinc-800 text-white">Upgrade Subscription</Button>
              </Link>
           </CardContent>
        </Card>
      </div>

      <Card className="bg-zinc-900 border-zinc-800">
         <CardHeader className="flex flex-row items-center justify-between">
            <div>
               <CardTitle className="text-white">Accessible Clients</CardTitle>
               <CardDescription>Users who have granted data access permissions</CardDescription>
            </div>
            <Link href="/dashboard/institution/clients">
               <Button variant="ghost" size="sm" className="text-[#00FF00]">View All</Button>
            </Link>
         </CardHeader>
         <CardContent>
            <Table>
               <TableHeader>
                  <TableRow className="border-zinc-800 hover:bg-transparent">
                     <TableHead className="text-zinc-400">Client Name</TableHead>
                     <TableHead className="text-zinc-400">Email</TableHead>
                     <TableHead className="text-zinc-400">User ID</TableHead>
                     <TableHead className="text-zinc-400 text-right">Action</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {clients.length > 0 ? clients.slice(0, 5).map((client) => (
                     <TableRow key={client.userId} className="border-zinc-800 hover:bg-zinc-800/50">
                        <TableCell className="font-medium text-white">{client.name}</TableCell>
                        <TableCell className="text-zinc-300">{client.email}</TableCell>
                        <TableCell className="text-zinc-500 font-mono text-xs">{client.userId}</TableCell>
                        <TableCell className="text-right">
                           <Link href={`/dashboard/institution/clients?id=${client.userId}`}>
                              <Button variant="ghost" size="sm" className="text-[#00FF00]">View Wallets</Button>
                           </Link>
                        </TableCell>
                     </TableRow>
                  )) : (
                     <TableRow>
                        <TableCell colSpan={4} className="text-center text-zinc-500 py-10">
                           No clients have granted access yet.
                        </TableCell>
                     </TableRow>
                  )}
               </TableBody>
            </Table>
         </CardContent>
      </Card>
    </div>
  )
}
