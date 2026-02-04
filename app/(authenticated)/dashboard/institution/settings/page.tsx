"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useInstitutionDashboard } from "@/hooks/use-institution-dashboard"
import { Skeleton } from "@/components/ui/skeleton"
import { IconBuilding, IconMail, IconEdit, IconTrash, IconKey } from "@tabler/icons-react"
import { apiClient } from "@/lib/api-client"

export default function InstitutionSettingsPage() {
  const { profile, loading, refresh } = useInstitutionDashboard();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", metadata: {} });

  const handleUpdate = async () => {
    try {
      await apiClient("/api/v1/institution/profile", {
        method: "PUT",
        body: JSON.stringify(formData),
      });
      setIsEditing(false);
      refresh();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  if (loading) return <div className="p-6 space-y-6"><Skeleton className="h-10 w-48 bg-zinc-900" /><Skeleton className="h-64 bg-zinc-900" /></div>;

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Institution Settings</h1>
        <p className="text-zinc-400">Manage your organization's profile and preferences.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <Card className="bg-zinc-900 border-zinc-800 md:col-span-1">
          <CardHeader>
            <div className="h-20 w-20 rounded-2xl bg-[#00FF00]/10 flex items-center justify-center border border-[#00FF00]/20 mb-4">
               <IconBuilding size={40} className="text-[#00FF00]" />
            </div>
            <CardTitle className="text-white">{profile?.name}</CardTitle>
            <CardDescription className="uppercase text-[10px] font-black tracking-widest text-[#00FF00]">
               {profile?.status} Institution
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex items-center gap-2 text-zinc-400">
                <IconKey size={16} />
                <span className="text-xs">ID: {profile?._id?.slice(0, 8) || profile?.plan?._id?.slice(0, 8) || '...'}</span>
             </div>
             <Button variant="outline" className="w-full border-zinc-800 text-zinc-400 hover:text-white" onClick={() => {
                setFormData({ name: profile?.name || "", metadata: profile?.metadata || {} });
                setIsEditing(true);
             }}>
                <IconEdit size={16} className="mr-2" /> Edit Profile
             </Button>
          </CardContent>
        </Card>

        <div className="md:col-span-2 space-y-6">
           {isEditing && (
              <Card className="bg-zinc-900 border-[#00FF00]/30 ring-1 ring-[#00FF00]/10">
                 <CardHeader>
                    <CardTitle className="text-white">Update Profile</CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-4">
                    <div className="space-y-2">
                       <label className="text-xs text-zinc-500 uppercase font-black">Institution Name</label>
                       <Input 
                         value={formData.name} 
                         onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                         className="bg-zinc-950 border-zinc-800 text-white"
                       />
                    </div>
                 </CardContent>
                 <CardFooter className="gap-2">
                    <Button onClick={handleUpdate} className="bg-[#00FF00] text-black">Save Changes</Button>
                    <Button variant="ghost" onClick={() => setIsEditing(false)} className="text-zinc-400">Cancel</Button>
                 </CardFooter>
              </Card>
           )}

           <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                 <CardTitle className="text-white">Organization Details</CardTitle>
                 <CardDescription>Public information about your institution.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-lg flex justify-between">
                    <span className="text-zinc-500 text-sm">Legal Name</span>
                    <span className="text-white font-medium">{profile?.name}</span>
                 </div>
                 <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-lg">
                   <p className="text-xs text-zinc-500 uppercase font-bold">Current Plan</p>
                   <p className="text-sm font-medium text-white capitalize">{profile?.plan?.name || "Free"}</p>
                </div>
                 <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-lg flex justify-between">
                    <span className="text-zinc-500 text-sm">Status</span>
                    <span className={`text-sm font-bold uppercase ${profile?.status === 'APPROVED' ? 'text-[#00FF00]' : 'text-yellow-500'}`}>
                       {profile?.status}
                    </span>
                 </div>
              </CardContent>
           </Card>

           <Card className="border-red-900/20 bg-red-950/10">
              <CardHeader>
                 <CardTitle className="text-red-500 flex items-center gap-2">
                    <IconTrash size={20} /> Data Deletion
                 </CardTitle>
                 <CardDescription className="text-red-900/60">Permanently remove institution data.</CardDescription>
              </CardHeader>
              <CardContent>
                 <p className="text-xs text-zinc-400">This will revoke all API keys and delete historical scoring data. This action is irreversible.</p>
              </CardContent>
              <CardFooter>
                 <Button variant="destructive" size="sm" className="bg-red-600 hover:bg-red-700">Delete Institution Profile</Button>
              </CardFooter>
           </Card>
        </div>
      </div>
    </div>
  )
}
