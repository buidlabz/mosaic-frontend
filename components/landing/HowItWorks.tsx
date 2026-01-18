import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function HowItWorks() {
  return (
    <section className="py-24 bg-black">
       <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
               <h2 className="text-3xl md:text-5xl font-bold mb-8">Learn How <span className="text-[#00FF00]">Mosaic</span> Works</h2>
               <Accordion className="w-full">
                <AccordionItem value="item-1" className="border-zinc-800">
                  <AccordionTrigger className="text-xl font-semibold hover:text-[#00FF00]">1. Connect Your Wallet</AccordionTrigger>
                  <AccordionContent className="text-zinc-100">
                    Securely connect your Metamask, Phantom, or Trust Wallet to the Mosaic platform. We support multiple chains including Ethereum, Solana, and Polygon.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border-zinc-800">
                  <AccordionTrigger className="text-xl font-semibold hover:text-[#00FF00]">2. Get Your Score</AccordionTrigger>
                  <AccordionContent className="text-zinc-100">
                    Our AI analyzes your on-chain transaction history, identifying patterns of reliability and volume to generate a credit score from 0-100.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="border-zinc-800">
                  <AccordionTrigger className="text-xl font-semibold hover:text-[#00FF00]">3. Swap & Pay</AccordionTrigger>
                  <AccordionContent className="text-zinc-100">
                    Use your established credit to access lower swap fees and instant settlement capabilities for cross-border payments in local currencies.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div className="relative aspect-video bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 shadow-lg shadow-[#00FF00]/5 group cursor-pointer">
                {/* Placeholder Video */}
                <Image src="https://unsplash.it/800/450?random=meeting" alt="Video Placeholder" fill className="object-cover opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-[#00FF00] transition-colors">
                       <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-white border-b-[10px] border-b-transparent ml-1 text-black group-hover:border-l-black"></div>
                    </div>
                </div>
            </div>
          </div>
       </div>
    </section>
  );
}
