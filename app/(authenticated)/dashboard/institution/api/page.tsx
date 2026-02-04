"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useInstitutionDashboard } from "@/hooks/use-institution-dashboard"
import { Skeleton } from "@/components/ui/skeleton"
import { IconCode, IconPlus, IconTrash, IconChevronRight, IconCopy, IconCheck } from "@tabler/icons-react"
import { apiClient } from "@/lib/api-client"

export default function APIIntegrationsPage() {
  const { keys, loading, refresh } = useInstitutionDashboard();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCreateKey = async () => {
    const name = prompt("Enter a name for the new API key:");
    if (!name) return;
    try {
      await apiClient("/api/v1/institution/keys", {
        method: "POST",
        body: JSON.stringify({ name, type: "test" }),
      });
      refresh();
    } catch (err) {
      console.error("Failed to create key:", err);
    }
  };

  const handleDeleteKey = async (id: string) => {
    if (!confirm("Are you sure you want to revoke this API key?")) return;
    try {
      await apiClient(`/api/v1/institution/keys/${id}`, {
        method: "DELETE",
      });
      refresh();
    } catch (err) {
      console.error("Failed to delete key:", err);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (loading) {
     return <div className="p-6 space-y-6"><Skeleton className="h-10 w-48 bg-zinc-900" /><Skeleton className="h-64 bg-zinc-900" /></div>;
  }

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">API Integrations</h1>
          <p className="text-zinc-400">Connect your platform with the Mosaic scoring engine.</p>
        </div>
        <Button onClick={handleCreateKey} className="bg-[#00FF00] text-black hover:bg-[#00DD00]">
          <IconPlus className="mr-2 h-4 w-4" /> Generate API Key
        </Button>
      </div>

      <div className="grid gap-6">
        <Card className="bg-zinc-900 border-zinc-800">
           <CardHeader>
              <CardTitle className="text-white">Active API Keys</CardTitle>
              <CardDescription>Use these keys to authenticate your requests. Keep them secret!</CardDescription>
           </CardHeader>
           <CardContent className="p-0">
              <Table>
                 <TableHeader>
                    <TableRow className="border-zinc-800 hover:bg-transparent">
                       <TableHead className="text-zinc-400 pl-6">Name</TableHead>
                       <TableHead className="text-zinc-400">Type</TableHead>
                       <TableHead className="text-zinc-400">Key</TableHead>
                       <TableHead className="text-zinc-400">Last Used</TableHead>
                       <TableHead className="text-zinc-400 text-right pr-6">Action</TableHead>
                    </TableRow>
                 </TableHeader>
                 <TableBody>
                    {keys.length > 0 ? keys.map((key) => (
                       <TableRow key={key._id} className="border-zinc-800 hover:bg-zinc-800/50">
                          <TableCell className="font-medium text-white pl-6">{key.name}</TableCell>
                          <TableCell>
                             <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${key.isActive ? 'bg-[#00FF00]/10 text-[#00FF00]' : 'bg-zinc-800 text-zinc-400'}`}>
                                {key.isActive ? 'Active' : 'Revoked'}
                             </span>
                          </TableCell>
                          <TableCell className="font-mono text-zinc-500 text-xs">
                             <div className="flex items-center gap-2">
                                <span>{key.key ? (key.key.slice(0, 8) + "..." + key.key.slice(-4)) : (key.prefix + "****************")}</span>
                                <Button 
                                  size="icon" 
                                  variant="ghost" 
                                  className="h-6 w-6 text-zinc-500 hover:text-white"
                                  onClick={() => copyToClipboard(key.key || key.prefix, key._id)}
                                >
                                   {copiedId === key._id ? <IconCheck size={14} className="text-[#00FF00]" /> : <IconCopy size={14} />}
                                </Button>
                             </div>
                          </TableCell>
                          <TableCell className="text-zinc-500 text-xs italic">
                             {key.lastUsed ? new Date(key.lastUsed).toLocaleDateString() : "Never"}
                          </TableCell>
                          <TableCell className="text-right pr-6">
                             <Button size="icon" variant="ghost" onClick={() => handleDeleteKey(key._id)} className="h-8 w-8 text-zinc-500 hover:text-red-500">
                                <IconTrash size={16} />
                             </Button>
                          </TableCell>
                       </TableRow>
                    )) : (
                       <TableRow>
                          <TableCell colSpan={5} className="text-center text-zinc-500 py-10">
                             No API keys generated yet.
                          </TableCell>
                       </TableRow>
                    )}
                 </TableBody>
              </Table>
           </CardContent>
        </Card>

        <Card className="bg-zinc-950 border-zinc-800 border-dashed">
           <CardHeader>
              <CardTitle className="text-zinc-200">Documentation</CardTitle>
              <CardDescription>Learn how to implement Mosaic scoring into your existing workflow.</CardDescription>
           </CardHeader>
           <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                 <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg space-y-2">
                    <h4 className="text-white font-bold flex items-center gap-2">
                       <IconCode size={16} className="text-[#00FF00]" /> REST API
                    </h4>
                    <p className="text-xs text-zinc-500">Standard HTTP endpoints for scoring and data retrieval.</p>
                    <Button variant="link" className="p-0 h-auto text-[#00FF00] text-xs">View Docs <IconChevronRight size={12} /></Button>
                 </div>
                 <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg space-y-2">
                    <h4 className="text-white font-bold flex items-center gap-2">
                       <IconCode size={16} className="text-[#00FF00]" /> Webhooks
                    </h4>
                    <p className="text-xs text-zinc-500">Receive real-time notifications for score changes.</p>
                    <Button variant="link" className="p-0 h-auto text-[#00FF00] text-xs">Configure <IconChevronRight size={12} /></Button>
                 </div>
              </div>
           </CardContent>
        </Card>
      </div>
    </div>
  )
}
