"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAdminDashboard } from "@/hooks/use-admin-dashboard"
import { Skeleton } from "@/components/ui/skeleton"
import { IconCreditCard, IconPlus, IconTrash, IconEdit, IconCheck } from "@tabler/icons-react"
import { apiClient } from "@/lib/api-client"

export default function AdminPlansPage() {
  const { plans, loading, error, refresh } = useAdminDashboard();
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({ name: "", price: 0, creditsPerMonth: 0, features: [] });

  const handleCreatePlan = async () => {
    try {
      await apiClient("/api/v1/admin/plans", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      setIsCreating(false);
      refresh();
    } catch (err) {
      console.error("Plan creation failed:", err);
    }
  };

  const handleDeletePlan = async (id: string) => {
    if (!confirm("Are you sure you want to delete this plan?")) return;
    try {
      await apiClient(`/api/v1/admin/plans/${id}`, {
        method: "DELETE",
      });
      refresh();
    } catch (err) {
      console.error("Plan deletion failed:", err);
    }
  };

  if (loading) return <div className="p-6 space-y-6"><Skeleton className="h-10 w-48 bg-zinc-900" /><Skeleton className="h-64 bg-zinc-900" /></div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Subscription Plans</h1>
          <p className="text-zinc-400">Define the monetization and credit tiers for the platform.</p>
        </div>
        <Button onClick={() => setIsCreating(true)} className="bg-[#00FF00] text-black hover:bg-[#00DD00]">
          <IconPlus className="mr-2 h-4 w-4" /> Create New Plan
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {isCreating && (
          <Card className="bg-zinc-900 border-[#00FF00]/50 ring-1 ring-[#00FF00]/20">
            <CardHeader>
              <CardTitle className="text-white">New Plan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div>
                  <label className="text-[10px] text-zinc-500 uppercase font-bold">Plan Name</label>
                  <Input 
                    className="bg-zinc-950 border-zinc-800 text-white" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
               </div>
               <div className="grid grid-cols-2 gap-2">
                   <div>
                      <label className="text-[10px] text-zinc-500 uppercase font-bold">Price ($)</label>
                      <Input 
                        type="number"
                        className="bg-zinc-950 border-zinc-800 text-white" 
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                      />
                   </div>
                   <div>
                      <label className="text-[10px] text-zinc-500 uppercase font-bold">Credits</label>
                      <Input 
                        type="number"
                        className="bg-zinc-950 border-zinc-800 text-white" 
                        value={formData.creditsPerMonth}
                        onChange={(e) => setFormData({ ...formData, creditsPerMonth: Number(e.target.value) })}
                      />
                   </div>
               </div>
            </CardContent>
            <CardFooter className="gap-2">
               <Button size="sm" onClick={handleCreatePlan} className="bg-[#00FF00] text-black">Save</Button>
               <Button size="sm" variant="ghost" onClick={() => setIsCreating(false)} className="text-zinc-400">Cancel</Button>
            </CardFooter>
          </Card>
        )}

        {plans.map((plan) => (
          <Card key={plan._id} className="bg-zinc-900 border-zinc-800 flex flex-col">
            <CardHeader>
              <div className="h-10 w-10 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 mb-2">
                 <IconCreditCard size={20} />
              </div>
              <CardTitle className="text-white capitalize">{plan.name}</CardTitle>
              <CardDescription>
                 ${plan.price} / month • {plan.creditsPerMonth} credits
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
               <ul className="space-y-2">
                  {plan.features?.map((f, i) => (
                     <li key={i} className="text-xs text-zinc-400 flex items-center gap-2">
                        <IconCheck size={12} className="text-[#00FF00]" /> {f}
                     </li>
                  ))}
               </ul>
            </CardContent>
            <CardFooter className="gap-2">
               <Button variant="outline" size="sm" className="w-full border-zinc-800 text-zinc-400 hover:text-white">
                  <IconEdit size={14} className="mr-2" /> Edit
               </Button>
               <Button variant="ghost" size="sm" onClick={() => handleDeletePlan(plan._id)} className="text-zinc-600 hover:text-red-500">
                  <IconTrash size={14} />
               </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
