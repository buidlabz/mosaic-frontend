"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useInstitutionDashboard } from "@/hooks/use-institution-dashboard"
import { Skeleton } from "@/components/ui/skeleton"
import { IconCheck, IconCreditCard, IconBolt, IconDatabase } from "@tabler/icons-react"
import { apiClient } from "@/lib/api-client"

export default function InstitutionPaymentsPage() {
  const { profile, analytics, loading, refresh } = useInstitutionDashboard();

  const handleUpgrade = async (plan: string) => {
    try {
      await apiClient("/api/v1/institution/subscription", {
        method: "PUT",
        body: JSON.stringify({ plan }),
      });
      refresh();
      alert(`Institution plan updated to ${plan}!`);
    } catch (err) {
      console.error("Failed to update plan:", err);
    }
  };

  if (loading) return <div className="p-6 space-y-6"><Skeleton className="h-10 w-48 bg-zinc-900" /><Skeleton className="h-64 bg-zinc-900" /></div>;

  const plans = [
    {
      name: "free",
      price: 0,
      description: "Basic access for small institutions.",
      features: ["Up to 5 API Keys", "100 Free Credits/mo", "Community Support", "Basic Analytics"],
    },
    {
      name: "enterprise",
      price: 499,
      description: "Full-scale credit infrastructure.",
      features: ["Unlimited API Keys", "10,000 Credits/mo", "Priority 24/7 Support", "Advanced Usage Analytics", "Custom Webhooks"],
      popular: true
    }
  ];

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Enterprise Plans & Credits</h1>
        <p className="text-zinc-400">Scale your credit scoring infrastructure.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl">
        {plans.map((plan) => (
          <Card key={plan.name} className={`bg-zinc-900 border-zinc-800 flex flex-col relative ${plan.popular ? 'border-[#00FF00]/50 ring-1 ring-[#00FF00]/20' : ''}`}>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white capitalize">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-6">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white">${plan.price}</span>
                <span className="text-zinc-500">/month</span>
              </div>
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-zinc-300">
                    <div className="h-5 w-5 rounded-full bg-[#00FF00]/10 flex items-center justify-center text-[#00FF00]">
                      <IconCheck size={12} />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => handleUpgrade(plan.name)}
                disabled={profile?.plan?.name === plan.name}
                className={`w-full ${profile?.plan?.name === plan.name ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' : 'bg-[#00FF00] text-black hover:bg-[#00DD00]'}`}
              >
                {profile?.plan?.name === plan.name ? "Current Plan" : `Select ${plan.name}`}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl">
         <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
               <CardTitle className="text-white flex items-center gap-2">
                  <IconBolt size={20} className="text-yellow-500" /> API Credits
               </CardTitle>
               <CardDescription>Usage-based billing for scoring requests.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex items-center justify-between p-4 bg-zinc-950 border border-zinc-800 rounded-lg">
                  <div>
                     <p className="text-xs text-zinc-500 uppercase font-black">Available Balance</p>
                     <p className="text-2xl font-bold text-white">{analytics?.remainingCredits || 0} Credits</p>
                  </div>
                  <Button size="sm" className="bg-[#00FF00] text-black hover:bg-[#00DD00]">Buy Credits</Button>
               </div>
               <p className="text-[10px] text-zinc-500 italic">1 Credit = 1 Ad-hoc scoring request. Credits do not expire on enterprise plans.</p>
            </CardContent>
         </Card>

         <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
               <CardTitle className="text-white flex items-center gap-2">
                  <IconCreditCard size={20} className="text-[#00FF00]" /> Billing Method
               </CardTitle>
               <CardDescription>Manage enterprise payment details.</CardDescription>
            </CardHeader>
            <CardContent>
               <div className="flex items-center gap-4 p-4 bg-zinc-950 border border-zinc-800 rounded-lg">
                  <div className="h-10 w-12 bg-zinc-900 rounded border border-zinc-800 flex items-center justify-center text-zinc-500">
                     <IconDatabase size={24} />
                  </div>
                  <div>
                     <p className="text-sm font-medium text-white">Bank Transfer (USD)</p>
                     <p className="text-xs text-zinc-500">Automatic Renewal: ON</p>
                  </div>
                  <Button variant="ghost" className="ml-auto text-xs text-zinc-400 hover:text-white">Manage</Button>
               </div>
            </CardContent>
         </Card>
      </div>
    </div>
  )
}
