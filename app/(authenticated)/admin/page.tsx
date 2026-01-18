"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

const userTypeData = [
  { name: 'Retail', value: 400 },
  { name: 'Institutional', value: 300 },
  { name: 'Enterprise', value: 300 },
];
const COLORS = ['#00FF00', '#008800', '#FFFFFF'];

const recentLogs = [
  { id: "1", action: "User Signup", user: "user_291", time: "2 mins ago", status: "Success" },
  { id: "2", action: "API Call", user: "inst_882", time: "15 mins ago", status: "Success" },
  { id: "3", action: "Failed Login", user: "user_102", time: "1 hour ago", status: "Failed" },
  { id: "4", action: "Bulk Score", user: "inst_882", time: "2 hours ago", status: "Success" },
]

export default function AdminDashboard() {
  return (
    <div className="p-6 space-y-8">
      <div>
         <h1 className="text-3xl font-bold tracking-tight text-white">Mosaic Admin Panel</h1>
         <p className="text-zinc-400">Oversee platform operations and users.</p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <Card className="bg-zinc-900 border-zinc-800">
           <CardHeader className="pb-2">
              <CardDescription>Total Users</CardDescription>
              <CardTitle className="text-4xl text-white">1,024</CardTitle>
           </CardHeader>
           <CardContent>
              <div className="text-sm text-[#00FF00]">Manage All Accounts</div>
           </CardContent>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800">
           <CardHeader className="pb-2">
              <CardDescription>Swaps Processed</CardDescription>
              <CardTitle className="text-4xl text-white">10.5M</CardTitle>
           </CardHeader>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800">
           <CardHeader className="pb-2">
              <CardDescription>System Uptime</CardDescription>
              <CardTitle className="text-4xl text-white">99.99%</CardTitle>
           </CardHeader>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800">
           <CardHeader className="pb-2">
              <CardDescription>Active Alerts</CardDescription>
              <CardTitle className="text-4xl text-yellow-500">2</CardTitle>
           </CardHeader>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <Card className="bg-zinc-900 border-zinc-800 md:col-span-2">
           <CardHeader>
              <CardTitle className="text-white">System Logs</CardTitle>
              <CardDescription>Recent platform activity and security audit</CardDescription>
           </CardHeader>
           <CardContent>
              <Table>
                 <TableHeader>
                    <TableRow className="border-zinc-800 hover:bg-transparent">
                       <TableHead className="text-zinc-400">Action</TableHead>
                       <TableHead className="text-zinc-400">User ID</TableHead>
                       <TableHead className="text-zinc-400">Time</TableHead>
                       <TableHead className="text-zinc-400">Status</TableHead>
                    </TableRow>
                 </TableHeader>
                 <TableBody>
                    {recentLogs.map((log) => (
                       <TableRow key={log.id} className="border-zinc-800 hover:bg-zinc-800/50">
                          <TableCell className="font-medium text-white">{log.action}</TableCell>
                          <TableCell className="text-zinc-300">{log.user}</TableCell>
                          <TableCell className="text-zinc-500">{log.time}</TableCell>
                          <TableCell className={log.status === "Failed" ? "text-red-500" : "text-[#00FF00]"}>{log.status}</TableCell>
                       </TableRow>
                    ))}
                 </TableBody>
              </Table>
           </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
           <CardHeader>
              <CardTitle className="text-white">User Distribution</CardTitle>
              <CardDescription>Monitor Blockchain Integrations</CardDescription>
           </CardHeader>
           <CardContent className="h-[250px] w-full">
              <ChartContainer config={{ 
                  retail: { label: "Retail", color: "#00FF00" },
                  institutional: { label: "Institutional", color: "#008800" },
                  enterprise: { label: "Enterprise", color: "#FFFFFF" }
               }} className="h-full w-full">
                  <PieChart>
                    <Pie
                      data={userTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
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
           </CardContent>
        </Card>
      </div>
    </div>
  )
}
