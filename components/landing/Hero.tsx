import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  IconCircleCheck, 
  IconBrandAppstore, 
  IconBrandGooglePlay,
  IconWallet,
  IconArrowsExchange, 
  IconChartBar,
  IconCreditCard,
  IconInfoCircleFilled
} from "@tabler/icons-react";
import Image from "next/image";

export function Hero() {
  return (
    <section id="overview" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#00FF00]/20 via-black to-black z-0 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 text-center md:text-left">
          <Badge variant="outline" className="text-[#00FF00] border-[#00FF00]/50 bg-[#00FF00]/10 px-4 py-1 rounded-full text-sm">
            Crypto Credit Infrastructure
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
            Unlock Your <span className="text-[#00FF00]">Crypto Credit</span> Score
          </h1>
          <p className="text-xl text-zinc-400 max-w-lg mx-auto md:mx-0">
            Analyze blockchain activity for instant credit scores. Swap and pay across currencies like USDT to KES effortlessly.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button className="h-12 px-8 bg-white text-black hover:bg-zinc-200 rounded-full font-semibold flex items-center gap-2">
              <IconCreditCard className="w-5 h-5" /> Get Credit Score
            </Button>
            <Button variant="outline" className="h-12 px-8 border-zinc-700 bg-black text-white hover:bg-zinc-900 hover:text-[#00FF00] rounded-full font-semibold flex items-center gap-2">
              <IconInfoCircleFilled className="w-5 h-5" /> Learn More
            </Button>
          </div>

          <div className="pt-8 flex items-center justify-center md:justify-start gap-6 grayscale opacity-60">
             {/* Placeholder Integration Logos */}
             <div className="flex items-center gap-2 font-bold"><IconCircleCheck className="w-4 h-4" /> USDT</div>
             <div className="flex items-center gap-2 font-bold"><IconCircleCheck className="w-4 h-4" /> MPESA</div>
             <div className="flex items-center gap-2 font-bold"><IconCircleCheck className="w-4 h-4" /> VISA</div>
             <div className="flex items-center gap-2 font-bold"><IconCircleCheck className="w-4 h-4" /> STRIPE</div>
          </div>
        </div>

        <div className="relative">
          <div className="relative z-10 max-w-md mx-auto transform rotate-[-5deg] hover:rotate-0 transition-transform duration-500">
            {/* <Card className="bg-gradient-to-br from-[#1a1a1a] to-black border-zinc-800 text-white p-6 rounded-3xl shadow-2xl shadow-[#00FF00]/10">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-zinc-400 text-sm">Current Balance</h3>
                  <div className="text-3xl font-bold mt-1">$32,450.00 <span className="text-sm font-normal text-zinc-500">USDT</span></div>
                </div>
                <div className="w-10 h-10 bg-[#00FF00] rounded-full flex items-center justify-center">
                   <IconWallet className="text-black w-6 h-6" />
                </div>
              </div>
              
              <div className="bg-zinc-900/50 rounded-xl p-4 mb-6 border border-zinc-800">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-zinc-400 text-sm">Credit Score</span>
                  <span className="text-[#00FF00] font-bold">Excellent</span>
                </div>
                <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#00FF00] h-full w-[85%]"></div>
                </div>
                <div className="flex justify-between mt-2 text-xs text-zinc-500">
                  <span>0</span>
                  <span className="text-white font-bold text-lg">850</span>
                  <span>1000</span>
                </div>
              </div>

              <div className="flex gap-4">
                 <div className="flex-1 bg-zinc-900 rounded-lg p-3 text-center border border-zinc-800">
                    <IconArrowsExchange className="w-6 h-6 mx-auto mb-1 text-[#00FF00]"/>
                    <span className="text-xs">Swap</span>
                 </div>
                 <div className="flex-1 bg-zinc-900 rounded-lg p-3 text-center border border-zinc-800">
                    <IconChartBar className="w-6 h-6 mx-auto mb-1 text-[#00FF00]"/>
                    <span className="text-xs">Analyze</span>
                 </div>
              </div>
            </Card> */}
               <Image src="/hero-2.png" width={1000} height={1000} alt="Hero" className="object-contain" />
          </div>
       
          
          {/* Decorative elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#00FF00]/5 blur-[100px] -z-10 rounded-full" />
        </div>
      </div>
    </section>
  );
}
