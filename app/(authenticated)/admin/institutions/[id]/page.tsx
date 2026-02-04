"use client"

import { useParams, useRouter } from "next/navigation"
import { useAdminDashboard } from "@/hooks/use-admin-dashboard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { IconBuilding, IconArrowLeft, IconCheck, IconHistory, IconMail, IconShield } from "@tabler/icons-react"
import { apiClient } from "@/lib/api-client"
import { useState } from "react"

export default function InstitutionDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { institutions, loading, refresh } = useAdminDashboard();
  const [processing, setProcessing] = useState(false);

  const institution = institutions.find(i => i._id === id);

  if (loading) return <div className="p-6 space-y-6"><Skeleton className="h-10 w-48 bg-zinc-900" /><Skeleton className="h-96 bg-zinc-900" /></div>;
  if (!institution) return <div className="p-6 text-zinc-400">Institution not found.</div>;

  const handleStatusUpdate = async (newStatus: string) => {
    setProcessing(true);
    try {
      await apiClient(`/api/v1/admin/institution/${id}/approve`, {
        method: "PUT",
        body: JSON.stringify({ status: newStatus }),
      });
      refresh();
    } catch (err) {
      console.error("Status update failed:", err);
    } finally {
      setProcessing(false);
    }
  };

  const isApproved = institution.status.toUpperCase() === "APPROVED";
  const isPending = institution.status.toUpperCase() === "PENDING";

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-zinc-400 hover:text-white">
          <IconArrowLeft size={24} />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">{institution.name}</h1>
          <p className="text-zinc-400">Enterprise Partner Details</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <Card className="bg-zinc-900 border-zinc-800 md:col-span-2">
           <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                 <IconBuilding size={20} className="text-[#00FF00]" /> Institution Profile
              </CardTitle>
              <CardDescription>Comprehensive overview of the entity.</CardDescription>
           </CardHeader>
           <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-8">
                 <div className="space-y-1">
                    <p className="text-xs text-zinc-500 uppercase font-bold">Registration ID</p>
                    <p className="text-zinc-200 font-mono text-xs">{institution._id}</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-xs text-zinc-500 uppercase font-bold">Join Date</p>
                    <p className="text-zinc-200">{new Date(institution.createdAt).toLocaleDateString()}</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-xs text-zinc-500 uppercase font-bold">Current Plan</p>
                    <p className="text-zinc-200 capitalize">{institution.plan?.name || "Free Trial"}</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-xs text-zinc-500 uppercase font-bold">Status Badge</p>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase inline-block ${
                        isApproved ? 'bg-[#00FF00]/10 text-[#00FF00]' : 
                        isPending ? 'bg-yellow-500/10 text-yellow-500' : 
                        'bg-red-500/10 text-red-500'
                    }`}>
                      {institution.status}
                    </span>
                 </div>
              </div>

              <div className="pt-6 border-t border-zinc-800 space-y-4">
                 <h3 className="text-white font-semibold flex items-center gap-2">
                    <IconShield size={18} className="text-zinc-400" /> Administrative Controls
                 </h3>
                 <div className="flex gap-4">
                    {!isApproved ? (
                       <Button 
                         onClick={() => handleStatusUpdate("approved")} 
                         className="bg-[#00FF00] text-black hover:bg-[#00DD00]"
                         disabled={processing}
                       >
                          {processing ? "Updating..." : <><IconCheck size={18} className="mr-2" /> Approve Institution</>}
                       </Button>
                    ) : (
                       <Button 
                         onClick={() => handleStatusUpdate("pending")} 
                         variant="outline"
                         className="border-zinc-800 text-zinc-400 hover:text-white"
                         disabled={processing}
                       >
                          {processing ? "Updating..." : <><IconHistory size={18} className="mr-2" /> Discontinue (Revert to Pending)</>}
                       </Button>
                    )}
                    
                    {institution.status.toUpperCase() !== "REJECTED" && (
                       <Button 
                         variant="destructive"
                         className="bg-red-600 hover:bg-red-700"
                         disabled={processing}
                         onClick={() => handleStatusUpdate("rejected")}
                       >
                          Reject / Revoke
                       </Button>
                    )}
                 </div>
              </div>
           </CardContent>
        </Card>

        <div className="space-y-8">
           <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                 <CardTitle className="text-white text-sm">Communication</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded bg-zinc-800 flex items-center justify-center text-zinc-400">
                       <IconMail size={16} />
                    </div>
                    <div className="flex-1">
                       <p className="text-xs text-zinc-500">Contact Email</p>
                       <p className="text-sm text-zinc-200 truncate">admin@{institution.name.toLowerCase().replace(/\s/g, '')}.com</p>
                    </div>
                 </div>
              </CardContent>
           </Card>

           <Card className="bg-zinc-950 border border-zinc-800 border-dashed">
              <CardHeader>
                 <CardTitle className="text-zinc-500 text-xs uppercase font-bold">Verification Checklist</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                 {['Business License', 'Tax ID', 'Domain Verification'].map(item => (
                    <div key={item} className="flex items-center gap-2 text-xs text-zinc-600">
                       <IconCheck size={14} className="text-zinc-800" /> {item}
                    </div>
                 ))}
              </CardContent>
           </Card>
        </div>
      </div>
    </div>
  )
}
