"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { IconWallet, IconArrowsExchange } from "@tabler/icons-react"

const activityData = [
  { date: "Jan", score: 65 },
  { date: "Feb", score: 72 },
  { date: "Mar", score: 70 },
  { date: "Apr", score: 78 },
  { date: "May", score: 82 },
  { date: "Jun", score: 85 },
]

const recentSwaps = [
  { id: "1", pair: "USDT/KES", amount: "500 USDT", status: "Completed", date: "2026-01-15" },
  { id: "2", pair: "USDT/UGX", amount: "200 USDT", status: "Processing", date: "2026-01-18" },
  { id: "3", pair: "USDC/USD", amount: "1000 USDC", status: "Completed", date: "2026-01-14" },
]

export default function UserDashboard() {
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
        <Card className="bg-zinc-900 border-zinc-800">
           <CardHeader>
              <CardTitle className="text-zinc-200">Credit Score</CardTitle>
              <CardDescription>Real-time blockchain analysis</CardDescription>
           </CardHeader>
           <CardContent className="flex items-center justify-center py-8">
              <div className="relative w-40 h-40 flex items-center justify-center rounded-full border-8 border-zinc-800 border-t-[#00FF00] border-r-[#00FF00]">
                 <div className="text-center">
                    <span className="text-4xl font-bold text-white">85</span>
                    <span className="text-xs text-zinc-500 block">/100</span>
                 </div>
              </div>
           </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800 md:col-span-2">
           <CardHeader>
              <CardTitle className="text-zinc-200">Score History</CardTitle>
              <CardDescription>Your improvement over the last 6 months</CardDescription>
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
         <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between">
               <div>
                  <CardTitle className="text-zinc-200">Recent Swaps</CardTitle>
                  <CardDescription>Swap USDT to Local Currency Seamlessly</CardDescription>
               </div>
               <IconArrowsExchange className="text-[#00FF00] h-6 w-6"/>
            </CardHeader>
            <CardContent>
               <Table>
                  <TableHeader>
                     <TableRow className="border-zinc-800 hover:bg-transparent">
                        <TableHead className="text-zinc-400">Pair</TableHead>
                        <TableHead className="text-zinc-400">Amount</TableHead>
                        <TableHead className="text-zinc-400">Status</TableHead>
                     </TableRow>
                  </TableHeader>
                  <TableBody>
                     {recentSwaps.map((swap) => (
                        <TableRow key={swap.id} className="border-zinc-800 hover:bg-zinc-800/50">
                           <TableCell className="font-medium text-white">{swap.pair}</TableCell>
                           <TableCell className="text-zinc-300">{swap.amount}</TableCell>
                           <TableCell className={swap.status === "Completed" ? "text-[#00FF00]" : "text-yellow-500"}>{swap.status}</TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
            </CardContent>
         </Card>

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
