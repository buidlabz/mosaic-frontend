"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { IconUpload, IconCode } from "@tabler/icons-react"

const clients = [
  { id: "1", name: "Alpha Finance", wallets: 150, risk: "Low", status: "Active" },
  { id: "2", name: "Beta Loans", wallets: 45, risk: "Medium", status: "Active" },
  { id: "3", name: "Gamma Trade", wallets: 320, risk: "Low", status: "Review" },
]

export default function InstitutionDashboard() {
  return (
    <div className="p-6 space-y-8">
      <div>
         <h1 className="text-3xl font-bold tracking-tight text-white">Institution Control Panel</h1>
         <p className="text-zinc-400">Manage bulk credit scoring and enterprise swaps.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-zinc-900 border-zinc-800">
           <CardHeader className="pb-2">
              <CardDescription>Total Scores Generated</CardDescription>
              <CardTitle className="text-4xl text-white">528</CardTitle>
           </CardHeader>
           <CardContent>
              <div className="text-sm text-[#00FF00]">+12% from last month</div>
           </CardContent>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800">
           <CardHeader className="pb-2">
              <CardDescription>Active Integrations</CardDescription>
              <CardTitle className="text-4xl text-white">3</CardTitle>
           </CardHeader>
           <CardContent>
              <div className="text-sm text-zinc-500">API v2.1 Connected</div>
           </CardContent>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800">
           <CardHeader className="pb-2">
              <CardDescription>Total Volume</CardDescription>
              <CardTitle className="text-4xl text-white">$1.2M</CardTitle>
           </CardHeader>
           <CardContent>
              <div className="text-sm text-[#00FF00]">Swapped via API</div>
           </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="bg-zinc-900 border-zinc-800">
           <CardHeader>
              <CardTitle className="text-white">Bulk Scoring</CardTitle>
              <CardDescription>Analyze Multiple Wallets at Once</CardDescription>
           </CardHeader>
           <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-zinc-800 rounded-lg p-10 flex flex-col items-center justify-center text-center hover:bg-zinc-800/50 transition-colors cursor-pointer">
                  <IconUpload className="w-10 h-10 text-zinc-500 mb-2"/>
                  <h3 className="text-zinc-300 font-medium">Upload CSV</h3>
                  <p className="text-xs text-zinc-500">Drag and drop or click to upload wallet addresses</p>
              </div>
              <div className="flex gap-2">
                 <Input placeholder="Or enter wallet address manually" className="bg-zinc-950 border-zinc-800 text-white" />
                 <Button className="bg-[#00FF00] text-black hover:bg-[#00DD00]">Analyze</Button>
              </div>
           </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
           <CardHeader>
              <CardTitle className="text-white">API Keys</CardTitle>
              <CardDescription>Integrate with Our API for Custom Solutions</CardDescription>
           </CardHeader>
           <CardContent className="space-y-4">
              <div className="bg-zinc-950 p-4 rounded-md border border-zinc-800 font-mono text-sm text-zinc-400 flex justify-between items-center">
                 <span>sk_live_51M...8q2</span>
                 <Button variant="ghost" size="sm" className="h-8"><IconCode className="w-4 h-4 mr-2"/> Copy</Button>
              </div>
              <div className="bg-zinc-950 p-4 rounded-md border border-zinc-800 font-mono text-sm text-zinc-400 flex justify-between items-center">
                 <span>pk_test_32K...9p1</span>
                 <Button variant="ghost" size="sm" className="h-8"><IconCode className="w-4 h-4 mr-2"/> Copy</Button>
              </div>
              <Button variant="outline" className="w-full border-zinc-700 hover:bg-zinc-800 text-white">Generate New Key</Button>
           </CardContent>
        </Card>
      </div>

      <Card className="bg-zinc-900 border-zinc-800">
         <CardHeader>
            <CardTitle className="text-white">Managed Clients</CardTitle>
            <CardDescription>Recent activity from connected accounts</CardDescription>
         </CardHeader>
         <CardContent>
            <Table>
               <TableHeader>
                  <TableRow className="border-zinc-800 hover:bg-transparent">
                     <TableHead className="text-zinc-400">Client Name</TableHead>
                     <TableHead className="text-zinc-400">Wallets</TableHead>
                     <TableHead className="text-zinc-400">Risk Profile</TableHead>
                     <TableHead className="text-zinc-400">Status</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {clients.map((client) => (
                     <TableRow key={client.id} className="border-zinc-800 hover:bg-zinc-800/50">
                        <TableCell className="font-medium text-white">{client.name}</TableCell>
                        <TableCell className="text-zinc-300">{client.wallets}</TableCell>
                        <TableCell className={client.risk === "Low" ? "text-[#00FF00]" : "text-yellow-500"}>{client.risk}</TableCell>
                        <TableCell className="text-zinc-300">{client.status}</TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </CardContent>
      </Card>
    </div>
  )
}
