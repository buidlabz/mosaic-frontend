import Image from "next/image";
import { Button } from "@/components/ui/button";
import { IconArrowRight } from "@tabler/icons-react";

export function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-zinc-900/50 skew-y-3 transform origin-top-left -z-10"></div>
      <div className="container mx-auto px-4 text-center">
         <div className="max-w-4xl mx-auto bg-gradient-to-r from-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00FF00]/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
               <div className="md:w-1/2 text-left">
                 <h2 className="text-3xl md:text-5xl font-bold mb-4">Open Your Mosaic Account Today</h2>
                 <p className="text-zinc-400 mb-8">Experience next-gen crypto banking with automated credit building and instant cross-border payments.</p>
                 <Button size="lg" className="bg-[#00FF00] text-black hover:bg-[#00DD00] rounded-full px-8 text-lg font-bold">
                   Try Demo <IconArrowRight className="ml-2 w-5 h-5"/>
                 </Button>
               </div>
               <div className="md:w-1/2">
                  <div className="relative mx-auto w-64 h-[400px] bg-black border-4 border-zinc-800 rounded-[3rem] overflow-hidden shadow-2xl skew-x-[-2deg] rotate-2">
                     <div className="absolute top-0 left-0 right-0 h-6 bg-zinc-900 z-20"></div>
                     <Image src="https://unsplash.it/400/800?random=app" alt="App Demo" fill className="object-cover" />
                  </div>
               </div>
            </div>
         </div>
      </div>
    </section>
  );
}
