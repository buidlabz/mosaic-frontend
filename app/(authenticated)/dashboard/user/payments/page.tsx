"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useUserDashboard } from "@/hooks/use-user-dashboard"
import { Skeleton } from "@/components/ui/skeleton"
import { IconCheck, IconCreditCard, IconFlame } from "@tabler/icons-react"
import { apiClient } from "@/lib/api-client"

export default function PaymentsPage() {
  const { subscription, loading, refresh } = useUserDashboard();

  const handleUpgrade = async (plan: string) => {
    try {
      await apiClient("/api/v1/user/subscription", {
        method: "PUT",
        body: JSON.stringify({ plan }),
      });
      refresh();
      alert(`Successfully upgraded to ${plan} plan!`);
    } catch (err) {
      console.error("Failed to upgrade:", err);
    }
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-10 w-48 bg-zinc-900" />
        <div className="grid md:grid-cols-2 gap-6">
          <Skeleton className="h-[400px] bg-zinc-900" />
          <Skeleton className="h-[400px] bg-zinc-900" />
        </div>
      </div>
    );
  }

  const plans = [
    {
      name: "free",
      price: 0,
      description: "Perfect for beginners tracking a single wallet.",
      features: ["1 Connected Wallet", "Basic Credit Score", "Standard Support"],
    },
    {
      name: "pro",
      price: 29,
      description: "For active DeFi users with multiple portfolios.",
      features: ["Unlimited Wallets", "Advanced Score Breakdown", "Priority Support", "Score History Chart", "Early Access to Features"],
      popular: true
    }
  ];

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Subscription & Payments</h1>
        <p className="text-zinc-400">Manage your plan and billing details.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl">
        {plans.map((plan) => (
          <Card key={plan.name} className={`bg-zinc-900 border-zinc-800 flex flex-col relative ${plan.popular ? 'border-[#00FF00]/50 ring-1 ring-[#00FF00]/20' : ''}`}>
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#00FF00] text-black text-[10px] font-bold uppercase px-3 py-1 rounded-full flex items-center gap-1">
                <IconFlame size={12} /> Most Popular
              </div>
            )}
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
                disabled={subscription?.name === plan.name}
                className={`w-full ${subscription?.name === plan.name ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' : 'bg-[#00FF00] text-black hover:bg-[#00DD00]'}`}
              >
                {subscription?.name === plan.name ? "Current Plan" : `Upgrade to ${plan.name}`}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Card className="bg-zinc-900 border-zinc-800 max-w-5xl">
         <CardHeader>
            <CardTitle className="text-white">Payment Method</CardTitle>
            <CardDescription>Your saved payment details for renewals.</CardDescription>
         </CardHeader>
         <CardContent>
            <div className="flex items-center gap-4 p-4 bg-zinc-950 border border-zinc-800 rounded-lg">
               <div className="h-10 w-12 bg-zinc-900 rounded border border-zinc-800 flex items-center justify-center text-zinc-500">
                  <IconCreditCard size={24} />
               </div>
               <div>
                  <p className="text-sm font-medium text-white">Visa ending in 4242</p>
                  <p className="text-xs text-zinc-500">Expires 12/2028</p>
               </div>
               <Button variant="ghost" className="ml-auto text-xs text-zinc-400 hover:text-white">Edit</Button>
            </div>
         </CardContent>
      </Card>
    </div>
  )
}
