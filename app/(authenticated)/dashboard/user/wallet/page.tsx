"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useUserDashboard } from "@/hooks/use-user-dashboard"
import { Skeleton } from "@/components/ui/skeleton"
import { IconWallet, IconPlus, IconTrash, IconExternalLink } from "@tabler/icons-react"
import { apiClient } from "@/lib/api-client"

export default function WalletPage() {
  const { wallets, loading, error, refresh } = useUserDashboard();
  const [isAdding, setIsAdding] = useState(false);
  const [newWallet, setNewWallet] = useState({ address: "", chain: "ethereum", nickname: "" });

  const handleAddWallet = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient("/api/v1/client/wallet", {
        method: "POST",
        body: JSON.stringify(newWallet),
      });
      setIsAdding(false);
      setNewWallet({ address: "", chain: "ethereum", nickname: "" });
      refresh();
    } catch (err) {
      console.error("Failed to add wallet:", err);
    }
  };

  const handleDeleteWallet = async (id: string) => {
    if (!confirm("Are you sure you want to remove this wallet?")) return;
    try {
      await apiClient(`/api/v1/client/wallet/${id}`, {
        method: "DELETE",
      });
      refresh();
    } catch (err) {
      console.error("Failed to delete wallet:", err);
    }
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-10 w-48 bg-zinc-900" />
        <Skeleton className="h-64 w-full bg-zinc-900" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Wallet Management</h1>
          <p className="text-zinc-400">Connect and manage your blockchain addresses.</p>
        </div>
        {!isAdding && (
          <Button onClick={() => setIsAdding(true)} className="bg-[#00FF00] text-black hover:bg-[#00DD00]">
            <IconPlus className="mr-2 h-4 w-4" /> Add Wallet
          </Button>
        )}
      </div>

      {isAdding && (
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white">Link New Wallet</CardTitle>
            <CardDescription>Enter your wallet details below.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddWallet} className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-xs text-zinc-500 uppercase font-bold">Nickname</label>
                  <input
                    type="text"
                    placeholder="e.g. My Ledger"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-white outline-none focus:border-[#00FF00]"
                    value={newWallet.nickname}
                    onChange={(e) => setNewWallet({ ...newWallet, nickname: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-zinc-500 uppercase font-bold">Address</label>
                  <input
                    type="text"
                    required
                    placeholder="0x..."
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-white outline-none focus:border-[#00FF00]"
                    value={newWallet.address}
                    onChange={(e) => setNewWallet({ ...newWallet, address: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-zinc-500 uppercase font-bold">Chain</label>
                  <select
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-white outline-none focus:border-[#00FF00]"
                    value={newWallet.chain}
                    onChange={(e) => setNewWallet({ ...newWallet, chain: e.target.value })}
                  >
                    <option value="ethereum">Ethereum</option>
                    <option value="bitcoin">Bitcoin</option>
                    <option value="polygon">Polygon</option>
                    <option value="arbitrum">Arbitrum</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="bg-[#00FF00] text-black hover:bg-[#00DD00]">Save Wallet</Button>
                <Button type="button" variant="ghost" onClick={() => setIsAdding(false)} className="text-zinc-400 hover:text-white">Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800 hover:bg-transparent">
                <TableHead className="text-zinc-400">Nickname</TableHead>
                <TableHead className="text-zinc-400">Address</TableHead>
                <TableHead className="text-zinc-400">Chain</TableHead>
                <TableHead className="text-zinc-400 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {wallets.length > 0 ? wallets.map((wallet) => (
                <TableRow key={wallet._id} className="border-zinc-800 hover:bg-zinc-800/50">
                  <TableCell className="font-medium text-white">{wallet.nickname || "Unnamed Wallet"}</TableCell>
                  <TableCell className="text-zinc-300 font-mono text-xs">
                    {wallet.address}
                  </TableCell>
                  <TableCell>
                    <span className="bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded text-[10px] uppercase font-bold">
                      {wallet.chain}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-zinc-500 hover:text-[#00FF00]">
                         <IconExternalLink size={16} />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => handleDeleteWallet(wallet._id)} className="h-8 w-8 text-zinc-500 hover:text-red-500">
                         <IconTrash size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-zinc-500 py-12">
                    <div className="flex flex-col items-center gap-2">
                      <IconWallet size={40} className="text-zinc-800" />
                      <p>No wallets connected yet.</p>
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
