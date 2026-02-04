"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"
import { IconUser, IconMail, IconPhone, IconCalendar, IconShieldLock } from "@tabler/icons-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) return <div className="p-6">Loading profile...</div>;

  const profileItems = [
    { label: "Full Name", value: user.name, icon: <IconUser size={18} /> },
    { label: "Email Address", value: user.email, icon: <IconMail size={18} /> },
    { label: "Phone Number", value: user.phone || "Not provided", icon: <IconPhone size={18} /> },
    { label: "Joined Mosaic", value: new Date(user.createdAt).toLocaleDateString(), icon: <IconCalendar size={18} /> },
    { label: "Account Role", value: user.role, icon: <IconShieldLock size={18} /> },
  ];

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Your Profile</h1>
        <p className="text-zinc-400">View and manage your personal information.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <Card className="bg-zinc-900 border-zinc-800 md:col-span-1">
          <CardContent className="pt-8 flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24 rounded-2xl ring-2 ring-[#00FF00]/20">
              <AvatarImage src={undefined} alt={user.name} />
              <AvatarFallback className="text-2xl bg-zinc-800 text-[#00FF00]">
                {user.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h2 className="text-xl font-bold text-white">{user.name}</h2>
              <p className="text-zinc-500 text-sm uppercase tracking-widest font-bold">{user.role}</p>
            </div>
            <Button variant="outline" className="w-full border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800">
               Edit Profile Picture
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800 md:col-span-2">
           <CardHeader>
              <CardTitle className="text-white">Account Details</CardTitle>
              <CardDescription>Public and private details associated with your account.</CardDescription>
           </CardHeader>
           <CardContent className="space-y-4">
              <div className="grid gap-4">
                 {profileItems.map((item) => (
                    <div key={item.label} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-zinc-950 border border-zinc-800 rounded-lg gap-2">
                       <div className="flex items-center gap-3 text-zinc-400">
                          {item.icon}
                          <span className="text-sm font-medium">{item.label}</span>
                       </div>
                       <span className="text-white font-medium capitalize">{item.value}</span>
                    </div>
                 ))}
              </div>
           </CardContent>
        </Card>
      </div>
    </div>
  )
}
