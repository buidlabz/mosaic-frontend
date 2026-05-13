"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { IconSettings, IconShield, IconBell, IconServer } from "@tabler/icons-react"

export default function AdminSettingsPage() {
  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">System Settings</h1>
        <p className="text-zinc-400">Configure platform-wide defaults and security policies.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="bg-zinc-900 border-zinc-800">
           <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                 <IconShield size={20} className="text-[#00FF00]" /> Security Policy
              </CardTitle>
              <CardDescription>Manage authentication and access controls.</CardDescription>
           </CardHeader>
           <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                 <div>
                    <p className="text-sm font-medium text-white">Enforce 2FA for Admin</p>
                    <p className="text-xs text-zinc-500">Require multi-factor auth for all administrators.</p>
                 </div>
                 <Switch checked={true} />
              </div>
              <div className="flex items-center justify-between">
                 <div>
                    <p className="text-sm font-medium text-white">Session Timeout</p>
                    <p className="text-xs text-zinc-500">Automatically log out inactive sessions.</p>
                 </div>
                 <select className="bg-zinc-950 border-zinc-800 text-zinc-300 text-xs rounded p-1 outline-none">
                    <option>30 Minutes</option>
                    <option>1 Hour</option>
                    <option>24 Hours</option>
                 </select>
              </div>
           </CardContent>
           <CardFooter>
              <Button className="bg-[#00FF00] text-black w-full">Save Changes</Button>
           </CardFooter>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
           <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                 <IconServer size={20} className="text-[#00FF00]" /> Infrastructure
              </CardTitle>
              <CardDescription>Platform-wide scoring engine configuration.</CardDescription>
           </CardHeader>
           <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                 <div>
                    <p className="text-sm font-medium text-white">Maintenance Mode</p>
                    <p className="text-xs text-zinc-500">Disable all public API access.</p>
                 </div>
                 <Switch checked={false} />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] text-zinc-500 uppercase font-bold">API Base URL Override</label>
                 <Input className="bg-zinc-950 border-zinc-800 text-white" defaultValue="http://localhost:9002" />
              </div>
           </CardContent>
           <CardFooter>
              <Button variant="outline" className="border-zinc-800 text-white w-full">Reboot Engine</Button>
           </CardFooter>
        </Card>
      </div>
    </div>
  )
}
