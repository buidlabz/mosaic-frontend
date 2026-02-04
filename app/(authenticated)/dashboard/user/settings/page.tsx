"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { IconBell, IconShieldCheck, IconDeviceLaptop, IconTrash } from "@tabler/icons-react"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Settings</h1>
        <p className="text-zinc-400">Configure your account preferences and security.</p>
      </div>

      <div className="space-y-6 max-w-4xl">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
               <IconBell size={20} className="text-[#00FF00]" /> Notifications
            </CardTitle>
            <CardDescription>Control how you receive alerts and updates.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex items-center justify-between p-4 bg-zinc-950 border border-zinc-800 rounded-lg">
                <div>
                   <p className="text-sm font-medium text-white">Score Updates</p>
                   <p className="text-xs text-zinc-500">Notify me when my credit score changes significance.</p>
                </div>
                <Switch defaultChecked />
             </div>
             <div className="flex items-center justify-between p-4 bg-zinc-950 border border-zinc-800 rounded-lg">
                <div>
                   <p className="text-sm font-medium text-white">Access Requests</p>
                   <p className="text-xs text-zinc-500">Alert me when institutions request data access.</p>
                </div>
                <Switch defaultChecked />
             </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
               <IconShieldCheck size={20} className="text-[#00FF00]" /> Security
            </CardTitle>
            <CardDescription>Manage your authentication and password.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <Button variant="outline" className="w-full justify-start border-zinc-800 text-white hover:bg-zinc-800">
                Change Password
             </Button>
             <Button variant="outline" className="w-full justify-start border-zinc-800 text-white hover:bg-zinc-800">
                Enable Two-Factor Authentication (2FA)
             </Button>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
               <IconDeviceLaptop size={20} className="text-[#00FF00]" /> Sessions
            </CardTitle>
            <CardDescription>Devices currently logged into your account.</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-zinc-950 border border-zinc-800 rounded-lg">
                   <div>
                      <p className="text-sm font-medium text-white">Chrome on MacOS</p>
                      <p className="text-xs text-[#00FF00]">Current Session</p>
                   </div>
                   <span className="text-xs text-zinc-500">Nigeria</span>
                </div>
             </div>
          </CardContent>
        </Card>

        <Card className="border-red-900/20 bg-red-950/10">
          <CardHeader>
            <CardTitle className="text-red-500 flex items-center gap-2">
               <IconTrash size={20} /> Danger Zone
            </CardTitle>
            <CardDescription className="text-red-900/60">Irreversible actions relative to your account.</CardDescription>
          </CardHeader>
          <CardContent>
             <p className="text-sm text-zinc-400 mb-4">Once you delete your account, all your wallet connections and credit score data will be permanently removed.</p>
             <Button variant="destructive" className="bg-red-600 hover:bg-red-700">Delete Account</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
