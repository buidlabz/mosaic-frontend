import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { IconUsers, IconChartBar, IconCurrencyDollar, IconArrowRight } from "@tabler/icons-react";

export function Services() {
  return (
    <section id="services" className="py-24 bg-zinc-950">
       <div className="container mx-auto px-4 text-center">
         <h2 className="text-3xl md:text-5xl font-bold mb-12">Designed for <span className="text-[#00FF00]">All Users</span></h2>
         
         <Tabs defaultValue="users" className="max-w-4xl mx-auto">
           <TabsList className="grid w-full grid-cols-3 bg-zinc-900 mb-8 p-1 rounded-full">
             <TabsTrigger value="users" className="rounded-full data-[state=active]:bg-[#00FF00] data-[state=active]:text-black text-gray-400 hover:text-[#00FF00]">For Users</TabsTrigger>
             <TabsTrigger value="institutions" className="rounded-full data-[state=active]:bg-[#00FF00] data-[state=active]:text-black text-gray-400 hover:text-[#00FF00]">For Institutions</TabsTrigger>
             <TabsTrigger value="businesses" className="rounded-full data-[state=active]:bg-[#00FF00] data-[state=active]:text-black text-gray-400 hover:text-[#00FF00]">For Businesses</TabsTrigger>
           </TabsList>
           
           <TabsContent value="users">
             <CardSpotlight className="cursor-pointer border-zinc-800 bg-zinc-950/50" color="#00FF00">
               <div className="relative z-20">
                 <CardHeader>
                   <CardTitle className="flex items-center gap-2 justify-center text-2xl text-gray-300">
                      <IconUsers className="text-[#00FF00]"/> Personal Dashboard
                   </CardTitle>
                   <CardDescription>Track your financial health in real-time.</CardDescription>
                 </CardHeader>
                 <CardContent className="space-y-4 text-zinc-400">
                   <p>Get a personal dashboard showing your credit score, swap history, and payment limits. Connect multiple wallets to aggregate your data.</p>
                   <div className="flex justify-center mt-4">
                     <Link href="/dashboard/user" className="text-[#00FF00] hover:underline flex items-center">Preview User Dashboard <IconArrowRight className="w-4 h-4 ml-1"/></Link>
                   </div>
                 </CardContent>
               </div>
             </CardSpotlight>
           </TabsContent>
           
           <TabsContent value="institutions">
              <CardSpotlight className="cursor-pointer border-zinc-800 bg-zinc-950/50" color="#00FF00">
               <div className="relative z-20">
                 <CardHeader>
                   <CardTitle className="flex items-center gap-2 justify-center text-2xl text-gray-300">
                      <IconChartBar className="text-[#00FF00]"/> Enterprise Tools
                   </CardTitle>
                   <CardDescription>Bulk scoring and risk assessment.</CardDescription>
                 </CardHeader>
                 <CardContent className="space-y-4 text-zinc-400">
                   <p>Process thousands of wallets simultaneously for credit assessment. Integrate our risk engine into your existing lending platform.</p>
                   <div className="flex justify-center mt-4">
                     <Link href="/dashboard/institution" className="text-[#00FF00] hover:underline flex items-center">Preview Institution Dashboard <IconArrowRight className="w-4 h-4 ml-1"/></Link>
                   </div>
                 </CardContent>
               </div>
             </CardSpotlight>
           </TabsContent>

           <TabsContent value="businesses">
              <CardSpotlight className="cursor-pointer border-zinc-800 bg-zinc-950/50" color="#00FF00">
               <div className="relative z-20">
                 <CardHeader>
                   <CardTitle className="flex items-center gap-2 justify-center text-2xl text-gray-300">
                      <IconCurrencyDollar className="text-[#00FF00]"/> API & SDK
                   </CardTitle>
                   <CardDescription className="text-center">Infrastructure for cross-border payments.</CardDescription>
                 </CardHeader>
                 <CardContent className="space-y-4 text-zinc-400">
                   <p>Build your own fintech application using Mosaic's swap execution and credit data APIs. Fully documented and easy to integrate.</p>
                   <div className="flex justify-center mt-4">
                     <Link href="/admin" className="text-[#00FF00] hover:underline flex items-center">Developer Documentation <IconArrowRight className="w-4 h-4 ml-1"/></Link>
                   </div>
                 </CardContent>
               </div>
             </CardSpotlight>
           </TabsContent>
         </Tabs>
       </div>
    </section>
  );
}
