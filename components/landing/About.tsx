import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export function About() {
  return (
    <section className="py-20 border-y border-zinc-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2">
            <Badge className="mb-4 bg-zinc-800 hover:bg-zinc-700">About Mosaic</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">We Take Your Crypto <br/><span className="text-[#00FF00]">Future Seriously</span></h2>
            <div className="grid grid-cols-2 gap-8 mt-8">
              <div>
                <div className="text-4xl font-bold text-white mb-1">10K+</div>
                <div className="text-zinc-500 text-sm">Wallets Analyzed</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-1">500M+</div>
                <div className="text-zinc-500 text-sm">Volume in Swaps</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-1">99%</div>
                <div className="text-zinc-500 text-sm">Uptime Guarantee</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-1">24/7</div>
                <div className="text-zinc-500 text-sm">Customer Support</div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 grid grid-cols-2 gap-4">
            <div className="space-y-4 mt-8">
              <div className="h-40 bg-zinc-900 rounded-2xl overflow-hidden relative">
                <Image src="https://unsplash.it/400/300?random=crypto1" alt="Crypto User" fill className="object-cover opacity-60 hover:opacity-100 transition-opacity" />
              </div>
              <div className="h-56 bg-zinc-900 rounded-2xl overflow-hidden relative">
                 <Image src="https://unsplash.it/400/500?random=fintech" alt="Analytics" fill className="object-cover opacity-60 hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <div className="space-y-4">
               <div className="h-56 bg-zinc-900 rounded-2xl overflow-hidden relative">
                  <Image src="https://unsplash.it/400/500?random=blockchain" alt="Blockchain" fill className="object-cover opacity-60 hover:opacity-100 transition-opacity" />
               </div>
               <div className="h-40 bg-[#00FF00] rounded-2xl flex items-center justify-center p-6 text-black font-bold text-2xl leading-tight">
                 Join the future of credit.
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
