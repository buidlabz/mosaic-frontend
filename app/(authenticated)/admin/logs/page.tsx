"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { IconFileText, IconShield, IconAlertTriangle } from "@tabler/icons-react"

const logs = [
  { id: "1", action: "User Signup", details: "New retail account created (user_902)", time: "2 mins ago", level: "info" },
  { id: "2", action: "API Authentication", details: "Invalid API key attempt from 192.168.1.4", time: "15 mins ago", level: "warning" },
  { id: "3", action: "Plan Update", details: "Institution 'EcoBank' upgraded to Enterprise", time: "1 hour ago", level: "info" },
  { id: "4", action: "System Alert", details: "Scoring engine response time above 500ms", time: "2 hours ago", level: "error" },
]

export default function AdminLogsPage() {
  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">System Audit Logs</h1>
        <p className="text-zinc-400">Track all platform activities and security events.</p>
      </div>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <IconFileText size={20} className="text-[#00FF00]" /> Recent Activity
          </CardTitle>
          <CardDescription>Filtering active for the last 24 hours.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800 hover:bg-transparent">
                <TableHead className="text-zinc-400 pl-6">Action</TableHead>
                <TableHead className="text-zinc-400">Details</TableHead>
                <TableHead className="text-zinc-400">Timestamp</TableHead>
                <TableHead className="text-zinc-400 text-right pr-6">Level</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id} className="border-zinc-800 hover:bg-zinc-800/50">
                  <TableCell className="font-medium text-white pl-6">{log.action}</TableCell>
                  <TableCell className="text-zinc-400 text-sm">{log.details}</TableCell>
                  <TableCell className="text-zinc-500 text-xs">{log.time}</TableCell>
                  <TableCell className="text-right pr-6">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        log.level === 'error' ? 'bg-red-500/10 text-red-500' : 
                        log.level === 'warning' ? 'bg-yellow-500/10 text-yellow-500' : 
                        'bg-blue-500/10 text-blue-500'
                    }`}>
                      {log.level}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
         <Card className="bg-zinc-950 border-zinc-800 border-dashed">
            <CardHeader>
               <CardTitle className="text-zinc-400 text-sm">Log Retention</CardTitle>
            </CardHeader>
            <CardContent>
               <p className="text-xs text-zinc-600 italic">Audit trails are persisted for 90 days as per security policy.</p>
            </CardContent>
         </Card>
         <Card className="bg-zinc-950 border-zinc-800 border-dashed">
            <CardHeader>
               <CardTitle className="text-zinc-400 text-sm">External SIEM</CardTitle>
            </CardHeader>
            <CardContent>
               <p className="text-xs text-zinc-600 italic">Log streaming to Datadog/CloudWatch is currently healthy.</p>
            </CardContent>
         </Card>
      </div>
    </div>
  )
}
