"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useInstitutionDashboard } from "@/hooks/use-institution-dashboard"
import { Skeleton } from "@/components/ui/skeleton"
import { IconUsers, IconChevronLeft, IconWallet, IconExternalLink, IconMail } from "@tabler/icons-react"
import { apiClient } from "@/lib/api-client"

function ClientsContent() {
  const { clients, loading } = useInstitutionDashboard();
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedClientId = searchParams.get("id");
  
  const [selectedClientWallets, setSelectedClientWallets] = useState<any[]>([]);
  const [fetchingWallets, setFetchingWallets] = useState(false);

  useEffect(() => {
    if (selectedClientId) {
       const fetchWallets = async () => {
          setFetchingWallets(true);
          try {
             const res = await apiClient<{ data: { wallets: any[] } }>(`/api/v1/institution/access/client/${selectedClientId}/wallets`);
             setSelectedClientWallets(res.data.wallets);
          } catch (err) {
             console.error("Failed to fetch client wallets:", err);
          } finally {
             setFetchingWallets(false);
          }
       };
       fetchWallets();
    }
  }, [selectedClientId]);

  const selectedClient = clients.find(c => c.userId === selectedClientId);

  if (loading) return <div className="p-6 space-y-6"><Skeleton className="h-10 w-48 bg-zinc-900" /><Skeleton className="h-64 bg-zinc-900" /></div>;

  if (selectedClientId && selectedClient) {
     return (
        <div className="p-6 space-y-8">
           <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => window.history.back()} className="text-zinc-400 hover:text-white">
                 <IconChevronLeft size={24} />
              </Button>
              <div>
                 <h1 className="text-3xl font-bold tracking-tight text-white">{selectedClient.name}</h1>
                 <p className="text-zinc-400">Viewing wallets for client {selectedClient.email}</p>
              </div>
           </div>

           <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                 <CardTitle className="text-white flex items-center gap-2">
                    <IconWallet size={20} className="text-[#00FF00]" /> Connected Wallets
                 </CardTitle>
                 <CardDescription>Wallets shared by this client with your institution.</CardDescription>
              </CardHeader>
              <CardContent>
                 {fetchingWallets ? (
                    <div className="space-y-4">
                       <Skeleton className="h-12 bg-zinc-950" />
                       <Skeleton className="h-12 bg-zinc-950" />
                    </div>
                 ) : (
                    <Table>
                       <TableHeader>
                          <TableRow className="border-zinc-800 hover:bg-transparent">
                             <TableHead className="text-zinc-400">Nickname</TableHead>
                             <TableHead className="text-zinc-400">Address</TableHead>
                             <TableHead className="text-zinc-400">Chain</TableHead>
                             <TableHead className="text-zinc-400 text-right">View Score</TableHead>
                          </TableRow>
                       </TableHeader>
                       <TableBody>
                          {selectedClientWallets.length > 0 ? selectedClientWallets.map((wallet) => (
                             <TableRow key={wallet._id} className="border-zinc-800 hover:bg-zinc-800/50">
                                <TableCell className="font-medium text-white">{wallet.nickname || "Unnamed"}</TableCell>
                                <TableCell className="text-zinc-300 font-mono text-xs">{wallet.address}</TableCell>
                                <TableCell className="text-zinc-400 uppercase text-xs">{wallet.chain}</TableCell>
                                <TableCell className="text-right">
                                   <Button variant="ghost" size="sm" className="text-[#00FF00]">Full Report <IconExternalLink size={14} className="ml-1" /></Button>
                                </TableCell>
                             </TableRow>
                          )) : (
                             <TableRow>
                                <TableCell colSpan={4} className="text-center text-zinc-500 py-10">No wallets shared by this client.</TableCell>
                             </TableRow>
                          )}
                       </TableBody>
                    </Table>
                 )}
              </CardContent>
           </Card>
        </div>
     );
  }

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Managed Clients</h1>
        <p className="text-zinc-400">View and analyze users who have granted you access to their data.</p>
      </div>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <IconUsers size={20} className="text-[#00FF00]" /> Authorized Users
          </CardTitle>
          <CardDescription>These users have approved your data access requests.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800 hover:bg-transparent">
                <TableHead className="text-zinc-400 pl-6">Client Name</TableHead>
                <TableHead className="text-zinc-400">Email Address</TableHead>
                <TableHead className="text-zinc-400">User ID</TableHead>
                <TableHead className="text-zinc-400 text-right pr-6">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.length > 0 ? clients.map((client) => (
                <TableRow key={client.userId} className="border-zinc-800 hover:bg-zinc-800/50">
                  <TableCell className="font-medium text-white pl-6">{client.name}</TableCell>
                  <TableCell className="text-zinc-300">
                     <div className="flex items-center gap-2">
                        <IconMail size={14} className="text-zinc-500" />
                        {client.email}
                     </div>
                  </TableCell>
                  <TableCell className="text-zinc-500 font-mono text-xs">{client.userId}</TableCell>
                  <TableCell className="text-right pr-6">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => router.push(`/dashboard/institution/clients?id=${client.userId}`)}
                      className="border-zinc-800 text-zinc-400 hover:text-[#00FF00] hover:bg-zinc-800"
                    >
                      View Accounts
                    </Button>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-zinc-500 py-20">
                    <div className="flex flex-col items-center gap-3">
                       <div className="h-12 w-12 rounded-full bg-zinc-950 flex items-center justify-center border border-zinc-800">
                          <IconUsers size={24} className="text-zinc-700" />
                       </div>
                       <p>No clients found. Send access requests to get started.</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default function ClientsPage() {
  return (
    <Suspense fallback={<div className="p-6 space-y-6"><Skeleton className="h-10 w-48 bg-zinc-900" /><Skeleton className="h-64 bg-zinc-900" /></div>}>
      <ClientsContent />
    </Suspense>
  );
}
