"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useAdminDashboard } from "@/hooks/use-admin-dashboard"
import { Skeleton } from "@/components/ui/skeleton"
import { IconBuilding, IconCheck, IconX, IconClock, IconSearch } from "@tabler/icons-react"
import { apiClient } from "@/lib/api-client"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function AdminInstitutionsPage() {
  const { institutions, loading, error, refresh } = useAdminDashboard();
  const [search, setSearch] = useState("");
  const [processingId, setProcessingId] = useState<string | null>(null);

  const handleApprove = async (id: string) => {
    setProcessingId(id);
    try {
      await apiClient(`/api/v1/admin/institution/${id}/approve`, {
        method: "PUT",
        body: JSON.stringify({ status: "approved" }),
      });
      refresh();
    } catch (err) {
      console.error("Approval failed:", err);
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (id: string) => {
    if (!confirm("Are you sure you want to reject this institution?")) return;
    setProcessingId(id);
    try {
      await apiClient(`/api/v1/admin/institution/${id}/approve`, {
        method: "PUT",
        body: JSON.stringify({ status: "rejected" }),
      });
      refresh();
    } catch (err) {
      console.error("Rejection failed:", err);
    } finally {
      setProcessingId(null);
    }
  };

  const filteredInstitutions = institutions.filter(inst => 
    inst.name.toLowerCase().includes(search.toLowerCase())
  );

  const pendingInstitutions = filteredInstitutions.filter(i => i.status.toUpperCase() === "PENDING");
  const nonPendingInstitutions = filteredInstitutions.filter(i => i.status.toUpperCase() !== "PENDING");

  if (loading) return <div className="p-6 space-y-6"><Skeleton className="h-10 w-48 bg-zinc-900" /><Skeleton className="h-64 bg-zinc-900" /></div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Institutional Partners</h1>
          <p className="text-zinc-400">Review and approve enterprise access requests.</p>
        </div>
        <div className="relative">
            <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
            <Input 
                placeholder="Search partners..." 
                className="pl-10 bg-zinc-900 border-zinc-800 text-white w-64" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>
      </div>

      <div className="grid gap-6">
        <Card className="bg-zinc-900 border-zinc-800">
           <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                 <IconClock size={20} className="text-yellow-500" /> Pending Approvals
              </CardTitle>
              <CardDescription>Institutions waiting for verification.</CardDescription>
           </CardHeader>
           <CardContent className="p-0">
              <Table>
                 <TableHeader>
                    <TableRow className="border-zinc-800 hover:bg-transparent">
                       <TableHead className="text-zinc-400 pl-6">Institution Name</TableHead>
                       <TableHead className="text-zinc-400">Request Date</TableHead>
                       <TableHead className="text-zinc-400 text-right pr-6">Decision</TableHead>
                    </TableRow>
                 </TableHeader>
                 <TableBody>
                    {pendingInstitutions.length > 0 ? (
                       pendingInstitutions.map(inst => (
                          <TableRow key={inst._id} className="border-zinc-800 hover:bg-zinc-800/50">
                             <TableCell className="font-medium text-white pl-6">{inst.name}</TableCell>
                             <TableCell className="text-zinc-500 text-xs">{new Date(inst.createdAt).toLocaleDateString()}</TableCell>
                             <TableCell className="text-right pr-6 space-x-2">
                                <Button 
                                    size="sm" 
                                    className="bg-[#00FF00] text-black hover:bg-[#00DD00]"
                                    onClick={() => handleApprove(inst._id)}
                                    disabled={processingId === inst._id}
                                >
                                   {processingId === inst._id ? "..." : <IconCheck size={16} />}
                                </Button>
                                <Button 
                                    size="sm" 
                                    variant="destructive" 
                                    className="bg-red-600 hover:bg-red-700"
                                    onClick={() => handleReject(inst._id)}
                                    disabled={processingId === inst._id}
                                >
                                   {processingId === inst._id ? "..." : <IconX size={16} />}
                                </Button>
                             </TableCell>
                          </TableRow>
                       ))
                    ) : (
                       <TableRow>
                          <TableCell colSpan={3} className="text-center text-zinc-500 py-10">No pending requests.</TableCell>
                       </TableRow>
                    )}
                 </TableBody>
              </Table>
           </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
           <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                 <IconBuilding size={20} className="text-[#00FF00]" /> Approved Partners
              </CardTitle>
              <CardDescription>Verified enterprise accounts with platform access.</CardDescription>
           </CardHeader>
           <CardContent className="p-0">
              <Table>
                 <TableHeader>
                    <TableRow className="border-zinc-800 hover:bg-transparent">
                       <TableHead className="text-zinc-400 pl-6">Institution Name</TableHead>
                       <TableHead className="text-zinc-400">Current Plan</TableHead>
                       <TableHead className="text-zinc-400">Status</TableHead>
                       <TableHead className="text-zinc-400 text-right pr-6">Management</TableHead>
                    </TableRow>
                 </TableHeader>
                 <TableBody>
                    {nonPendingInstitutions.map(inst => (
                       <TableRow key={inst._id} className="border-zinc-800 hover:bg-zinc-800/50">
                          <TableCell className="font-medium text-white pl-6">{inst.name}</TableCell>
                          <TableCell className="text-zinc-300 capitalize">{inst.plan?.name || "Free"}</TableCell>
                          <TableCell>
                             <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                inst.status === 'APPROVED' ? 'bg-[#00FF00]/10 text-[#00FF00]' : 
                                inst.status === 'REJECTED' ? 'bg-red-500/10 text-red-500' : 
                                'bg-zinc-800 text-zinc-400'
                             }`}>
                                {inst.status}
                             </span>
                          </TableCell>
                          <TableCell className="text-right pr-6">
                             <Link href={`/admin/institutions/${inst._id}`}>
                                <Button variant="ghost" size="sm" className="text-zinc-500 hover:text-white">View Details</Button>
                             </Link>
                          </TableCell>
                       </TableRow>
                    ))}
                 </TableBody>
              </Table>
           </CardContent>
        </Card>
      </div>
    </div>
  )
}
