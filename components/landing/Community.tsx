import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { IconStar } from "@tabler/icons-react";

export function Community() {
  return (
    <section className="py-20 border-t border-zinc-900">
       <div className="container mx-auto px-4">
          <div className="text-center mb-12">
             <h2 className="text-3xl font-bold mb-4">Join Our Thriving Community</h2>
             <p className="text-zinc-500">Connect with innovators in crypto credit.</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
             {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="bg-zinc-900 border-zinc-800 overflow-hidden">
                   <div className="h-48 relative">
                      <Image src={`https://unsplash.it/300/300?random=person${i}`} alt="Community Member" fill className="object-cover" />
                   </div>
                   <CardContent className="p-4">
                      <div className="font-bold text-white">Member #{290 + i}</div>
                      <div className="text-xs text-[#00FF00] flex items-center gap-1"><IconStar size={12} fill="#00FF00" /> Early Adopter</div>
                   </CardContent>
                </Card>
             ))}
          </div>
       </div>
    </section>
  );
}
