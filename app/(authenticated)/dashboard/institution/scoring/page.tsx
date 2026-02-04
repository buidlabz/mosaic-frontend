"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { IconUpload, IconSearch, IconFileSpreadsheet, IconRobot } from "@tabler/icons-react"
import { apiClient } from "@/lib/api-client"

interface ScoreResult {
  address: string;
  score: number;
  status: string;
}

export default function BulkScoringPage() {
  const [address, setAddress] = useState("");
  const [results, setResults] = useState<ScoreResult[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSingleAnalyze = async () => {
    if (!address) return;
    setLoading(true);
    try {
      const res = await apiClient<{ data: { score: number, status: string } }>(`/api/v1/institution/score/adhoc`, {
        method: "POST",
        body: JSON.stringify({ address, chain: "ethereum" }),
      });
      setResults([{ address, score: res.data.score, status: res.data.status }, ...results]);
      setAddress("");
    } catch (err) {
      console.error("Scoring failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Bulk Credit Scoring</h1>
        <p className="text-zinc-400">Query scores for any wallet address on supported chains.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <IconSearch size={20} className="text-[#00FF00]" /> Single Analysis
            </CardTitle>
            <CardDescription>Enter a single wallet address to calculate its score immediately.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input 
                placeholder="0x..." 
                className="bg-zinc-950 border-zinc-800 text-white outline-none focus:ring-1 focus:ring-[#00FF00]" 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <Button 
                onClick={handleSingleAnalyze} 
                className="bg-[#00FF00] text-black hover:bg-[#00DD00]"
                disabled={loading}
              >
                {loading ? "Analyzing..." : "Analyze"}
              </Button>
            </div>
            <p className="text-[10px] text-zinc-500 uppercase font-black">Supported Chains: Ethereum, Bitcoin, Polygon</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <IconFileSpreadsheet size={20} className="text-[#00FF00]" /> Batch Upload
            </CardTitle>
            <CardDescription>Upload a CSV file containing multiple wallet addresses.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-zinc-800 rounded-lg p-8 flex flex-col items-center justify-center text-center hover:bg-zinc-800/50 transition-colors cursor-pointer group">
              <IconUpload className="w-8 h-8 text-zinc-500 mb-2 group-hover:text-[#00FF00]" />
              <h3 className="text-zinc-300 font-medium text-sm">Drop CSV file here</h3>
              <p className="text-xs text-zinc-500">Maximum 100 addresses per batch</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <IconRobot size={20} className="text-[#00FF00]" /> Analysis Results
          </CardTitle>
          <CardDescription>Historical results for this session.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800 hover:bg-transparent">
                <TableHead className="text-zinc-400">Wallet Address</TableHead>
                <TableHead className="text-zinc-400">Chain</TableHead>
                <TableHead className="text-zinc-400">Status</TableHead>
                <TableHead className="text-zinc-400 text-right">Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.length > 0 ? results.map((result, i) => (
                <TableRow key={i} className="border-zinc-800 hover:bg-zinc-800/50">
                  <TableCell className="text-white font-mono text-xs">{result.address}</TableCell>
                  <TableCell className="text-zinc-400 uppercase text-xs font-bold">Ethereum</TableCell>
                  <TableCell>
                    <span className="px-2 py-0.5 bg-[#00FF00]/10 text-[#00FF00] rounded text-[10px] font-bold uppercase">
                      {result.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-bold text-[#00FF00] text-xl">
                    {Math.round(result.score)}
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-zinc-500 py-12">
                    Start an analysis to see results here.
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
