"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { IconWallet, IconArrowsExchange, IconShieldCheck, IconCreditCard, IconHistory } from "@tabler/icons-react"
import { useUserDashboard } from "@/hooks/use-user-dashboard"
import { Skeleton } from "@/components/ui/skeleton"

export default function UserDashboard() {
  const { scores, wallets, subscription, accessRequests, loading, error } = useUserDashboard();

  // For history, we'll use the breakdown of the first score or a default
  const activityData = scores.length > 0 ? [
    { date: "Current", score: scores[0].score }
  ] : [
    { date: "Jan", score: 0 },
    { date: "Feb", score: 0 },
  ];

  if (loading) {
     return (
        <div className="p-6 space-y-8">
           <Skeleton className="h-10 w-64 bg-zinc-900" />
           <div className="grid md:grid-cols-3 gap-6">
              <Skeleton className="h-48 bg-zinc-900" />
              <Skeleton className="h-48 md:col-span-2 bg-zinc-900" />
           </div>
        </div>
     );
  }

  if (error) {
     return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h1 className="text-3xl font-bold tracking-tight text-white">Your Mosaic Dashboard</h1>
           <p className="text-zinc-400">Track your blockchain credit and manage swaps.</p>
        </div>
        <Button className="bg-[#00FF00] text-black hover:bg-[#00DD00]">
           <IconWallet className="mr-2 h-4 w-4" /> Connect Wallet
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Credit Score */}
        <Card className="bg-zinc-900 border-zinc-800">
           <CardHeader>
              <CardTitle className="text-zinc-200">Total Credit Score</CardTitle>
              <CardDescription>Real-time blockchain analysis</CardDescription>
           </CardHeader>
           <CardContent className="flex items-center justify-center py-8">
              <div className="relative w-40 h-40 flex items-center justify-center rounded-full border-8 border-zinc-800 border-t-[#00FF00] border-r-[#00FF00]">
                 <div className="text-center">
                    <span className="text-4xl font-bold text-white">{scores.length > 0 ? Math.round(scores[0].score) : "N/A"}</span>
                    <span className="text-xs text-zinc-500 block">/100</span>
                 </div>
              </div>
           </CardContent>
        </Card>

        {/* Score History */}
        <Card className="bg-zinc-900 border-zinc-800 md:col-span-2">
           <CardHeader>
              <CardTitle className="text-zinc-200">Score Progress</CardTitle>
              <CardDescription>Visualizing your financial health on-chain</CardDescription>
           </CardHeader>
           <CardContent>
              <div className="h-[200px] w-full">
                  <ChartContainer config={{ score: { label: "Score", color: "#00FF00" } }} className="h-full w-full">
                     <LineChart data={activityData}>
                        <XAxis dataKey="date" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="score" stroke="#00FF00" strokeWidth={2} dot={{ fill: "#00FF00" }} />
                     </LineChart>
                  </ChartContainer>
              </div>
           </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
         {/* Connected Wallets */}
         <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between">
               <div>
                  <CardTitle className="text-zinc-200">Connected Wallets</CardTitle>
                  <CardDescription>Manage your tracked assets</CardDescription>
               </div>
               <IconWallet className="text-[#00FF00] h-6 w-6"/>
            </CardHeader>
            <CardContent>
               <Table>
                  <TableHeader>
                     <TableRow className="border-zinc-800 hover:bg-transparent">
                        <TableHead className="text-zinc-400">Nickname</TableHead>
                        <TableHead className="text-zinc-400">Address</TableHead>
                        <TableHead className="text-zinc-400">Chain</TableHead>
                     </TableRow>
                  </TableHeader>
                  <TableBody>
                     {wallets.length > 0 ? wallets.map((wallet) => (
                        <TableRow key={wallet._id} className="border-zinc-800 hover:bg-zinc-800/50">
                           <TableCell className="font-medium text-white">{wallet.nickname || "Unnamed"}</TableCell>
                           <TableCell className="text-zinc-300 font-mono text-xs">{wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}</TableCell>
                           <TableCell className="text-zinc-300 uppercase">{wallet.chain}</TableCell>
                        </TableRow>
                     )) : (
                        <TableRow>
                           <TableCell colSpan={3} className="text-center text-zinc-500 py-4">No wallets connected</TableCell>
                        </TableRow>
                     )}
                  </TableBody>
               </Table>
            </CardContent>
         </Card>

         {/* Access Requests */}
         <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between">
               <div>
                  <CardTitle className="text-zinc-200">Data Access Requests</CardTitle>
                  <CardDescription>Institutions requesting your data</CardDescription>
               </div>
               <IconShieldCheck className="text-[#00FF00] h-6 w-6"/>
            </CardHeader>
            <CardContent>
                <Table>
                  <TableHeader>
                     <TableRow className="border-zinc-800 hover:bg-transparent">
                        <TableHead className="text-zinc-400">Institution</TableHead>
                        <TableHead className="text-zinc-400">Status</TableHead>
                        <TableHead className="text-zinc-400 text-right">Action</TableHead>
                     </TableRow>
                  </TableHeader>
                  <TableBody>
                     {accessRequests.length > 0 ? accessRequests.map((request) => (
                        <TableRow key={request._id} className="border-zinc-800 hover:bg-zinc-800/50">
                           <TableCell className="font-medium text-white">{request.institution.name}</TableCell>
                           <TableCell>
                              <span className={`px-2 py-1 rounded-full text-[10px] uppercase font-bold ${
                                 request.status === "PENDING" ? "bg-yellow-500/10 text-yellow-500" :
                                 request.status === "APPROVED" ? "bg-[#00FF00]/10 text-[#00FF00]" : "bg-red-500/10 text-red-500"
                              }`}>
                                 {request.status}
                              </span>
                           </TableCell>
                           <TableCell className="text-right">
                              {request.status === "PENDING" && (
                                 <div className="flex justify-end gap-2">
                                    <Button size="sm" variant="outline" className="h-7 text-xs border-red-500 text-red-500 hover:bg-red-500 hover:text-white">Reject</Button>
                                    <Button size="sm" className="h-7 text-xs bg-[#00FF00] text-black">Approve</Button>
                                 </div>
                              )}
                           </TableCell>
                        </TableRow>
                     )) : (
                        <TableRow>
                           <TableCell colSpan={3} className="text-center text-zinc-500 py-4">No pending requests</TableCell>
                        </TableRow>
                     )}
                  </TableBody>
               </Table>
            </CardContent>
         </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
         {/* Subscription Plan */}
         <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between">
               <div>
                  <CardTitle className="text-zinc-200">Your Subscription</CardTitle>
                  <CardDescription>Manage your platform limits</CardDescription>
               </div>
               <IconCreditCard className="text-[#00FF00] h-6 w-6"/>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex items-center justify-between p-4 bg-zinc-950 border border-zinc-800 rounded-lg">
                  <div>
                     <div className="text-sm text-zinc-400">Current Plan</div>
                     <div className="text-xl font-bold text-white capitalize">{subscription?.name || "Free"}</div>
                  </div>
                  <div className="text-right">
                     <div className="text-sm text-zinc-400">Price</div>
                     <div className="text-xl font-bold text-[#00FF00]">${subscription?.price || 0}/mo</div>
                  </div>
               </div>
               <div className="space-y-2">
                  <div className="text-xs text-zinc-500 font-medium uppercase tracking-wider">Features included:</div>
                  <ul className="grid grid-cols-2 gap-2">
                     {subscription?.features.map((feature, i) => (
                        <li key={i} className="text-sm text-zinc-300 flex items-center gap-2">
                           <div className="w-1 h-1 rounded-full bg-[#00FF00]" /> {feature}
                        </li>
                     )) || <li className="text-sm text-zinc-300">Basic credit score analysis</li>}
                  </ul>
               </div>
               <Button variant="outline" className="w-full border-[#00FF00] text-[#00FF00] hover:bg-[#00FF00] hover:text-black">Upgrade Plan</Button>
            </CardContent>
         </Card>

         {/* Rewards/Points (Keep but maybe refine if API doesn't support yet) */}
         <Card className="bg-gradient-to-br from-zinc-900 to-black border-zinc-800 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-[#00FF00]/5 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
             <CardHeader>
                <CardTitle className="text-white">Mosaic Rewards</CardTitle>
                <CardDescription>Earn points for every transaction</CardDescription>
             </CardHeader>
             <CardContent className="space-y-4 relative z-10">
                <div className="text-3xl font-bold text-[#00FF00]">1,250 PTS</div>
                <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                   <div className="h-full bg-[#00FF00] w-[60%]"></div>
                </div>
                <p className="text-sm text-zinc-400">You are top 10% of users this month! Keep swapping to unlock premium features.</p>
                <Button variant="outline" className="border-[#00FF00] text-[#00FF00] hover:bg-[#00FF00] hover:text-black">View Rewards</Button>
             </CardContent>
         </Card>
      </div>
    </div>
  )
}
