"use client"

import { useEffect, useState } from "react"
import { useAppKit, useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useUserDashboard } from "@/hooks/use-user-dashboard"
import { Skeleton } from "@/components/ui/skeleton"
import { IconWallet, IconPlus, IconTrash, IconExternalLink } from "@tabler/icons-react"
import { apiClient } from "@/lib/api-client"
import { supportedWalletNetworks } from "@/lib/reown-appkit"

type SupportedChain = keyof typeof supportedWalletNetworks

const NETWORK_OPTIONS: Array<{ label: string; value: SupportedChain }> = [
  { label: "Base", value: "base" },
  { label: "Ethereum", value: "ethereum" },
]

export default function WalletPage() {
  const { wallets, loading, error, refresh } = useUserDashboard();
  const { open } = useAppKit()
  const { address, isConnected } = useAppKitAccount()
  const { caipNetwork, switchNetwork } = useAppKitNetwork()
  const [isAdding, setIsAdding] = useState(false);
  const [selectedChain, setSelectedChain] = useState<SupportedChain>("base");
  const [nickname, setNickname] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const targetNetwork = supportedWalletNetworks[selectedChain]
  const isSelectedNetworkConnected = !!address && caipNetwork?.id === targetNetwork.id

  useEffect(() => {
    if (!isConnected) {
      return
    }

    if (caipNetwork?.id !== targetNetwork.id) {
      void switchNetwork(targetNetwork)
    }
  }, [caipNetwork?.id, isConnected, switchNetwork, targetNetwork])

  const handleConnectWallet = async () => {
    try {
      setFormError(null)

      if (caipNetwork?.id !== targetNetwork.id) {
        await switchNetwork(targetNetwork)
      }

      await open({ view: "Connect" })
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Failed to connect wallet.")
    }
  }

  const handleAddWallet = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!address) {
      setFormError("Connect a wallet first.")
      return
    }

    try {
      setIsSubmitting(true)
      setFormError(null)

      await apiClient("/api/v1/client/wallet", {
        method: "POST",
        body: JSON.stringify({
          address,
          chain: selectedChain,
          nickname: nickname.trim() || undefined,
        }),
      });
      setIsAdding(false);
      setNickname("");
      await refresh();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Failed to add wallet.")
    } finally {
      setIsSubmitting(false)
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
            <CardDescription>Select a supported network, connect that wallet, then submit it.</CardDescription>
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
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-zinc-500 uppercase font-bold">Network</label>
                  <select
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-white outline-none focus:border-[#00FF00]"
                    value={selectedChain}
                    onChange={(e) => setSelectedChain(e.target.value as SupportedChain)}
                  >
                    {NETWORK_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-zinc-500 uppercase font-bold">Connected Address</label>
                  <div className="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-2 text-sm text-zinc-300">
                    {address ?? "No wallet connected"}
                  </div>
                </div>
              </div>
              {formError && (
                <p className="text-sm text-red-400">{formError}</p>
              )}
              {address && !isSelectedNetworkConnected && (
                <p className="text-sm text-yellow-400">
                  Switch the connected wallet to {selectedChain} before saving.
                </p>
              )}
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleConnectWallet}
                  className="border-[#00FF00] text-[#00FF00] hover:bg-[#00FF00] hover:text-black"
                >
                  {isSelectedNetworkConnected ? "Connected" : "Connect Wallet"}
                </Button>
                <Button
                  type="submit"
                  className="bg-[#00FF00] text-black hover:bg-[#00DD00]"
                  disabled={!isSelectedNetworkConnected || isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save Wallet"}
                </Button>
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
